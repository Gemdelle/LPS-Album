import '../styles/filters.css';

import NameFilter from "./NameFilter";
import IdFilter from "./IdFilter";
import GenderFilter from "./GenderFilter";
import TypesFilter from "./TypesFilter";
import AnimalFilter from "./AnimalFilter";
import GiftersFilter from "./GiftersFilter";
import ColoursFilter from "./ColoursFilter";
import YearsFilter from "./YearsFilter";
import ClothesFilter from "./ClothesFilter";

const Filters = ({ petShopData, setPetShopData, defaultData }: any) => {
    return (
        <aside className="album-aside">
            <span>Filters</span>
            <NameFilter setPetShopData={setPetShopData} defaultData={defaultData} className="name-filter"/>
            <GiftersFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <ClothesFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <YearsFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <ColoursFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <IdFilter setPetShopData={setPetShopData} defaultData={defaultData}/>
            <GenderFilter setPetShopData={setPetShopData} defaultData={defaultData} />
            <TypesFilter setPetShopData={setPetShopData} defaultData={defaultData} />
            <AnimalFilter petShopData={petShopData} setPetShopData={setPetShopData} defaultData={defaultData} />  
        </aside>
    );
}

export default Filters;