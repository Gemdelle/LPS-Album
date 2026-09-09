const OwnedFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter">
            <label>Owned</label>
            <select
                value={filters.owned[0] || ""}
                onChange={(event) => patchFilters({ owned: event.target.value ? [event.target.value] : [] })}
            >
                <option value="">All</option>
                <option value="OWNED">Owned</option>
                <option value="NOT_OWNED">Not owned</option>
            </select>
        </div>
    );
};

export default OwnedFilter;
