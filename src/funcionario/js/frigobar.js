// Define os preços dos itens disponíveis no frigobar
const precos = {
  refri: 5.0,
  agua: 3.0,
  cerveja: 7.0,
};

// Adiciona um evento ao formulário identificado como "frigobar", que será executado ao submeter
document.getElementById("frigobar").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtém os valores inseridos pelo usuário e remove espaços em branco
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const refriQtd = parseInt(document.getElementById("refri").value.trim()) || 0;
  const aguaQtd = parseInt(document.getElementById("agua").value.trim()) || 0;
  const cervejaQtd = parseInt(document.getElementById("cerveja").value.trim()) || 0;

  // Calcula o total do consumo
  let total = 0;
  total += refriQtd * precos.refri;
  total += aguaQtd * precos.agua;
  total += cervejaQtd * precos.cerveja;

  // Verifica se nenhum item foi adicionado ao consumo
  if (total === 0) {
    alert("Adicione ao menos um item ao consumo!");
    return;
  }

  // Recupera a lista de hóspedes do localStorage, ou cria uma lista vazia caso não exista
  let lista_Hospedes = JSON.parse(localStorage.getItem("frigobar")) || [];
  
  // Verifica se o hóspede com o CPF já existe
  const hospedeIndex = lista_Hospedes.findIndex(hospede => hospede.cpf === cpf);

  if (hospedeIndex !== -1) {
    // Atualiza o consumo do hóspede existente
    lista_Hospedes[hospedeIndex].total_consumo += total;
  } else {
    // Adiciona um novo hóspede com o consumo
    lista_Hospedes.push({ nome, cpf, total_consumo: total });
  }

  // Salva a lista atualizada no localStorage
  localStorage.setItem("frigobar", JSON.stringify(lista_Hospedes));

  // Exibe uma mensagem de sucesso
  alert("Consumo adicionado com sucesso!");
   // Reseta o formulário, limpando os campos
  document.getElementById("frigobar").reset();
});
