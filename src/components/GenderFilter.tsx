import '../styles/gender-filter.css';

import { useState } from "react";

const GenderFilter = ({ setPetShopData, defaultData }: any) => {

    const [filterVisible, setFilterVisible] = useState(false);

    function selectFemale(event: any) {
        if (event.target.checked) {
            setPetShopData(defaultData.filter((data: any) => {
                return data.gender === "F"
            }));
        } else {
            setPetShopData(defaultData);
        }
    }

    function selectMale(event: any) {
        if (event.target.checked) {
            setPetShopData(defaultData.filter((data: any) => {
                return data.gender === "M"
            }));
        } else {
            setPetShopData(defaultData);
        }
    }

    const showGenderContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className={filterVisible ? "rotating-arrow" : "arrow"} onClick={showGenderContainer}></div>
                <span>Gender</span>
            </div>
            
            <div className={filterVisible ? "gender-filter-container checks-container" : "hidden"}>
                <div className='female-container'>
                    <input type="checkbox" onChange={selectFemale} />
                    <div className="female"></div>
                </div>
                <div className='male-container'>
                    <input type="checkbox" onChange={selectMale} />
                    <div className="male"></div>
                </div>
            </div>
        </div>
    );
};

export default GenderFilter;