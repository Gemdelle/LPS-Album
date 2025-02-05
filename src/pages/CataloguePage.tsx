import '../styles/catalogue.css';
import {useState} from "react";

const CataloguePage = ({ setLocation, data, updateGoogleSheet }: any) => {
    setLocation('/catalogue');

    // Estados para la edición
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editableName, setEditableName] = useState<string>("");

    // Función para manejar doble clic y activar edición
    const handleNameClick = (petshop: any) => {
        setEditingId(petshop.id);
        setEditableName(petshop.name || ""); // Set initial name for editing
    };

    // Función para manejar cambios en el input
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableName(e.target.value);
    };

    // Función para manejar el guardado al presionar Enter
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>, petshop: any) => {
        if (e.key === 'Enter') {
            try {
                // Buscar el índice del petshop en la lista para obtener la fila correcta
                const rowIndex = data.findIndex((p: any) => p.id === petshop.id);
                if (rowIndex === -1) return alert("Error: ID no encontrado");

                await updateGoogleSheet(rowIndex + 1, 2, editableName); // Fila +1 porque las filas en Sheets comienzan en 1

                petshop.name = editableName; // Actualizar nombre localmente
                setEditingId(null); // Salir del modo edición
            } catch (error) {
                alert("Error al actualizar el nombre. Inténtalo de nuevo.");
                console.error(error);
            }
        }
    };

    return (
        <main>
            {data.map((petshop: any) => {
                let imageSrc;
                try {
                    imageSrc = require(`../../public/Images/${petshop.id}.jpg`);
                } catch (err) {
                    imageSrc = null;
                }

                return (
                    <div
                        key={petshop.id}
                        className={`pet-container ${petshop.status === 'OWNED' ? 'owned' : 'not-owned'}`}
                    >
                        <div className={`status ${petshop.status === 'OWNED' ? 'unlocked' : 'locked'}`}></div>
                        <div className="catalogue-number">
                            <i>- {petshop.id} -</i>
                        </div>
                        <div className={`gender ${petshop.gender === 'M' ? 'male' : 'female'}`}></div>
                        {imageSrc ? (
                            <img src={imageSrc} alt={`Petshop ${petshop.id}`} className="petshop-img" />
                        ) : (
                            <div className="no-image-placeholder">No Image</div>
                        )}

                        {/* Editable Name Field */}
                        <div className="petshop-name">
                            {editingId === petshop.id ? (
                                <input
                                    type="text"
                                    value={editableName}
                                    onChange={handleNameChange}
                                    onKeyDown={(e) => handleKeyPress(e, petshop)}
                                    onBlur={() => setEditingId(null)} // Exit edit mode on blur
                                    autoFocus
                                />
                            ) : (
                                <span onDoubleClick={() => handleNameClick(petshop)}>
                                    {petshop.name || '?'}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default CataloguePage;