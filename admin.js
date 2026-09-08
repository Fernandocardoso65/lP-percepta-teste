const firebaseConfig = {
  apiKey: "AIzaSyC27P6wqtuEz9N1JABhDm59RXyVW47uHls",
  authDomain: "landing-page-teste-9dadf.firebaseapp.com",
  databaseURL: "https://landing-page-teste-9dadf-default-rtdb.firebaseio.com",
  projectId: "landing-page-teste-9dadf",
  storageBucket: "landing-page-teste-9dadf.firebasestorage.app",
  messagingSenderId: "272429790990",
  appId: "1:272429790990:web:cfb7a6eb044fff4544c95f"
};


// ===============================
// INICIALIZA FIREBASE
// ===============================

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();


// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const login = document.getElementById("login");
const painel = document.getElementById("painel");

const formLogin = document.getElementById("form-login");

const emailAdmin = document.getElementById("email-admin");
const senhaAdmin = document.getElementById("senha-admin");

const erroLogin = document.getElementById("erro-login");

const listaLeads = document.getElementById("lista-leads");

const botaoSair = document.getElementById("sair");

const botaoMostrarSenha = document.getElementById("mostrar-senha");


// ===============================
// MOSTRAR / ESCONDER SENHA
// ===============================

botaoMostrarSenha.addEventListener("click", function () {

  if (senhaAdmin.type === "password") {

    senhaAdmin.type = "text";

    botaoMostrarSenha.textContent = "🙈";

    botaoMostrarSenha.setAttribute(
      "aria-label",
      "Ocultar senha"
    );

    botaoMostrarSenha.setAttribute(
      "title",
      "Ocultar senha"
    );

  } else {

    senhaAdmin.type = "password";

    botaoMostrarSenha.textContent = "👁";

    botaoMostrarSenha.setAttribute(
      "aria-label",
      "Mostrar senha"
    );

    botaoMostrarSenha.setAttribute(
      "title",
      "Mostrar senha"
    );

  }

});


// ===============================
// LOGIN
// ===============================

formLogin.addEventListener("submit", function (event) {

  event.preventDefault();

  erroLogin.textContent = "";

  const email = emailAdmin.value.trim();
  const senha = senhaAdmin.value;

  auth
    .signInWithEmailAndPassword(email, senha)

    .catch((erro) => {

      console.error(
        "Erro de autenticação:",
        erro
      );

      erroLogin.textContent =
        "E-mail ou senha inválidos.";

    });

});


// ===============================
// VERIFICA LOGIN
// ===============================

auth.onAuthStateChanged((usuario) => {

  if (usuario) {

    login.style.display = "none";
    painel.style.display = "block";

    carregarLeads();

  } else {

    login.style.display = "block";
    painel.style.display = "none";

  }

});


// ===============================
// CARREGA LEADS
// ===============================

function carregarLeads() {

  listaLeads.innerHTML =
    "Carregando contatos...";

  database
    .ref("leads")
    .orderByChild("criadoEm")
    .once("value")

    .then((snapshot) => {

      if (!snapshot.exists()) {

        listaLeads.innerHTML =
          "<p>Nenhum contato recebido.</p>";

        return;

      }

      const leads = [];

      snapshot.forEach((childSnapshot) => {

        leads.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });

      });

      // Mais recentes primeiro
      leads.reverse();

      listaLeads.innerHTML = "";

      leads.forEach((lead) => {

        const data =
          new Date(lead.criadoEm);

        const card =
          document.createElement("div");

        card.classList.add("lead");

        const nome = document.createElement("p");
        const email = document.createElement("p");
        const telefone = document.createElement("p");
        const origem = document.createElement("p");
        const recebido = document.createElement("p");

        nome.innerHTML = "<strong>Nome:</strong> ";
        nome.append(document.createTextNode(lead.nome || ""));

        email.innerHTML = "<strong>E-mail:</strong> ";
        email.append(document.createTextNode(lead.email || ""));

        telefone.innerHTML = "<strong>Telefone:</strong> ";
        telefone.append(document.createTextNode(lead.telefone || ""));

        origem.innerHTML = "<strong>Origem:</strong> ";
        origem.append(document.createTextNode(lead.mensagem || ""));

        recebido.innerHTML = "<strong>Recebido em:</strong> ";
        recebido.append(
          document.createTextNode(
            data.toLocaleString("pt-BR")
          )
        );

        card.append(
          nome,
          email,
          telefone,
          origem,
          recebido
        );

        listaLeads.appendChild(card);

      });

    })

    .catch((erro) => {

      console.error(
        "Erro ao carregar leads:",
        erro
      );

      listaLeads.innerHTML =
        "<p class='erro'>Não foi possível carregar os contatos.</p>";

    });

}


// ===============================
// LOGOUT
// ===============================

botaoSair.addEventListener(
  "click",
  function () {

    auth.signOut();

  }
);
