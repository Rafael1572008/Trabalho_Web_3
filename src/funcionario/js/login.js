document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search); //Obter dados da url, Não queriamos fazer um Venv, flask, server, etc.
  const emailUrl = urlParams.get("username");
  const senhaUrl = urlParams.get("password");

  // Formulário
  const emailLoginField = document.getElementById("email-login");
  const senhaLoginField = document.getElementById("senha-login"); 

  // Prenchimento automatico no html
  if (emailUrl && senhaUrl) {
    emailLoginField.value = emailUrl;
    senhaLoginField.value = senhaUrl;
  }

  document.getElementById("login-form").addEventListener("submit", function (event) { //execultar quando acontecer um submit
    event.preventDefault();  //Não recarregar

    // Obter os dados do form do html
    const emailLogin = emailLoginField.value;
    const senhaLogin = senhaLoginField.value;

    // Comparação
    if (emailLogin === emailUrl && senhaLogin === senhaUrl) {
      alert("Login realizado com sucesso!");
      window.location.href = "../hospede/hospede.html"; // Redireciona para a página principal
    } else {
      alert("Email ou senha incorretos!");
      console.log(`Email esperado: ${emailUrl}, Email digitado: ${emailLogin}`);
      console.log(`Senha esperada: ${senhaUrl}, Senha digitada: ${senhaLogin}`);
    }
  });
});