import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/names.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NamesPage from './pages/NamesPage';
import CataloguePage from './pages/CataloguePage';
import GuessPage from './pages/GuessPage';
import ProtectedRoute from "./components/ProtectedRoute";

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
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxQ1MnqEnX-FHBn3Eu-Z-y5sA6Rfpez3qJ9CKNV7SSyZyf4jaTBdqEoSP_ECZrbJAk_FQ/exec",
                {
                    method: "GET",
                    headers: { "Content-Type": "text/plain" },
                    redirect: "follow"  // Esto maneja redirecciones automáticamente
                }
            );
            const text = await response.text();

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const rows = text.trim().split("\n").map(row => row.split(",").map(cell => cell.replace(/"/g, "").trim()));

            const expectedHeaders = ["id", "name", "gender", "animal", "breed", "favourite", "colour", "type", "birthday", "gifter", "bloodline", "status", "generation", "season", "pre-evolution", "post-evolution", "wishlist-link", "base", "studied", "vip"];

            const actualHeaders = rows[0];
            const headerIndexes = expectedHeaders.map(header => actualHeaders.indexOf(header));

            if (headerIndexes.some(index => index === -1)) {
                throw new Error("CSV format error: Missing expected columns.");
            }

            const data = rows.slice(1).map(row => {
                const item = {} as any;
                expectedHeaders.forEach((header, i) => {
                    let value: string | number = row[headerIndexes[i]] || "";
                    value = isNaN(value as any) || value === "" ? value : Number(value);
                    item[header] = value;
                });
                return item;
            }).filter(item => item.id !== "");

            console.log("Fetched data:", data);
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
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ row, column, value }),
        redirect: "follow"
      });

      if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
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
          <div className="router">
            <BrowserRouter>
              <Nav
                  data={petShopData}
                  rawData={catalogueData}
                  defaultData={catalogueData}
                  petShopData={petShopData}
                  setPetShopData={setPetShopData}
                  setCatalogueData={setCatalogueData}
              />
              <Routes>
                <Route
                    path="/"
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
              <Route element={<ProtectedRoute />}>
                  <Route
                      path="/names"
                      element={
                          <NamesPage
                              data={petShopData}
                              setLocation={setLocation}
                              setSelectedPetShop={setSelectedPetShop}
                              selectedPetShop={selectedPetShop}
                          />
                      } />
              </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default App;