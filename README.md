# LP Percepta — Teste Prático - My Bryef

Landing page desenvolvida para o teste técnico de Desenvolvedor Web Júnior da Mybrief, a partir do layout disponibilizado no Figma.

O objetivo foi reproduzir a interface com fidelidade visual, responsividade e interações, utilizando tecnologias web nativas e adicionando uma integração funcional para o formulário de contato.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Firebase Realtime Database
- Firebase Authentication
- Git e GitHub
- Vercel

Optei por utilizar HTML, CSS e JavaScript sem frameworks para manter o projeto simples, organizado e próximo dos fundamentos da web.

## Como executar

Clone o repositório:

```bash
git clone https://github.com/Fernandocardoso65/IP-percepta-teste.git
```

Entre na pasta:

```bash
cd IP-percepta-teste
```

O projeto não possui processo de build.

É possível abrir o arquivo `index.html` diretamente no navegador ou iniciar um servidor local:

```bash
python3 -m http.server 8000
```

Depois acesse:

http://localhost:8000

## Funcionalidades implementadas

- Layout responsivo para desktop e mobile.
- Menu de navegação adaptado para dispositivos móveis.
- Navegação entre seções da landing page.
- Abas interativas com troca de conteúdo.
- Formulários de contato funcionais.
- Máscara para o campo de telefone.
- Validação dos campos antes do envio.
- Validação básica do formato de e-mail.
- Validação do telefone considerando 10 ou 11 dígitos.
- Aceite obrigatório dos termos antes do envio.
- Salvamento dos leads no Firebase Realtime Database.
- Limpeza do formulário após envio concluído.
- Área administrativa para consulta dos leads.
- Autenticação da área administrativa.
- Regras de segurança e validação no Firebase.

## Formulário e Firebase

Embora o backend não fosse obrigatório no desafio, optei por implementar o envio funcional do formulário como um aprimoramento.

Os dados são armazenados no Firebase Realtime Database na coleção/nó `leads`.

Cada registro contém:

- nome
- email
- telefone
- mensagem
- criadoEm

Antes do envio, o JavaScript verifica os campos obrigatórios, o formato básico do e-mail, o telefone e o aceite dos termos.

No telefone, caracteres não numéricos são desconsiderados na validação e são aceitos números com 10 ou 11 dígitos.

## Segurança do banco de dados

O Realtime Database foi configurado para não permitir leitura pública dos leads.

As regras também validam os dados enviados antes de permitir a gravação. Entre as validações aplicadas estão:

- criação de novos registros, sem sobrescrever um lead existente;
- campos obrigatórios;
- nome entre 2 e 100 caracteres;
- e-mail entre 5 e 150 caracteres;
- telefone limitado a 30 caracteres;
- mensagem limitada a 1000 caracteres;
- data de criação armazenada como valor numérico;
- rejeição de campos não previstos.

Dessa forma, a validação não fica somente no JavaScript executado no navegador.

## Área administrativa

Também foi criada uma página administrativa protegida por autenticação para visualizar os leads recebidos.

Por segurança, as credenciais de acesso não são publicadas neste README. Elas podem ser fornecidas separadamente à equipe responsável pela avaliação.

## Decisões tomadas durante o desenvolvimento

1. HTML, CSS e JavaScript puros

Preferi não utilizar frameworks para evitar complexidade desnecessária e trabalhar diretamente os fundamentos de estrutura, estilização, responsividade e comportamento da página.

2. Responsividade baseada no Figma

Foram utilizados media queries e ajustes específicos para adaptar tipografia, navegação, imagens, componentes e espaçamentos entre desktop e mobile.

3. Interações com JavaScript

Implementei comportamentos como menu mobile, navegação e abas de conteúdo para que a página não fosse apenas uma reprodução visual estática.

4. Formulário funcional com Firebase

Apesar de backend e banco de dados não serem obrigatórios, decidi tornar o formulário funcional, persistindo os contatos no Firebase e criando validações tanto no front-end quanto no banco.

5. Área administrativa

Criei uma área administrativa autenticada para permitir a consulta dos leads enviados pelo formulário sem expor os dados publicamente.

## Uso de IA

Utilizei IA como ferramenta de apoio durante o desenvolvimento, principalmente para revisão de código, investigação de problemas, responsividade e discussão de possíveis soluções.

As sugestões foram revisadas e adaptadas durante a implementação. Também realizei testes no navegador e em dispositivo móvel real, comparando o resultado com o Figma e ajustando o código conforme necessário.

## Tempo de desenvolvimento

O desenvolvimento ultrapassou o tempo recomendado de 3 horas.

Optei por continuar trabalhando no projeto para estudar melhor o layout, aprimorar a responsividade, testar a página em dispositivo real e implementar funcionalidades adicionais, como persistência dos formulários e área administrativa.

## Deploy

Página publicada:

link da página: https://l-p-percepta-teste.vercel.app/

Link do Painel ADMIN : https://l-p-percepta-teste.vercel.app/admin.html

## Repositório

 https://github.com/Fernandocardoso65/lP-percepta-teste/tree/main

## Acesso para avaliação

As credenciais da área administrativa serão enviadas separadamente à equipe avaliadora, evitando a publicação de senha no repositório.
