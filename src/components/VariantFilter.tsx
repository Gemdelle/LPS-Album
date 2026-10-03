import { useEffect } from "react";
import { variantChoices } from "../services/filterUtils";

const VariantFilter = ({ filters, patchFilters, defaultData }: any) => {
    const selectedAnimal = filters.animals[0] || "";
    const selectedBreed = filters.breeds[0] || "";
    const variants = variantChoices(defaultData || [], selectedAnimal, selectedBreed);
    const selected = filters.variants[0] || "";
    const selectedIsValid = !selected || selected === "-" || variants.some(([key]) => key === selected);

    useEffect(() => {
        if (!selectedIsValid) {
            patchFilters({ variants: [] });
        }
    }, [selectedIsValid, patchFilters]);

    if (variants.length === 0) {
        return (
            <div className="header-filter">
                <label>Variant</label>
                <select value="" disabled>
                    <option value="">-</option>
                </select>
            </div>
        );
    }

    return (
        <div className="header-filter">
            <label>Variant</label>
            <select
                value={selectedIsValid ? selected : ""}
                onChange={(event) => patchFilters({
                    variants: event.target.value ? [event.target.value] : []
                })}
            >
                <option value="">All</option>
                <option value="-">-</option>
                {variants.map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    );
};

export default VariantFilter;
