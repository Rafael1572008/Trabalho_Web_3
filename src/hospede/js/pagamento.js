document.addEventListener("DOMContentLoaded", function () {
    const listaPagamentos = document.getElementById("lista-pagamentos");
  
    // Recupera a folha de pagamento do localStorage
    const folhaPagamento = JSON.parse(localStorage.getItem("folha_pagamento")) || [];
  
    // Verifica se há registros de pagamento
    if (folhaPagamento.length > 0) {
      folhaPagamento.forEach((pagamento) => {
        const div = document.createElement("div");
        div.classList.add("pagamento");
  
        div.innerHTML = `
          <p><strong>Hóspede:</strong> ${pagamento.nomeHospede}</p>
          <p><strong>Telefone:</strong> ${pagamento.telefoneHospede}</p>
          <p><strong>Tipo de Quarto:</strong> ${pagamento.tipoQuarto}</p>
          <p><strong>Check-In:</strong> ${pagamento.checkIn}</p>
          <p><strong>Check-Out:</strong> ${pagamento.checkOut}</p>
          <p><strong>Dias de Estadia:</strong> ${pagamento.dias}</p>
          <p><strong>Serviços Extras:</strong> ${
            pagamento.servicosExtrasSelecionados.length > 0
              ? pagamento.servicosExtrasSelecionados.join(", ")
              : "Nenhum"
          }</p>
          <p><strong>Custo Total:</strong> R$${pagamento.custoTotal.toFixed(2)}</p>
        `;
  
        listaPagamentos.appendChild(div);
      });
    } else {
      listaPagamentos.innerHTML = "<p>Nenhum pagamento registrado.</p>";
    }
  });
  