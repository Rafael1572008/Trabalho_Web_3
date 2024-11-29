document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar os hóspedes e exibir na lista
    function carregarHospedes() {
      const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];

      console.log(lista_Hospedes)

      const listaHospedesElement = document.getElementById("lista-hospedes");
  
      // Limpa a lista antes de adicionar os hóspedes
      listaHospedesElement.innerHTML = '';
  
      if (lista_Hospedes.length === 0) {
        listaHospedesElement.innerHTML = '<li>Não há hóspedes cadastrados.</li>';
      } else {
        lista_Hospedes.forEach(hospede => {
          const listItem = document.createElement('li');
          listItem.textContent = `${hospede._nome} - CPF: ${hospede._cpf}`;
          // Cria um link para editar o hóspede
          const editarLink = document.createElement('button');
          editarLink.textContent = 'Editar';
          editarLink.addEventListener('click', function () {
            editarHospede(hospede._cpf);
          });
          listItem.appendChild(editarLink);
          listaHospedesElement.appendChild(listItem);
        });
      }
    }
  
    // Função para carregar os dados de um hóspede específico para edição
    function editarHospede(cpf) {
      const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
      const hospede = lista_Hospedes.find(h => h._cpf === cpf);
  
      if (hospede) {
        // Preenche o formulário de edição com os dados do hóspede
        document.getElementById("nome").value = hospede._nome;
        document.getElementById("cpf").value = hospede._cpf;  // O CPF não pode ser alterado
        document.getElementById("telefone").value = hospede._telefone;
        document.getElementById("email").value = hospede._email;
        document.getElementById("endereco").value = hospede._endereco;
        document.getElementById("senha").value = hospede._senha;
  
        // Exibe o formulário de edição
        document.getElementById("form-editar").style.display = "block";
  
        // Ao enviar o formulário, salva as alterações
        document.getElementById("form-editar").addEventListener("submit", function (event) {
          event.preventDefault();
          
          // Coleta os valores do formulário
          const nome = document.getElementById("nome").value.trim();
          const telefone = document.getElementById("telefone").value.trim();
          const email = document.getElementById("email").value.trim();
          const endereco = document.getElementById("endereco").value.trim();
          const senha = document.getElementById("senha").value.trim();
  
          // Atualiza os dados do hóspede no array
          hospede._nome = nome;
          hospede._telefone = telefone;
          hospede._email = email;
          hospede._endereco = endereco;
          hospede._senha = senha;
  
          // Atualiza o localStorage com os novos dados
          localStorage.setItem("hospedes", JSON.stringify(lista_Hospedes));
  
          alert("Dados do hóspede atualizados com sucesso!");
  
          // Esconde o formulário após a edição
          document.getElementById("form-editar").style.display = "none";
  
          // Recarrega a lista de hóspedes
          carregarHospedes();
        });
      }
    }
  
    // Inicializa a lista de hóspedes ao carregar a página
    carregarHospedes();
  });
  