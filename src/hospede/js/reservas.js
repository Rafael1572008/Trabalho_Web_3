document.addEventListener("DOMContentLoaded", function () {
  const formReserva = document.getElementById("form-reserva");
  const listaReservas = document.getElementById("lista-reservas");
  const numeroQuartoSelect = document.getElementById("numero-quarto");

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const quartos = JSON.parse(localStorage.getItem("quartos")) || [];
  atualizarListaReservas();

  function carregarQuartosDisponiveis() {
    numeroQuartoSelect.innerHTML = '<option value="">Selecione o número do quarto</option>'; // Limpar opções anteriores
    quartos.forEach((quarto) => {
      const option = document.createElement("option");
      option.value = quarto._numero;
      option.textContent = `Quarto ${quarto._numero} (${quarto._tipo}): R$${quarto._preco} por noite`;
      numeroQuartoSelect.appendChild(option);
    });
    
  }

  carregarQuartosDisponiveis();

  class Reserva {
    constructor(nomeHospede, telefoneHospede, numeroQuarto, checkIn, checkOut, dias, servicosExtrasSelecionados, custoTotal) {
      this._nomeHospede = nomeHospede;
      this._telefoneHospede = telefoneHospede;
      this._numeroQuarto = numeroQuarto;
      this._checkIn = checkIn;
      this._checkOut = checkOut;
      this._dias = dias;
      this._servicosExtrasSelecionados = servicosExtrasSelecionados;
      this._custoTotal = custoTotal;
    }
  }

  if (formReserva) {
    formReserva.addEventListener("submit", function (event) {
      event.preventDefault();

      const nomeHospede = formReserva["nomeHospede"].value;
      const telefoneHospede = formReserva["telefoneHospede"].value;
      const numeroQuarto = formReserva["numeroQuarto"].value; // Número do quarto selecionado
      const checkIn = formReserva["checkIn"].value;
      const checkOut = formReserva["checkOut"].value;

      const dataCheckIn = new Date(checkIn);
      const dataCheckOut = new Date(checkOut);

      if (dataCheckOut <= dataCheckIn) {
        alert("A data de check-out deve ser posterior à data de check-in.");
        return;
      }

      // Execultar validações
      function validarNOME(nome) {
        const nomev = nome.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, '');
        return nomev === nome;
      }

      function validarTelefone(telefone) {
        const tel = telefone.replace(/[^0-9]/g, '');
        return tel.length === 10 || tel.length === 11;
      }

      function valdiarData(checkIn, checkOut) {
        const dataAtual = new Date(); // chamar a data de hoje
        const dataCheckIn = new Date(checkIn); // converter
        const dataCheckOut = new Date(checkOut);  // converter
      
      
        if (dataCheckIn < dataAtual) {
          alert("A data de check-in deve ser no futuro.");
          return false;
        }
      
        if (dataCheckOut <= dataCheckIn) {
          alert("A data de check-out deve ser posterior à data de check-in.");
          return false;
        }
      
        return true;
      }

      // Buscar o quarto escolhido pelo número
      const quartoEscolhido = quartos.find((quarto) => quarto._numero === numeroQuarto);
      if (!quartoEscolhido) {
        alert("Quarto não encontrado!");
        return;
      }

      // Execultar validações
      if (!validarNOME(nomeHospede)) {
        alert("Nome inválido! Tente novamente");
        return;
      }

      if (!validarTelefone(telefoneHospede)) {
        alert("Telefone inválido! Tente novamente");
        return;
      }

      if(!valdiarData(checkIn, checkOut)) {
        return;
      }

      const servicosExtrasSelecionados = Array.from(
        formReserva.querySelectorAll('input[name="servico-extra"]:checked')
      ).map((checkbox) => checkbox.value);

      const dias = Math.ceil(
        Math.abs(dataCheckOut - dataCheckIn) / (1000 * 60 * 60 * 24)
      );

      const custoQuarto = quartoEscolhido._preco * dias;
      const precoServicosExtras = {
        Lavanderia: 50,
        Massagem: 120,
        Restaurante: 70,
      };
      const custoServicosExtras = servicosExtrasSelecionados.reduce(
        (total, servico) => total + (precoServicosExtras[servico] || 0),
        0
      );

      const custoTotal = custoQuarto + custoServicosExtras;

      const reserva = new Reserva(
        nomeHospede,
        telefoneHospede,
        numeroQuarto,
        checkIn,
        checkOut,
        dias,
        servicosExtrasSelecionados,
        custoTotal
      );

      reservas.push(reserva);
      localStorage.setItem("reservas", JSON.stringify(reservas));

      // Remover o quarto reservado da lista de quartos
      const indexQuarto = quartos.findIndex((quarto) => quarto._numero === numeroQuarto);
      if (indexQuarto !== -1) {
        quartos.splice(indexQuarto, 1);
        localStorage.setItem("quartos", JSON.stringify(quartos));
      }

      atualizarListaReservas();
      carregarQuartosDisponiveis(); // Atualizar o select com os quartos disponíveis
      formReserva.reset();
    });
  }

  function atualizarListaReservas() {
    listaReservas.innerHTML = "";

    reservas.forEach((reserva) => {
      const div = document.createElement("div");
      div.classList.add("reserva");

      const hospede = document.createElement("p");
      hospede.textContent = `Hóspede: ${reserva._nomeHospede}`;
      div.appendChild(hospede);

      const telefone = document.createElement("p");
      telefone.textContent = `Telefone: ${reserva._telefoneHospede}`;
      div.appendChild(telefone);

      const numero = document.createElement("p");
      numero.textContent = `Número do Quarto: ${reserva._numeroQuarto}`;
      div.appendChild(numero);

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
      custo.textContent = `Custo Total: R$${reserva._custoTotal}`;
      div.appendChild(custo);

      listaReservas.appendChild(div);
    });
  }
});
