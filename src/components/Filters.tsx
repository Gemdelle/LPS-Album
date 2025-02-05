import '../styles/filters.css';

import NameFilter from "./NameFilter";
import IdFilter from "./IdFilter";
import GenderFilter from "./GenderFilter";
import TypesFilter from "./TypesFilter";
import AnimalFilter from "./AnimalFilter";
import GiftersFilter from "./GiftersFilter";
import ColoursFilter from "./ColoursFilter";
import YearsFilter from "./YearsFilter";

const Filters = ({ petShopData, setPetShopData, defaultData }: any) => {
    return (
        <div className="filters-container">
            <span className='filters-title'>Filters</span>
            <NameFilter setPetShopData={setPetShopData} defaultData={defaultData} className="name-filter"/>
            <GiftersFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <YearsFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <ColoursFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <IdFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <GenderFilter setPetShopData={setPetShopData} defaultData={defaultData} />
            <TypesFilter setPetShopData={setPetShopData} defaultData={defaultData} />
            <AnimalFilter petShopData={petShopData} setPetShopData={setPetShopData} defaultData={defaultData} />  
        </div>
    );
}

export default Filters;