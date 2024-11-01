document.getElementById("form-login").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo as credenciais do formulário de login
  const emailLogin = document.getElementById("email-login").value;
  const senhaLogin = document.getElementById("senha-login").value;

  // Carregando a lista de hóspedes do localStorage
  const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];

  // Verificando se o email e a senha correspondem a algum hóspede cadastrado
  const hospedeEncontrado = lista_Hospedes.find(hospede => hospede.email === emailLogin && hospede.senha === senhaLogin);

  if (hospedeEncontrado) {
    alert("Login realizado com sucesso!");
    // Redirecione ou realize a ação necessária para um login bem-sucedido
  } else {
    alert("Email ou senha incorretos!");
  }
});
