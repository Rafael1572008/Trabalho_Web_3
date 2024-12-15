// Classe para representar os Quartos
class Quarto {
  constructor(numero, tipo, preco) {
    this._numero = numero;
    this._tipo = tipo;
    this._preco = preco;
  }
}

// Lógica do formulário de cadastro de quartos
// Adiciona um ouvinte de evento para o formulário de cadastro de quartos, caso ele exista na página
document.getElementById("form-cadastro-quarto")?.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

  // Obtendo os dados do formulário
  const numero = document.getElementById("numero").value;
  const tipo = document.getElementById("tipo").value;
  const preco = parseFloat(document.getElementById("preco").value);


   // Criando novo quarto
  const quarto = new Quarto(numero, tipo, preco);

   // Recupera a lista de quartos armazenada no localStorage ou inicializa como um array vazio
  let quartos = JSON.parse(localStorage.getItem("quartos")) || [];

  // Adiciona o novo quarto na lista
  quartos.push({
    _numero: quarto._numero,
    _tipo: quarto._tipo,
    _preco: quarto._preco,
  });

  // Atualiza o localStorage com a lista de quartos atualizada
  localStorage.setItem("quartos", JSON.stringify(quartos));

  // Exibe uma mensagem de confirmação ao usuário
  alert("Quarto cadastrado com sucesso!");
  
  // Reseta o formulário, limpando todos os campos
  this.reset(); 
});
