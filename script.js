
const gameBoard = (() => {

    let start,end;
    const gameBoard = [];
    for(let i=0;i<9;i++)
        gameBoard[i] = "";
    let checkBoard = function(symbol,cboard) {
        let count=0;
        for(let i=0;i<7;i+=3)
        {
            if(cboard[i]==symbol)
            {
                count=0
                for(let j=i+1;j<i+3;j++)
                {
                    if(cboard[j]==cboard[i])
                        count++;
                        if(count==2)
                        {
                            start = i
                            end = i+2
                            return 1;
                        }
                }
            }
        }  

        count = 0;
        for(let i=0;i<3;i++)
        {
            if(cboard[i]==symbol)            
            {
                count=0
                for(let j=i+3;j<9;j+=3)
                {
                    
                    if(cboard[j]==cboard[i])
                        count++;
                        if(count==2)
                        {
                            start = i
                            end = i+6
                            return 1;
                        }
                }
            }
        }  
    
        if(cboard[0]!=""&&cboard[0]==cboard[4]&&cboard[4]==cboard[8])
        {
            start = 0
            end = 8
            return 1;
        }
        if(cboard[2]!=""&&cboard[2]==cboard[4]&&cboard[4]==cboard[6])
        {
            start = 2
            end = 6
            return 1;
        }
        return 0;
        
    }
    const updateBoard = (pos,symbol)=> {
        gameBoard[pos] = symbol;
    }
    const returnBoard = () => gameBoard;

    const setStart = (value) => {
        start = value;
    }
    const setEnd= (value) => {
        end = value;
    }

    const strokeBoard = (color) =>{
        const canvas = document.querySelector('#canvas');
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        if(start == 2 && end == 8)
        {
            context.moveTo(255,0);
            context.lineTo(255,150);
        }
        else if(start == 1 && end == 7)
        {
            context.moveTo(152,0);
            context.lineTo(152,150);
        }
        else if(start == 0 && end == 6)
        {
            context.moveTo(48,0);
            context.lineTo(48,150);
        }
        else if(start == 6 && end == 8)
        {
            context.moveTo(0,128);
            context.lineTo(300,128); 
        }
        else if(start == 3 && end == 5)
        {
            context.moveTo(0,76);
            context.lineTo(300,76);
        }
        else if(start == 0 && end == 2)
        {
            context.moveTo(0,25);
            context.lineTo(300,25);  
        }
        else if(start == 2 && end == 6)
        {
            context.moveTo(300,0);
            context.lineTo(0,152);
        }
        else if(start == 0 && end == 8)
        {
            context.moveTo(0,0);
            context.lineTo(800,400);
        }
        context.lineWidth = 100;
        context.strokeStyle = color;
        context.lineWidth = 1;
        canvas.style.zIndex = '1';
        context.stroke()
        context.stroke()
        context.stroke()
        context.stroke()
        context.stroke()
        context.stroke()
        displayController.cross.play();
    
        
    }

    const getStart = () => start;
    const getEnd = () => end;

    const checkDraw = (dboard) =>{
        let flag = 0;
        for(let i = 0;i<9;i++)
        {
            if(dboard[i] == "")
                flag = 1;
        }
        if(flag==1)
            return 0;
        else
            return 1;
    }
    
    const boardSize = () =>{
        let size=0;
        for(let i=0;i<9;i++)
        {
            if(gameBoard[i]!="")
                size++;
        }
        return size;
    }

    return {checkBoard,updateBoard,returnBoard,strokeBoard,
        setStart,setEnd,checkDraw,boardSize};

})();


const game = (() => {
    let round = 5;
    let name1;
    let name2;
    const choices = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let bpos;
    let count = 0,pick,p1,p2;
    const scoreBoard = document.querySelector('.scoreBoard');
    const score1 = document.querySelector('#player1');
    const score2 = document.querySelector('#player2');
    const ROUND = document.querySelector('#round');
    const form = document.querySelector('.initialization');
    const input1 = document.querySelector('#user1');
    const input2 = document.querySelector('#user2');
    const checkBot = document.querySelector('#checkbox');

    checkBot.addEventListener('click',()=>{
        if(checkBot.checked==true)
        {
            input2.value = "Bot";
            input2.disabled = true;
            displayController.botActive = 1;
        }
        else{
            input2.value = "";
            displayController.botActive = 0;
            input2.disabled = false;
        }
    })

    function randomHumanMove(board){
        for(let i=0;i<9;i++){
            if(board[i]=="")
            {
                board[i]=player1.symbol;
                return i;
            }
        }
    }
    function randomBotMove(board){
        for(let i=0;i<9;i++){
            if(board[i]=="")
            {
                board[i]=player2.symbol;
                return i;

            }
        }
    }

    const makeMove = (board) => {
        let decision = [0,0,[]];
        for(let i=0;i<9;i++){
            iboard = board.slice();

            if(iboard[i]=="")
            {
                iboard[i] = player2.symbol;
                if(gameBoard.checkBoard(player2.symbol,iboard)==1)
                {
                    decision = [1,i,iboard];
                    return decision;
                }
                else if(gameBoard.checkDraw(iboard)==1){
                    decision = [0,i,iboard]; 
                    return decision;    
                }
                else{
                    for(let j=0;j<9;j++){
                        jboard = iboard.slice();
                        if(jboard[j]=="")
                        {
                            jboard[j] = player1.symbol;
                            if(gameBoard.checkBoard(player1.symbol,jboard)==1)
                            {
                                decision = [-1,j,jboard];
                                return decision;
                            }
                            else if(gameBoard.checkDraw(jboard)==1){
                                decision = [0,j,jboard];     
                                return decision;
                            }
                            else{
                                x = game.makeMove(jboard);
                                if(x[0]>decision[0])
                                {
                                    decision = x;
                                    return decision;
                                }
                        }
                    }
                }
            }
        }      
    }
    return decision;
}

    const reflectBotMove = (bposition) => {
            
            document.querySelector(`#c${bposition}`).textContent = '○';
            document.querySelector(`#c${bposition}`).style.color = 'white';
            gameBoard.updateBoard(bposition,'○');
            displayController.turn = !displayController.turn;
            if(gameBoard.checkBoard(player2.symbol,gameBoard.returnBoard())==1)
            {
                    gameBoard.strokeBoard('white');
                    updateScore(player2);
                    updateRound();
                    if(getRound()==0)
                        gameOver();

            }
            if(gameBoard.checkDraw(gameBoard.returnBoard())==1)
            {
                reset()
                updateRound();
                if(getRound()==0)
                    gameOver();
            }
        }
    

    const initialize = () => {
        name1 = input1.value;
        name2 = input2.value;
        if(name1==""||name2==""&&checkBot.checked==false)
            return;
        displayController.start.play();
        player1.name = name1;
        player2.name = name2;
        ROUND.textContent =  `Round : ${round}`;
        displayController.gameStart = 1;
        form.style.visibility = 'hidden';
        scoreBoard.style.visibility = 'visible';
        score1.textContent = `${name1} : 0`;
        score2.textContent = `${name2} : 0`;


    }

    const restart = () =>{
        displayController.start.play();
        input2.disabled = false;
        checkBot.checked = false;
        round = 5;
        displayController.gameStart = 0;
        ROUND.style.color = '#67e8f9';
        scoreBoard.style.visibility = 'hidden';
        form.style.visibility = 'visible';
        input1.value = "";
        input2.value = "";
        ROUND.textContent = "";
        player1.score = 0;
        player2.score = 0;
        updateScoreBoard();
        gameBoard.returnBoard().length = 0;
        gameBoard.setEnd(0);
        gameBoard.setStart(0);
        for(let i=0;i<=8;i++)
            gameBoard.updateBoard(i,"")
        displayController.cell.forEach(element => {
            element.textContent = "";});
    }

    const reset = () => {
        displayController.turn = 0;
        gameBoard.returnBoard().length = 0;
        gameBoard.setEnd(0);
        gameBoard.setStart(0);
        for(let i=0;i<=8;i++)
            gameBoard.updateBoard(i,"");
        displayController.cell.forEach(element => {
            element.textContent = "";
        setTimeout(()=>{
            canvas.style.zIndex = 0;
        },300)
        
        })
    }
    
    const getRound = () => round;

    const updateRound = () => {
        ROUND.textContent = `Round : ${--round}`;
        console.log(gameBoard.returnBoard())
        reset()
    }

    const updateScore = (player) =>{
        player.score++;
        updateScoreBoard(player);
    }

    const updateScoreBoard = () => {
            score1.textContent = `${name1} : ${player1.score}`;
            score2.textContent = `${name2} : ${player2.score}`;

    }

    const gameOver = () => {
        let winner,draw = 0;
        displayController.gameStart = 0;
        if(player1.score > player2.score)
            winner = player1
        else if(player2.score > player1.score)
            winner = player2
        else
            draw = 1;
        announce(winner,draw)
    }

    const announce = (winner,draw) => {
        if(!draw)
        {
            ROUND.textContent = `${winner.name.toUpperCase()}  WON!`;
            displayController.win.play();
        }
        else{
            ROUND.textContent = 'DRAW';
        }
        ROUND.style.color = 'white';
    }    

    return {gameOver,updateRound,updateScore,getRound,restart,reset,
           initialize,makeMove,reflectBotMove};

})();

const player = (str) => {
    let score = 0;
    let name = "";
    let symbol = str;
    return {score,symbol};
}

let player1 = player('×');
let player2 = player('○');

const displayController = (() => {
    const cell = document.querySelectorAll('.cell');
    let turn = 0;
    let gameStart = 0;
    let botActive = 0;
    let pos;
    const win =  new Audio("win.mp3");
    const cross =  new Audio("cross.mp3");
    const start =  new Audio("start.mp3");

    cell.forEach(element => {
        element.addEventListener('click',()=>{
            displayController.pos = element.getAttribute('id')[1];
            let symbol;
            if((gameBoard.returnBoard()[displayController.pos]==""&&(game.getRound()!=0))
            &&(displayController.gameStart==1))
            {
                if(displayController.turn == 0)
                {
                    element.textContent = player1.symbol;
                    symbol = player1.symbol;
                    gameBoard.updateBoard(displayController.pos,symbol);
                    displayController.turn = !displayController.turn;
                    
                }
                else if(displayController.turn==1)
                {
                    if(displayController.botActive==0)
                    {
                        element.textContent = player2.symbol;
                        symbol = player2.symbol;
                        gameBoard.updateBoard(displayController.pos,symbol);
                        displayController.turn = !displayController.turn;
                    }
                }      
                if(symbol=='×')
                {
                    element.style.color = '#67e8f9';
                    player0 = player1;
                   
                }
                else
                {
                    element.style.color = 'white';
                    player0 = player2;
                }
                
                if(gameBoard.checkBoard(symbol,gameBoard.returnBoard())==1)
                {
                    gameBoard.strokeBoard(element.style.color);
                    game.updateScore(player0);
                    game.updateRound();
                    if(game.getRound()==0)
                        game.gameOver();

                }
                if(gameBoard.checkDraw(gameBoard.returnBoard())==1)
                {
                    game.reset()
                    game.updateRound();
                    if(game.getRound()==0)
                        game.gameOver();
                }
                if(displayController.botActive==1&&gameBoard.boardSize()!=9)
                {
                        move = game.makeMove(gameBoard.returnBoard())[1];
                        game.reflectBotMove(move);
                }

            }
        })
    });

const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click',()=>
{game.restart()});

const startButton = document.querySelector('#gameStart')
startButton.addEventListener('click',()=>{
    game.initialize();

})
   
    return {turn,cross,win,start,gameStart,cell,botActive,pos}

})();
