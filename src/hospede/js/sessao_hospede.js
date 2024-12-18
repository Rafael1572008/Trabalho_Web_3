document.addEventListener("DOMContentLoaded", function () {
  // Recupera os valores do sessionStorage
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userRole = sessionStorage.getItem("userRole");

  // Verifica se o usuário está logado e se é um hóspede
  if (!isLoggedIn || userRole !== "hospede") {
    window.location.href = "../funcionario/login.html"; // Ajuste o caminho se necessário
  } else {
    console.log("Bem-vindo à página de hóspedes!");
    // Aqui você pode adicionar funcionalidades específicas para hóspedes
  }
});