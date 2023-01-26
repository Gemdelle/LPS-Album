import '../styles/filterscatalogue.css';
import '../styles/bar.css';

const BarGames = ({ guessGameProgress }: any) => {

    const barProgress = (guessGameProgress * 100) / 16

    return (
        <aside>
           <div className="bar-container">
                <h1>GAME PROGRESS</h1>
                <div className="progressbar-container">
                    <div className="progressbar-complete" style={{ width: barProgress+'%' }}>
                        <div className="progressbar-liquid"></div>
                    </div>
                    <span className="progress">{guessGameProgress}/16</span>
                </div>
            </div>
        </aside>
    )
}

export default BarGames;