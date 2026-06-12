<h1 align="center">
   <img src="/Desenvolvimento Web - Projeto Integrador I/WalkWord/img/logoWW.png" alt="Walkword Logo" width="350"/>
  <br/>
  🌿 Walkword — Loja Sustentável
</h1>

<p align="center">
  Conectando consumidores conscientes à moda sustentável — alinhando estilo e um futuro mais verde.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-%20Concluido-green" alt="Status"/>
  <img src="https://img.shields.io/badge/licença-MIT-green" alt="Licença"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-começo-rápido">Começar</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-como-contribuir">Contribuir</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 📌 Sobre o Projeto

A **Walkword** é um e-commerce de moda sustentável focado em economia circular. Como uma aplicação front-end de alta fidelidade, ela traduz os conceitos de minimalismo premium e consciência ecológica em uma interface fluida e de fácil usabilidade. A plataforma vai além do comércio tradicional ao exibir métricas em tempo real de economia de recursos naturais (água e CO₂), conectando diretamente a experiência de compra ao impacto ambiental positivo.

A aplicação foi construída com foco em:

- 🎯 **UX de qualidade** — navegação intuitiva e agradável
- ⚡ **Performance** — carregamento rápido e código otimizado
- 📱 **Responsividade** — funciona bem em qualquer dispositivo
- ♿ **Acessibilidade** — pensado para todos os usuários

---

## ✨ Funcionalidades

- [x] Listagem de produtos com filtros
- [x] Página de detalhe do produto
- [x] Carrinho de compras
- [x] Formulário de checkout com validação
- [x] Máscaras de campo (CEP, CPF, telefone)
- [x] Alertas e confirmações estilizados
- [x] Autenticação via JWT e OAuth2

---

## 🛠️ Tecnologias

As seguintes tecnologias foram utilizadas na construção do projeto:

| Tecnologia | Finalidade |
| :--- | :--- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) | Estrutura das páginas |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) | Estilização e layout |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) | Interatividade e lógica |
| [SweetAlert2](https://sweetalert2.github.io/) | Alertas e confirmações visuais |
| [IMask](https://imask.js.org/) | Máscaras de campos de formulário |
| [Chart](https://imask.js.org/) | Criação de Gráficos interativos |

---

## 📁 Estrutura do Projeto

```
walkword-frontend/
│
├── pages/
│   │
│   ├── login.html
│   ├── cadastro.html
│   ├── catalogo.html
│   ├── perfil.html
│   │
│   └── carrinho/
│       ├── first.html (endereço)
│       ├── second.html (pagamento)
│       ├── third.html (revisão)
│       └── confirmacao.html (compra concluída)
│
├── css/
│   │
│   ├── login.css
│   ├── cadastro.css
│   ├── catalogo.css
│   ├── perfil.css
│   │
│   └── carrinho/
│       ├── first.css (endereço)
│       ├── second.css (pagamento)
│       ├── third.css (revisão)
│       └── confirmacao.css (compra concluída)
│
├── js/
│   │
│   ├── login.js
│   ├── cadastro.js
│   ├── catalogo.js
│   ├── perfil.js
│   │
│   ├── utils.js (funções auxiliares)
│   │
│   └── carrinho/
│       ├── first.js (endereço)
│       ├── second.js (pagamento)
│       ├── third.js (revisão)
│       └── confirmation.js (compra concluída)
│
└── img/
    │
    ├── logo.png
    ├── banner.jpg
    ├── produto1.png
    ├── produto2.png
    ├── categoria1.png
    ├── categoria2.png
    └── ...
```

---

## 🚀 Começo Rápido

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Git](https://git-scm.com/)
- Um editor de código — recomendamos o [VS Code](https://code.visualstudio.com/)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/walkword.git

# 2. Entrar na pasta do projeto
cd walkword

# 3. Instalar as dependências
npm install sweetalert2
npm install imask
npm install chart
```

### Executando

Como o projeto é puramente frontend, basta abrir o `index.html` no navegador.

Para uma experiência com recarregamento automático, use o **Live Server** do VS Code ou rode:

```bash
npx live-server
```

---

## 🖼️ Screenshots

> Adicione aqui capturas de tela das principais telas do projeto.

| Página Inicial | Página de Produto | Checkout |
|:-:|:-:|:-:|
| ![Home](assets/img/screenshot-home.png) | ![Produto](assets/img/screenshot-produto.png) | ![Checkout](assets/img/screenshot-checkout.png) |

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Veja como participar:

1. Faça um **Fork** do projeto
2. Crie uma branch para sua feature
   ```bash
   git checkout -b feat/minha-feature
   ```
3. Faça o commit das suas alterações
   ```bash
   git commit -m "feat: descrição da minha feature"
   ```
4. Envie para a sua branch
   ```bash
   git push origin feat/minha-feature
   ```
5. Abra um **Pull Request**

> 💡 Para bugs ou sugestões, abra uma [Issue](https://github.com/seu-usuario/walkword/issues) antes de codar.

### Convenção de Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

| Prefixo | Quando usar |
| :--- | :--- |
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Alterações de estilo/CSS |
| `docs:` | Alterações na documentação |
| `refactor:` | Refatoração de código |
| `chore:` | Tarefas de manutenção |

---

## 👥 Time

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/seu-usuario">
        <img src="https://github.com/seu-usuario.png" width="80px" alt="Foto do autor"/><br/>
        <sub><b>Seu Nome</b></sub>
      </a>
    </td>
    <!-- Adicione mais membros do time aqui -->
  </tr>
</table>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">Feito com 💚 pela equipe Walkword</p>