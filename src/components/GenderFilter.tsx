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
                <div className="arrow" onClick={showGenderContainer}></div>
                <span>Gender</span>
            </div>
            
            <div className={filterVisible ? "checks-container + gender-filter-container" : "gender-filter-container + hidden"}>
                <div>
                    <input type="checkbox" onChange={selectFemale} />
                    <div className="female"></div>
                </div>
                <div>
                    <input type="checkbox" onChange={selectMale} />
                    <div className="male"></div>
                </div>
            </div>
        </div>
    );
};

export default GenderFilter;