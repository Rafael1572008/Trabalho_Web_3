document.addEventListener("DOMContentLoaded", function () {
  // Obtém os campos de entrada do formulário de login
  const emailLoginField = document.getElementById("email-login");
  const senhaLoginField = document.getElementById("senha-login");

  // Função para criptografar a senha usando SHA-256
  async function encryptCodigo(codigo) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codigo);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailLogin = emailLoginField.value.trim();
    const senhaLogin = senhaLoginField.value.trim();

    console.log("Email digitado:", emailLogin);
    console.log("Senha digitada:", senhaLogin);

    // Classe para representar um administrador
    class Adm {
      constructor(email, password) {
        this._email = email;
        this._password = password;
      }
    }

    const lista_Adm = [
      new Adm("Kaio@gmail.com", "12345"),
      new Adm("Rafael@gmail.com", "12345"),
      new Adm("Sara@gmail.com", "12345"),
      new Adm("Mateus@gmail.com", "12345"),
      new Adm("Claudete@gmail.com", "12345")
    ];

    const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
    console.log("Lista de hóspedes no localStorage:", lista_Hospedes);

    const hospedeEncontrado = lista_Hospedes.find(
      (hospede) => hospede._email === emailLogin
    );

    if (hospedeEncontrado) {
      const senhaCriptografada = await encryptCodigo(senhaLogin);

      if (senhaCriptografada === hospedeEncontrado._senha) {
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("userRole", "hospede");
        sessionStorage.setItem("userEmail", hospedeEncontrado._email);
        alert("Login efetuado com sucesso");
        window.location.href = "../hospede/hospede.html";
      } else {
        alert("Senha incorreta!");
      }
    } else {
      const adminEncontrado = lista_Adm.find(
        (adm) => adm._email === emailLogin && adm._password === senhaLogin
      );

      if (adminEncontrado) {
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("userEmail", adminEncontrado._email);
        alert("Login de Administrador efetuado com sucesso");
        window.location.href = "../admin/admin.html";
      } else {
        alert("Email ou senha incorretos!");
      }
    }
  });
});
