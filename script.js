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


// ===============================
// FORMULÁRIO DO TOPO
// ===============================

const formularioTopo = document.getElementById("contato-topo");

formularioTopo.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  const termos = formularioTopo.querySelector(
    'input[name="termos"]'
  );

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Digite um e-mail válido.");
    return;
  }

  const telefoneNumeros = telefone.replace(/\D/g, "");

  if (
    telefoneNumeros.length < 10 ||
    telefoneNumeros.length > 11
  ) {
    alert("Digite um telefone válido com DDD.");
    return;
  }

  if (!termos.checked) {
    alert("Você precisa concordar com os termos antes de enviar.");
    return;
  }

  database.ref("leads").push({
    nome: nome,
    email: email,
    telefone: telefone,
    mensagem: "Lead - Landing Page Percepta",
    criadoEm: Date.now()
  })
    .then(() => {
      alert("Mensagem enviada com sucesso!");
      formularioTopo.reset();
    })
    .catch((erro) => {
      console.error("Erro ao enviar:", erro);
      alert("Erro ao enviar mensagem.");
    });
});


// ===============================
// FORMULÁRIO FINAL
// ===============================

const formularioFinal = document.getElementById("contato-final");

formularioFinal.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome-final").value.trim();
  const email = document.getElementById("email-final").value.trim();
  const telefone = document.getElementById("telefone-final").value.trim();

  const termosFinal = formularioFinal.querySelector(
    'input[name="termos-final"]'
  );

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Digite um e-mail válido.");
    return;
  }

  const telefoneNumeros = telefone.replace(/\D/g, "");

  if (
    telefoneNumeros.length < 10 ||
    telefoneNumeros.length > 11
  ) {
    alert("Digite um telefone válido com DDD.");
    return;
  }

  if (!termosFinal.checked) {
    alert("Você precisa concordar com os termos antes de enviar.");
    return;
  }

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


// ===============================
// ROLAGEM SUAVE PARA O FORMULÁRIO
// ===============================

const botaoPrincipal = document.querySelector(".botao--principal");
const secaoContato = document.getElementById("contato");

if (botaoPrincipal && secaoContato) {

  botaoPrincipal.addEventListener("click", function (event) {
    event.preventDefault();

    secaoContato.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

}


// ===============================
// CTA FINAL - DIRECIONA AO FORMULÁRIO
// ===============================

const botaoCtaFinal = document.querySelector(".botao--cta");
const formularioContatoFinal = document.getElementById("contato-final");
const campoNomeFinal = document.getElementById("nome-final");

if (botaoCtaFinal && formularioContatoFinal) {

  botaoCtaFinal.addEventListener("click", function (event) {

    event.preventDefault();

    formularioContatoFinal.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setTimeout(() => {

      if (campoNomeFinal) {
        campoNomeFinal.focus();
      }

    }, 600);

  });

}


// ===============================
// MÁSCARA DE TELEFONE
// ===============================

function aplicarMascaraTelefone(campo) {

  if (!campo) {
    return;
  }

  campo.addEventListener("input", function () {

    let valor = campo.value.replace(/\D/g, "");

    valor = valor.slice(0, 11);

    // Se apagar todos os números, deixa o campo vazio
    if (valor.length === 0) {
      campo.value = "";
      return;
    }

    if (valor.length <= 2) {

      valor = valor.replace(
        /^(\d{1,2})$/,
        "($1"
      );

    } else if (valor.length <= 6) {

      valor = valor.replace(
        /^(\d{2})(\d+)/,
        "($1) $2"
      );

    } else if (valor.length <= 10) {

      valor = valor.replace(
        /^(\d{2})(\d{4})(\d{0,4})/,
        "($1) $2-$3"
      );

    } else {

      valor = valor.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1) $2-$3"
      );

    }

    campo.value = valor;

  });

}

aplicarMascaraTelefone(
  document.getElementById("telefone")
);

aplicarMascaraTelefone(
  document.getElementById("telefone-final")
);
/* =========================================================
   INTERAÇÃO — CARDS DE PERDAS
   ========================================================= */


const abasPerdas = document.querySelectorAll(".abas .aba");
const cartaoPerda = document.getElementById("cartao-perda");

const conteudosPerda = {
  tempo: `
    <div class="cartao-perda__texto">
      <h3>Tempo improdutivo</h3>

      <h4>
        Funcionários parados
        em horário de pico.
      </h4>

      <p>
        Três pessoas paradas por
        <strong>28 minutos.</strong>
      </p>

      <p>
        <strong>
          Loja aberta.
          Venda escapando.
        </strong>
      </p>
    </div>

    <div class="cartao-perda__imagem">
      <img
        src="assets/imagem5.png"
        alt="Funcionários parados em horário de pico">
    </div>
  `,

  fluxo: `
    <picture class="cartao-perda__imagem-card">
      <source
        media="(max-width: 768px)"
        srcset="assets/Cardfluxomobile.png">

      <img
        src="assets/Cardfluxoquebrado.png"
        alt="Fluxo quebrado">
    </picture>
  `,

  estrutura: `
    <picture class="cartao-perda__imagem-card">
      <source
        media="(max-width: 768px)"
        srcset="assets/Cardestruturamobile.png">

      <img
        src="assets/Cardestrutura.png"
        alt="Estrutura mal utilizada">
    </picture>
  `,

  energia: `
    <picture class="cartao-perda__imagem-card">
      <source
        media="(max-width: 768px)"
        srcset="assets/Cardenergiamobile.png">

      <img
        src="assets/Cardenergia.png"
        alt="Energia e disciplina">
    </picture>
  `
};

abasPerdas.forEach((aba) => {
  aba.addEventListener("click", () => {
    const tipo = aba.dataset.card;

    abasPerdas.forEach((item) => {
      item.classList.remove("aba--ativa");
    });

    aba.classList.add("aba--ativa");

    if (conteudosPerda[tipo] && cartaoPerda) {
      cartaoPerda.innerHTML = conteudosPerda[tipo];

      if (window.innerWidth <= 768) {
        setTimeout(() => {
          cartaoPerda.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
    }
  });
});

/* =========================================================
   MENU MOBILE
   ========================================================= */

const botaoAbrirMenu = document.querySelector(".menu-mobile__abrir");
const botaoFecharMenu = document.querySelector(".menu-mobile__fechar");
const menuMobile = document.querySelector(".menu-mobile");

if (botaoAbrirMenu && botaoFecharMenu && menuMobile) {

  botaoAbrirMenu.addEventListener("click", () => {
    menuMobile.classList.add("is-open");
    menuMobile.setAttribute("aria-hidden", "false");
    botaoAbrirMenu.setAttribute("aria-expanded", "true");
  });

  botaoFecharMenu.addEventListener("click", () => {
    menuMobile.classList.remove("is-open");
    menuMobile.setAttribute("aria-hidden", "true");
    botaoAbrirMenu.setAttribute("aria-expanded", "false");
  });

}

const botaoContatoMenu = document.querySelector(".menu-mobile__contato");

if (botaoContatoMenu && menuMobile) {
  botaoContatoMenu.addEventListener("click", () => {
    menuMobile.classList.remove("is-open");
    menuMobile.setAttribute("aria-hidden", "true");

    if (botaoAbrirMenu) {
      botaoAbrirMenu.setAttribute("aria-expanded", "false");
    }
  });
}

