document.getElementById("hospedes").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Criar objeto hospede
  class Hospede {
    constructor() {
      this._nome = null;
      this._cpf = null;
      this._telefone = null;
      this._email = null;
      this._endereco = null;
      this._senha = null;
    }

    // Método set para atualizar os atributos
    setVerificado(nome, cpf, telefone, email, endereco, senha) {
      this._nome = nome;
      this._cpf = cpf;
      this._telefone = telefone;
      this._email = email;
      this._endereco = endereco;
      this._senha = senha;
    }
  }

  // Obtendo os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();
  
  // Criando o objeto do hóspede com os valores iniciais nulos
  const hospede = new Hospede();
  
  // Validação de Nome
  function validarNOME(nome) {
    const nomev = nome.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, '');
    return nomev === nome;
  }

  // Validação de CPF com cálculo oficial de verificação
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const n1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const n2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    let digito1 = 0, digito2 = 0, soma1 = 0, soma2 = 0;

    for (let i = 0; i < 9; i++) soma1 += parseInt(cpf[i]) * parseInt(n1[i]);
    if (soma1 % 11 < 2) {
        digito1 = 0;
    } else {
        digito1 = 11 - soma1 % 11;
    }

    for (let i = 0; i < 10; i++) soma2 += parseInt(cpf[i]) * parseInt(n2[i]);
    if (soma2 % 11 < 2) {
        digito2 = 0;
    } else {
        digito2 = 11 - soma2 % 11;
    }

    return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
  }
  

  // Validação de Telefone
    function validarTelefone(telefone) {
    const tel = telefone.replace(/[^0-9]/g, '');
    return tel.length === 10 || tel.length === 11;
  }

  // Validação de Email
  function validarEmail(email) {
    
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

    
    const dominio = email.split('@')[1];  // Obtém o domínio após o "@", fatiar
    
    if (dominio && dominiosPermitidos.includes(dominio)) {
      return true;  // Email válido
    } else {
      return false;  // Email inválido
    }
  }

  // Validação de Endereço (usou de assincrona por causa que a resposta Json pode demorar)
  async function validarEndereco(endereco) {
    endereco = endereco.replace(/ /g, '+');

    const url = `https://nominatim.openstreetmap.org/search?q=${endereco}&format=json`; // Construção de url

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.length > 0;
    } catch (err) {
      return false;   // Erro ao fazer a requisição
    }
  }

  function validarSenha(senha) {   //Verifcar senha (Tem que ser forte)
    return senha.length >= 8 && /[A-Z]/.test(senha) && /[a-z]/.test(senha) && /\d/.test(senha) &&
           /[!@#$%^&*(),.?":{}|<>]/.test(senha);  
}


  // Executando validações
  if (!validarNOME(nome)) {
    alert("Nome Inválido! Tente novamente");
    return;
  }


  if (!validarCPF(cpf)) {
    alert("CPF inválido! Tente novamente.");
    return;
  }

  // Exemplo: (11) 9NNNN-NNNN ou (11) NNNN-NNNN  // Exemplo: (11) 9NNNN-NNNN ou (11) NNNN-NNNN
  if (!validarTelefone(telefone)) {
    alert("Telefone Inválido! Tente novamente");
    return;
  }

  // Apenas 'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'
  if (!validarEmail(email)) {
    alert("Email Inválido! Tente novamente");
    return;
  }

  if (!(await validarEndereco(endereco))) {
    alert("Endereço Inválido! Tente novamente");
    return;
  }

  if(!validarSenha(senha)){
    alert("Senha Fraça. Ela deve conter: 8 digitos, letra Grande, letra pequena, numero, caracter especial")
    return;
  }


  // Usando o set para alterar os valores dos atributos
  hospede.setVerificado(nome, cpf, telefone, email, endereco, senha);

  // Salvando no localStorage
  let lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
  lista_Hospedes.push(hospede);
  localStorage.setItem("hospedes", JSON.stringify(lista_Hospedes));

  // Confirmação
  alert("Hóspede cadastrado com sucesso!");
  window.location.href = "../funcionario/login.html";
});
