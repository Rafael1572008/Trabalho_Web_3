document.getElementById("hospedes").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Criando o objeto do hóspede
  const hospede = { nome, cpf, telefone, email, senha };

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

});
