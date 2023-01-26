import Card from '../components/Card';
import '../styles/landing.css';

const LandingPage = ({ data, setLocation }: any) => {
    
    setLocation("/")
    
    return (
        <main>
            <div className="cards">
                {data.map((petshop: any, index: number) => {
                    return (
                        <Card
                            key={index}
                            data={petshop}
                        />
                    );
                })}
            </div>
        </main>
    )
}

export default LandingPage;