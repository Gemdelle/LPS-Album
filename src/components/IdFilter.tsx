import { useState } from "react";
import { DebounceInput } from "react-debounce-input";

const IdFilter = ({ setPetShopData, defaultData }: any) => {
    const [minRageIdValue, setMinRageIdValue] = useState(0);
    const [maxRageIdValue, setMaxRageIdValue] = useState(0);

    const [filterVisible, setFilterVisible] = useState(false);

    function idFilter(event: any) {
        const inputValue = event.target.value;
        if (inputValue == '') {
            setPetShopData(defaultData);
        } else {
            setPetShopData(defaultData.filter((data: any) => {
                return inputValue === '' || data.id == inputValue;
            }));
        }
    }

    function minRangeIdFilter(event: any) {
        const inputValue = event.target.value == '' ? 0 : Number(event.target.value);
        setMinRageIdValue(inputValue);

        if (inputValue == 0 && maxRageIdValue == 0) {
            setPetShopData(defaultData);
        } else if (inputValue >= 0 && maxRageIdValue > 0) {
            setPetShopData(defaultData.filter((data: any) => {
                return data.id >= inputValue && data.id <= maxRageIdValue;
            }));
        } else {
            setPetShopData(defaultData.filter((data: any) => {
                return data.id >= inputValue;
            }));
        }
    }

    function maxRangeIdFilter(event: any) {
        const inputValue = event.target.value == '' ? 0 : Number(event.target.value);
        setMaxRageIdValue(inputValue);

        if (minRageIdValue == 0 && inputValue == 0) {
            setPetShopData(defaultData);
        } else if (minRageIdValue >= 0 && inputValue > 0) {
            setPetShopData(defaultData.filter((data: any) => {
                return data.id >= minRageIdValue && data.id <= inputValue;
            }));
        } else {
            setPetShopData(defaultData.filter((data: any) => {
                return data.id >= minRageIdValue;
            }));
        }
    }

    const showIdContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className="arrow" onClick={showIdContainer}></div>
                <span>Id</span>
            </div>

            <div className={filterVisible ? "id-filter-container" : "id-filter-container + hidden"}>
                <div className="specific-id-filter">
                    <span>Specific: </span>
                    <DebounceInput
                        placeholder="search here..."
                        minLength={1}
                        debounceTimeout={500}
                        onChange={idFilter}
                    />
                </div>
                <div className="range-id-filter">
                    <p>Range: </p>
                    <div className="min-max-range">
                        <span>Min</span>
                        <DebounceInput
                            placeholder="search here..."
                            minLength={1}
                            debounceTimeout={500}
                            onChange={minRangeIdFilter}
                        />
                        <br />
                        <span>Max</span>
                        <DebounceInput
                            placeholder="search here..."
                            minLength={1}
                            debounceTimeout={500}
                            onChange={maxRangeIdFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default IdFilter;