import '../styles/catalogue.css';
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { IPetshopData } from '../types/types';

const CataloguePage = ({ setLocation, data, updateGoogleSheet, refreshData }: any) => {
    setLocation('/');

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editableName, setEditableName] = useState<string>("");
    const [catalogueData, setCatalogueData] = useState(data);
    const [useCardView, setUseCardView] = useState(false);

    useEffect(() => {
        const syncData = async () => {
            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        };
        syncData();
    }, [data]);

    const handleNameClick = (petshop: any) => {
        setEditingId(petshop.id);
        setEditableName(petshop.name || "");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableName(e.target.value);
    };

    const handleUpdateField = async (petshop: any, field: keyof IPetshopData, value: any) => {
        try {
            const fieldMap: { [key in keyof IPetshopData]: number } = {
                id: 1, name: 2, gender: 3, animal: 4, breed: 5,
                favourite: 6, colour: 7, type: 8, birthday: 9,
                gifter: 10, status: 13, base: 18,
                studied: 19, vip: 20
            };

            const columnIndex = fieldMap[field];
            if (!columnIndex) return alert("Error: Campo no válido");

            const rowIndex = catalogueData.findIndex((p: any) => p.id === petshop.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, columnIndex, value);

            // Actualizar el dato en la UI
            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert(`Error al actualizar ${field}. Inténtalo de nuevo.`);
            console.error(error);
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>, petshop: any) => {
        if (e.key === 'Enter') {
            await handleUpdateField(petshop, "name", editableName);
            setEditingId(null);
        }
    };

    const toggleStatus = async (petshop: any) => {
        try {
            const newStatus = petshop.status === "OWNED" ? "NOT_OWNED" : "OWNED";
            const rowIndex = catalogueData.findIndex((p: any) => p.id === petshop.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, 13, newStatus);
            debugger
            petshop.status = newStatus;

            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert("Error al actualizar el estado. Inténtalo de nuevo.");
            console.error(error);
        }
    };

    const toggleGender = async (petshop: any) => {
        try {
            const newGender = petshop.gender === "M" ? "F" : "M";
            const rowIndex = catalogueData.findIndex((p: any) => p.id === petshop.id);
            if (rowIndex === -1) return alert("Error: ID no encontrado");

            await updateGoogleSheet(rowIndex + 2, 3, newGender);
            debugger
            petshop.gender = newGender;

            const updatedData = await refreshData();
            setCatalogueData(updatedData);
        } catch (error) {
            alert("Error al actualizar el género. Inténtalo de nuevo.");
            console.error(error);
        }
    };

    return (
        <main>
            <div className="view-container">
                <button
                    className={`view-button ${useCardView ? 'active-view-button' : ''}`}
                    onClick={() => setUseCardView(true)}
                >
                    <div className="button-title">Cards</div>
                </button>
                <button
                    className={`view-button ${!useCardView ? 'active-view-button' : ''}`}
                    onClick={() => setUseCardView(false)}
                >
                    <div className="button-title">Catalogue</div>
                </button>
            </div>

            {catalogueData.map((petshop: any, index: any) => {
                let imageSrc;
                try {
                    imageSrc = require(`../../public/Images/${petshop.id}.jpg`);
                } catch (err) {
                    imageSrc = null;
                }

                return useCardView ? (
                    <Card
                        key={`${index}-${petshop.id}`}
                        data={petshop}
                        updateGoogleSheet={updateGoogleSheet}
                        refreshData={refreshData}
                        catalogueData={catalogueData}
                        setCatalogueData={setCatalogueData}
                        handleUpdateField={handleUpdateField}
                    />
                ) : (
                    <div key={`${index}-${petshop.id}`}
                        className={`pet-container ${petshop.status === 'OWNED' ? 'owned' : 'not-owned'}`}>
                        <div className={`status ${petshop.status === 'OWNED' ? 'unlocked' : 'locked'}`}
                            onClick={() => toggleStatus(petshop)}></div>
                        <div className="catalogue-number"><i>- {petshop.id} -</i></div>
                        <div className={`gender ${petshop.gender === 'M' ? 'male' : 'female'}`}
                            onClick={() => toggleGender(petshop)}></div>
                        {imageSrc ? (
                            <img src={imageSrc} alt={`Petshop ${petshop.id}`} className="petshop-img" />
                        ) : (
                            <div className="no-image-placeholder">No Image</div>
                        )}
                        <div className="petshop-name">
                            {editingId === petshop.id ? (
                                <input
                                    type="text"
                                    value={editableName}
                                    onChange={handleNameChange}
                                    onKeyDown={(e) => handleKeyPress(e, petshop)}
                                    onBlur={() => setEditingId(null)}
                                    autoFocus
                                />
                            ) : (
                                <span onDoubleClick={() => handleNameClick(petshop)}>{petshop.name || '?'}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default CataloguePage;
