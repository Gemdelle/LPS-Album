import "../styles/card.css";
import default_image from "../assets/default_image.jpg";
import { IPetshopData } from "../types/types";
import { useState } from "react";

interface ICardData {
  data: IPetshopData;
  updateGoogleSheet: (row: number, column: number, value: any) => Promise<void>;
  refreshData: () => Promise<any>;
  catalogueData: any;
  setCatalogueData: any;
  handleUpdateField: (petshop: any, field: keyof IPetshopData, value: any) => Promise<void>;
}

const Card = ({ data, handleUpdateField }: ICardData) => {
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

  return (
    <div className={`${data.name ? "card" : "cardName"} ${data.status === "OWNED" ? "owned" : "not-owned"}`}>
      <div className="card-body">
        <div className="id-container">
          {renderEditableField("id", data.id)}
        </div>

        <div className="image-container">
          <img className="image" src={`Images/${data.id}.jpg` || default_image} alt="" />
        </div>

        <div className="name-container">
          {renderEditableField("name", data.name)}
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
          <span><strong><i>Gifter: </i></strong>{renderEditableField("gifter", data.gifter)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
