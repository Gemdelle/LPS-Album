export function normalizeKey(value: unknown) {
    return String(value ?? "")
        .toUpperCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function uniqueLabels(values: unknown[]) {
    const byKey = new Map<string, string>();
    (values || []).forEach((value) => {
        const label = String(value ?? "").trim();
        const key = normalizeKey(label);
        if (!key || byKey.has(key)) {
            return;
        }
        byKey.set(key, label);
    });
    return Array.from(byKey.entries()).sort((a, b) =>
        a[1].localeCompare(b[1], undefined, { sensitivity: "base" })
    );
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
