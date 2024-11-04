const precos = {
    refri: 5.0,   
    agua: 3.0,   
    cerveja: 7.0   
  };

document.getElementById("frigobar").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const refriQtd = document.getElementById("refri").value.trim();
    const aguaQtd = document.getElementById("agua").value.trim();
    const cervejaQtd = document.getElementById("cerveja").value.trim();

    let total = 0

    if (refriQtd > 0) {
        total+=(refriQtd * refri)
    }
    if (aguaQtd > 0) {
        total+=(aguaQtd * agua)
    }
    if (cervejaQtdQtd > 0) {
        total+=(cervejaQtd * cerveja)
    }

    const consumo_hospede = { nome, cpf, total_consumo};
  
    let lista_Hospedes = JSON.parse(localStorage.getItem("frigobar")) || [];
    lista_Hospedes.push(consumo_hospede);
    localStorage.setItem("frigobar", JSON.stringify(lista_Hospedes));
  });
  