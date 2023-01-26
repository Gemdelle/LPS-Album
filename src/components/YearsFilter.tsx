import { useState } from "react";

const YearsFilter = ({ setPetShopData, defaultData }: any) => {
    const [selectedYears, setSelectedYears] = useState(new Set<string>());

    const [filterVisible, setFilterVisible] = useState(false);

    function selectYears(event: any, year: string) {
        if (event.target.checked) {
            setSelectedYears(selectedYears.add(year))
        } else {
            selectedYears.delete(year);
            setSelectedYears(selectedYears);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selectedYears.has(String(data.birthday));
        }));
    }

    const showYearsContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className="arrow" onClick={showYearsContainer}></div>
                <span>Year</span>
            </div>

            <div className={filterVisible ? "" : "hidden"}>
                <div>
                    <input type="checkbox" onChange={(event) => selectYears(event, "2016")} />
                    <span>2016</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectYears(event, "2020")} />
                    <span>2020</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectYears(event, "2022")} />
                    <span>2022</span>
                </div>
            </div>
        </div>
    );
};

export default YearsFilter;