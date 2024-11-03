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

    // Lista de administradores
    const lista_Adm = [
      { nome: "Kaio@gmail.com", password: "12345" },
      { nome: "Rafael@gmail.com", password: "12345" },
      { nome: "Sara@gmail.com", password: "12345" },
      { nome: "Mateus@gmail.com", password: "12345" },
      { nome: "Claudete@gmail.com", password: "12345" } 
    ];

    // Recupera a lista de hóspedes do localStorage
    const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
    console.log("Lista de hóspedes no localStorage:", lista_Hospedes);

    // Verifica se o hóspede existe
    const hospedeEncontrado = lista_Hospedes.find(
      (hospede) => hospede.email === emailLogin && hospede.senha === senhaLogin
    );

    // Verifica primeiro para hóspedes, dps verificar adm
    if (hospedeEncontrado) {
      alert("Login efetuado com sucesso");
      window.location.href = "../hospede/hospede.html"; // Redireciona para a página do hóspede
    } else {
      // Se não encontrar, verifica na lista de administradores
      const adminEncontrado = lista_Adm.find(
        (adm) => adm.nome === emailLogin && adm.password.toString() === senhaLogin
      );

      // Resultado
      if (adminEncontrado) {
        alert("Login efetuado com sucesso");
        window.location.href = "../funcionario/painel.html"; // Redireciona para a página do funcionário
      } else {
        alert("Email ou senha incorretos!");
        console.log("Lista de hóspedes:", lista_Hospedes);
        console.log("Lista de administradores:", lista_Adm);
      }
    }
  });
});
