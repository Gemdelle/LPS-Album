import { useState } from "react";

const TypesFilter = ({ setPetShopData, defaultData }: any) => {
    const [selectedTypes, setSelectedTypes] = useState(new Set<string>());

    const [filterVisible, setFilterVisible] = useState(false);

    function selectNormal(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("NORMAL"))
        } else {
            selection.delete("NORMAL");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    function selectHairy(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("HAIRY"))
        } else {
            selection.delete("HAIRY");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    function selectFuzzy(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("FUZZY"))
        } else {
            selection.delete("FUZZY");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    function selectEvent(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("EVENT"))
        } else {
            selection.delete("EVENT");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    function selectPostcard(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("POSTCARD"))
        } else {
            selection.delete("POSTCARD");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    function selectShiny(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("SHINY"))
        } else {
            selection.delete("SHINY");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    function selectFairy(event: any) {
        const selection = selectedTypes;

        if (event.target.checked) {
            setSelectedTypes(selection.add("FAIRY"))
        } else {
            selection.delete("FAIRY");
            setSelectedTypes(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.type.toUpperCase());
        }));
    }

    const showTypeContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className="arrow" onClick={showTypeContainer}></div>
                <span>Type</span>
            </div>

                <div className={filterVisible ? "checks-container" : "hidden"}>
                    <div>
                        <span>🏳</span>
                        <input type="checkbox" onChange={selectNormal} />
                    </div>
                    <div>
                        <span>✥</span>
                        <input type="checkbox" onChange={selectHairy} />
                    </div>
                    <div>
                        <span>✤</span>
                        <input type="checkbox" onChange={selectFuzzy} />
                    </div>
                    <div>
                        <span>🎖</span>
                        <input type="checkbox" onChange={selectEvent} />
                    </div>
                    <div>
                        <span>▩</span>
                        <input type="checkbox" onChange={selectPostcard} />
                    </div>
                    <div>
                        <span>✵</span>
                        <input type="checkbox" onChange={selectShiny} />
                    </div>
                    <div>
                        <span>✧</span>
                        <input type="checkbox" onChange={selectFairy} />
                    </div>
                </div>
            </div>
    );
};

export default TypesFilter;