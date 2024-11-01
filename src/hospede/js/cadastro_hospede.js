document.getElementById("hospedes").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  // Criando o objeto do hóspede
  const hospede = {
    nome,
    cpf,
    telefone,
    email,
    senha,
  };

  // Recuperando a lista de hóspedes armazenada ou iniciando uma nova lista
  let lista_Hospedes = JSON.parse(localStorage.getItem("hospede")) || [];
  lista_Hospedes.push(hospede);
  localStorage.setItem("hospede", JSON.stringify(lista_Hospedes));

  alert("Hóspede cadastrado com sucesso!");
  this.reset(); // Limpa o formulário após o cadastro
});
