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

export function breedChoices(pets: any[], selectedAnimal: string) {
    const list = pets || [];
    if (selectedAnimal) {
        const scoped = list.filter((pet) => normalizeKey(pet.animal) === selectedAnimal);
        const breeds = uniqueLabels(scoped.map((pet) => pet.breed));
        return breeds.length > 1 ? breeds : [];
    }

    const counts = new Map<string, Set<string>>();
    list.forEach((pet) => {
        const animal = normalizeKey(pet.animal);
        const breed = normalizeKey(pet.breed);
        if (!animal || !breed) {
            return;
        }
        if (!counts.has(animal)) {
            counts.set(animal, new Set());
        }
        counts.get(animal)?.add(breed);
    });

    return uniqueLabels(
        list
            .filter((pet) => (counts.get(normalizeKey(pet.animal))?.size || 0) > 1)
            .map((pet) => pet.breed)
    );
}

export function variantChoices(pets: any[], selectedAnimal: string, selectedBreed: string) {
    const list = pets || [];
    const animalScoped = selectedAnimal
        ? list.filter((pet) => normalizeKey(pet.animal) === selectedAnimal)
        : list;

    if (selectedAnimal && uniqueLabels(animalScoped.map((pet) => pet.variant)).length === 0) {
        return [];
    }

    const scoped = selectedBreed
        ? animalScoped.filter((pet) => normalizeKey(pet.breed) === selectedBreed)
        : animalScoped;

    return uniqueLabels(scoped.map((pet) => pet.variant));
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
