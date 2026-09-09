import { normalizeKey } from "../services/filterUtils";

const COLOURS = ["BLACK", "BLUE", "BROWN", "GRAY", "GREEN", "LIGHT_BLUE", "ORANGE", "PINK", "RED", "VIOLET", "WHITE", "YELLOW"];

const ColoursFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter">
            <label>Colour</label>
            <select
                value={filters.colours[0] || ""}
                onChange={(event) => patchFilters({ colours: event.target.value ? [event.target.value] : [] })}
            >
                <option value="">All</option>
                {COLOURS.map((colour) => (
                    <option key={colour} value={normalizeKey(colour)}>
                        {colour.replace("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ColoursFilter;
