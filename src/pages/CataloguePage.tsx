import '../styles/catalogue.css';
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { IPetshopData } from '../types/types';
import { formatGeneration } from '../services/catalogueFilters';
import { isFavourite, nextVipLevel, vipLevel } from '../services/petOverrides';
import Footer from "../components/Footer";

const CataloguePage = ({ setLocation, data, updatePet }: any) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editableName, setEditableName] = useState<string>("");
    const [catalogueData, setCatalogueData] = useState(data);
    const [useCardView, setUseCardView] = useState(false);

    useEffect(() => {
        setLocation('/');
    }, [setLocation]);

    useEffect(() => {
        setCatalogueData(data);
    }, [data]);

    const handleNameClick = (petshop: any) => {
        setEditingId(petshop.id);
        setEditableName(petshop.name || "");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableName(e.target.value);
    };

    const handleUpdateField = async (petshop: any, field: keyof IPetshopData, value: any) => {
        updatePet(petshop.id, { [field]: value });
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>, petshop: any) => {
        if (e.key === 'Enter') {
            await handleUpdateField(petshop, "name", editableName);
            setEditingId(null);
        }
    };

    const toggleStatus = (petshop: any) => {
        const newStatus = petshop.status === "OWNED" ? "NOT_OWNED" : "OWNED";
        updatePet(petshop.id, { status: newStatus });
    };

    const toggleFavourite = (petshop: any) => {
        updatePet(petshop.id, { favourite: isFavourite(petshop.favourite) ? "false" : "true" });
    };

    const toggleVip = (petshop: any) => {
        updatePet(petshop.id, { vip: nextVipLevel(petshop.vip) });
    };

    const isMale = (gender: unknown) => String(gender || "").trim().toUpperCase().startsWith("M");

    const toggleGender = (petshop: any) => {
        updatePet(petshop.id, { gender: isMale(petshop.gender) ? "F" : "M" });
    };

    return (
        <main className="catalogue-page">
            <aside className="catalogue-sidebar">
                <button
                    type="button"
                    className={`view-button cards-tab ${useCardView ? 'active-view-button' : ''}`}
                    onClick={() => setUseCardView(true)}
                    aria-label="Cards"
                />
                <button
                    type="button"
                    className={`view-button catalogue-tab ${!useCardView ? 'active-view-button' : ''}`}
                    onClick={() => setUseCardView(false)}
                    aria-label="Catalogue"
                />
            </aside>

            <div className="catalogue-scroll">
            <div className="catalogue-grid">
            {catalogueData.map((petshop: any, index: any) => {
                const imageSrc = `/Images/${petshop.id}.jpg`;

                return useCardView ? (
                    <Card
                        key={`${index}-${petshop.id}`}
                        data={petshop}
                        handleUpdateField={handleUpdateField}
                        updatePet={updatePet}
                    />
                ) : (
                    <div key={`${index}-${petshop.id}`}
                        className={`pet-container ${petshop.status === 'OWNED' ? 'owned' : 'not-owned'}`}>
                        <div className="pet-meta">
                            <div className={`status ${petshop.status === 'OWNED' ? 'unlocked' : 'locked'}`}
                                onClick={() => toggleStatus(petshop)}></div>
                            <span className="meta-line" aria-hidden="true"></span>
                            <div className="catalogue-number">
                                <i>{petshop.id}</i>
                            </div>
                            <span className="meta-line" aria-hidden="true"></span>
                            <div className={`gender ${isMale(petshop.gender) ? 'male' : 'female'}`}
                                onClick={() => toggleGender(petshop)}></div>
                        </div>
                        <div
                            className={`favourite-toggle ${isFavourite(petshop.favourite) ? 'liked' : 'not-liked'}`}
                            onClick={() => toggleFavourite(petshop)}
                        ></div>
                        <div
                            className={`vip-toggle vip-${vipLevel(petshop.vip)}`}
                            onClick={() => toggleVip(petshop)}
                        ></div>
                        {formatGeneration(petshop.generation) ? (
                            <span className="generation-tag">{formatGeneration(petshop.generation)}</span>
                        ) : null}
                        <div className="pet-image-wrap">
                            <img
                                src={imageSrc}
                                alt={`Petshop ${petshop.id}`}
                                className="petshop-img"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                    e.currentTarget.style.visibility = "hidden";
                                }}
                            />
                            <div className="pet-frame" aria-hidden="true"></div>
                        </div>
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
                                <span
                                    className={petshop.name ? undefined : "unnamed-name"}
                                    onDoubleClick={() => handleNameClick(petshop)}
                                >
                                    {petshop.name || '?'}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
            </div>
            <Footer />
            </div>
        </main>
    );
};

export default CataloguePage;
