document
  .getElementById("form-cadastro-quarto")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtendo os dados do formulário
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const preco = parseFloat(document.getElementById("preco").value);

    // Criando o objeto do quarto
    const quarto = {
      numero,
      tipo,
      preco,
    };

    // Salvando em localStorage (ou qualquer armazenamento temporário)
    let quartos = JSON.parse(localStorage.getItem("quartos")) || [];
    quartos.push(quarto);
    localStorage.setItem("quartos", JSON.stringify(quartos));

    alert("Quarto cadastrado com sucesso!");
    this.reset(); // Limpa o formulário após o cadastro
  });
