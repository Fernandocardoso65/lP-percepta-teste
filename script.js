const firebaseConfig = {
  apiKey: "AIzaSyC27P6wqtuEz9N1JABhDm59RXyVW47uHls",
  authDomain: "landing-page-teste-9dadf.firebaseapp.com",
  databaseURL: "https://landing-page-teste-9dadf-default-rtdb.firebaseio.com",
  projectId: "landing-page-teste-9dadf",
  storageBucket: "landing-page-teste-9dadf.firebasestorage.app",
  messagingSenderId: "272429790990",
  appId: "1:272429790990:web:cfb7a6eb044fff4544c95f"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const formularioTopo = document.getElementById("contato-topo");

formularioTopo.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  database.ref("leads").push({
    nome: nome,
    email: email,
    telefone: telefone,
    mensagem: "Lead - Landing Page Percepta",
    criadoEm: Date.now()
  });

  alert("Mensagem enviada com sucesso!");

  formularioTopo.reset();
});
const formularioFinal = document.getElementById("contato-final");

formularioFinal.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome-final").value;
  const email = document.getElementById("email-final").value;
  const telefone = document.getElementById("telefone-final").value;

  database.ref("leads").push({
    nome: nome,
    email: email,
    telefone: telefone,
    mensagem: "Lead - Formulário final Percepta",
    criadoEm: Date.now()
  })
  .then(() => {
    alert("Mensagem enviada com sucesso!");
    formularioFinal.reset();
  })
  .catch((erro) => {
    console.error("Erro ao enviar:", erro);
    alert("Erro ao enviar mensagem.");
  });
});
