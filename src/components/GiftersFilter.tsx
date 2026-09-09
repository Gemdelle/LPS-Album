import { useMemo } from "react";
import '../styles/gifters-filter.css';

const GiftersFilter = ({ filters, patchFilters, defaultData }: any) => {
    const gifters = useMemo(() => {
        const unique = new Set(
            (defaultData || []).map((item: any) => item.gifter).filter(Boolean)
        );
        return Array.from(unique);
    }, [defaultData]);

    return (
        <div className="gifters-container">
            <p className="title">Gifters </p>
            <select
                value={filters.gifter}
                onChange={(event) => patchFilters({ gifter: event.currentTarget.value })}
                className="select-gifters"
            >
                <option value="">Choose One</option>
                {gifters.map((gifter: any, index: number) => {
                    return <option key={index} value={String(gifter).toUpperCase()}>{gifter}</option>
                })}
            </select>
        </div>
    );
};

export default GiftersFilter;
