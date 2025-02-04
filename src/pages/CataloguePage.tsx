import '../styles/catalogue.css';

const CataloguePage = ({ setLocation, data }: any) => {
    setLocation("/catalogue");

    return (
        <main>
            {data.map((petshop: any) => {
                let imageSrc;
                try {
                    imageSrc = require(`../../public/Images/${petshop.id}.jpg`);
                } catch (err) {
                    imageSrc = null;
                }

                return (
                    <div
                        key={petshop.id}
                        className={`pet-container ${petshop.status === "OWNED" ? "owned" : "not-owned"}`}
                    >
                        <div className={`status ${petshop.status === "OWNED" ? "unlocked" : "locked"}`}></div>
                        <div className="catalogue-number"><i>- {petshop.id} -</i></div>
                        <div className={`gender ${petshop.gender === "M" ? "male" : "female"}`}></div>
                        {imageSrc ? (
                            <img src={imageSrc} alt={`Petshop ${petshop.id}`} className="petshop-img" />
                        ) : (
                            <div className="no-image-placeholder">No Image</div>
                        )}
                        <div className="petshop-name">{petshop.name || "?"}</div>
                        
                    </div>
                );
            })}
        </main>
    );
};

export default CataloguePage;
