import { normalizeKey } from "../services/filterUtils";

const ANIMALS = [
    "Bear", "Bee", "Bird", "Cat", "Dog", "Ferret", "Fish",
    "Guinea Pig", "Hamster", "Monkey", "Owl", "Rabbit", "Snail", "Turtle"
];

const AnimalFilter = ({ filters, patchFilters }: any) => {
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
                {ANIMALS.map((animal) => (
                    <option key={animal} value={normalizeKey(animal)}>{animal}</option>
                ))}
            </select>
        </div>
    );
};

export default AnimalFilter;
