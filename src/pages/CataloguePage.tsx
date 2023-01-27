import '../styles/catalogue.css';

const CataloguePage = ({setLocation, data, setSelectedPetShop, selectedPetShop}: any) => {
    
    setLocation("/catalogue")
    
    function selectPetShop (petShop:any) {
        setSelectedPetShop(petShop);
    } 

    return (
        <main>
            {
                data.map((data: any) => {
                    try {
                        const source = require(`../../public/Images/${data.id}.jpg`);
                        return <div className={`catalogue-number ${data.status == "OWNED" ? "owned" : "not-owned"} ${data.id === selectedPetShop.id ? "selected" : ""}`} onClick={() => selectPetShop(data)}>{data.id}</div>
                    } catch (err) {
                        return <div className={`catalogue-number ${data.status == "OWNED" ? "owned" : "not-owned"} ${data.id === selectedPetShop.id ? "selected" : ""} no-image`} onClick={() => selectPetShop(data)}>{data.id}</div>
                    };

                    
                })
            }
        </main>
    )
}

export default CataloguePage;