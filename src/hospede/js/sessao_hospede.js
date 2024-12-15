document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userRole = sessionStorage.getItem("userRole");
  
    if (!isLoggedIn || userRole !== "hospede") {
      alert("Acesso negado! Você não está autenticado como hóspede.");
      window.location.href = "../funcionario/login.html"; // Redireciona para a página de login
    } else {
      console.log("Bem-vindo, hóspede!");
      // Carregar informações adicionais do usuário, se necessário
    }
  });