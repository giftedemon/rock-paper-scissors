let humanScore;
let computerScore;

const getComputerChoice = () => {
    const computerChoice = Math.floor(Math.random() * 3);

    switch (computerChoice) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

const getHumanChoice = () => {
    while (true) {
    let humanChoice = prompt("Choose one of three variants: ");
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice == 'rock' || humanChoice == 'paper' || humanChoice == 'scissors') {
        return humanChoice
    }
}
}

const playRound = (humanChoice, computerChoice) => {
    if (humanChoice == 'rock') {
        if (computerChoice == 'rock') {
            console.log('Draw!');   
        }
        else if (computerChoice == 'paper') {
            console.log('You lose!');
            computerScore++;
        }
        else {
            console.log('You win!');
            humanScore++;
        }
    }

    else if (humanChoice == 'paper') {
        if (computerChoice == 'rock') {
            console.log('You win!');
            humanScore++;
        }
        else if (computerChoice == 'paper') {
            console.log('Draw!');
        }
        else {
            console.log('You lose!')
            computerScore++;
        } 
    }

    else {
        if (computerChoice == 'rock') {
            console.log('You lose!');
            computerScore++;
        }
        else if (computerChoice == 'paper') {
            console.log('You win!');
            humanScore++;
        }
        else {
            console.log('Draw');
        }
    }
}

const playGame = (rounds = 1) => {

    humanScore = 0;
    computerScore = 0;

    for (let i = 0; i < rounds; i++) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
    }

    if (humanScore > computerScore) {
        console.log(`You have ${humanScore} and bot has ${computerScore}. You won!`);
    }
    else if (humanScore < computerScore) {
        console.log(`You have ${humanScore} and bot has ${computerScore}. You lost!`);
    }
    else {
        console.log(`You have ${humanScore} and bot has ${computerScore}. Draw!`);
    }
}

const newGame = () => {
    let howManyRounds = parseInt(prompt('How many rounds want to play?'))
    playGame(howManyRounds);
    confirm('Play again?') ? newGame() : '';
}

newGame();