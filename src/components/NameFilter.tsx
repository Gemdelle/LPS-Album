import { useState } from "react";
import { DebounceInput } from "react-debounce-input";

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
        <div>
            <span>Name: </span>
            <div>
                <span>All</span>
                <input type="radio" name="name" onChange={allFilterSelected} checked={selectedFilterOption === 0}></input>
            </div>
            <div>
                <span>Name</span>
                <input type="radio" name="name" onChange={nameFilterSelected} checked={selectedFilterOption === 1}></input>
            </div>
            <div>
                <span>No Name</span>
                <input type="radio" name="name" onChange={noNameFilterSelected} checked={selectedFilterOption === 2}></input>
            </div>

            <div>
                <span>Filter Name</span>
                <DebounceInput
                    placeholder="search here..."
                    minLength={1}
                    debounceTimeout={500}
                    onChange={nameFilter}
                />
            </div>

            <div>
                <span>Single</span>
                <input type="radio" name="name-words" onChange={() => filterByWordAmount(1)} checked={selectedNameWordsOption === 1}></input>
            </div>
            <div>
                <span>Double</span>
                <input type="radio" name="name-words" onChange={() => filterByWordAmount(2)} checked={selectedNameWordsOption === 2}></input>
            </div>
            <div>
                <span>Triple</span>
                <input type="radio" name="name-words" onChange={() => filterByWordAmount(3)} checked={selectedNameWordsOption === 3}></input>
            </div>

            <div>
                <span>Quadriple</span>
                <input type="radio" name="name-words" onChange={() => filterByWordAmount(4)} checked={selectedNameWordsOption === 4}></input>
            </div>
        </div>
    )
};

export default NameFilter;