import '../styles/guess.css';

const GuessPage = ({ setLocation }: any) => {

    setLocation("/games/guess");

    return (
        <main>
            <div id="guessing-container">
                <div id="guessing-image">
                    <img src={`${process.env.PUBLIC_URL}/Images/1.jpg`} alt="" />
                </div>
                <div id="answer-container">
                    <div id="answer-01">Answer 01</div>
                    <div id="answer-02">Answer 02</div>
                    <div id="answer-03">Answer 03</div>
                </div>
            </div>
        </main>
    )
}

export default GuessPage;