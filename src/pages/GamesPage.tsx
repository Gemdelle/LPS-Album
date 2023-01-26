import { NavLink } from "react-router-dom";
import '../styles/games.css';

const GamesPage = ({ setLocation }: any) => {

    setLocation("/games");

    return (
        <main>
            <div id="games-container">
                <div><NavLink to="/games/guess">Guess</NavLink></div>
                <div><NavLink to="/games/write">Write</NavLink></div>
            </div>
        </main>
    )
}

export default GamesPage;