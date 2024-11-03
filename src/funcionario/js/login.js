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

    // Recupera a lista de hóspedes do localStorage
    const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
    console.log("Lista de hóspedes no localStorage:", lista_Hospedes);

    // Verifica se o hóspede existe
    const hospedeEncontrado = lista_Hospedes.find(
      (hospede) => hospede.email === emailLogin && hospede.senha === senhaLogin
    );

    if (hospedeEncontrado) {
      alert("Login realizado com sucesso!");
      window.location.href = "../hospede/hospede.html"; // Redireciona para a página principal
    } else {
      alert("Email ou senha incorretos!");
      console.log("Email ou senha não correspondem a nenhum hóspede cadastrado.");
      console.log(`${lista_Hospedes}`)
    }
  });
});