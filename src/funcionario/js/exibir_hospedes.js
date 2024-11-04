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
        <td>${hospede.nome}</td>
        <td>${hospede.cpf}</td>
        <td>${hospede.telefone}</td>
        <td>${hospede.email}</td>
        <td>${hospede.endereco}</td>
      `;
  
      lista_Hospedes.appendChild(row);
    });
  }
  
  // Chama a função ao carregar a página
  window.onload = exibir_Hospedes;
  