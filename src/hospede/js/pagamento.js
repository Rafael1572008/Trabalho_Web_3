document.addEventListener("DOMContentLoaded", function () {
  const listaPagamentos = document.getElementById("lista-pagamentos");

  // Recupera as reservas do localStorage
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  class Pagamento {
    constructor(nomeHospede, telefoneHospede, numeroQuarto, checkIn, checkOut, dias, servicosExtrasSelecionados, refri, agua, cerveja, custoTotal) {
      this._nomeHospede = nomeHospede;
      this._telefoneHospede = telefoneHospede;
      this._numeroQuarto = numeroQuarto;
      this._checkIn = checkIn;
      this._checkOut = checkOut;
      this._dias = dias;
      this._servicosExtrasSelecionados = servicosExtrasSelecionados;
      this._frigobar = { refri, agua, cerveja };
      this._custoTotal = custoTotal;
    }
  }
  console.log(reservas.length)
  // Verifica se há reservas registradas
  if (reservas.length > 0) {
    reservas.forEach((reservaData) => {
      // Calcula o custo do frigobar
      const custoFrigobar =
        reservaData._frigobar.refri * 5 +
        reservaData._frigobar.agua * 3 +
        reservaData._frigobar.cerveja * 7;

      // Soma o custo total da reserva com o custo do frigobar
      const custoTotalComFrigobar = reservaData._custoTotal + custoFrigobar;

      const pagamento = new Pagamento(
        reservaData._nomeHospede,
        reservaData._telefoneHospede,
        reservaData._numeroQuarto,
        reservaData._checkIn,
        reservaData._checkOut,
        reservaData._dias,
        reservaData._servicosExtrasSelecionados,
        reservaData._frigobar.refri,
        reservaData._frigobar.agua,
        reservaData._frigobar.cerveja,
        custoTotalComFrigobar
      );

      const div = document.createElement("div");
      div.classList.add("pagamento");

      div.innerHTML = `
        <p><strong>Hóspede:</strong> ${pagamento._nomeHospede}</p>
        <p><strong>Telefone:</strong> ${pagamento._telefoneHospede}</p>
        <p><strong>Quarto:</strong> ${pagamento._numeroQuarto}</p>
        <p><strong>Check-In:</strong> ${pagamento._checkIn}</p>
        <p><strong>Check-Out:</strong> ${pagamento._checkOut}</p>
        <p><strong>Serviços Extras:</strong> ${pagamento._servicosExtrasSelecionados.length > 0 ? pagamento._servicosExtrasSelecionados.join(", ") : "Nenhum"}</p>  <!-- "?" é um operador condicional -->
        <p><strong>Frigobar:</strong> Água (${pagamento._frigobar.agua}), Cerveja (${pagamento._frigobar.cerveja}), Refrigerante (${pagamento._frigobar.refri})</p>
        <p><strong>Custo Total:</strong> R$${pagamento._custoTotal.toFixed(2)}</p>
      `;

      listaPagamentos.appendChild(div);
    });
  } else {
    listaPagamentos.innerHTML = "<p>Nenhum pagamento registrado.</p>";
  }
});
