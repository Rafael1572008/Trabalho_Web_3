// Função para exibir os hóspedes na tabela
function exibir_Hospedes() {
  const lista_Hospedes = document.getElementById("lista_Hospedes");
  lista_Hospedes.innerHTML = ""; // Limpa a lista

  // Obtendo a lista de hóspedes do localStorage
  const Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];

  // Itera sobre os hóspedes e cria linhas para cada um
  Hospedes.forEach((hospede) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${hospede._nome}</td>
      <td>${hospede._cpf}</td>
      <td>${hospede._telefone}</td>
      <td>${hospede._email}</td>
      <td>${hospede._endereco}</td>
    `;

    lista_Hospedes.appendChild(row);
  });
}

// Chama a função ao carregar a página
window.onload = exibir_Hospedes;
