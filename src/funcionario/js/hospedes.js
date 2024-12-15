// Executa o código somente após o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {

  // Obtém o formulário de cadastro de hóspedes pelo ID
  const formHospede = document.getElementById("cadastro_hospede"); // Corrigido ID

   // Obtém o elemento HTML onde será exibida a lista de hóspedes cadastrados
  const listaHospedes = document.getElementById("lista_Hospedes"); // Corrigido para camelCase

  // Recupera a lista de hóspedes armazenada no localStorage ou inicializa como um array vazio
  const hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];

   // Exibe os hóspedes já cadastrados ao carregar a página
  atualizarListaHospedes();

  // Adiciona um evento de escuta ao formulário, executado ao submeter o cadastro
  formHospede.addEventListener("submit", function (event) { // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

     // Obtém os valores dos campos do formulário
    const nome = formHospede.elements["nome"].value;
    const cpf = formHospede.elements["cpf"].value;
    const endereco = formHospede.elements["endereco"].value;
    const telefone = formHospede.elements["telefone"].value;
    const email = formHospede.elements["email"].value;
    const senha = formHospede.elements["senha"].value;

     // Adiciona os dados do novo hóspede à lista
    hospedes.push({ nome, cpf, endereco, telefone, email, senha });

    // Atualiza a lista no localStorage
    localStorage.setItem("hospedes", JSON.stringify(hospedes));

    // Atualiza a exibição da lista de hóspedes
    atualizarListaHospedes();

     // Reseta o formulário para limpar os campos
    formHospede.reset();
  });

 // Função para atualizar a exibição da lista de hóspedes
  function atualizarListaHospedes() {
    listaHospedes.innerHTML = ""; // Limpa o conteúdo atual da lista

     // Itera sobre o array de hóspedes e cria um elemento para cada um
    hospedes.forEach((hospede) => {
      const li = document.createElement("li"); // Cria um elemento de lista
      li.textContent = `Nome: ${hospede.nome}, CPF: ${hospede.cpf}, Endereço: ${hospede.endereco}, Telefone: ${hospede.telefone}, Email: ${hospede.email}, Senha: ${hospede.senha}`;
      listaHospedes.appendChild(li); // Adiciona o elemento à lista no DOM
    });
  }
});
