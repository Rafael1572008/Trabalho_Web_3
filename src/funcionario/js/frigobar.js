const precos = {
  refri: 5.0,
  agua: 3.0,
  cerveja: 7.0,
};

document.getElementById("frigobar").addEventListener("submit", function (event) {
  event.preventDefault();

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

  if (total === 0) {
    alert("Adicione ao menos um item ao consumo!");
    return;
  }

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

  alert("Consumo adicionado com sucesso!");
  document.getElementById("frigobar").reset();
});
