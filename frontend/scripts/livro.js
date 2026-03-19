// 1. Pegar o elemento HTML onde vamos jogar os dados
const container = document.getElementById("container");

// 2. Extrair o ID que veio na URL (ex: ?id=3)
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");


fetch("http://localhost:3000/livros/" + id)
.then(response => response.json())
.then(response => {
    document.title = response.nome

    const div = document.createElement("div");
    const div2 = document.createElement("div");

    const nome = document.createElement("h2");
    const imagem = document.createElement("img");
    const preco = document.createElement("p");
    const descricao = document.createElement("p");

    const btnExcluir = document.createElement("button");
    btnExcluir.setAttribute("id", "btnExcluir");
    btnExcluir.innerText = "Excluir";

    btnExcluir.addEventListener("click", () => {
        fetch("http://localhost:3000/livros/" + id, {
            method: "DELETE"
        })
        .then(() => {
            alert("Livro excluído com sucesso");
            window.location.href = "../pages/index.html";
        })
        .catch(erro => console.error("Erro ao excluir livro: ", erro));
    })

    nome.innerText = response.nome;
    preco.innerText = "R$ " + response.preco;
    imagem.src = response.imagem;
    descricao.innerText = response.descricao;

    div.appendChild(imagem);

    div2.appendChild(nome);
    div2.appendChild(preco);
    div2.appendChild(descricao);
    div2.appendChild(btnExcluir);

    container.appendChild(div);
    container.appendChild(div2);
})