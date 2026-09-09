import "../styles/card.css";
import {IPetshopData} from "../types/types";
import {useState} from "react";
import {isFavourite, nextVipLevel, vipLevel} from "../services/petOverrides";

interface ICardData {
    data: IPetshopData;
    handleUpdateField: (petshop: any, field: keyof IPetshopData, value: any) => Promise<void>;
    updatePet: (id: string | number, patch: Record<string, any>) => void;
}

const Card = ({
                  data,
                  handleUpdateField,
                  updatePet
              }: ICardData) => {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editableValue, setEditableValue] = useState<string>("");

    const handleEditClick = (field: keyof IPetshopData, value: string) => {
        setEditingField(field);
        setEditableValue(value);
    };

    const handleKeyPress = async (
        e: React.KeyboardEvent<HTMLInputElement>,
        field: keyof IPetshopData
    ) => {
        if (e.key === "Enter") {
            await handleUpdateField(data, field, editableValue);
            setEditingField(null);
        }
    };

    const renderEditableField = (field: keyof IPetshopData, value: string) => {
        return editingField === field ? (
            <input
                type="text"
                value={editableValue}
                onChange={(e) => setEditableValue(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, field)}
                onBlur={() => setEditingField(null)}
                autoFocus
            />
        ) : (
            <span onClick={() => handleEditClick(field, value)}>{value || "-"}</span>
        );
    };

    const toggleFavourite = () => {
        updatePet(data.id, { favourite: isFavourite(data.favourite) ? "false" : "true" });
    };

    const toggleVip = () => {
        updatePet(data.id, { vip: nextVipLevel(data.vip) });
    };

    const toggleStudied = () => {
        updatePet(data.id, { studied: data.studied === "true" ? "false" : "true" });
    };

    const toggleOwned = () => {
        updatePet(data.id, { status: data.status === "OWNED" ? "NOT_OWNED" : "OWNED" });
    };

    return (
        <div
            className={`card-container ${data.status === "OWNED" ? `owned` : "not-owned"} ${vipLevel(data.vip) >= 1 && data.status !== "OWNED" ? "vip" : isFavourite(data.favourite) ? "favourite" : data.status === "OWNED" ? `${data.name ? "card" : "cardName"}` : "cardName"}`}>
            <div className="card-body">
                <div className="id-container">
                    <p className="id">- {data.id} -</p>
                </div>

                <div className={`image-container`}>
                    <img className={`image ${data.status === "OWNED" ? `owned` : "not-owned"}`}
                         src={`Images/${data.id}.jpg`} alt="" loading="lazy" decoding="async"/>
                </div>

                <div className="name-container">
                    <p className="name">{renderEditableField("name", data.name)}</p>
                </div>

                <div className="data-container">
          <span>
            <strong><i>Gender: </i></strong>
              {editingField === "gender" ? (
                  <input
                      type="text"
                      value={editableValue}
                      onChange={(e) => setEditableValue(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, "gender")}
                      onBlur={() => setEditingField(null)}
                      autoFocus
                  />
              ) : (
                  <div
                      className={`${data.gender === "F" ? "female" : "male"}`}
                      onClick={() => handleEditClick("gender", data.gender)}
                  >
                      <span className="gender-field">{data.gender || "-"}</span>
                  </div>
              )}
          </span>
                    <span><strong><i>Type: </i></strong>{renderEditableField("type", data.type)}</span>
                    <span><strong><i>Animal: </i></strong>{renderEditableField("animal", data.animal)}</span>
                    <span><strong><i>Breed: </i></strong>{renderEditableField("breed", data.breed)}</span>
                    <span><strong><i>Colour: </i></strong>{renderEditableField("colour", data.colour)}</span>
                    <span><strong><i>Birthday: </i></strong>{renderEditableField("birthday", data.birthday)}</span>
                    <span><strong><i>Generation: </i></strong>{renderEditableField("generation", String(data.generation || ""))}</span>
                    <span><strong><i>Gifter: </i></strong>{renderEditableField("gifter", data.gifter)}</span>
                </div>
                <div className={data.base === "true" ? "base-pet" : ""}></div>
                <div className="studied-container" onClick={() => toggleStudied()}>
                    <div className={data.studied === "true" ? `studied-pet` : `not-studied-pet`}></div>
                </div>
                <div className="like-container" onClick={() => toggleFavourite()}>
                    <div className={isFavourite(data.favourite) ? `liked-pet` : `not-liked-pet`}></div>
                </div>
                <div className="owned-container" onClick={() => toggleOwned()}>
                    <div className={data.status === "OWNED" ? `owned` : "not-owned"}></div>
                </div>
                <div className="vip-container" onClick={() => toggleVip()}>
                    <div className={`vip-${vipLevel(data.vip)}`}></div>
                </div>
            </div>
        </div>
    );
};

export default Card;
