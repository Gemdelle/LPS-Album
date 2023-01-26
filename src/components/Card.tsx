import "../styles/card.css";
import default_image from "../assets/default_image.jpg";

interface ICardData {
  data: IPetshopData
}  

interface IPetshopData{
  id: string
  name: string
  gender: string
  animal: string
  breed: string
  rarity: number
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
  rarity,
  colour,
  type,
  bloodline,
  birthday,
  clothes,
  gifter
} }: ICardData) => {

const imageId = String(id).split(" - ")[0];

  return (
    <div
      className={name ? "card" : "cardName"}
    >
      <div className="card-body">
        <div className="image-container">
          <div className={name ? "portrait" : "portraitName"}></div>
          <img className="image" src={`Images/${imageId}.jpg` || default_image} alt="" />
        </div>

        <div className="name-container">
          <p className="name">{name || "-"}</p>
          <div className="id-container">
            <p className="id">- {id} -</p>
          </div>
        </div>

        <div className="data-container-01">
          <span><strong><i>Gender: </i></strong><div className={gender === "F" ? "female" : "male"}></div></span>
          <span><strong><i>Type: </i></strong>{type}</span>
          <span><strong><i>Animal: </i></strong>{animal}</span>
          <span><strong><i>Breed: </i></strong>{breed}</span>
        </div>

        <div className="data-container-02">
          <span><strong><i>Colour: </i></strong>{colour}</span>
          <span><strong><i>Clothes: </i></strong>{clothes}</span>
          <span><strong><i>Birthday: </i></strong>{birthday}</span>
          <span><strong><i>Gifter: </i></strong>{gifter}</span>
        </div>

        <div className="bloodline-rarity-container">
          <div className="bloodline-container">
            <div className={bloodline} />
          </div>
          <div className="rarity-container">
            {[1, 2, 3].map((number, index) => {
              return <div 
              key={index} 
              className={number <= rarity ? `rarity-active rarity-${index}` : `rarity-inactive rarity-${index}`}
              ></div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
