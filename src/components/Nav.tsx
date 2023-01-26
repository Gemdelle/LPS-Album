import '../styles/nav.css';
import { NavLink } from 'react-router-dom'; /* Para usar el active cuando se ingresa a una de las páginas. */

const Nav = ({ data, rawData }: any) => {

    const totalOwned = rawData.filter((data: any) => {
        return data.status == "OWNED";
    });

    const totalNotOwned = rawData.filter((data: any) => {
        return data.status == "NOT_OWNED";
    });

    const totalNamed = totalOwned.filter((data: any) => {
        return data.name !== "";
    });

    const totalNotNamed = totalOwned.filter((data: any) => {
        return data.name == "";
    });

    const totalFeminin = totalOwned.filter((data: any) => {
        return data.gender == "F";
    });

    const totalMasculin = totalOwned.filter((data: any) => {
        return data.gender == "M";
    });

    const totalPorveldam = totalOwned.filter((data: any) => {
        return data.bloodline == "Porveldam";
    });

    const totalSpadelline = totalOwned.filter((data: any) => {
        return data.bloodline == "Spadelline";
    });

    const totalZephiroth = totalOwned.filter((data: any) => {
        return data.bloodline == "Zephiroth";
    });

    const totalGladasmy = totalOwned.filter((data: any) => {
        return data.bloodline == "Gladasmy";
    });

    const totalIllwhyrim = totalOwned.filter((data: any) => {
        return data.bloodline == "Illwhyrim";
    });



    return (
        <nav>
            <ul className="navholder">
                <li><NavLink style={{ textDecoration: 'none' }} to="/" className={({ isActive }) => isActive ? "active" : undefined}><span>Album</span></NavLink></li>
                <li><NavLink style={{ textDecoration: 'none' }} to="/catalogue" className={({ isActive }) => isActive ? "active" : undefined}><span>Catalogue</span></NavLink></li>
                <li><NavLink style={{ textDecoration: 'none' }} to="/guess-game"><span>Game</span></NavLink></li>
            </ul>
            <div className='stats-container'>
                <div className='owned-container'>
                    <div className='stat-owned'>
                        <div />
                        <span>{totalOwned.length}</span>
                    </div>
                    <div className='stat-not-owned'>
                        <div />
                        <span>{totalNotOwned.length}</span>
                    </div>
                </div>
                <div className='named-container'>
                    <div className='stat-named'>
                        <div />
                        <span>{totalNamed.length}</span>
                    </div>
                    <div className='stat-not-named'>
                        <div />
                        <span>{totalNotNamed.length}</span>
                    </div>
                </div>
                <div className='gender-container'>
                    <div className='stat-girls'>
                        <div />
                        <span>{totalFeminin.length}</span>
                    </div>
                    <div className='stat-boys'>
                        <div />
                        <span>{totalMasculin.length}</span>
                    </div>
                </div>
                <div className='bloodlines-container'>
                    <div className='stat-porveldam'>
                        <div />
                        <span>{totalPorveldam.length}</span>
                    </div>
                    <div className='stat-spadelline'>
                        <div />
                        <span>{totalSpadelline.length}</span>
                    </div>
                    <div className='stat-zephiroth'>
                        <div />
                        <span>{totalZephiroth.length}</span>
                    </div>
                    <div className='stat-gladasmy'>
                        <div />
                        <span>{totalGladasmy.length}</span>
                    </div>
                    <div className='stat-illwhyrim'>
                        <div />
                        <span>{totalIllwhyrim.length}</span>
                    </div>
                </div>
                <div className='stat-filter'>
                    <div />
                    <span>{data.length}</span>
                </div>
            </div>
        </nav>
    )
}

export default Nav;