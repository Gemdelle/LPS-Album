import { DebounceInput } from "react-debounce-input";

const IdFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter">
            <label>Id</label>
            <DebounceInput
                placeholder="All"
                minLength={1}
                debounceTimeout={400}
                value={filters.specificId}
                onChange={(event) => patchFilters({ specificId: event.target.value })}
            />
        </div>
    );
};

export default IdFilter;
