// js/servicos.js

document.addEventListener("DOMContentLoaded", function () {
  const formServico = document.getElementById("form-servico");
  const listaServicos = document.getElementById("lista-servicos");

  const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

  atualizarListaServicos();

  formServico.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoServico = formServico.elements[0].value;
    const precoServico = formServico.elements[1].value;

    servicos.push({ tipoServico, precoServico });
    localStorage.setItem("servicos", JSON.stringify(servicos));

    atualizarListaServicos();
    formServico.reset();
  });

  function atualizarListaServicos() {
    listaServicos.innerHTML = "";

    servicos.forEach((servico) => {
      const li = document.createElement("li");
      li.textContent = `Serviço: ${servico.tipoServico}, Preço: R$${servico.precoServico}`;
      listaServicos.appendChild(li);
    });
  }
});
