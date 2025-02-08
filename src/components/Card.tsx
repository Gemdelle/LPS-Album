import "../styles/card.css";
import default_image from "../assets/default_image.jpg";

interface ICardData {
  data: IPetshopData,
  updateGoogleSheet: (row: number, column: number, value: any) => Promise<void>;
  refreshData: () => Promise<any>;
  catalogueData: any;
  setCatalogueData: any;
}

interface IPetshopData {
  id: string
  name: string
  gender: string
  animal: string
  breed: string
  liked: string
  colour: string
  type: string
  bloodline: string
  birthday: string
  clothes: string
  gifter: string
}

const Card = ({ data: {
  id,
  name,
  gender,
  animal,
  breed,
  liked,
  colour,
  type,
  bloodline,
  birthday,
  clothes,
  gifter
}, updateGoogleSheet, refreshData, catalogueData, setCatalogueData }: ICardData) => {

  const imageId = String(id).split(" - ")[0];

  const toggleLiked = async () => {
    try {
      const newLiked = liked === "TRUE" ? "FALSE" : "TRUE";
      const rowIndex = catalogueData.findIndex((p: any) => p.id === id);
      if (rowIndex === -1) return alert("Error: ID no encontrado");

      await updateGoogleSheet(rowIndex + 2, 6, newLiked); // Columna 6 (liked)
      liked = newLiked;

      const updatedData = await refreshData();
      setCatalogueData(updatedData);
    } catch (error) {
      alert("Error al actualizar el estado de liked. Inténtalo de nuevo.");
      console.error(error);
    }
  };
  debugger
  return (
    <div
      className={name ? "card" : "cardName"}
    >
      <div className="card-body">

        <div className="id-container">
          <p className="id">- {id} -</p>
        </div>

        <div className="image-container">
          <img className="image" src={`Images/${imageId}.jpg` || default_image} alt="" />
        </div>

        <div className="name-container">
          <p className="name">{name || "-"}</p>
        </div>

        <div className="data-container">
          <span><strong><i>Gender: </i></strong><div className={gender === "F" ? "female" : "male"}></div></span>
          <span><strong><i>Type: </i></strong>{type}</span>
          <span><strong><i>Animal: </i></strong>{animal}</span>
          <span><strong><i>Breed: </i></strong>{breed}</span>
          <span><strong><i>Colour: </i></strong>{colour}</span>
          <span><strong><i>Birthday: </i></strong>{birthday}</span>
          <span><strong><i>Gifter: </i></strong>{gifter}</span>
        </div>

        <div className="like-container" onClick={() => toggleLiked()}>
          <div
              className={"like " + liked == "TRUE" ? `liked-pet rarity-2` : `not-liked-pet rarity-2`}
          ></div>
        </div>

      </div>
    </div>
  );
}

export default Card;
