// Obtém o elemento onde as reservas serão exibidas
const listaReservas = document.getElementById("listaReservas");

// Recupera as reservas do localStorage
const reservasJSON = localStorage.getItem("reservas");
const reservas = reservasJSON ? JSON.parse(reservasJSON) : [];

// Função para atualizar a lista de reservas na interface
function atualizarReservas() {
  listaReservas.innerHTML = ""; // Limpa o conteúdo anterior

  if (reservas.length > 0) {
    reservas.forEach((reserva, index) => {
      // Cria um elemento div para cada reserva
      const divReserva = document.createElement("div");
      divReserva.classList.add("reserva");

      // Define o conteúdo da reserva
      divReserva.innerHTML = `
        <div id="reser">
          <div id="within">
            <p id="name">Reserva de ${reserva._nomeHospede}</p>
            <p><strong>Telefone:</strong> ${reserva._telefoneHospede}</p>
            <p><strong>Tipo de Quarto:</strong> ${reserva._tipoQuarto}</p>
            <p><strong>Check-in:</strong> ${reserva._checkIn}</p>
            <p><strong>Check-out:</strong> ${reserva._checkOut}</p>
            <p><strong>Dias:</strong> ${reserva._dias}</p>
            <p><strong>Serviços Extras:</strong> ${reserva._servicosExtrasSelecionados.join(", ")}</p>
            <p><strong>Custo Total:</strong> R$ ${reserva._custoTotal.toFixed(2)}</p>
            <br>
            <button class="btn-checkout" data-index="${index}">Check-Out</button>
          </div>
        </div>
        <br>
      `;

      // Adiciona o div ao contêiner principal
      listaReservas.appendChild(divReserva);
    });

    // Adiciona eventos aos botões de check-out
    const botoesCheckout = document.querySelectorAll(".btn-checkout");
    botoesCheckout.forEach((botao) => {
      botao.addEventListener("click", function () {
        const index = this.dataset.index;
        realizarCheckout(index);
      });
    });
  } else {
    // Caso não haja reservas, exibe uma mensagem
    listaReservas.innerHTML = "<p>Nenhuma reserva encontrada.</p>";
  }
}

// Função para realizar o check-out e atualizar a lista
function realizarCheckout(index) {
  reservas.splice(index, 1); // Remove a reserva do array
  localStorage.setItem("reservas", JSON.stringify(reservas)); // Atualiza o localStorage
  alert("Check-out realizado com sucesso!"); // Exibe mensagem de sucesso
  window.location.href = "../funcionario/painel.html"; // Redireciona para a página principal de comando
}

// Inicializa a exibição das reservas
atualizarReservas();
