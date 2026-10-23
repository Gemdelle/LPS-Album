import localPetshops from "./petshops_data.json";

const LOCAL_PETS = localPetshops as any[];

function generationFor(id: number) {
    if (id >= 1 && id <= 458) return 1;
    if (id >= 459 && id <= 974) return 2;
    if (id >= 975 && id <= 2675) return 3;
    if (id >= 2676 && id <= 3743) return 4;
    if (id >= 3744 && id <= 6056) return 5;
    if (id >= 6057 && id <= 7000) return 6;
    if (id >= 7001) return 7;
    return "";
}

function sheetBreed(value: unknown) {
    const breed = String(value ?? "").trim();
    if (!breed) return "-";
    if (breed.toLowerCase() === "long - ears") return "Long Ears";
    return breed;
}

function sheetAnimal(value: unknown) {
    const animal = String(value ?? "").trim();
    if (animal.toLowerCase() === "lizzard") return "Lizard";
    return animal;
}

function sheetGender(value: unknown) {
    const gender = String(value ?? "").trim().toUpperCase();
    if (gender.startsWith("M")) return "M";
    if (gender.startsWith("F")) return "F";
    return "";
}

function toSheetPet(raw: any) {
    const id = String(raw.id);
    const name = String(raw.name ?? "").trim();
    return {
        id,
        name,
        gender: sheetGender(raw.gender),
        animal: sheetAnimal(raw.animal),
        breed: sheetBreed(raw.breed),
        variant: "",
        favourite: "false",
        colour: String(raw.colour ?? "").trim(),
        type: String(raw.type ?? "").trim() || "Normal",
        birthday: raw.birthday === "" || raw.birthday == null ? "" : Number(raw.birthday) || raw.birthday,
        gifter: String(raw.gifter ?? "").trim(),
        bloodline: String(raw.bloodline ?? "").trim(),
        status: String(raw.status ?? "").trim() || "NOT_OWNED",
        generation: generationFor(Number(id)),
        season: "",
        "pre-evolution": "",
        "post-evolution": "",
        "wishlist-link": "",
        base: "",
        studied: "",
        vip: "",
    };
}

const MISSING_PETS = LOCAL_PETS
    .filter((pet) => /^\d+$/.test(String(pet.id)))
    .map(toSheetPet);

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
        present.add(String(pet.id));
    });

    return next;
}
