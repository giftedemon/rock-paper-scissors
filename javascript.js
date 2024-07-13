let playerLives;
let computerLives;
let startGame = false;
const startGameParent = document.querySelector('.outcome-text');
const playerChoices = document.querySelectorAll('.choice');

const svgs = {'rock': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="160" height="160" color="#000000" fill="none">
                        <path d="M17 14.5C17 18.6421 13.6421 22 9.5 22C5.35786 22 2 18.6421 2 14.5C2 10.3579 5.35786 7 9.5 7C13.6421 7 17 10.3579 17 14.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M7 13L14.5 5.50003M18 2L16.5 3.5M22 6.00003L19 9M11 16L14 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
`,
'paper' : `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="160" height="160" color="#000000" fill="none">
                        <path d="M12.5294 2C16.5225 2 18.519 2 19.7595 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.7595 20.8284C18.519 22 16.5225 22 12.5294 22H11.4706C7.47751 22 5.48098 22 4.24049 20.8284C3 19.6569 3 17.7712 3 14L3 10C3 6.22876 3 4.34315 4.24049 3.17157C5.48098 2 7.47752 2 11.4706 2L12.5294 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 7H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 17H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
`,
'scissors':`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="160" height="160" color="#000000" fill="none">
                        <path d="M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M15 8L3 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.0003 16L11 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3 4.99999L8.5 9.99988" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
`
};

startGameParent.addEventListener('click', (event) => {
    if (event.target.classList.contains('start')) {
        const playerOutcome = document.querySelector('.player-choice');
        const computerOutcome = document.querySelector('.bot-choice');
        const textOutcome = document.querySelector('.outcome-text');
        const choiceTitle = document.querySelector('.choice-title');

        startGame = true;
        playerLives = 5;
        computerLives = 5;

        playerOutcome.innerHTML = '';
        computerOutcome.innerHTML = '';
        textOutcome.innerHTML = ``;

        choiceTitle.innerHTML = `
        <h3>Choose a weapon!</h4>
        `;
    }
});

playerChoices.forEach((choice) => {
    choice.addEventListener('click', (event) => {

        if (startGame) {

        const clickedElementParent = event.target.closest('.choice');

        const playerChoice = clickedElementParent.querySelector('p').innerText.toLowerCase();

        const computerChoice = getComputerChoice(); 
        
        playRound(playerChoice, computerChoice)
    }

        else {
            alert('Press Start the Game!')
        }
    })
})

const playRound = (playerChoice, computerChoice) => {
    
    const roundWinner = findRoundWinner(playerChoice, computerChoice);

        if (roundWinner === 'tie') {
        }
        else if (roundWinner) {
            computerLives--;
        }
        else {
            playerLives--;
        }

        if (playerLives <= 0 || computerLives <= 0) {
            endGame(playerChoice, computerChoice, roundWinner);
        }
        else {
            showOutcome(playerChoice, computerChoice, roundWinner); }
}

const showOutcome = (playerChoice, computerChoice, lastRoundWinner) => {
    const textOutcome = document.querySelector('.outcome-text');

    const textsOutcome = getTextOutcome(lastRoundWinner);

    showChoices(playerChoice, computerChoice);

    textOutcome.innerHTML = `
    <h3>${textsOutcome['roundOutcome']}</h3>
    <p>${textsOutcome.text[0]}, your ${playerChoice} ${textsOutcome.text[1]} bot's ${computerChoice}.</p>
    <div class="lives">
        <h4>You have ${playerLives} lives left.</h4>
        <h4>Opponent has ${computerLives} lives left.</h4>
    </div>
    `;
}

const endGame = (playerChoice, computerChoice, lastRoundWinner) => {
    const textOutcome = document.querySelector('.outcome-text');

    const gameWinner = findGameWinner();

    const textsOutcome = getTextOutcome(lastRoundWinner)

    startGame = false;

    showChoices(playerChoice, computerChoice);

    textOutcome.innerHTML = `
    <h3>${gameWinner} won the Game!</h3>
    <p>${textsOutcome.text[0]}, your ${playerChoice} ${textsOutcome.text[1]} bot's ${computerChoice}.</p>
    <p>Press Start the Game to play again.</p>
    <div class="lives">
        <h4>You have ${playerLives} lives left.</h4>
        <h4>Opponent has ${computerLives} lives left.</h4>
    </div>
    <button class="start">Start the Game!<button>
    `;
}





const showChoices = (playerChoice, computerChoice) => {

    const playerOutcome = document.querySelector('.player-choice');
    const computerOutcome = document.querySelector('.bot-choice');

    playerOutcome.innerHTML = `
    <h4>You chose:</h4>
    ${svgs[playerChoice]}
    `;

    computerOutcome.innerHTML = `
    <h4>Opponent chose:</h4>
    ${svgs[computerChoice]}
    `;
}

const findRoundWinner = (playerChoice, computerChoice) => {
    let playerWon = 'tie';

    if (playerChoice == 'rock') {
        if (computerChoice == 'rock') {
        }
        else if (computerChoice == 'paper') {
            playerWon = false;
        }
        else {
            playerWon = true;
        }
    }

    else if (playerChoice == 'paper') {
        if (computerChoice == 'rock') {
            playerWon = true;
        }
        else if (computerChoice == 'paper') {
        }
        else {
            playerWon = false;
        } 
    }

    else {
        if (computerChoice == 'rock') {
            playerWon = false;
        }
        else if (computerChoice == 'paper') {
            playerWon = true;
        }
        else {
        }
    }

    return playerWon;
}

const getTextOutcome = (lastRoundWinner) => {
    let textsOutcome = {};

    if (lastRoundWinner == 'tie') {
        textsOutcome['roundOutcome'] = "It's a tie!";
        textsOutcome['text'] = ['Suprisingly', 'equally clashes with'];
    }
    else if (lastRoundWinner) {
        textsOutcome['roundOutcome'] = 'You won!';
        textsOutcome['text'] = ['Fortunately', 'beats'];
    }
    else {
        textsOutcome['roundOutcome'] = 'You lost!';
        textsOutcome['text'] = ['Unfortunately', 'loses to'];
    }

    return textsOutcome;
}

const findGameWinner = () => {
    if (playerLives > computerLives) {
        return 'You';
    }
    return 'Your opponent';
}

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