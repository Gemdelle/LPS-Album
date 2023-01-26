import '../styles/filterscatalogue.css';
import IdFilter from "./IdFilter";
import OwnedFilter from './OwnedFilter';
import default_image from "../assets/default_image.jpg";

const FiltersCatalogue = ({ data, defaultData, setCatalogueData, selectedPetShop }: any) => {

    return (
        <aside>

            <div className='petshop-info'>
                <span id='selected-pet'>Selected Pet</span>
                <span>Name: {selectedPetShop.name}</span>
                <span>Id: {selectedPetShop.id}</span>
                <span>Animal: {selectedPetShop.animal}</span>
                <div className='petshop-image'>
                    <img src={`Images/${selectedPetShop.id}.jpg` || default_image} alt="" />
                </div>
            </div>

            <span>Filters</span>
            <OwnedFilter setCatalogueData={setCatalogueData} defaultData={defaultData} />
            <IdFilter setPetShopData={setCatalogueData} defaultData={defaultData} />

        </aside>
    );
}

export default FiltersCatalogue;