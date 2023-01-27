import { useState } from "react";

const ColoursFilter = ({ setPetShopData, defaultData }: any) => {
    const [selectedColours, setSelectedColours] = useState(new Set<string>());

    const [filterVisible, setFilterVisible] = useState(false);

    function selectColour(event: any, colour: string) {
        if (event.target.checked) {
            setSelectedColours(selectedColours.add(colour))
        } else {
            selectedColours.delete(colour);
            setSelectedColours(selectedColours);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selectedColours.has(data.colour.toUpperCase().split(' ').join('_'));
        }));
    }

    const showColourContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className="arrow" onClick={showColourContainer}></div>
                <span>Colour</span>
            </div>

            <div className={filterVisible ? "colour-container" : "colour-container + hidden"}>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "BLACK")} />
                    <span>Black</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "BLUE")} />
                    <span>Blue</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "BROWN")} />
                    <span>Brown</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "GRAY")} />
                    <span>Gray</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "GREEN")} />
                    <span>Green</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "LIGHT_BLUE")} />
                    <span>Light Blue</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "ORANGE")} />
                    <span>Orange</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "PINK")} />
                    <span>Pink</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "RED")} />
                    <span>Red</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "VIOLET")} />
                    <span>Violet</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "WHITE")} />
                    <span>White</span>
                </div>
                <div>
                    <input type="checkbox" onChange={(event) => selectColour(event, "YELLOW")} />
                    <span>Yellow</span>
                </div>
            </div>
        </div>
    );
}

export default ColoursFilter;