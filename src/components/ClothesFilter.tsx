import { useState } from "react";

const ClothesFilter = ({ setPetShopData, defaultData }: any) => {
    const [selectedClothes, setSelectedClothes] = useState(new Set<string>());
    const [filterVisible, setFilterVisible] = useState(false);

    function selectClothes(event: any, areClothesOn: string) {
        if (event.target.checked) {
            setSelectedClothes(selectedClothes.add(areClothesOn))
        } else {
            selectedClothes.delete(areClothesOn);
            setSelectedClothes(selectedClothes);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selectedClothes.has(data.clothes.toUpperCase());
        }));
    }

    const showClothesContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className="arrow" onClick={showClothesContainer}></div>
                <span>Clothes</span>
            </div>

            <div className={filterVisible ? "clothes-container" : "hidden"}>
                <div>
                    <input type="checkbox" onChange={(event) => selectClothes(event, "YES")} />
                    <span>Yes</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectClothes(event, "NO")} />
                    <span>No</span>
                </div>
            </div>
        </div>
    );
};

export default ClothesFilter;