document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userRole = sessionStorage.getItem("userRole");
  
    if (!isLoggedIn || userRole !== "admin") {
      window.location.href = "../funcionario/login.html"; // Redireciona para a página de login
    } else {
      console.log("Bem-vindo, administrador!");
      // Carregar informações adicionais do usuário, se necessário
    }
  });