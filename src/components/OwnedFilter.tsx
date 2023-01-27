import { useState } from "react";

const OwnedFilter = ({ setCatalogueData, defaultData }: any) => {
    const [selectedOwned, setSelectedOwned] = useState(new Set<string>());
    const [filterVisible, setFilterVisible] = useState(false);

    function selectOwned(event: any, isOwned: string) {
        if (event.target.checked) {
            setSelectedOwned(selectedOwned.add(isOwned))
        } else {
            selectedOwned.delete(isOwned);
            setSelectedOwned(selectedOwned);
        }

        setCatalogueData(defaultData.filter((data: any) => {
            return selectedOwned.has(data.status.toUpperCase());
        }));
    }

    const showClothesContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className="arrow" onClick={showClothesContainer}></div>
                <span>Owned</span>
            </div>

            <div className={filterVisible ? "clothes-container" : "hidden"}>
                <div className='option'>
                    <input type="checkbox" onChange={(event) => selectOwned(event, "OWNED")} />
                    <span>Yes</span>
                </div>
                <div className='option'>
                    <input type="checkbox" onChange={(event) => selectOwned(event, "NOT_OWNED")} />
                    <span>No</span>
                </div>
            </div>
        </div>
    );
};

export default OwnedFilter;