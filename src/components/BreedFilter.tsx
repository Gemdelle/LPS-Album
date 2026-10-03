import { useEffect } from "react";
import { breedChoices, hasMissingBreed } from "../services/filterUtils";

const BreedFilter = ({ filters, patchFilters, defaultData }: any) => {
    const selectedAnimal = filters.animals[0] || "";
    const breeds = breedChoices(defaultData || [], selectedAnimal);
    const showMissing = breeds.length > 0 && hasMissingBreed(defaultData || [], selectedAnimal);
    const selected = filters.breeds[0] || "";
    const selectedIsValid = !selected || (selected === "-" && showMissing) || breeds.some(([key]) => key === selected);

    useEffect(() => {
        if (!selectedIsValid) {
            patchFilters({ breeds: [], variants: [] });
        }
    }, [selectedIsValid, patchFilters]);

    if (breeds.length === 0) {
        return (
            <div className="header-filter">
                <label>Breed</label>
                <select value="" disabled>
                    <option value="">-</option>
                </select>
            </div>
        );
    }

    return (
        <div className="header-filter">
            <label>Breed</label>
            <select
                value={selectedIsValid ? selected : ""}
                onChange={(event) => patchFilters({
                    breeds: event.target.value ? [event.target.value] : [],
                    variants: []
                })}
            >
                <option value="">All</option>
                {showMissing ? <option value="-">-</option> : null}
                {breeds.map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    );
};

export default BreedFilter;
