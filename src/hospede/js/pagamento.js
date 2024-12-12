document.addEventListener("DOMContentLoaded", function () {
  const listaPagamentos = document.getElementById("lista-pagamentos");

  // Recupera a folha de pagamento do localStorage
  const folhaPagamento = JSON.parse(localStorage.getItem("folha_pagamento")) || [];

  class Pagamento {
    constructor(nomeHospede, telefoneHospede, tipoQuarto, checkIn, checkOut, dias, servicosExtrasSelecionados, custoTotal) {
      this.nomeHospede = nomeHospede;
      this.telefoneHospede = telefoneHospede;
      this.tipoQuarto = tipoQuarto;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.dias = dias;
      this.servicosExtrasSelecionados = servicosExtrasSelecionados.length > 0 ? servicosExtrasSelecionados.join(", ") : "Nenhum";
      this.custoTotal = custoTotal;
    }
  }

  // Verifica se há registros de pagamento
  if (folhaPagamento.length > 0) {
    folhaPagamento.forEach((pagamentoData) => {
      const pagamento = new Pagamento(
        pagamentoData.nomeHospede,
        pagamentoData.telefoneHospede,
        pagamentoData.tipoQuarto,
        pagamentoData.checkIn,
        pagamentoData.checkOut,
        pagamentoData.dias,
        pagamentoData.servicosExtrasSelecionados,
        pagamentoData.custoTotal
      );

      const div = document.createElement("div");
      div.classList.add("pagamento");

      div.innerHTML = `
        <p><strong>Hóspede:</strong> ${pagamento.nomeHospede}</p>
        <p><strong>Telefone:</strong> ${pagamento.telefoneHospede}</p>
        <p><strong>Tipo de Quarto:</strong> ${pagamento.tipoQuarto}</p>
        <p><strong>Check-In:</strong> ${pagamento.checkIn}</p>
        <p><strong>Check-Out:</strong> ${pagamento.checkOut}</p>
        <p><strong>Dias de Estadia:</strong> ${pagamento.dias}</p>
        <p><strong>Serviços Extras:</strong> ${pagamento.servicosExtrasSelecionados}</p>
        <p><strong>Custo Total:</strong> R$${pagamento.custoTotal.toFixed(2)}</p>
      `;

      listaPagamentos.appendChild(div);
    });
  } else {
    listaPagamentos.innerHTML = "<p>Nenhum pagamento registrado.</p>";
  }
});
