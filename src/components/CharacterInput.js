import React, { useState } from "react";
import "../styles/CharacterInput.css";

const CharacterInput = ({ onAddCharacter }) => {
    const [character, setCharacter] = useState("");
    const [characters, setCharacters] = useState([]);

    const handleAllowVoting = () => {
        if (character.trim() !== "") {
            setCharacters((prevCharacters) => [
                ...prevCharacters,
                { name: character, isEditable: false },
            ]);
            onAddCharacter([...characters, { name: character, isEditable: false }]);
            setCharacter("");
        }
    };

    const handleEdit = (index) => {
        const updatedCharacters = [...characters];
        updatedCharacters[index].isEditable = true;
        setCharacters(updatedCharacters);
    };

    const handleSave = (index) => {
        const updatedCharacters = [...characters];
        updatedCharacters[index].isEditable = false;
        setCharacters(updatedCharacters);
        onAddCharacter(updatedCharacters);
    };

    const handleDelete = (index) => {
        const updatedCharacters = characters.filter((_, i) => i !== index);
        setCharacters(updatedCharacters);
        onAddCharacter(updatedCharacters);
    };

    return (
        <div>
            {characters.map((char, index) => (
                <div key={index} className="character-input">
                    <input
                        type="text"
                        value={char.name}
                        disabled={!char.isEditable}
                        onChange={(event) => {
                            const updatedCharacters = [...characters];
                            updatedCharacters[index].name = event.target.value;
                            setCharacters(updatedCharacters);
                        }}
                    />
                    {char.isEditable ? (
                        <button onClick={() => handleSave(index)}>Save</button>
                    ) : (
                        <>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            <div className="character-input">
                <input
                    type="text"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    placeholder="Enter character name"
                />
                <button type="button" onClick={handleAllowVoting}>
                    Allow voting for this character
                </button>
            </div>
        </div>
    );
};

export default CharacterInput;