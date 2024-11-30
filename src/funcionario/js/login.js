document.addEventListener("DOMContentLoaded", function () {
  // Formulário de login
  const emailLoginField = document.getElementById("email-login");
  const senhaLoginField = document.getElementById("senha-login");

  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter os dados do formulário de login e remover espaços em branco
    const emailLogin = emailLoginField.value.trim();
    const senhaLogin = senhaLoginField.value.trim();

    // Exibe no console o email e a senha digitados
    console.log("Email digitado:", emailLogin);
    console.log("Senha digitada:", senhaLogin);

    class Adm {
      constructor(email, password) {
        this._email = email;
        this._password = password;
      }
    }

    // Lista de administradores
    const lista_Adm = [
      new Adm("Kaio@gmail.com", "12345"),
      new Adm("Rafael@gmail.com", "12345"),
      new Adm("Sara@gmail.com", "12345"),
      new Adm("Mateus@gmail.com", "12345"),
      new Adm("Claudete@gmail.com", "12345")
    ];

    // Recupera a lista de hóspedes do localStorage
    const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
    console.log("Lista de hóspedes no localStorage:", lista_Hospedes);

    // Verifica se o hóspede existe
    const hospedeEncontrado = lista_Hospedes.find(
      (hospede) => hospede._email === emailLogin && hospede._senha === senhaLogin
    );

    // Verifica primeiro para hóspedes, depois verifica administradores
    if (hospedeEncontrado) {
      alert("Login efetuado com sucesso");
      window.location.href = "../hospede/hospede.html"; // Redireciona para a página do hóspede
    } else {
      // Se não encontrar, verifica na lista de administradores
      const adminEncontrado = lista_Adm.find(
        (adm) => adm._email === emailLogin && adm._password === senhaLogin
      );

      // Resultado
      if (adminEncontrado) {
        alert("Login efetuado com sucesso");
        window.location.href = "../funcionario/painel.html"; // Redireciona para a página do funcionário
      } else {
        alert("E-mail ou senha incorretos!");
        console.log("Lista de hóspedes:", lista_Hospedes);
        console.log("Lista de administradores:", lista_Adm);
      }
    }
  });
});
