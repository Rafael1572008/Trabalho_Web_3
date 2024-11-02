document.addEventListener("DOMContentLoaded", function () {
  // obter formulário e sua lista
  const formReserva = document.getElementById("form-reserva");
  const listaReservas = document.getElementById("lista-reservas");

  // obter a lista anterior
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  atualizarListaReservas();

  // preços dos quartos
  const preco = {
    "Duplo Solteiro": 150,
    "Quarto Casal": 200,
    Dormitórios: 100,
    Apartamentos: 250,
    Standard: 180,
    Master: 300,
    "Deluxe ou Master Superior": 400,
  };

  // preços dos serviços extras
  const precoServicosExtras = {
    Lavanderia: 50,
    Massagem: 120,
    Restaurante: 70,
  };

  // impede o carregamento da página ao enviar o formulário
  formReserva.addEventListener("submit", function (event) {
    event.preventDefault();

    // captura dos elementos
    const nomeHospede = formReserva.elements[0].value;
    const telefoneHospede = formReserva.elements[1].value;
    const tipoQuarto = formReserva.elements[2].value;
    const checkIn = formReserva.elements[3].value;
    const checkOut = formReserva.elements[4].value;

    // captura dos serviços extras selecionados
    const servicosExtrasSelecionados = Array.from(
      formReserva.querySelectorAll('input[name="servico-extra"]:checked')
    ).map((checkbox) => checkbox.value);

    // calcula a quantidade de dias
    const dias = Math.ceil(
      Math.abs(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );

    // calcula o custo total do quarto
    const custoQuarto = (preco[tipoQuarto] || 0) * dias;

    // calcula o custo total dos serviços extras selecionados
    const custoServicosExtras = servicosExtrasSelecionados.reduce(
      (total, servico) => total + (precoServicosExtras[servico] || 0),
      0
    );

    // custo total da reserva, incluindo quarto e serviços extras
    const custoTotal = custoQuarto + custoServicosExtras;

    // adiciona a reserva à lista de reservas
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

    // atualiza a lista de reservas e reseta o formulário
    atualizarListaReservas();
    formReserva.reset();
  });

  // função para atualizar a lista de reservas
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

      // Adiciona a reserva à lista
      listaReservas.appendChild(div);
    });
  }
});
