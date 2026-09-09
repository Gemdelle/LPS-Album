const STORAGE_KEY = "lps-album-overrides";

export type PetPatch = Record<string, any>;

export function loadOverrides(): Record<string, PetPatch> {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
}

export function saveOverride(id: string | number, patch: PetPatch) {
    const all = loadOverrides();
    const key = String(id);
    all[key] = { ...all[key], ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearOverrides() {
    localStorage.removeItem(STORAGE_KEY);
}

export function applyOverrides(data: any[]) {
    const overrides = loadOverrides();
    return data.map((item) => {
        const extra = overrides[String(item.id)];
        return extra ? { ...item, ...extra } : item;
    });
}

export function isFavourite(value: unknown) {
    return value === true || String(value).toLowerCase() === "true";
}

export function vipLevel(value: unknown) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return 0;
    }
    return Math.min(2, parsed);
}

export function nextVipLevel(value: unknown) {
    return String((vipLevel(value) + 1) % 3);
}

export function mergePet(list: any[], id: string | number, patch: PetPatch) {
    return list.map((pet) => (String(pet.id) === String(id) ? { ...pet, ...patch } : pet));
}
