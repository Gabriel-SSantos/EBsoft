import { 
    collection, 
    doc, 
    addDoc, 
    getDocs, 
    getDoc,
    onSnapshot, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy,
    serverTimestamp,
    documentId,
    writeBatch
} from "firebase/firestore";

import {db} from "./firebase"

import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

export async function addItem(collectionName, data, idEscola){
    try{
        const docRef = await addDoc(collection(db,"escolas",idEscola,collectionName),{
            ...data,
            createdAt:serverTimestamp()
        });
        console.log("Documento criado com o id", docRef.id)
        return docRef.id
    } catch (error){
        console.log("Erro ao criar documento", error)
        throw error;
    }
}

//Busca pela colecao e atualiza sempre que ela mudar, ideal para dados que são atualizados por outros usuários

export function getItens(collectionName, callback,idEscola){
    if(!collectionName)
      return
    const q = query(collection(db,"escolas",idEscola,collectionName),orderBy("createdAt","asc"))

    const unsubscribe = onSnapshot(q,(snapshot)=>{
        const items = snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }));
        // console.log(items)
        callback(items); //Envia os dados para o componente React
    })
    return unsubscribe; //Retorna função de limpeza 
} 

/**
 * Busca todos os documentos de uma coleção uma única vez.
 * Ideal para dados de consulta ou lista, dados que não precisam de respostas imediatas 
 */
export async function getDocCollection(collectionName,callback,idEscola){
    const q = query(collection(db,"escolas",idEscola, collectionName));
    const querySnapshot = await getDocs(q);
    const dados = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(dados)
    return;
};

export async function getDocumentoUnico(collectionName,id,callback,idEscola){
  try{
    const docRef = doc(db,"escolas",idEscola,collectionName,id)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      callback({id: docSnap.id, 
        ...docSnap.data()})
      return 
    } else {
        console.log("Documento não encontrado!");
        return null
      }
    } catch (error){
      console.error("Erro ao buscar elemento", error)
      throw error;
    }
}

/**
 * Atualiza campos específicos de um documento existente.
 * @param {string} collectionName - Nome da coleção.
 * @param {string} docId - ID do documento a ser atualizado.
 * @param {object} data - Objeto contendo APENAS os campos a alterar.
 */
export async function updateItem(collectionName, docId, data,idEscola){
    try {
      // Cria a referência para o documento específico
      const docRef = doc(db,"escolas",idEscola, collectionName, docId);
      
      // Atualiza
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp() // Boa prática: marcar quando foi editado
      });
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      throw error;
    }
  };

/**
 * Remove um documento permanentemente.
 * @param {string} collectionName - Nome da coleção.
 * @param {string} docId - ID do documento a ser removido.
 */
export async function deleteItem(collectionName, docId,idEscola){
    try {
      const docRef = doc(db,"escolas",idEscola, collectionName, docId);
      await deleteDoc(docRef);
      console.log("Documento removido");
    } catch (error) {
      console.error("Erro ao remover:", error);
      throw error;
    }
  };

export async function filtro(collectionName,campo,operador,parametros,callback,idEscola){
  try{
    const q = query(collection(db,"escolas",idEscola,collectionName), where(campo,operador,parametros))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
        const dados = snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))
      callback(dados)
    })
    return unsubscribe;
  }catch(error){
    console.error("Erro ao buscar: ", error);
      throw error;
  }
}

export async function atualizarListaDeAlunos  (collectionName,listaAlunos,idEscola){
  try {
    // 1. Cria a "caixa" do lote
    const batch = writeBatch(db);

    // 2. Percorre a sua lista de alunos (que já tem os IDs)
    console.log(collectionName)
    listaAlunos.forEach((aluno) => {
      // Cria a referência para o documento específico deste aluno
      
      const {id, ...dados} = aluno
      const alunoRef = doc(db,"escolas",idEscola, collectionName, id);
      
      // Adiciona a instrução de atualização na "caixa"
      // Nota: Não usamos 'await' aqui dentro! Estamos apenas preparando o pacote.

      batch.update(alunoRef, {
        ...dados,
        dataAtualizacao: new Date() // Exemplo de outro campo
      });
    });

    // 3. Envia a "caixa" inteira para o banco de dados de uma só vez
    await batch.commit();
    
    console.log("Todos os alunos foram atualizados com sucesso!");
    return true;

  } catch (error) {
    console.error("Erro ao atualizar os alunos em lote:", error);
    throw error;
  }
};


export async function registarDiretorEscola(Diretor, email, senha, nomeIgreja){
  const auth = getAuth();
  // 1. Abrimos a nossa "caixa" de lote
  const batch = writeBatch(db);
   const turma = {
      nome:'Professores',
      descricao:'Turma dos professores e secretários da EBD',
      grupo: 'professores',
      professor: []
  }
  try {
    // 2. Criamos o Login no Auth primeiro (precisamos do UID dele)
    const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
    const uidDiretor = credenciais.user.uid;

    // 3. A MAGIA: Geramos o ID da nova Escola ANTES de a enviar para o banco
    const novaEscolaRef = doc(collection(db, "escolas"));
    const idIgrejaGerado = novaEscolaRef.id;
    // 4. Preparamos a gravação dos dados da Escola
    batch.set(novaEscolaRef, {
      nome: nomeIgreja,
      idDiretorResponsavel: uidDiretor, // A escola sabe quem é o dono
      dataFundacao: new Date(),
      status: "ativa"
    });
    // 5. Preparamos a gravação dos dados do Diretor
    const usuarioRef = doc(db, "usuarios", uidDiretor);

    const idTurmaRef = doc(collection(db,'escolas',idIgrejaGerado, 'turmas'))
    
    const idAlunoProf = await addItem("professores",Diretor,idIgrejaGerado)

    turma.professor.push(idAlunoProf)

    batch.set(idTurmaRef,{
      id: idTurmaRef.id,
      ...turma,
      dataCriacao: new Date()
    })


    batch.set(usuarioRef, {
      nome: Diretor.nome,
      telefone: Diretor.telefone,
      idEscola: idIgrejaGerado, // O diretor sabe a que escola pertence!
      turma: idTurmaRef.id,
      idProfAluno: idAlunoProf,
      perfil: 'adm',
      dataCriacao: new Date()
    });
    
    // 6. Enviamos tudo de uma vez para a internet!
    await batch.commit();

    console.log("Sucesso! Diretor criado com a Escola ID:", idIgrejaGerado);
    return { uid: uidDiretor, idEscola: idIgrejaGerado };

  } catch (erro) {
    console.error("Erro ao criar a estrutura da escola:", erro.message);
    throw erro;
  }
};


export async function registarProfessor(Professor, email, senha, idIgreja, alunoProf){
  const auth = getAuth();
  // 1. Abrimos a nossa "caixa" de lote
  const batch = writeBatch(db);
  try {
    // 2. Criamos o Login no Auth primeiro (precisamos do UID dele)
    const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
    const uidProfessor = credenciais.user.uid;

    alunoProf = {...alunoProf,uid:uidProfessor}
    const idAlunoProf = await addItem("professores",alunoProf,idIgreja)
    // 5. Preparamos a gravação dos dados do Professor
    const usuarioRef = doc(db, "usuarios", uidProfessor);
    console.log("Opa 5")
    batch.set(usuarioRef, {
      ...Professor,
      idProfAluno: idAlunoProf,
      idEscola: idIgreja,
      dataCriacao: new Date()
    });

    // 6. Enviamos tudo de uma vez para a internet!
    await batch.commit();

    console.log("Sucesso! Professor criado com o ID:", uidProfessor);
    return { uid: uidProfessor, idProf: idAlunoProf};

  } catch (erro) {
    if(erro.code == "auth/email-already-in-use"){
      alert("O email informado já está em uso")
      return 
    }
    console.error("Erro ao criar professor:", erro.message);
    // throw erro;
  }
};


export async function verificarLogin(email,senha,callback){
  const auth = getAuth();

  try{
    const credenciais = await signInWithEmailAndPassword(auth,email,senha)
    const uid = credenciais.user.uid;
    const docRef = doc(db,"usuarios",uid)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      callback({id: docSnap.id, 
        ...docSnap.data()})
      return 
    } else {
      console.log("Documento não encontrado!");
      return null
    }

  }catch (error){
    alert("Verifique email ou senha")
    return error
  }

}