
let amigos = [];
let sorteioRealizado = false; // Variável para controlar se o sorteio já foi realizado

function adicionarAmigo() {
    // Capturar o valor do campo de entrada
    let nome = document.getElementById('amigo').value; // usando o ID correto do input
    
    // Validar a entrada
    if (nome != '') {
        // Atualizar o array de amigos
        amigos.push(nome);
        // Atualizar a lista na página
        atualizarListaAmigos();
        // Limpar o campo de entrada
        limparCampo();
        // Resetar o botão se necessário (caso estejam adicionando novos amigos após sorteio)
        // Como agora o botão "Novo Sorteio" limpa tudo, não precisamos mais resetar automaticamente
        // resetarBotaoSorteio();
    } else {
        alert("Por favor, insira um nome.");
    }
}

// Função que percorre o array amigos e adiciona cada nome como um elemento <li>
function atualizarListaAmigos() {
    // Obter o elemento da lista
    let lista = document.getElementById('listaAmigos');
    
    // Limpar a lista existente
    lista.innerHTML = "";
    
    // Percorrer o array e adicionar cada amigo como um item da lista
    for (let amigo of amigos) {
        lista.innerHTML += `<li>${amigo}</li>`;
    }
}

// Função para limpar campo
function limparCampo() {
    let campoNome = document.getElementById('amigo'); // usando o ID correto do input
    campoNome.value = '';
}

// Função para sortear amigos
function sortearAmigo() {
    // Se já foi realizado um sorteio, limpar tudo e começar novamente
    if (sorteioRealizado) {
        reiniciarSorteio();
        return;
    }
    
    // Validar que há amigos disponíveis
    if (amigos.length < 4) {
        alert("Adicione pelo menos 4 amigos para fazer o sorteio");
        return;
    }
    
    // Gerar sorteio usando algoritmo Fisher-Yates
    let sorteio = amigos.slice(); // cria uma cópia do array
    for (let i = sorteio.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]]; // swap
    }
    
    // Mostrar o resultado
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = "<h3>Resultado do Sorteio:</h3>";

    for (let i = 0; i < sorteio.length; i++) {
        let amigo = sorteio[i];
        let amigoSecreto = sorteio[(i + 1) % sorteio.length]; // o último pega o primeiro
        resultado.innerHTML += `${amigo} tirou ${amigoSecreto}<br>`;
    }
    
    // Atualizar o botão após o sorteio
    atualizarBotaoSorteio();
}

// Função para atualizar o texto do botão após o sorteio
function atualizarBotaoSorteio() {
    let botao = document.querySelector('.button-draw'); // seleciona pela classe
    if (botao) {
        // Preserva a imagem e altera apenas o texto
        botao.innerHTML = `
            <img src="assets/play_circle_outline.png" alt="Ícone para sortear">
            Novo Sorteio
        `;
        sorteioRealizado = true;
    }
}

// Função para resetar o botão quando novos amigos são adicionados
function resetarBotaoSorteio() {
    if (sorteioRealizado) {
        let botao = document.querySelector('.button-draw');
        if (botao) {
            // Volta ao texto original mantendo a imagem
            botao.innerHTML = `
                <img src="assets/play_circle_outline.png" alt="Ícone para sortear">
                Sortear amigo
            `;
            sorteioRealizado = false;
        }
    }
}

// Função para reiniciar completamente o sorteio
function reiniciarSorteio() {
    // Limpar array de amigos
    amigos = [];
    sorteioRealizado = false;
    
    // Limpar lista de amigos na tela
    atualizarListaAmigos();
    
    // Limpar campo de entrada
    limparCampo();
    
    // Limpar resultado
    let resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = '';
    }
    
    // Resetar botão para o estado original
    let botao = document.querySelector('.button-draw');
    if (botao) {
        botao.innerHTML = `
            <img src="assets/play_circle_outline.png" alt="Ícone para sortear">
            Sortear amigo
        `;
    }
}