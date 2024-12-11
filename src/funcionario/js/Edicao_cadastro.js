document.addEventListener("DOMContentLoaded", function () {
  // Definir a classe Hospede
  class Hospede {
    constructor(nome, cpf, telefone, email, endereco, senha) {
      this._nome = nome;
      this._cpf = cpf;
      this._telefone = telefone;
      this._email = email;
      this._endereco = endereco;
      this._senha = senha;
    }

    // Método para atualizar os dados do hóspede
    atualizar(nome, telefone, email, endereco, senha) {
      this._nome = nome;
      this._telefone = telefone;
      this._email = email;
      this._endereco = endereco;
      this._senha = senha;
    }
  }

  // Função para carregar os hóspedes e exibir na lista
  function carregarHospedes() {
    const lista_Hospedes = JSON.parse(localStorage.getItem("hospedes")) || [];
    const listaHospedesElement = document.getElementById("lista-hospedes");
    listaHospedesElement.innerHTML = '';

    if (lista_Hospedes.length === 0) {
      listaHospedesElement.innerHTML = '<li>Não há hóspedes cadastrados.</li>';
    } else {
      lista_Hospedes.forEach(hospedeData => {
        const hospede = new Hospede(
          hospedeData._nome, 
          hospedeData._cpf, 
          hospedeData._telefone, 
          hospedeData._email, 
          hospedeData._endereco, 
          hospedeData._senha
        );
        
        const listItem = document.createElement('li');
        listItem.textContent = `${hospede._nome} - CPF: ${hospede._cpf}`;

        // Cria um botão para editar o hóspede
        const editarLink = document.createElement('button');
        editarLink.textContent = 'Editar';
        editarLink.addEventListener('click', () => editarHospede(hospede, lista_Hospedes));
        listItem.appendChild(editarLink);
        listaHospedesElement.appendChild(listItem);
      });
    }
  }

  // Função para carregar os dados de um hóspede específico para edição
  function editarHospede(hospede, lista_Hospedes) {
    // Preenche o formulário de edição com os dados do hóspede
    document.getElementById("nome").value = hospede._nome;
    document.getElementById("cpf").value = hospede._cpf;
    document.getElementById("telefone").value = hospede._telefone;
    document.getElementById("email").value = hospede._email;
    document.getElementById("endereco").value = hospede._endereco;
    document.getElementById("senha").value = hospede._senha;

    // Exibe o formulário de edição
    document.getElementById("form-editar").style.display = "block";

    // Salvar alterações
    document.getElementById("form-editar").onsubmit = function (event) {
      event.preventDefault();
    
      const nome = document.getElementById("nome").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const email = document.getElementById("email").value.trim();
      const endereco = document.getElementById("endereco").value.trim();
      const senha = document.getElementById("senha").value.trim();
      // Não tem cpf
    
      // Atualiza os dados do hóspede (o CPF permanece o mesmo)
      hospede.atualizar(nome, telefone, email, endereco, senha);
    
      // Atualiza o localStorage com os novos dados, ultilizar cpf para tal feito
      const index = lista_Hospedes.findIndex(h => h._cpf === hospede._cpf);
      lista_Hospedes[index] = hospede;
      localStorage.setItem("hospedes", JSON.stringify(lista_Hospedes));
    
      alert("Dados do hóspede atualizados com sucesso!");
    
      // Esconde o formulário após a edição
      document.getElementById("form-editar").style.display = "none";
    
      // Recarrega a lista de hóspedes
      carregarHospedes();
    };
  }

  // Inicializa a lista de hóspedes ao carregar a página
  carregarHospedes();
});
