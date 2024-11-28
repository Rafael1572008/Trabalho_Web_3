// js/servicos.js

document.addEventListener("DOMContentLoaded", function () {
  const formServico = document.getElementById("form-servico");
  const listaServicos = document.getElementById("lista-servicos");

  const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

  atualizarListaServicos();

  // Classe Servico
  class Servico {
    constructor(tipoServico, precoServico) {
      this._tipoServico = tipoServico;
      this._precoServico = precoServico;
    }

    get tipoServico() {
      return this._tipoServico;
    }

    get precoServico() {
      return this._precoServico;
    }
  }

  formServico.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoServico = formServico.elements[0].value;
    const precoServico = formServico.elements[1].value;

    // Criando um novo servico
    const novoServico = new Servico(tipoServico, precoServico);

    // Adicionando o novo servico à lista
    servicos.push({ tipoServico: novoServico.tipoServico, precoServico: novoServico.precoServico });

    // Salvando em localStorage
    localStorage.setItem("servicos", JSON.stringify(servicos));

    // Atualizando a lista de servicos
    atualizarListaServicos();

    // Resetando o formulario
    formServico.reset();
  });

  function atualizarListaServicos() {
    listaServicos.innerHTML = "";

    servicos.forEach((servico) => {
      const li = document.createElement("li");
      li.textContent = `Servico: ${servico.tipoServico}, Preco: R$${servico.precoServico}`;
      listaServicos.appendChild(li);
    });
  }
});
