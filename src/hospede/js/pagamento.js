document.addEventListener("DOMContentLoaded", function () {
  const listaPagamentos = document.getElementById("lista-pagamentos");

  // Recupera a folha de pagamento do localStorage
  const folhaPagamento = JSON.parse(localStorage.getItem("folha_pagamento")) || [];

  class Pagamento {
    constructor(nomeHospede, telefoneHospede, tipoQuarto, checkIn, checkOut, dias, servicosExtrasSelecionados, custoTotal) {
      this._nomeHospede = nomeHospede;
      this._telefoneHospede = telefoneHospede;
      this._tipoQuarto = tipoQuarto;
      this._checkIn = checkIn;
      this._checkOut = checkOut;
      this._dias = dias;
      this._servicosExtrasSelecionados = servicosExtrasSelecionados.length > 0 ? servicosExtrasSelecionados.join(", ") : "Nenhum";
      this._custoTotal = custoTotal;
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
        <p><strong>Hóspede:</strong> ${pagamento._nomeHospede}</p>
        <p><strong>Telefone:</strong> ${pagamento._telefoneHospede}</p>
        <p><strong>Tipo de Quarto:</strong> ${pagamento._tipoQuarto}</p>
        <p><strong>Check-In:</strong> ${pagamento._checkIn}</p>
        <p><strong>Check-Out:</strong> ${pagamento._checkOut}</p>
        <p><strong>Dias de Estadia:</strong> ${pagamento._dias}</p>
        <p><strong>Serviços Extras:</strong> ${pagamento._servicosExtrasSelecionados}</p>
        <p><strong>Custo Total:</strong> R$${pagamento._custoTotal.toFixed(2)}</p>
      `;

      listaPagamentos.appendChild(div);
    });
  } else {
    listaPagamentos.innerHTML = "<p>Nenhum pagamento registrado.</p>";
  }
});
