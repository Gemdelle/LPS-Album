const YEARS = ["2016", "2020", "2022"];

const YearsFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter">
            <label>Year</label>
            <select
                value={filters.years[0] || ""}
                onChange={(event) => patchFilters({ years: event.target.value ? [event.target.value] : [] })}
            >
                <option value="">All</option>
                {YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export default YearsFilter;
