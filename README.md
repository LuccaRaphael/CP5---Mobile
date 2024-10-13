# Projeto de Tela de Login e Registro

Este projeto é uma aplicação de React Native que implementa funcionalidades de login e registro, utilizando criptografia para garantir a segurança dos dados dos usuários. Abaixo, estão as informações sobre o projeto, como executá-lo e os integrantes envolvidos.

## Integrantes
- **Lucca Raphael Pereira dos Santos** - RM99675
- **Matheus Colossal Araujo** - RM99572  


## Descrição

O projeto consiste em duas telas principais: **Login** e **Registro**. Os usuários podem se registrar fornecendo seu nome, e-mail e senha, e esses dados são criptografados antes de serem armazenados usando `AsyncStorage`. Para o login, o usuário deve inserir seu e-mail e senha, que são validados contra os dados armazenados. Caso a autenticação seja bem-sucedida, o usuário é notificado com uma mensagem de sucesso.

### Recursos Principais:
- **Registro de usuário**: Armazena informações de forma segura usando criptografia (CryptoJS).
- **Login de usuário**: Valida as credenciais e permite o acesso ao sistema.
- **Login social**: Opções para logar via Google, Twitter e Facebook.

## Tecnologias Utilizadas
- React Native
- AsyncStorage
- CryptoJS
- React Navigation

## Como Executar o Projeto

Para rodar este projeto em sua máquina local, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/LuccaRaphael/CP5---Mobile.git
   cd CP5---Mobile
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie a aplicação**:
   ```bash
   npx expo start --web
   ```
