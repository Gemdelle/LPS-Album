import '../styles/names.css';
import CardAsRow from "../components/CardAsRow";
import Footer from "../components/Footer";

const NamesPage = ({ data, setLocation }: any) => {
    
    setLocation("/names")

    return (
        <main>
            <div className="cards">
                {data.map((petshop: any) => (<CardAsRow key={petshop.id} data={petshop} />))}
            </div>
            <Footer />
        </main>
    )
}

export default NamesPage;