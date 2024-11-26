document.getElementById("hospedes").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Validação de Nome
  function validarNOME(nome) {
    const nomev = nome.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, '');
    return nomev === nome;
  }

  // Validação de CPF com calculo oficial de verificação
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let n1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    let n2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    let soma1 = 0;
    for (let i = 0; i < 9; i++) soma1 += parseInt(cpf[i]) * n1[i];
    let resto1 = soma1 % 11;
    let digito1 = resto1 < 2 ? 0 : 11 - resto1;

    let soma2 = 0;
    for (let i = 0; i < 10; i++) soma2 += parseInt(cpf[i]) * n2[i];
    let resto2 = soma2 % 11;
    let digito2 = resto2 < 2 ? 0 : 11 - resto2;

    return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
  }

  // Exemplo: (11) 9NNNN-NNNN ou (11) NNNN-NNNN
  function validarTelefone(telefone) {
    const tel = telefone.replace(/[^0-9]/g, ''); // Remover o que não for numero

    if (tel.length !== 10 && tel.length !== 11 ) return false; // Verificar se tem 10 ou 11

    return true;
  }

  // Validar Email
  function validarEmail(email) {
    // Lista de domínios permitidos
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

    // Verifica se o email contém "@" e o domínio está na lista de permitidos
    const dominio = email.split('@')[1];  // Obtém o domínio após o "@"
    
    if (dominio && dominiosPermitidos.includes(dominio)) {
      return true;  // Email válido
    } else {
      return false;  // Email inválido
    }
  }

  // Validação de endereço usando o Nominatim
  async function validarEndereco(endereco) {
    endereco = endereco.replace(/ /g, '+');

    const url = `https://nominatim.openstreetmap.org/search?q=${endereco}&format=json`; // Construção de url

    try {
      const response = await fetch(url);  // Solicitação http ao site
      const data = await response.json(); // Desserializar Json para dicionario
  
      if (data.length > 0) {
        return true;  // Endereço válido
      } else {
        return false; // Endereço não encontrado
      }
    } catch (err) {
      return false; // Erro ao fazer a requisição
    }
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

  if (!validarTelefone(telefone)) {
    alert("Telefone Inválido! Tente novamente");
    return;
  }

  if (!validarEmail(email)) {
    alert("Email Inválido! Tente novamente");
    return;
  }

  if (!(await validarEndereco(endereco))) {
    alert("Endereço Inválido! Tente novamente");
    return;
  }

  // Criando o objeto do hóspede
  const hospede = { nome, cpf, telefone, email, endereco, senha };

  // Salvando no localStorage
  let lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
  lista_Hospedes.push(hospede);
  localStorage.setItem("hospedes", JSON.stringify(lista_Hospedes));

  // Confirmação
  alert("Hóspede cadastrado com sucesso!");
  window.location.href = "../funcionario/login.html";
});
