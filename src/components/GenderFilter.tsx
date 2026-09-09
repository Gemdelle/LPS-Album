const GenderFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter">
            <label>Gender</label>
            <select
                value={filters.genders[0] || ""}
                onChange={(event) => patchFilters({ genders: event.target.value ? [event.target.value] : [] })}
            >
                <option value="">All</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
            </select>
        </div>
    );
};

export default GenderFilter;
