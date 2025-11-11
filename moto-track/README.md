# 🛵 Ping Mottu

---
## 👨‍💻 Integrantes

- RM558763 - Eric Issamu de Lima Yoshida
- RM555010 - Gustavo Matias Teixeira
- RM557515 - Gustavo Monção   

---
## 📽 Vídeo Explicativo

🔗 [Youtube](https://youtu.be/gEp4Ollk544)
---
## 🌐 Pré-requisitos

1. Execute o programa em Java com as informações deste repositório: [Yoshida672/Backend-Java-Mottu](https://github.com/Yoshida672/Backend-Java-Mottu)
2. Mude as informações no arquivo [api_base.ts](src/api/api_base.ts). Coloque o seu IP na const `base_url`

---
## 💡 Proposta e Funcionalidades

O aplicativo tem como objetivo fornecer uma **interface prática e intuitiva** para funcionários monitorarem as motos no pátio via Tag UWB.  

Principais funcionalidades:

- Cadastro de motos com informações como modelo, placa e identificação por UWB Tag;
- Escolha do pátio onde a moto será alocada;
- Visualização das motos organizadas por pátio;
- Autenticação de funcionário;
- Interface amigável e responsiva;

O foco é **praticidade e agilidade**, garantindo que o funcionário consiga encontrar e gerenciar motos de forma eficiente.

---
## 📁 Estrutura de Pastas

Resumo da organização de pastas do projeto:


- app/ - Contém as páginas/telas do aplicativo
- assets/ - Imagens e ícones utilizados
- src/
  - api/ - Chamadas para a API Java e funcionalidades CRUD
  - components/ - Componentes reutilizáveis dentro das telas
  - context/ - Contextos, como tema claro/escuro
  - services/ - Configurações externas, como Firebase
- types/ - Tipagem dos dados com TypeScript
- utils/ - Armazenamento e funções auxiliares
