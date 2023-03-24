//Variáveis globais úteis
const boardsRegion = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame(){
    //inicializa as variáveis
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    //Ajusta o título do jogador (caso seja necessário)
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    //Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
    boardsRegion.forEach(function (element){
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

//Função para verificar as áreas que dão vitória ao jogador
function getWinRegions(){
    const winRegions = []

    if(vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push('0.0', '0.1', '0.2')
    if(vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push('1.0', '1.1', '1.2')
    if(vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push('2.0', '2.1', '2.2')
    if(vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push('0.0', '0.1', '0.2')
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

//Desabilita a área selecionada pelo jogador
function disableRegion(element){
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
}

//Pinta a área onde o jogador venceu e mostra seu nome
function handleWin(regions){
    regions.forEach(function(region){
        document.querySelector('[data-region="' + region +'"]').classList.add('win')
    })
    const playerName = document.getElementById('turnPlayer').innerText
    document.querySelector('h2').innerHTML = playerName + ' venceu !'
}

//Função para adicionar 'X' ou 'O' onde o jogador clicou
function handleBoardClick(ev){
    //Obtem os indices da região clicada
    const span = ev.currentTarget
    const region = span.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    //Marca a região clicada pelo jogador
    if(turnPlayer === 'player1'){
        span.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }

    //limpa o console e exibe um tabuleiro virtual (usado para controle e teste)
    console.clear()
    console.table(vBoard)
    //desabilita a região clicada
    disableRegion(span)
    //Verifica se alguém venceu
    const winRegions = getWinRegions()
    if(winRegions.length > 0){
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

//Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)