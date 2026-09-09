const TYPES = [
    { value: "NORMAL", label: "Normal" },
    { value: "HAIRY", label: "Hairy" },
    { value: "FUZZY", label: "Fuzzy" },
    { value: "EVENT", label: "Event" },
    { value: "POSTCARD", label: "Postcard" },
    { value: "SHINY", label: "Shiny" },
    { value: "FAIRY", label: "Fairy" },
];

const TypesFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter">
            <label>Type</label>
            <select
                value={filters.types[0] || ""}
                onChange={(event) => patchFilters({ types: event.target.value ? [event.target.value] : [] })}
            >
                <option value="">All</option>
                {TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
        </div>
    );
};

export default TypesFilter;
