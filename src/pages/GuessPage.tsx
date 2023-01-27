import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/guess.css';

const Cheats = ({ toggleCheats }: any) => {
    return (
        <div className="cheats" onClick={toggleCheats}>CHEATS</div>
    )
}

const FinishGame = ({ guessGameProgress, replay, setCurrentGuessIndex }: any) => {

    function resetGame() {
        setCurrentGuessIndex(0);
        replay();
    }

    return (
        <div className="finish-container">
            <span>{guessGameProgress} / 16</span>
            <img src='https://gifs.eco.br/wp-content/uploads/2021/06/gifs-de-parabens-19.gif' />
            <div onClick={resetGame}>REPLAY</div>
        </div>
    )
}

const GuessGame = ({ selectedPetshop, answerRight, answerWrong, cheatsEnabled, guessGameProgress }: any) => {
    const answers = selectedPetshop.answers.sort(function () {
        return Math.random() - 0.5;
    });

    function selectedAnswer(answer: any) {
        if (selectedPetshop.correctAnswer == answer) {
            answerRight();
        } else {
            answerWrong();
        }
    }

    return (
        <div id="guessing-container">
            <div id="guessing-image">
                <img src={selectedPetshop.image} alt="" />
            </div>
            <span>{guessGameProgress}/16</span>
            <div id="answer-container">
                {answers.map((answer: any, index: any) => {
                    return <div
                        key={index}
                        onClick={() => selectedAnswer(answer)}
                        className={cheatsEnabled && (selectedPetshop.correctAnswer == answer) ? "correct-answer" : ""}>
                        {answer}
                    </div>
                })}
            </div>
        </div>
    )
}

const GuessPage = ({ setLocation, defaultData, incrementGameProgress, guessGameProgress, replay }: any) => {
    const namedPetshops = defaultData.filter((petshop: any) => petshop.name !== '');

    const currentLocation = useLocation();

    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [cheatsEnabled, setCheatsEnabled] = useState(false);

    var auxillairy: any[] = [];
    var pickedCount = 0;
    var currentSelection: any = {};

    setLocation("/guess-game");

    while (pickedCount <= 15) {
        currentSelection = namedPetshops[Math.floor(Math.random() * namedPetshops.length)]
        auxillairy.push({
            image: `Images/${String(currentSelection.id).split(" - ")[0]}.jpg`,
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

    function showContent() {
        if (currentGuessIndex <= 15) {
            return <GuessGame
                selectedPetshop={selectedPetshops[currentGuessIndex]}
                guessGameProgress={guessGameProgress}
                answerRight={answerRight}
                answerWrong={answerWrong}
                cheatsEnabled={cheatsEnabled}
            />
        } else {
            return <FinishGame guessGameProgress={guessGameProgress} replay={replay} setCurrentGuessIndex={setCurrentGuessIndex} />
        }
    }

    function toggleCheats() {
        setCheatsEnabled(!cheatsEnabled);
    }

    useEffect(() => {
        replay();
    }, [currentLocation]);

    return (
        <main>
            <Cheats toggleCheats={toggleCheats} />
            {showContent()}
        </main>
    )
}

export default GuessPage;