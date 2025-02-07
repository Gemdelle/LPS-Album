import '../styles/names.css';
import CardAsRow from "../components/CardAsRow";

const NamesPage = ({ data, setLocation }: any) => {
    
    setLocation("/names")

    return (
        <main>
            <div className="cards">
                {data.map((petshop: any) => (<CardAsRow key={petshop.id} data={petshop} />))}
            </div>
        </main>
    )
}

export default NamesPage;