import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/landing.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CataloguePage from './pages/CataloguePage';
import Filters from './components/Filters';
import FiltersCatalogue from './components/FiltersCatalogue';
import GuessPage from './pages/GuessPage';
import BarGames from './components/BarGames';

// Configuración de Google Sheets
const SPREADSHEET_ID = '1VMph1DH_c0vy-gGib8CAgHWm03G7j5YVceESn3z1dFc';
const SHEET_NAME = "Hoja1";


function App() {
  const [petShopData, setPetShopData] = useState<any[]>([]);
  const [catalogueData, setCatalogueData] = useState<any[]>([]);
  const [location, setLocation] = useState("/");
  const [selectedPetShop, setSelectedPetShop] = useState({});
  const [guessGameProgress, setGuessGameProgress] = useState(0);
  const [starsAmount, setStarsAmount] = useState(0);

  // 🔹 Función para obtener datos de Google Sheets (hoja pública)
  const fetchDataFromGoogleSheets = async () => {
    try {
      const response = await fetch(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`);
      const text = await response.text();

      // Split rows and parse CSV data
      const rows = text.trim().split("\n").map(row => row.split(",").map(cell => cell.replace(/"/g, "").trim()));

      // Define the expected headers
      const expectedHeaders = ["id", "name", "gender", "animal", "breed", "rarity", "colour", "type", "vip", "birthday", "gifter", "bloodline", "status", 
  "generation", "season", "pre-evolution", "post-evolution", "wishlist-link"];

      // Find actual headers in the CSV and map them to the expected ones
      const actualHeaders = rows[0];
      const headerIndexes = expectedHeaders.map(header => actualHeaders.indexOf(header));

      // Check for missing headers
      if (headerIndexes.some(index => index === -1)) {
        throw new Error("CSV format error: Missing expected columns.");
      }

      // Process data
      const data = rows.slice(1)
          .map(row => {
            const item = {} as any;
            expectedHeaders.forEach((header, i) => {
              let value: string | number = row[headerIndexes[i]] || ""; // Ensure missing values are set to ""
              value = isNaN(value as any) || value === "" ? value : Number(value); // Convert numbers
              item[header] = value;
            });
            return item;
          })
          .filter(item => item.id !== ""); // Remove entries with empty "id"

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };


  //
  const updateGoogleSheet = async (row:any, column:any, value:any) => {
    try {
      const url = "https://script.google.com/macros/s/AKfycbxQ1MnqEnX-FHBn3Eu-Z-y5sA6Rfpez3qJ9CKNV7SSyZyf4jaTBdqEoSP_ECZrbJAk_FQ/exec"; 
      console.log(`Enviando datos a: ${url}`);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row, column, value }),
        mode: "no-cors", // Desactiva CORS si es necesario
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      alert("Datos actualizados correctamente.");
    } catch (error) {
      debugger
      console.error("Error en updateGoogleSheet:", error);
      alert("Error al actualizar la hoja de cálculo. Revisa la consola.");
    }
  };


  // 🔹 Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDataFromGoogleSheets();
      if (data.length > 0) {
        const ownedPetShops = data.filter((item: any) => item.status === "OWNED");
        setPetShopData(ownedPetShops);
        setCatalogueData(data);
      }
    };
    loadData();
  }, []);

  // 🔹 Función para generar filtros según la vista
  function createCurrentFilter() {
    switch (location) {
      case "/catalogue":
        return (
            <FiltersCatalogue
                data={catalogueData}
                defaultData={catalogueData}
                setCatalogueData={setCatalogueData}
                selectedPetShop={selectedPetShop}
            />
        );
      case "/guess-game":
        return <BarGames guessGameProgress={guessGameProgress} starsAmount={starsAmount} />;
      default:
        return <Filters petShopData={petShopData} setPetShopData={setPetShopData} defaultData={petShopData} />;
    }
  }

  // 🔹 Función para incrementar progreso del juego
  function incrementGameProgress() {
    let newProgress = guessGameProgress + 1;
    setGuessGameProgress(newProgress);
    if ([5, 10, 16].includes(newProgress)) {
      setStarsAmount(starsAmount + 1);
    }
  }

  function resetGuessGame() {
    setGuessGameProgress(0);
    setStarsAmount(0);
  }

  return (
      <div className="App">
        <div className="container">
          {/* {createCurrentFilter()} */}
          <div className="router">
            <BrowserRouter>
              <Nav data={petShopData} rawData={catalogueData} />
              <Routes>
                <Route path="/" element={<LandingPage data={petShopData} setLocation={setLocation} />} />
                <Route
                    path="/catalogue"
                    element={
                      <CataloguePage
                          data={catalogueData}
                          setLocation={setLocation}
                          setSelectedPetShop={setSelectedPetShop}
                          selectedPetShop={selectedPetShop}
                          updateGoogleSheet={updateGoogleSheet}
                          refreshData={fetchDataFromGoogleSheets}
                      />
                    }
                />
                <Route
                    path="/guess-game"
                    element={
                      <GuessPage
                          setLocation={setLocation}
                          defaultData={petShopData}
                          guessGameProgress={guessGameProgress}
                          incrementGameProgress={incrementGameProgress}
                          replay={resetGuessGame}
                          starsAmount={starsAmount}
                      />
                    }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default App;