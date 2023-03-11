
let cell = document.querySelectorAll('.cell');
let turn = 0;
let gameStart = 0;
const win =  new Audio("win.mp3");
const cross =  new Audio("cross.mp3")
const start =  new Audio("start.mp3")



const gameBoard = (() => {

    let start,end;
    const gameBoard = [];
    for(let i=0;i<9;i++)
        gameBoard[i] = "";
    let checkBoard = function(symbol) {
        let count=0;
        for(let i=0;i<7;i+=3)
        {
            if(gameBoard[i]==symbol)
            {
                count=0
                for(let j=i+1;j<i+3;j++)
                {
                    if(gameBoard[j]==gameBoard[i])
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
            if(gameBoard[i]==symbol)            
            {
                count=0
                for(let j=i+3;j<9;j+=3)
                {
                    
                    if(gameBoard[j]==gameBoard[i])
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
    
        if(gameBoard[0]!=""&&gameBoard[0]==gameBoard[4]&&gameBoard[4]==gameBoard[8])
        {
            start = 0
            end = 8
            return 1;
        }
        if(gameBoard[2]!=""&&gameBoard[2]==gameBoard[4]&&gameBoard[4]==gameBoard[6])
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
        cross.play();
    
        
    }

    const getStart = () => start;
    const getEnd = () => end;

    const checkDraw = () =>{
        let flag = 0;
        for(let i = 0;i<9;i++)
        {
            if(gameBoard[i] == "")
                flag = 1;
        }
        if(flag==1)
            return 0;
        else
            return 1;
    }

    return {checkBoard,updateBoard,returnBoard,strokeBoard,setStart,setEnd,checkDraw};

})();


const game = (() => {
    let round = 5;
    let name1;
    let name2;
    const scoreBoard = document.querySelector('.scoreBoard');
    const score1 = document.querySelector('#player1');
    const score2 = document.querySelector('#player2');
    const ROUND = document.querySelector('#round');
    const form = document.querySelector('.initialization');
    const input1 = document.querySelector('#user1');
    const input2 = document.querySelector('#user2');

    const initialize = () => {
        name1 = input1.value;
        name2 = input2.value;
        if(name1==""||name2=="")
            return;
        start.play();
        player1.name = name1;
        player2.name = name2;
        ROUND.textContent =  `Round : ${round}`;
        gameStart = 1;
        form.style.visibility = 'hidden';
        scoreBoard.style.visibility = 'visible';
        score1.textContent = `${name1} : 0`;
        score2.textContent = `${name2} : 0`;


    }

    const restart = () =>{
        start.play();
        round = 5;
        gameStart = 0;
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
        cell.forEach(element => {
            element.textContent = "";});
    }

    const reset = () => {
        turn = 0;
        gameBoard.returnBoard().length = 0;
        gameBoard.setEnd(0);
        gameBoard.setStart(0);
        for(let i=0;i<=8;i++)
            gameBoard.updateBoard(i,"");
        cell.forEach(element => {
            element.textContent = "";
        setTimeout(()=>{
            canvas.style.zIndex = 0;
        },300)
        
        })
    }
    
    const getRound = () => round;

    const updateRound = () => {
        ROUND.textContent = `Round : ${--round}`;
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
        gameStart = 0;
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
            win.play();
        }
        else{
            ROUND.textContent = 'DRAW';
        }
        ROUND.style.color = 'white';
    }    

    return {gameOver,updateRound,updateScore,getRound,restart,reset,initialize};

})();

    cell.forEach(element => {
        element.addEventListener('click',()=>{
            let pos = element.getAttribute('id')[1];
            let symbol;
            if((gameBoard.returnBoard()[pos]==""&&(game.getRound()!=0))&&(gameStart==1))
            {
                if(turn == 0)
                {
                    element.textContent = player1.symbol;
                    symbol = player1.symbol;
                    gameBoard.updateBoard(pos,symbol);
                    turn = !turn;
                }
                else if(turn==1)
                {
                    element.textContent = player2.symbol;
                    symbol = player2.symbol;
                    gameBoard.updateBoard(pos,symbol);
                    turn = !turn;
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
                
                if(gameBoard.checkBoard(symbol)==1)
                {
                    gameBoard.strokeBoard(element.style.color);
                    console.log("somebody won");
                    game.updateScore(player0);
                    game.updateRound();
                    if(game.getRound()==0)
                        game.gameOver();

                }
                if(gameBoard.checkDraw()==1)
                {
                    game.reset()
                    game.updateRound();
                    if(game.getRound()==0)
                        game.gameOver();
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
   
const player = (str) => {
    let score = 0;
    let name = "";
    let symbol = str;
    return {score,symbol};
}

let player1 = player('×');
let player2 = player('○');

