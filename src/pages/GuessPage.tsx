import { useState } from 'react';
import '../styles/guess.css';

const GuessGame = ({ selectedPetshop, answerRight, answerWrong }: any) => {
    const answers = selectedPetshop.answers.sort(function () {
        return Math.random() - 0.5;
    });

    function selectedAnswer(answer: any) {
        if (selectedPetshop.correctAnswer == answer) {
            debugger;
            answerRight();
        } else {
            debugger;
            answerWrong();
        }
    }

    return (
        <div id="guessing-container">
            <div id="guessing-image">
                <img src={selectedPetshop.image} alt="" />
            </div>
            <div id="answer-container">
                {answers.map((answer: any, index: any) => {
                    return <div key={index} onClick={() => selectedAnswer(answer)}>{answer}</div>
                })}
            </div>
        </div>
    )
}

const GuessPage = ({ setLocation, defaultData, incrementGameProgress, guessGameProgress }: any) => {
    const namedPetshops = defaultData.filter((petshop: any) => petshop.name !== '');
    
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);


    var auxillairy: any[] = [];
    var pickedCount = 0;
    var currentSelection: any = {};

    setLocation("/guess-game");

    while (pickedCount < 15) {
        currentSelection = namedPetshops[Math.floor(Math.random() * namedPetshops.length)]
        auxillairy.push({
            image: `Images/${currentSelection.id}.jpg`,
            answers: [
                currentSelection.name,
                namedPetshops[Math.floor(Math.random() * namedPetshops.length)].name,
                namedPetshops[Math.floor(Math.random() * namedPetshops.length)].name,
            ],
            correctAnswer: currentSelection.name
        });
        pickedCount++
    }

    const [selectedPetshops, setSelectedPetshops] = useState(auxillairy);

    function answerRight() {
        if (guessGameProgress <= 15) {
            incrementGameProgress();
            setCurrentGuessIndex(currentGuessIndex + 1);
        } 
    }

    function answerWrong() {
        if (guessGameProgress <= 15) {
            setCurrentGuessIndex(currentGuessIndex + 1);
        }
        
    }

    return (
        <main>
            <GuessGame selectedPetshop={selectedPetshops[currentGuessIndex]} answerRight={answerRight} answerWrong={answerWrong} />
        </main>
    )
}

export default GuessPage;