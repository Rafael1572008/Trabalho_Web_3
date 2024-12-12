document.addEventListener("DOMContentLoaded", function () {
  const formReserva = document.getElementById("form-reserva");
  const listaReservas = document.getElementById("lista-reservas");

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  atualizarListaReservas();

  // Classe Reserva
  class Reserva {
    constructor(nomeHospede, telefoneHospede, tipoQuarto, checkIn, checkOut, dias, servicosExtrasSelecionados, custoTotal) {
      this._nomeHospede = nomeHospede;
      this._telefoneHospede = telefoneHospede;
      this._tipoQuarto = tipoQuarto;
      this._checkIn = checkIn;
      this._checkOut = checkOut;
      this._dias = dias;
      this._servicosExtrasSelecionados = servicosExtrasSelecionados;
      this._custoTotal = custoTotal;
    }
  }

  // Preços dos quartos
  const preco = {
    "Duplo Solteiro": 120,
    "Quarto Casal": 200,
    Dormitórios: 100,
    Apartamentos: 250,
    Standard: 180,
    Master: 300,
    "Deluxe ou Master Superior": 400,
  };

  // Preços dos serviços extras
  const precoServicosExtras = {
    Lavanderia: 50,
    Massagem: 120,
    Restaurante: 70,
  };

  if (formReserva) {
    formReserva.addEventListener("submit", function (event) {
      event.preventDefault();

      const nomeHospede = formReserva["nomeHospede"].value;
      const telefoneHospede = formReserva["telefoneHospede"].value;
      const tipoQuarto = formReserva["tipoQuarto"].value;
      const checkIn = formReserva["checkIn"].value;
      const checkOut = formReserva["checkOut"].value;

      // Verificações
      function validarNOME(nomeHospede) {
        const nomev = nomeHospede.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, '');
        return nomev === nomeHospede;
      }

      function validarTelefone(telefoneHospede) {
        const tel = telefoneHospede.replace(/[^0-9]/g, '');
        return tel.length === 10 || tel.length === 11;
      }

      // Executando os verificadores
      if (!validarNOME(nomeHospede)) {
        alert("Nome Inválido! Tente novamente");
        return;
      }

      if (!validarTelefone(telefoneHospede)) {
        alert("Telefone Inválido! Tente novamente");
        return;
      }

      const dataCheckIn = new Date(checkIn);
      const dataCheckOut = new Date(checkOut);

      if (dataCheckOut <= dataCheckIn) {
        alert("A data de check-out deve ser posterior à data de check-in.");
        return;
      }

      const servicosExtrasSelecionados = Array.from(
        formReserva.querySelectorAll('input[name="servico-extra"]:checked')
      ).map((checkbox) => checkbox.value);

      const dias = Math.ceil(
        Math.abs(dataCheckOut - dataCheckIn) / (1000 * 60 * 60 * 24)
      );

      const custoQuarto = (preco[tipoQuarto] || 0) * dias;
      const custoServicosExtras = servicosExtrasSelecionados.reduce(
        (total, servico) => total + (precoServicosExtras[servico] || 0),
        0
      );

      const custoTotal = custoQuarto + custoServicosExtras;

      // Criando a reserva usando a classe
      const reserva = new Reserva(
        nomeHospede,
        telefoneHospede,
        tipoQuarto,
        checkIn,
        checkOut,
        dias,
        servicosExtrasSelecionados,
        custoTotal
      );

      // Adicionando a reserva ao array de reservas
      reservas.push(reserva);
      localStorage.setItem("reservas", JSON.stringify(reservas));

      atualizarListaReservas();
      formReserva.reset();
    });
  }

  // Função para atualizar a lista de reservas na página
  function atualizarListaReservas() {
    listaReservas.innerHTML = "";

    reservas.forEach((reserva) => {
      const div = document.createElement("div");
      div.classList.add("reserva");

      const hospede = document.createElement("p");
      hospede.classList.add("nome-hospede");
      hospede.textContent = `Hóspede: ${reserva._nomeHospede}`;
      div.appendChild(hospede);

      const telefone = document.createElement("p");
      telefone.textContent = `Telefone: ${reserva._telefoneHospede}`;
      div.appendChild(telefone);

      const tipo = document.createElement("p");
      tipo.textContent = `Tipo de Quarto: ${reserva._tipoQuarto}`;
      div.appendChild(tipo);

      const checkin = document.createElement("p");
      checkin.textContent = `Check-In: ${reserva._checkIn}`;
      div.appendChild(checkin);

      const checkout = document.createElement("p");
      checkout.textContent = `Check-Out: ${reserva._checkOut}`;
      div.appendChild(checkout);

      const dias = document.createElement("p");
      dias.textContent = `Dias de estadia: ${reserva._dias}`;
      div.appendChild(dias);

      const servicosExtras = document.createElement("p");
      servicosExtras.textContent = `Serviços Extras: ${
        reserva._servicosExtrasSelecionados.length > 0
          ? reserva._servicosExtrasSelecionados.join(", ")
          : "Nenhum"
      }`;
      div.appendChild(servicosExtras);

      const custo = document.createElement("p");
      custo.textContent = `Custo Total: R$${reserva._custoTotal.toFixed(2)}`;
      div.appendChild(custo);

      listaReservas.appendChild(div); // Adiciona a reserva à lista de reservas
    });
  }
});
