const MISSING_PETS = [
    {
        id: "196",
        name: "Illwhyrim",
        gender: "M",
        animal: "Raccoon",
        breed: "-",
        variant: "",
        favourite: "false",
        colour: "Gray",
        type: "Normal",
        birthday: 2020,
        gifter: "Farfi",
        bloodline: "Illwhyrim",
        status: "OWNED",
        generation: 1,
        season: "",
        "pre-evolution": "",
        "post-evolution": "",
        "wishlist-link": "",
        base: "",
        studied: "",
        vip: "",
    },
];

function numericId(id: unknown) {
    const match = String(id ?? "").match(/\d+/);
    return match ? Number(match[0]) : NaN;
}

export function insertMissingPets(data: any[]) {
    const present = new Set((data || []).map((pet) => String(pet.id)));
    const next = (data || []).slice();

    MISSING_PETS.forEach((pet) => {
        if (present.has(String(pet.id))) {
            return;
        }
        const petNum = numericId(pet.id);
        const index = next.findIndex((item) => {
            const itemNum = numericId(item.id);
            return Number.isFinite(itemNum) && itemNum > petNum;
        });
        if (index === -1) {
            next.push(pet);
        } else {
            next.splice(index, 0, pet);
        }
    });

    return next;
}
