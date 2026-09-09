import { DebounceInput } from "react-debounce-input";
import '../styles/name-filter.css';

const NameFilter = ({ filters, patchFilters }: any) => {
    return (
        <div className="header-filter name-filter-container">
            <DebounceInput
                placeholder="Search name..."
                minLength={1}
                debounceTimeout={400}
                value={filters.nameQuery}
                onChange={(event) => patchFilters({ nameQuery: String(event.target.value || "") })}
                className="name-input"
            />
        </div>
    );
};

export default NameFilter;
