document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-button");
  
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        // Limpa todos os dados do sessionStorage
        sessionStorage.clear();

        alert('Logout realizado com sucesso!')
  
        // Redireciona para a página de login
        window.location.href = "../funcionario/login.html";
      });
    }
  });