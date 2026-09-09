import { normalizeKey, uniqueLabels } from "../services/filterUtils";

const BreedFilter = ({ filters, patchFilters, defaultData }: any) => {
    const selectedAnimal = filters.animals[0] || "";
    const pets = (defaultData || []).filter((pet: any) =>
        !selectedAnimal || normalizeKey(pet.animal) === selectedAnimal
    );
    const breeds = uniqueLabels(pets.map((pet: any) => pet.breed));

    return (
        <div className="header-filter">
            <label>Breed</label>
            <select
                value={filters.breeds[0] || ""}
                onChange={(event) => patchFilters({
                    breeds: event.target.value ? [event.target.value] : []
                })}
            >
                <option value="">All</option>
                {breeds.map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    );
};

export default BreedFilter;
