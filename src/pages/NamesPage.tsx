import '../styles/names.css';

const NamesPage = ({ data, setLocation }: any) => {
    
    setLocation("/names")
    
    return (
        <main>
            <div className="cards">
                NAMES
            </div>
        </main>
    )
}

export default NamesPage;