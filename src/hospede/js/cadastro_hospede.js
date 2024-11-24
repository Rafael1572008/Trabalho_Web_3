document.getElementById("hospedes").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Verificar nome, função
  function validarNOME(nome){

    const nomev = nome.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, ''); // Ultilizar função regular/regex {a-zA-Zá-úÁ-Ú\s} aceitar apenas letras e espaços
    if (nomev !== nome) return false;  // Comparar o certo e a entrada

    return true
  }
  
  // Verifica CPF, função
  function validarCPF(cpf) {

      cpf = cpf.replace(/[^\d]/g, '');  // Ultilizar função regular/regex {/d} = (0-9) e [^...] = fora dos conchetes
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;  // Se não corresponder com o ideal, termina aqui

      let n1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
      let n2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

      if (cpf.length != 11 || !/^\d+$/.test(cpf)) {
          console.log("CPF inválido. O número de dígitos deve ser 11 e conter apenas números.");
          return false;
      }

      let soma1 = 0;
      for (let i = 0; i < 9; i++) {
          soma1 += parseInt(cpf[i]) * n1[i];
      }
      let resto1 = soma1 % 11;
      let digito1 = (resto1 < 2) ? 0 : 11 - resto1; 

      let soma2 = 0;
      for (let i = 0; i < 10; i++) {
          soma2 += parseInt(cpf[i]) * n2[i];
      }
      let resto2 = soma2 % 11;
      let digito2 = (resto2 < 2) ? 0 : 11 - resto2;

      if (digito1 == parseInt(cpf[9]) && digito2 == parseInt(cpf[10])) {
          console.log("CPF válido.");
          return true;
      } else {
          console.log("CPF inválido.");
          return false;
      }
  }

  // Verificar Telefone, função
  function validarTelefone(telefone) {
    // Exemplo: (11) 9NNNN-NNNN ou (11) NNNN-NNNN
    const tel = telefone.replace(/[^0-9]/g, ''); // Remover o que não for numero

    if (tel.length !== 10 && tel.length !== 11 ) return false; // Verificar se tem 10 ou 11

    return true;
  }

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


  
  if (!validarNOME(nome)){
    alert("Nome Inválido! Tente novamente")
    return; // Impede o envio do formulário
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



  // Criando o objeto do hóspede
  const hospede = { nome, cpf, telefone, email, endereco, senha };

  // Salvando o hóspede no localStorage
  let lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
  lista_Hospedes.push(hospede);
  localStorage.setItem("hospedes", JSON.stringify(lista_Hospedes));

  // Confirmação de que os dados foram salvos
  console.log("Hóspede salvo:", hospede);
  console.log("Lista atualizada de hóspedes:", lista_Hospedes);
  console.log(`${lista_Hospedes}`)

  alert("Hóspede cadastrado com sucesso!");

  // Redirecionando para a página de login
  window.location.href = "../funcionario/login.html";
});
