// Classe Frigobar
class Frigobar {
  constructor(refri = 0, agua = 0, cerveja = 0) {
    this._refri = refri;
    this._agua = agua;
    this._cerveja = cerveja;
  }
}

// Classe Quarto
class Quarto {
  constructor(numero, tipo, preco, frigobar) {
    this._numero = numero;
    this._tipo = tipo;
    this._preco = preco;
    this._frigobar = frigobar; // Objeto da classe Frigobar
  }
}

// Lógica do formulário de cadastro de quartos
document.getElementById("form-cadastro-quarto")?.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtendo os dados do formulário
  const numero = document.getElementById("numero").value;
  const tipo = document.getElementById("tipo").value;
  const preco = parseFloat(document.getElementById("preco").value);

  // Obtendo os dados do frigobar
  const refri = parseInt(document.getElementById("refri").value) || 0;
  const agua = parseInt(document.getElementById("agua").value) || 0;
  const cerveja = parseInt(document.getElementById("cerveja").value) || 0;

  // Criando o objeto do frigobar
  const frigobar = new Frigobar(refri, agua, cerveja);

  // Criando o objeto do quarto
  const quarto = new Quarto(numero, tipo, preco, frigobar);

  // Salvando em localStorage
  let quartos = JSON.parse(localStorage.getItem("quartos")) || [];
  quartos.push({
    _numero: quarto._numero,
    _tipo: quarto._tipo,
    _preco: quarto._preco,
    _frigobar: {
      _refri: frigobar._refri,
      _agua: frigobar._agua,
      _cerveja: frigobar._cerveja,
    },
  });
  localStorage.setItem("quartos", JSON.stringify(quartos));

  alert("Quarto cadastrado com sucesso!");
  this.reset(); // Limpa o formulário após o cadastro
});
