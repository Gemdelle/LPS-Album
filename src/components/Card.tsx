import "../styles/card.css";
import default_image from "../assets/default_image.jpg";
import {IPetshopData} from "../types/types";
import {useState} from "react";
import {debug} from "util";

interface ICardData {
    data: IPetshopData;
    updateGoogleSheet: (row: number, column: number, value: any) => Promise<void>;
    refreshData: () => Promise<any>;
    catalogueData: any;
    setCatalogueData: any;
    handleUpdateField: (petshop: any, field: keyof IPetshopData, value: any) => Promise<void>;
}

const Card = ({
                  data,
                  handleUpdateField,
                  updateGoogleSheet,
                  refreshData,
                  catalogueData,
                  setCatalogueData
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

    const toggleFavourite = async () => {
        try {
            const newLiked = data.favourite === "true" ? "FALSE" : "TRUE";
            const rowIndex = catalogueData.findIndex((p: any) => p.id === data.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, 6, newLiked); // Columna 6 (liked)
            data.favourite = newLiked;

            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert("Error al actualizar el estado de liked. Inténtalo de nuevo.");
            console.error(error);
        }
    };

    const toggleVip = async () => {
        try {
            const newVip = (data.vip == "" || Number(data.vip) == 0 || Number(data.vip) > 1) ? "1" : "0";
            const rowIndex = catalogueData.findIndex((p: any) => p.id === data.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, 20, newVip); // Columna 20 (vip)
            data.vip = newVip;

            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert("Error al actualizar el estado de vip. Inténtalo de nuevo.");
            console.error(error);
        }
    };

    const toggleStudied = async () => {
        try {
            const newStudied = data.studied === "true" ? "FALSE" : "TRUE";
            const rowIndex = catalogueData.findIndex((p: any) => p.id === data.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, 19, newStudied); // Columna 19 (studied)
            data.studied = newStudied;

            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert("Error al actualizar el estado de studied. Inténtalo de nuevo.");
            console.error(error);
        }
    };

    const toggleOwned = async () => {
        try {
            const newOwned = data.status === "OWNED" ? "NOT_OWNED" : "OWNED";
            const rowIndex = catalogueData.findIndex((p: any) => p.id === data.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, 12, newOwned); // Columna 12 (status)
            data.status = newOwned;

            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert("Error al actualizar el estado de status. Inténtalo de nuevo.");
            console.error(error);
        }
    };

    return (
        <div
            className={`card-container ${data.status === "OWNED" ? `owned` : "not-owned"} ${Number(data.vip) == 1 && data.status !== "OWNED" ? "vip" : data.favourite == "true" ? "favourite" : data.status === "OWNED" ? `${data.name ? "card" : "cardName"}` : "cardName"}`}>
            <div className="card-body">
                <div className="id-container">
                    <p className="id">- {data.id} -</p>
                </div>

                <div className={`image-container`}>
                    <img className={`image ${data.status === "OWNED" ? `owned` : "not-owned"}`}
                         src={`Images/${data.id}.jpg` || default_image} alt=""/>
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
                    <span><strong><i>Gifter: </i></strong>{renderEditableField("gifter", data.gifter)}</span>
                </div>
                <div className={data.base === "true" ? "base-pet" : ""}></div>
                <div className="studied-container" onClick={() => toggleStudied()}>
                    <div className={data.studied === "true" ? `studied-pet` : `not-studied-pet`}></div>
                </div>
                <div className="like-container" onClick={() => toggleFavourite()}>
                    <div className={data.favourite === "true" ? `liked-pet` : `not-liked-pet`}></div>
                </div>
                <div className="owned-container" onClick={() => toggleOwned()}>
                    <div className={data.status === "OWNED" ? `owned` : "not-owned"}></div>
                </div>
                {
                    data.status !== "OWNED" ?
                        <div className="vip-container" onClick={() => toggleVip()}>
                            <div className={`vip-${data.vip == "" || Number(data.vip) > 1 ? "0" : data.vip}`}></div>
                        </div> : null
                }
            </div>
        </div>
    );
};

export default Card;
