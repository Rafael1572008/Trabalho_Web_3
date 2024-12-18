// Espera o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  // Referências aos elementos do formulário e da página
  const formReserva = document.getElementById("form-reserva"); // Formulário de reserva
  const listaReservas = document.getElementById("lista-reservas"); // Lista onde as reservas serão exibidas
  const numeroQuartoSelect = document.getElementById("numero-quarto"); // Select para escolha do número do quarto

  // Recupera as reservas e quartos armazenados no localStorage ou inicializa com arrays vazios
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const quartos = JSON.parse(localStorage.getItem("quartos")) || [];
  atualizarListaReservas(); // Atualiza a lista de reservas exibida na página

  // Função para carregar os quartos disponíveis no campo select
  function carregarQuartosDisponiveis() {
    // Reseta as opções do select
    numeroQuartoSelect.innerHTML = '<option value="">Selecione o número do quarto</option>';
    
    // Adiciona cada quarto como uma opção no select
    quartos.forEach((quarto) => {
      const option = document.createElement("option");
      option.value = quarto._numero; // O número do quarto será o valor da opção
      option.textContent = `Quarto ${quarto._numero} (${quarto._tipo}): R$${quarto._preco} por noite`; // Texto exibido
      numeroQuartoSelect.appendChild(option); // Adiciona a opção ao select
    });
  }

  // Chama a função para carregar os quartos no início
  carregarQuartosDisponiveis();

  // Classe que representa uma reserva
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

  // Verifica se o formulário existe antes de adicionar um listener de evento
  if (formReserva) {
    formReserva.addEventListener("submit", function (event) {
      event.preventDefault(); // Previne o comportamento padrão de recarregar a página

      // Captura os valores do formulário
      const nomeHospede = formReserva["nomeHospede"].value; // Nome do hóspede
      const telefoneHospede = formReserva["telefoneHospede"].value; // Telefone do hóspede
      const numeroQuarto = formReserva["numeroQuarto"].value; // Número do quarto escolhido
      const checkIn = formReserva["checkIn"].value; // Data de check-in
      const checkOut = formReserva["checkOut"].value; // Data de check-out

      // Converte as datas de check-in e check-out em objetos Date
      const dataCheckIn = new Date(checkIn);
      const dataCheckOut = new Date(checkOut);

      // Valida se a data de check-out é posterior à de check-in
      if (dataCheckOut <= dataCheckIn) {
        alert("A data de check-out deve ser posterior à data de check-in.");
        return;
      }

      // Funções de validação para o nome, telefone e datas
      function validarNOME(nome) {
        const nomev = nome.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, ''); // Remove caracteres inválidos
        return nomev === nome;
      }

      function validarTelefone(telefone) {
        const tel = telefone.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
        return tel.length === 10 || tel.length === 11; // Valida comprimento do telefone
      }

      function valdiarData(checkIn, checkOut) {
        const dataAtual = new Date(); // Data atual
        const dataCheckIn = new Date(checkIn);
        const dataCheckOut = new Date(checkOut);

        // Valida se as datas estão no futuro e se o check-out é posterior ao check-in
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

      // Encontra o quarto escolhido na lista de quartos disponíveis
      const quartoEscolhido = quartos.find((quarto) => quarto._numero === numeroQuarto);
      if (!quartoEscolhido) {
        alert("Quarto não encontrado!");
        return;
      }

      // Executa as validações de nome, telefone e datas
      if (!validarNOME(nomeHospede)) {
        alert("Nome inválido! Tente novamente");
        return;
      }
      if (!validarTelefone(telefoneHospede)) {
        alert("Telefone inválido! Tente novamente");
        return;
      }
      if (!valdiarData(checkIn, checkOut)) {
        return;
      }

      // Captura os serviços extras selecionados
      const servicosExtrasSelecionados = Array.from(
        formReserva.querySelectorAll('input[name="servico-extra"]:checked')
      ).map((checkbox) => checkbox.value);

      // Calcula a quantidade de dias entre check-in e check-out
      const dias = Math.ceil(
        Math.abs(dataCheckOut - dataCheckIn) / (1000 * 60 * 60 * 24)
      );

      // Calcula o custo total da reserva
      const custoQuarto = quartoEscolhido._preco * dias; // Custo do quarto por noite
      const precoServicosExtras = { // Preços fixos dos serviços extras
        Lavanderia: 50,
        Massagem: 120,
        Restaurante: 70,
      };
      const custoServicosExtras = servicosExtrasSelecionados.reduce(
        (total, servico) => total + (precoServicosExtras[servico] || 0),
        0
      );
      const custoTotal = custoQuarto + custoServicosExtras; // Soma custo do quarto e serviços extras

      // Cria uma nova reserva
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

      // Adiciona a reserva ao localStorage
      reservas.push(reserva);
      localStorage.setItem("reservas", JSON.stringify(reservas));

      // Remove o quarto reservado da lista de quartos disponíveis
      const indexQuarto = quartos.findIndex((quarto) => quarto._numero === numeroQuarto);
      if (indexQuarto !== -1) {
        quartos.splice(indexQuarto, 1); // Remove o quarto da lista
        localStorage.setItem("quartos", JSON.stringify(quartos));
      }

      // Atualiza a lista de reservas e os quartos disponíveis
      atualizarListaReservas();
      carregarQuartosDisponiveis();
      formReserva.reset(); // Reseta o formulário

      // Exibe mensagem de sucesso e redireciona para a página de visualização do total
      alert("Reserva realizada com sucesso!");
      window.location.href = "../hospede/conta_total.html";
    });
  }

  // Função para atualizar a lista de reservas exibida na página
  function atualizarListaReservas() {
    listaReservas.innerHTML = ""; // Limpa a lista atual

    reservas.forEach((reserva) => {
      const div = document.createElement("div");
      div.classList.add("reserva");

      // Adiciona as informações da reserva
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

    });
  }
});
