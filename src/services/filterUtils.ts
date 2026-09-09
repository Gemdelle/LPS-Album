export function normalizeKey(value: unknown) {
    return String(value ?? "")
        .toUpperCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function toggleSetValue(current: Set<string>, value: string, checked: boolean) {
    const next = new Set(current);
    if (checked) {
        next.add(value);
    } else {
        next.delete(value);
    }
    return next;
}
