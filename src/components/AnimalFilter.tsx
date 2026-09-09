import { uniqueLabels } from "../services/filterUtils";

const AnimalFilter = ({ filters, patchFilters, defaultData }: any) => {
    const animals = uniqueLabels((defaultData || []).map((pet: any) => pet.animal));

    return (
        <div className="header-filter">
            <label>Animal</label>
            <select
                value={filters.animals[0] || ""}
                onChange={(event) => patchFilters({
                    animals: event.target.value ? [event.target.value] : [],
                    breeds: []
                })}
            >
                <option value="">All</option>
                {animals.map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    );
};

export default AnimalFilter;
