// Obtém o elemento onde as reservas serão exibidas
const listaReservas = document.getElementById("listaReservas");

// Recupera as reservas do localStorage
const reservasJSON = localStorage.getItem("reservas");
const reservas = reservasJSON ? JSON.parse(reservasJSON) : [];

// Verifica se há reservas a serem exibidas
if (reservas.length > 0) {
  reservas.forEach((reserva) => {
    // Cria um elemento div para cada reserva
    const divReserva = document.createElement("div");
    divReserva.classList.add("reserva");

    // Define o conteúdo da reserva
    divReserva.innerHTML = `
      <h2>Reserva de ${reserva.nomeHospede}</h2>
      <p><strong>Telefone:</strong> ${reserva.telefoneHospede}</p>
      <p><strong>Tipo de Quarto:</strong> ${reserva.tipoQuarto}</p>
      <p><strong>Check-in:</strong> ${reserva.checkIn}</p>
      <p><strong>Check-out:</strong> ${reserva.checkOut}</p>
      <p><strong>Dias:</strong> ${reserva.dias}</p>
      <p><strong>Serviços Extras:</strong> ${reserva.servicosExtrasSelecionados.join(", ")}</p>
      <p><strong>Custo Total:</strong> R$ ${reserva.custoTotal.toFixed(2)}</p>
    `;

    // Adiciona o div ao contêiner principal
    listaReservas.appendChild(divReserva);
  });
} else {
  // Caso não haja reservas, exibe uma mensagem
  listaReservas.innerHTML = "<p>Nenhuma reserva encontrada.</p>";
}
