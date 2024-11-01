document.addEventListener("DOMContentLoaded", function () {
  const formHospede = document.getElementById("cadastro_hospede"); // Corrigido ID
  const listaHospedes = document.getElementById("lista_Hospedes"); // Corrigido para camelCase

  // Carrega os hóspedes do localStorage
  const hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];

  // Exibe os hóspedes já cadastrados
  atualizarListaHospedes();

  formHospede.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = formHospede.elements["nome"].value;
    const cpf = formHospede.elements["cpf"].value;
    const endereco = formHospede.elements["endereco"].value;
    const telefone = formHospede.elements["telefone"].value;
    const email = formHospede.elements["email"].value;
    const senha = formHospede.elements["senha"].value;

    hospedes.push({ nome, cpf, endereco, telefone, email, senha });

    // Atualiza o localStorage
    localStorage.setItem("hospedes", JSON.stringify(hospedes));

    atualizarListaHospedes();
    formHospede.reset();
  });

  function atualizarListaHospedes() {
    listaHospedes.innerHTML = "";

    hospedes.forEach((hospede) => {
      const li = document.createElement("li");
      li.textContent = `Nome: ${hospede.nome}, CPF: ${hospede.cpf}, Endereço: ${hospede.endereco}, Telefone: ${hospede.telefone}, Email: ${hospede.email}, Senha: ${hospede.senha}`;
      listaHospedes.appendChild(li);
    });
  }
});
