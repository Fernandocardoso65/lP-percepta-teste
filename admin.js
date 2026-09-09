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
// ELEMENTOS
// ===============================

const login = document.getElementById("login");
const painel = document.getElementById("painel");

const formLogin = document.getElementById("form-login");

const emailAdmin = document.getElementById("email-admin");
const senhaAdmin = document.getElementById("senha-admin");

const erroLogin = document.getElementById("erro-login");

const listaLeads = document.getElementById("lista-leads");
const totalLeads = document.getElementById("total-leads");

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
// ESTADO DA AUTENTICAÇÃO
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

  listaLeads.innerHTML = `
    <div class="carregando">
      Carregando contatos...
    </div>
  `;

  database
    .ref("leads")
    .orderByChild("criadoEm")
    .once("value")

    .then((snapshot) => {

      if (!snapshot.exists()) {

        totalLeads.textContent = "0";

        listaLeads.innerHTML = `
          <div class="tabela-leads">
            <div class="vazio">
              Nenhum contato recebido.
            </div>
          </div>
        `;

        return;

      }


      const leads = [];


      snapshot.forEach((childSnapshot) => {

        leads.push({

          id: childSnapshot.key,

          ...childSnapshot.val()

        });

      });


      // ===============================
      // MAIS RECENTES PRIMEIRO
      // ===============================

      leads.sort((a, b) => {

        return (
          Number(b.criadoEm || 0) -
          Number(a.criadoEm || 0)
        );

      });


      // Atualiza contador

      totalLeads.textContent = leads.length;


      // Cria estrutura da tabela

      listaLeads.innerHTML = "";


      const tabela =
        document.createElement("div");

      tabela.classList.add("tabela-leads");


      // ===============================
      // CABEÇALHO
      // ===============================

      const cabecalho =
        document.createElement("div");

      cabecalho.classList.add(
        "lead-cabecalho"
      );

      cabecalho.innerHTML = `
        <div>Nome</div>
        <div>E-mail</div>
        <div>Telefone</div>
        <div>Origem</div>
        <div>Recebido em</div>
      `;

      tabela.appendChild(cabecalho);


      // ===============================
      // LEADS
      // ===============================

      leads.forEach((lead) => {

        const card =
          document.createElement("div");

        card.classList.add("lead");


        // ===============================
        // DATA
        // ===============================

        let dataFormatada =
          "Data não disponível";


        if (lead.criadoEm) {

          const data =
            new Date(
              Number(lead.criadoEm)
            );


          if (!isNaN(data.getTime())) {

            dataFormatada =
              data.toLocaleString(
                "pt-BR",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                }
              );

          }

        }


        // ===============================
        // CRIA CÉLULA
        // ===============================

        function criarCelula(
          titulo,
          valor,
          classe = ""
        ) {

          const celula =
            document.createElement("div");

          celula.classList.add(
            "lead-celula"
          );


          if (classe) {

            celula.classList.add(
              classe
            );

          }


          const label =
            document.createElement("strong");

          label.textContent =
            titulo;


          const conteudo =
            document.createElement("span");

          conteudo.textContent =
            valor || "-";


          celula.append(
            label,
            conteudo
          );


          return celula;

        }


        const nome =
          criarCelula(
            "Nome",
            lead.nome,
            "nome"
          );


        const email =
          criarCelula(
            "E-mail",
            lead.email
          );


        const telefone =
          criarCelula(
            "Telefone",
            lead.telefone
          );


        const origem =
          criarCelula(
            "Origem",
            lead.mensagem
          );


        const recebido =
          criarCelula(
            "Recebido em",
            dataFormatada,
            "data"
          );


        card.append(
          nome,
          email,
          telefone,
          origem,
          recebido
        );


        tabela.appendChild(card);

      });


      listaLeads.appendChild(
        tabela
      );

    })

    .catch((erro) => {

      console.error(
        "Erro ao carregar leads:",
        erro
      );

      listaLeads.innerHTML = `
        <div class="tabela-leads">
          <div class="vazio erro">
            Não foi possível carregar os contatos.
          </div>
        </div>
      `;

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
