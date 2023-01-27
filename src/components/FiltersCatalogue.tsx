import '../styles/filterscatalogue.css';
import IdFilter from "./IdFilter";
import OwnedFilter from './OwnedFilter';
import default_image from "../assets/default_image.jpg";

const FiltersCatalogue = ({ data, defaultData, setCatalogueData, selectedPetShop }: any) => {

    return (
        <aside>

            <div className='petshop-info'>
                <span id='selected-pet' className='filters-title'>Selected Pet</span>
                <div className='selected-petshop-info'>
                    <span><i>Name: </i>{selectedPetShop.name}</span>
                    <span><i>Id: </i>{selectedPetShop.id}</span>
                    <span><i>Animal: </i>{selectedPetShop.animal}</span>
                </div>
                <div className='petshop-image'>
                    <img src={`Images/${selectedPetShop.id}.jpg` || default_image} alt="" />
                </div>
            </div>

            <span className='filters-title'>Filters</span>
            <OwnedFilter setCatalogueData={setCatalogueData} defaultData={defaultData} />
            <IdFilter setPetShopData={setCatalogueData} defaultData={defaultData} />

        </aside>
    );
}

export default FiltersCatalogue;