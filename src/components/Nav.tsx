import '../styles/nav.css';
import { NavLink } from 'react-router-dom'; /* Para usar el active cuando se ingresa a una de las páginas. */
import NameFilter from "./NameFilter";
import GiftersFilter from "./GiftersFilter";
import YearsFilter from "./YearsFilter";
import ColoursFilter from "./ColoursFilter";
import IdFilter from "./IdFilter";
import GenderFilter from "./GenderFilter";
import TypesFilter from "./TypesFilter";
import AnimalFilter from "./AnimalFilter";
import OwnedFilter from "./OwnedFilter";

const Nav = ({ data, rawData, defaultData, petShopData, setPetShopData, setCatalogueData }: any) => {

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

    // const totalPorveldam = totalOwned.filter((data: any) => {
    //     return data.bloodline == "Porveldam";
    // });

    // const totalSpadelline = totalOwned.filter((data: any) => {
    //     return data.bloodline == "Spadelline";
    // });

    // const totalZephiroth = totalOwned.filter((data: any) => {
    //     return data.bloodline == "Zephiroth";
    // });

    // const totalGladasmy = totalOwned.filter((data: any) => {
    //     return data.bloodline == "Gladasmy";
    // });

    // const totalIllwhyrim = totalOwned.filter((data: any) => {
    //     return data.bloodline == "Illwhyrim";
    // });



    return (
        <nav>
            <ul className="navholder">
                <li className='link'><NavLink style={{ textDecoration: 'none' }} to="/" className={({ isActive }) => `${isActive ? "active" : ""}` }><span>Catalogue</span></NavLink></li>
                <li className='link'><NavLink style={{ textDecoration: 'none' }} to="/names" className={({ isActive }) => `${isActive ? "active" : ""}`}><span>Names</span></NavLink></li>
                <li className='link'><NavLink style={{ textDecoration: 'none' }} to="/guess-game"><span>Game</span></NavLink></li>
            </ul>

            <div className='filter-container'>
                <NameFilter setPetShopData={setPetShopData} defaultData={defaultData} className="name-filter"/>
                <OwnedFilter setCatalogueData={setCatalogueData} defaultData={defaultData} />
                <GiftersFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
                <YearsFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
                <ColoursFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
                <IdFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
                <GenderFilter setPetShopData={setPetShopData} defaultData={defaultData} />
                <TypesFilter setPetShopData={setPetShopData} defaultData={defaultData} />
                <AnimalFilter petShopData={petShopData} setPetShopData={setPetShopData} defaultData={defaultData} />
            </div>

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
                {/* <div className='bloodlines-container'>
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
                </div> */}
            </div>
        </nav>
    )
}

export default Nav;