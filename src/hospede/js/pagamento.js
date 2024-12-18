document.addEventListener("DOMContentLoaded", function () {
  const listaPagamentos = document.getElementById("lista-pagamentos");

  // Recupera as reservas do localStorage
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  // Verifica se há reservas registradas
  if (reservas.length > 0) {
    reservas.forEach((reservaData) => {
      // Calcula o custo do frigobar (caso não esteja inicializado, usa zero)
      const frigobar = reservaData._frigobar || { refri: 0, agua: 0, cerveja: 0 };
      const custoFrigobar =
        (frigobar.refri || 0) * 5 +
        (frigobar.agua || 0) * 3 +
        (frigobar.cerveja || 0) * 7;

      // Soma o custo total da reserva com o custo do frigobar
      const custoTotalComFrigobar = reservaData._custoTotal + custoFrigobar;

      const div = document.createElement("div");
      div.classList.add("pagamento");

      div.innerHTML = `
        <p><strong>Hóspede:</strong> ${reservaData._nomeHospede}</p>
        <p><strong>Telefone:</strong> ${reservaData._telefoneHospede}</p>
        <p><strong>Quarto:</strong> ${reservaData._numeroQuarto}</p>
        <p><strong>Check-In:</strong> ${reservaData._checkIn}</p>
        <p><strong>Check-Out:</strong> ${reservaData._checkOut}</p>
        <p><strong>Dias de Estadia:</strong> ${reservaData._dias}</p>
        <p><strong>Serviços Extras:</strong> ${
          reservaData._servicosExtrasSelecionados.length > 0
            ? reservaData._servicosExtrasSelecionados.join(", ")
            : "Nenhum"
        }</p>
        <p><strong>Frigobar:</strong> Água (${frigobar.agua || 0}), 
          Cerveja (${frigobar.cerveja || 0}), 
          Refrigerante (${frigobar.refri || 0})</p>
        <p><strong>Custo Total com Frigobar:</strong> R$${custoTotalComFrigobar.toFixed(2)}</p>
      `;

      listaPagamentos.appendChild(div);
    });
  } else {
    listaPagamentos.innerHTML = "<p>Nenhum pagamento registrado.</p>";
  }
});
