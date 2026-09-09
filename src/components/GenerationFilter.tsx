import { formatGeneration, generationKey } from "../services/catalogueFilters";

const DEFAULT_GENERATIONS = ["1", "2", "3", "4", "5", "6", "7"];

const GenerationFilter = ({ filters, patchFilters, defaultData }: any) => {
    const extraGenerations = Array.from(
        new Set<string>(
            (defaultData || [])
                .map((pet: any) => generationKey(pet.generation))
                .filter((value: string) => value !== "" && !DEFAULT_GENERATIONS.includes(value))
        )
    ).sort();

    const generations = [...DEFAULT_GENERATIONS, ...extraGenerations];

    return (
        <div className="header-filter">
            <label>Generation</label>
            <select
                value={filters.generations[0] || ""}
                onChange={(event) => patchFilters({ generations: event.target.value ? [event.target.value] : [] })}
            >
                <option value="">All</option>
                {generations.map((generation) => (
                    <option key={generation} value={generation}>{formatGeneration(generation)}</option>
                ))}
            </select>
        </div>
    );
};

export default GenerationFilter;
