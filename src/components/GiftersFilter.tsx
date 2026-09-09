import { uniqueLabels } from "../services/filterUtils";

const GiftersFilter = ({ filters, patchFilters, defaultData }: any) => {
    const gifters = uniqueLabels((defaultData || []).map((pet: any) => pet.gifter));

    return (
        <div className="header-filter">
            <label>Gifter</label>
            <select
                value={filters.gifter || ""}
                onChange={(event) => patchFilters({ gifter: event.target.value })}
            >
                <option value="">All</option>
                {gifters.map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    );
};

export default GiftersFilter;
