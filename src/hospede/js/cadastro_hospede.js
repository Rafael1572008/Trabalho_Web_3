document.getElementById("hospedes").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Criando o objeto do hóspede
  const hospede = { nome, cpf, telefone, email, senha };

  // Salvando o hóspede no localStorage
  let lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
  lista_Hospedes.push(hospede);
  localStorage.setItem("hospedes", JSON.stringify(lista_Hospedes));

  alert("Hóspede cadastrado com sucesso!");

  // Redirecionando para a página de login com os dados do cadastro na URL
  window.location.href = `../funcionario/login.html?username=${encodeURIComponent(email)}&password=${encodeURIComponent(senha)}`;
});
