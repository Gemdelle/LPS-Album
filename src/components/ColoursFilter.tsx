import { useEffect, useRef, useState } from "react";
import { uniqueLabels } from "../services/filterUtils";

const ColoursFilter = ({ filters, patchFilters, defaultData }: any) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const colours = uniqueLabels((defaultData || []).map((pet: any) => pet.colour));
    const selected = new Set<string>(filters.colours || []);
    const selectedLabels = colours
        .filter(([key]) => selected.has(key))
        .map(([, label]) => label);
    const summary = selectedLabels.length === 0 ? "All" : selectedLabels.join(", ");

    useEffect(() => {
        if (!open) {
            return;
        }
        const onPointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("mousedown", onPointerDown);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("mousedown", onPointerDown);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const toggle = (key: string) => {
        const next = new Set(selected);
        if (next.has(key)) {
            next.delete(key);
        } else {
            next.add(key);
        }
        patchFilters({ colours: Array.from(next) });
    };

    return (
        <div className="header-filter colour-filter" ref={rootRef}>
            <label>Colour</label>
            <button
                type="button"
                className="colour-filter-toggle"
                title={summary}
                onClick={() => setOpen((value) => !value)}
            >
                {summary}
            </button>
            {open ? (
                <div className="colour-filter-menu">
                    <label className="colour-filter-option">
                        <input
                            type="checkbox"
                            checked={selected.size === 0}
                            onChange={() => patchFilters({ colours: [] })}
                        />
                        <span>All</span>
                    </label>
                    {colours.map(([key, label]) => (
                        <label key={key} className="colour-filter-option">
                            <input
                                type="checkbox"
                                checked={selected.has(key)}
                                onChange={() => toggle(key)}
                            />
                            <span>{label}</span>
                        </label>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ColoursFilter;
