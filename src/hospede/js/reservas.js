document.addEventListener("DOMContentLoaded", function () {
  const formReserva = document.getElementById("form-reserva");
  const listaReservas = document.getElementById("lista-reservas");

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  atualizarListaReservas();

  // Verifique se o formulário existe antes de adicionar os ouvintes de eventos
  if (formReserva) {
    const preco = {
      "Duplo Solteiro": 120,
      "Quarto Casal": 200,
      Dormitórios: 100,
      Apartamentos: 250,
      Standard: 180,
      Master: 300,
      "Deluxe ou Master Superior": 400,
    };

    const precoServicosExtras = {
      Lavanderia: 50,
      Massagem: 120,
      Restaurante: 70,
    };

    formReserva.addEventListener("submit", function (event) {
      event.preventDefault();

      const nomeHospede = formReserva.elements[0].value;
      const telefoneHospede = formReserva.elements[1].value;
      const tipoQuarto = formReserva.elements[2].value;
      const checkIn = formReserva.elements[3].value;
      const checkOut = formReserva.elements[4].value;

      const servicosExtrasSelecionados = Array.from(
        formReserva.querySelectorAll('input[name="servico-extra"]:checked')
      ).map((checkbox) => checkbox.value);

      const dias = Math.ceil(
        Math.abs(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      );

      const custoQuarto = (preco[tipoQuarto] || 0) * dias;
      const custoServicosExtras = servicosExtrasSelecionados.reduce(
        (total, servico) => total + (precoServicosExtras[servico] || 0),
        0
      );

      const custoTotal = custoQuarto + custoServicosExtras;

      reservas.push({
        nomeHospede,
        telefoneHospede,
        tipoQuarto,
        checkIn,
        checkOut,
        dias,
        servicosExtrasSelecionados,
        custoTotal,
      });
      localStorage.setItem("reservas", JSON.stringify(reservas));

      atualizarListaReservas();
      formReserva.reset();
    });
  }

  function atualizarListaReservas() {
    listaReservas.innerHTML = "";

    reservas.forEach((reserva) => {
      const div = document.createElement("div");
      div.classList.add("reserva");

      const hospede = document.createElement("p");
      hospede.textContent = `Hóspede: ${reserva.nomeHospede}`;
      div.appendChild(hospede);

      const telefone = document.createElement("p");
      telefone.textContent = `Telefone: ${reserva.telefoneHospede}`;
      div.appendChild(telefone);

      const tipo = document.createElement("p");
      tipo.textContent = `Tipo de Quarto: ${reserva.tipoQuarto}`;
      div.appendChild(tipo);

      const checkin = document.createElement("p");
      checkin.textContent = `Check-In: ${reserva.checkIn}`;
      div.appendChild(checkin);

      const checkout = document.createElement("p");
      checkout.textContent = `Check-Out: ${reserva.checkOut}`;
      div.appendChild(checkout);

      const dias = document.createElement("p");
      dias.textContent = `Dias de estadia: ${reserva.dias}`;
      div.appendChild(dias);

      const servicosExtras = document.createElement("p");
      servicosExtras.textContent = `Serviços Extras: ${
        reserva.servicosExtrasSelecionados.length > 0
          ? reserva.servicosExtrasSelecionados.join(", ")
          : "Nenhum"
      }`;
      div.appendChild(servicosExtras);

      const custo = document.createElement("p");
      custo.textContent = `Custo Total: R$${reserva.custoTotal.toFixed(2)}`;
      div.appendChild(custo);

      listaReservas.appendChild(div);
    });
  }
});
