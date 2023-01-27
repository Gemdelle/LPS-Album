import { useState } from "react";
import { DebounceInput } from "react-debounce-input";

import '../styles/name-filter.css';

const NameFilter = ({ setPetShopData, defaultData }: any) => {
    const [selectedFilterOption, setSelectedFilterOption] = useState(0);
    const [selectedNameWordsOption, setSelectedNameWordsOption] = useState(0);

    function noNameFilterSelected(event: any) {
        if (event.currentTarget.checked) {
            setPetShopData(defaultData.filter((item: any) => item.name === ''));
            setSelectedFilterOption(2);
        }
    }

    function nameFilterSelected(event: any) {
        if (event.currentTarget.checked) {
            setPetShopData(defaultData.filter((item: any) => item.name !== ''));
            setSelectedFilterOption(1);
        }
    }

    function allFilterSelected() {
        setPetShopData(defaultData);
        setSelectedFilterOption(0);
    }

    function filterByWordAmount(amount: number) {
        setPetShopData(defaultData.filter((data: any) => {
            return data.name !== "" && data.name.split(" ").length === amount;
        }));
        setSelectedNameWordsOption(amount);
    }

    function nameFilter(event: any) {
        const inputValue = event.target.value;
        if (inputValue == '') {
            setPetShopData(defaultData);
        } else {
            setPetShopData(defaultData.filter((data: any) => {
                return inputValue === '' || data.name.toLowerCase().includes(inputValue);
            }));
        }
    }

    return (
        <div className="name-filter-container">
            <span className="title">Name</span>

            <div className="filter-name">
                <span>Filter Name</span>
                <DebounceInput
                    placeholder="search here..."
                    minLength={1}
                    debounceTimeout={500}
                    onChange={nameFilter}
                    className="name-input"
                />
            </div>

            <div className="simple-option">
                <div>
                    <input type="radio" name="name" onChange={allFilterSelected} checked={selectedFilterOption === 0}></input>
                    <span>All</span>
                </div>
                <div>
                    <input type="radio" name="name" onChange={nameFilterSelected} checked={selectedFilterOption === 1}></input>
                    <span>Name</span>
                </div>
                <div>
                    <input type="radio" name="name" onChange={noNameFilterSelected} checked={selectedFilterOption === 2}></input>
                    <span>No Name</span>
                </div>
            </div>

            <div className="name-number">
                <div>
                    <input type="radio" name="name-words" onChange={() => filterByWordAmount(1)} checked={selectedNameWordsOption === 1}></input>
                    <span>Single</span>
                </div>
                <div>
                    <input type="radio" name="name-words" onChange={() => filterByWordAmount(2)} checked={selectedNameWordsOption === 2}></input>
                    <span>Double</span>
                </div>
                <div>
                    <input type="radio" name="name-words" onChange={() => filterByWordAmount(3)} checked={selectedNameWordsOption === 3}></input>
                    <span>Triple</span>
                </div>

                <div>
                    <input type="radio" name="name-words" onChange={() => filterByWordAmount(4)} checked={selectedNameWordsOption === 4}></input>
                    <span>Quadriple</span>
                </div>
            </div>
        </div>
    )
};

export default NameFilter;