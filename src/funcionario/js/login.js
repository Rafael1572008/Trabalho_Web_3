// Executa o código somente após o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {

  // Obtém os campos de entrada do formulário de login
  const emailLoginField = document.getElementById("email-login");
  const senhaLoginField = document.getElementById("senha-login");

   // Adiciona um evento ao formulário de login, que será executado ao submeter
  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    // Obtém os valores dos campos de entrada e remove espaços em branco
    const emailLogin = emailLoginField.value.trim();
    const senhaLogin = senhaLoginField.value.trim();

    // Exibe no console o email e a senha digitados
    console.log("Email digitado:", emailLogin);
    console.log("Senha digitada:", senhaLogin);

     // Classe para representar um administrador
    class Adm {
      constructor(email, password) {
        this._email = email;
        this._password = password;
      }
    }

    // Lista de administradores pré-definidos
    const lista_Adm = [
      new Adm("Kaio@gmail.com", "12345"),
      new Adm("Rafael@gmail.com", "12345"),
      new Adm("Sara@gmail.com", "12345"),
      new Adm("Mateus@gmail.com", "12345"),
      new Adm("Claudete@gmail.com", "12345")
    ];

    // Recupera a lista de hóspedes armazenada no localStorage ou inicializa como um array vazio
    const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
    console.log("Lista de hóspedes no localStorage:", lista_Hospedes);

    // Verifica se o email e a senha correspondem a um hóspede existente
    const hospedeEncontrado = lista_Hospedes.find(
      (hospede) => hospede._email === emailLogin && hospede._senha === senhaLogin
    );

    // Se encontrar o hóspede correspondente
    if (hospedeEncontrado) {

      // Salva a sessão para o hóspede no sessionStorage
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("userRole", "hospede");
      sessionStorage.setItem("userEmail", hospedeEncontrado._email);
      alert("Login efetuado com sucesso");
      window.location.href = "../hospede/hospede.html"; // Redireciona para a página do hóspede
    } 
    else {

      // Se não encontrar, verifica na lista de administradores
      const adminEncontrado = lista_Adm.find(
        (adm) => adm._email === emailLogin && adm._password === senhaLogin
      );

      // Resultado
      if (adminEncontrado) {
        // Salva a sessão para o administrador no sessionStorage
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("userEmail", adminEncontrado._email);
        alert("Login efetuado com sucesso");
        window.location.href = "../funcionario/painel.html"; // Redireciona para a página do funcionário
      } else {
        // Caso nenhum usuário (hóspede ou administrador) seja encontrado
        alert("E-mail ou senha incorretos!");
        console.log("Lista de hóspedes:", lista_Hospedes);
        console.log("Lista de administradores:", lista_Adm);
      }
    }
  });
});
