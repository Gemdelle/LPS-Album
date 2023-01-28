import { useState } from 'react';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './styles/landing.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import CataloguePage from './pages/CataloguePage';

import petshop_data from './data/petshops_data.json';
import Filters from './components/Filters';
import FiltersCatalogue from './components/FiltersCatalogue';
import GuessPage from './pages/GuessPage';
import BarGames from './components/BarGames';

/* Album Data */

const ownedPetShops = petshop_data.filter(({ status }: any) => status === "OWNED");

/* Catalogue Data */

let rawCatalogueData: any[] = [];

petshop_data.forEach((data: any) => {
  const idArray = new String(data.id).split(' - ');
  idArray.forEach((id: string) => {
    let idAsInt = parseInt(id);
    if (!isNaN(idAsInt)) {

      let idAlreadyExists = rawCatalogueData.find((data) => {
        return data.id === idAsInt;
      });

      if (!idAlreadyExists) {
        rawCatalogueData.push({
          ...data,
          id: idAsInt
        })
      }
    }
  })
})

const sortedData = rawCatalogueData.sort((a: any, b: any) => a.id - b.id);

/* App */

function App() {

  const [petShopData, setPetShopData] = useState(ownedPetShops);
  const [location, setLocation] = useState("/");

  const [catalogueData, setCatalogueData] = useState(sortedData);
  const [selectedPetShop, setSelectedPetShop] = useState({});

  const [guessGameProgress, setGuessGameProgress] = useState(0)
  const [starsAmount, setStarsAmount] = useState(0)

  function createCurrentFilter() {
    switch (location) {
      case "/catalogue":
        return <FiltersCatalogue data={catalogueData} defaultData={sortedData} setCatalogueData={setCatalogueData} selectedPetShop={selectedPetShop} />
      case "/guess-game":
        return <BarGames guessGameProgress={guessGameProgress} starsAmount={starsAmount} />
      default:
        return <Filters petShopData={petShopData} setPetShopData={setPetShopData} defaultData={ownedPetShops} />
    }
  }

  function incrementGameProgress() {
    let newProgress = guessGameProgress + 1
    setGuessGameProgress(newProgress);
    switch(newProgress) {
      case 5:
      case 10:
      case 16:
        return setStarsAmount(starsAmount+1);
      default:
        return;
    }
  }

  function createHeader() {
    if (location == "/guess-game") return
    return <Header />
  }

  function resetGuessGame() {
    setGuessGameProgress(0);
    setStarsAmount(0);
  }

  return (
    <div className="App">
      {createHeader()}
      <div className='container'>
        {createCurrentFilter()}
        <div className='router'>
          <BrowserRouter>
            <Nav data={petShopData} rawData={petshop_data} />
            <Routes>
              <Route path='/' element={<LandingPage data={petShopData} setLocation={setLocation} />}></Route>
              <Route path='/catalogue' element={<CataloguePage data={catalogueData} setLocation={setLocation} setSelectedPetShop={setSelectedPetShop} selectedPetShop={selectedPetShop} />}></Route>
              <Route path='/guess-game' element={
                <GuessPage
                  setLocation={setLocation}
                  defaultData={ownedPetShops}
                  guessGameProgress={guessGameProgress}
                  incrementGameProgress={incrementGameProgress}
                  replay={resetGuessGame}
                  starsAmount={starsAmount}
                />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
