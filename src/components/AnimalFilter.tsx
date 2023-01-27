import { useState } from "react";
import '../styles/animal_filter.css';

const AccordionItem = ({ name, breeds, selectAnimal, isSelectedAnimal, selectBreed }: any) => {

    const animalValue = name.split(' ').join('_').toUpperCase();
    return (
        <div className="accordion-row-item animal-item">
            <input type="checkbox" onChange={(event) => selectAnimal(event, animalValue)} />
            <span>{name}</span>
            <div className={isSelectedAnimal(animalValue) ? "visible" : "hidden"}>
                {breeds.map((breed: any, index: any) => {
                    return <div key={index} >
                        <input type="checkbox" onChange={(event) => selectBreed(event, breed.split(' ').join('_').toUpperCase())} />
                        <span>{breed}</span>
                    </div>
                })}
            </div>
        </div>
    );
}

const AnimalFilter = ({ petShopData, setPetShopData, defaultData }: any) => {
    const [selectedAnimals, setSelectedAnimals] = useState(new Set<string>());
    const [selectedBreeds, setSelectedBreeds] = useState(new Set<string>());

    const [filterVisible, setFilterVisible] = useState(false);

    function selectAnimal(event: any, animal: string) {
        const selection = selectedAnimals;

        if (event.target.checked) {
            setSelectedAnimals(selection.add(animal))
        } else {
            selection.delete(animal);
            setSelectedAnimals(selection);
        }

        setPetShopData(defaultData.filter((data: any) => {
            return selection.has(data.animal.toUpperCase());
        }));
    }

    function isSelectedAnimal(animal: string): boolean {
        return selectedAnimals.has(animal.toUpperCase())
    }

    function selectBreed(event: any, breed: string) {
        const selection = selectedBreeds;

        if (event.target.checked) {
            setSelectedBreeds(selection.add(breed))
        } else {
            selection.delete(breed);
            setSelectedBreeds(selection);
        }

        if (selection.size > 0) {
            setPetShopData(petShopData.filter((data: any) => {
                return selection.has(data.breed.split(' ').join('_').toUpperCase());
            }));
        } else {
            setPetShopData(defaultData.filter((data: any) => {
                return selectedAnimals.has(data.animal.toUpperCase());
            }));
        }

    }

    const showAnimalContainer = () => {
        setFilterVisible(!filterVisible)
    }

    return (
        <div>
            <div className="title">
                <div className={filterVisible ? "rotating-arrow" : "arrow"} onClick={showAnimalContainer}></div>
                <span>Animal</span>
            </div>

            <div className="animal-lists-container">
                <div className={filterVisible ? "wrap-options" : "hidden"}>
                    <div className="checks-container animal-scroll">
                        <p>Subspecies: </p>
                        <div className="accordions wrap-options">
                            <AccordionItem
                                name="Bear"
                                breeds={[
                                    "Grizzly",
                                    "Polar",
                                    "Panda"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Bee"
                                breeds={[
                                    "Bumblebee",
                                    "Sweat",
                                    "Yellow Jacket"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Bird"
                                breeds={[
                                    "Cockatoo",
                                    "Parrot",
                                    "Chicken",
                                    "Peacock",
                                    "Hummingbird",
                                    "Dove",
                                    "Chaffinch",
                                    "Puffin",
                                    "Seagull"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Cat"
                                breeds={[
                                    "Bengal",
                                    "British Longhair",
                                    "Carthusian",
                                    "European",
                                    "Kitten",
                                    "Maine Coon",
                                    "Persian",
                                    "Persian Longhair",
                                    "Siamese",
                                    "Snowshoe",
                                    "Standard"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Dog"
                                breeds={[
                                    "Basset Hound",
                                    "Beagle",
                                    "Border Collie",
                                    "Boston Terrier",
                                    "Bull Terrier",
                                    "Boxer",
                                    "Chow Chow",
                                    "Caval King Charles",
                                    "Chihuahua",
                                    "Cocker Spaniel",
                                    "Corgi",
                                    "Curly bichon",
                                    "Dachshund",
                                    "Dachsund",
                                    "Dalmatian",
                                    "Doberman",
                                    "English Bulldog",
                                    "English Shepherd",
                                    "French Bulldog",
                                    "Greyhound",
                                    "German Shepherd",
                                    "Great Dane",
                                    "Jack Russell",
                                    "Komodor",
                                    "Labrador Retriever",
                                    "Papillon",
                                    "Pug",
                                    "Pomerania",
                                    "Poodle",
                                    "Puppy",
                                    "Saint Bernard",
                                    "Saint Bernard’s",
                                    "Schnauzer",
                                    "Shih Tzu",
                                    "Scottish Terrier",
                                    "Sheepdog",
                                    "Siberian Husky",
                                    "Weimaraner",
                                    "Yorkshire"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />


                            <AccordionItem
                                name="Ferret"
                                breeds={[
                                    "Champagne",
                                    "Cinnamon Mitts",
                                    "Dark-eyed White"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />


                            <AccordionItem
                                name="Fish"
                                breeds={[
                                    "Goldfish",
                                    "Clownfish",
                                    "Angelfish",
                                    "Flounder"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Guinea Pig"
                                breeds={[
                                    "American",
                                    " Cuy",
                                    "Teddy"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Hamster"
                                breeds={[
                                    "Black Syrian",
                                    "White Syrian",
                                    "Yellow Syrian",
                                    "Brown Syrian"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Monkey"
                                breeds={[
                                    "Spider",
                                    "Chimpanzee"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Owl"
                                breeds={[
                                    "Long Ears",
                                    "Short Ears"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Rabbit"
                                breeds={[
                                    "Long Ears",
                                    "Bent Ears",
                                    "Sitting Ears",
                                    "Short Ears",
                                    "Angora"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Snail"
                                breeds={[
                                    "Terrestrial",
                                    "Aquatic"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                            <AccordionItem
                                name="Turtle"
                                breeds={[
                                    "Terrestrial",
                                    "Aquatic"
                                ]}
                                selectAnimal={selectAnimal}
                                isSelectedAnimal={isSelectedAnimal}
                                selectBreed={selectBreed}
                            />

                        </div>

                        <p>No subspecies: </p>

                        <div className="non-dropdown-filters-container">
                            <div className="non-dropdown-filters wrap-options">
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "ANTEATER")} />
                                    <span>Anteater</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "ARMADILLO")} />
                                    <span>Armadillo</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "BAT")} />
                                    <span>Bat</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "BEAVER")} />
                                    <span>Beaver</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "BUTTERFLY")} />
                                    <span>Butterfly</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "CAMEL")} />
                                    <span>Camel</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "CATERPILLAR")} />
                                    <span>Caterpillar</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "CHAMELEON")} />
                                    <span>Chameleon</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "CHINCHILLA")} />
                                    <span>Chinchilla</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "COW")} />
                                    <span>Cow</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "CRAB")} />
                                    <span>Crab</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "CROCODILE")} />
                                    <span>Crocodile</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "DEER")} />
                                    <span>Deer</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "DOLPHIN")} />
                                    <span>Dolphin</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "DRAGONFLY")} />
                                    <span>Dragonfly</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "DUCK")} />
                                    <span>Duck</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "ELEPHANT")} />
                                    <span>Elephant</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "FAIRY")} />
                                    <span>Fairy</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "FLAMINGO")} />
                                    <span>Flamingo</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "FOX")} />
                                    <span>Fox</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "FROG")} />
                                    <span>Frog</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "GIRAFFE")} />
                                    <span>Giraffe</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "GOAT")} />
                                    <span>Goat</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "HIPPOPOTAMUS")} />
                                    <span>Hippopotamus</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "HORSE")} />
                                    <span>Horse</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "KANGAROO")} />
                                    <span>Kangaroo</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "KOALA")} />
                                    <span>Koala</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "LADYBUG")} />
                                    <span>Ladybug</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "LEOPARD")} />
                                    <span>Leopard</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "LION")} />
                                    <span>Lion</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "LIZZARD")} />
                                    <span>Lizzard</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "LOVE_BUG")} />
                                    <span>Love Bug</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "MEERKAT")} />
                                    <span>Meerkat</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "MOUSE")} />
                                    <span>Mouse</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "OCTOPUS")} />
                                    <span>Octopus</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "OPOSSUM")} />
                                    <span>Opossum</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "OSTRICH")} />
                                    <span>Ostrich</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "OTTER")} />
                                    <span>Otter</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "PELICAN")} />
                                    <span>Pelican</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "PENGUIN")} />
                                    <span>Penguin</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "PIG")} />
                                    <span>Pig</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "PORCUPINE")} />
                                    <span>Porcupine</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "RACCOON")} />
                                    <span>Raccoon</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SEAHORSE")} />
                                    <span>Seahorse</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SEAL")} />
                                    <span>Seal</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SHARK")} />
                                    <span>Shark</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SHEEP")} />
                                    <span>Sheep</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SNAKE")} />
                                    <span>Snake</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SPIDER")} />
                                    <span>Spider</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SQUIRREL")} />
                                    <span>Squirrel</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "SWAN")} />
                                    <span>Swan</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "TAPIR")} />
                                    <span>Tapir</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "TIGER")} />
                                    <span>Tiger</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "WHALE")} />
                                    <span>Whale</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => selectAnimal(event, "ZEBRA")} />
                                    <span>Zebra</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalFilter;