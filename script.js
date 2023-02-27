
let cell = document.querySelectorAll('.cell');
let turn = 0;
let gameBoard = [];
for(let i=0;i<9;i++)
    gameBoard[i] = "";

    cell.forEach(element => {
        element.addEventListener('click',()=>{
            let id = element.getAttribute('id')[1];
            let symbol;
            if(gameBoard[id]=="")
            {
                if(turn == 0)
                {
                    element.textContent = player1.symbol;
                    gameBoard[id] = player1.symbol;
                    symbol = player1.symbol;
                    turn = !turn;
                }
                else if(turn==1)
                {
                    element.textContent = player2.symbol;
                    gameBoard[id] = player2.symbol;
                    symbol = player2.symbol;
                    turn = !turn;
                }          
                element.style.color = 'white';
                if(checkBoard(symbol)==1)
                    console.log("somebody won");


            }
        })
    });
   
const player = (str) => {
    let score = 0;
    let symbol = str;
    return {score,symbol};
}

let player1 = player('×');
let player2 = player('○');

//'×'○'

let checkBoard = function(symbol) {
    var count=0;
    for(let i=0;i<7;i+=3)
    {
        if(gameBoard[i]==symbol)
        {
            for(let j=i+1;j<i+3;j++)
            {
                if(gameBoard[j]==gameBoard[i])
                    count++;
            }
        }
    }  
    if(count>=2)
        return 1;
    count = 0;
    for(let i=0;i<3;i++)
    {
        if(gameBoard[i]==symbol)
        {
            for(let j=i+3;j<9;j+=3)
            {
                if(gameBoard[j]==gameBoard[i])
                    count++;
            }
        }
    }  
    if(count>=2)
        return 1;
    if(gameBoard[0]!=""&&gameBoard[0]==gameBoard[4]&&gameBoard[4]==gameBoard[8])
        return 1;
    if(gameBoard[2]!=""&&gameBoard[2]==gameBoard[4]&&gameBoard[4]==gameBoard[6])
        return 1;
    return 0;
    
}


