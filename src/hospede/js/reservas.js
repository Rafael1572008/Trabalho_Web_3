// js/reservas.js

/*esperar par que todo html seja carregado */
document.addEventListener("DOMContentLoaded", function () {
  // obter formulário e sua lista
  const formReserva = document.getElementById("form-reserva");
  const listaReservas = document.getElementById("lista-reservas");

  /*obter a lista anterior */
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  atualizarListaReservas();

  /* precos */
  const preco = {
    "Duplo Solteiro": 150,
    "Quarto Casal": 200,
    Dormitórios: 100,
    Apartamentos: 250,
    Standard: 180,
    Master: 300,
    "Deluxe ou Master Superior": 400,
  };

  // imprede o carregamento da pagina ao enviar
  formReserva.addEventListener("submit", function (event) {
    event.preventDefault();

    /* Captura dos elemento */
    const nomeHospede = formReserva.elements[0].value;
    const telefoneHospede = formReserva.elements[1].value;
    const tipoQuarto = formReserva.elements[2].value;
    const numeroQuarto = formReserva.elements[3].value;
    const checkIn = formReserva.elements[4].value;
    const checkOut = formReserva.elements[5].value;

    // transfoma em milisegundos e dps converte para dias
    const dias = Math.ceil(
      Math.abs(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );

    const custot = (preco[tipoQuarto] || 0) * dias;

    // é como se fosse um append do python
    reservas.push({
      nomeHospede,
      telefoneHospede,
      tipoQuarto,
      numeroQuarto,
      checkIn,
      checkOut,
      custot,
    });
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // atualizar lista
    atualizarListaReservas();
    formReserva.reset();
  });

  // Limpa a lista existente
  function atualizarListaReservas() {
    listaReservas.innerHTML = "";

    reservas.forEach((reserva) => {
      const div = document.createElement("div");
      div.classList.add("reserva");

      // Cria elementos para cada informação e adiciona ao div
      const hospede = document.createElement("p");
      hospede.textContent = `Hóspede: ${reserva.nomeHospede}`;
      div.appendChild(hospede);

      const telefone = document.createElement("p");
      telefone.textContent = `Telefone: ${reserva.telefoneHospede}`;
      div.appendChild(telefone);

      const tipo = document.createElement("p");
      tipo.textContent = `Tipo de Quarto: ${reserva.tipoQuarto}`;
      div.appendChild(tipo);

      const numero = document.createElement("p");
      numero.textContent = `Número do Quarto: ${reserva.numeroQuarto}`;
      div.appendChild(numero);

      const checkin = document.createElement("p");
      checkin.textContent = `Check-In: ${reserva.checkIn}`;
      div.appendChild(checkin);

      const checkout = document.createElement("p");
      checkout.textContent = `Check-Out: ${reserva.checkOut}`;
      div.appendChild(checkout);

      const custo = document.createElement("p");
      checkout.textContent = `Custo: ${reserva.custot}`;
      div.append(custo);

      // Adiciona a reserva à lista
      listaReservas.appendChild(div);
    });
  }

  // Função para limpar as reservas
  function limparReservas() {
    localStorage.removeItem("reservas"); // Limpa as reservas do localStorage
    reservas.length = 0; // Limpa o array de reservas
    atualizarListaReservas(); // Atualiza a lista na interface
  }

  // Chamar a função
  const botaoLimpar = document.getElementById("limpar-reservas");
  botaoLimpar.addEventListener("click", limparReservas);
});
