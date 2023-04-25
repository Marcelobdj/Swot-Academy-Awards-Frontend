import React, { useState } from "react";
import "../styles/CharacterInput.css";

const CharacterInput = ({ onAddCharacter }) => {
    const [character, setCharacter] = useState("");
    const [characters, setCharacters] = useState([]);
    // Add a new state for disabled input
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (character.trim() !== "") {
            setCharacters((prevCharacters) => [
                ...prevCharacters,
                { name: character, isEditable: false },
            ]);
            setCharacter("");
        }
    };

    const handleChange = (event, index) => {
        const updatedCharacters = [...characters];
        updatedCharacters[index].name = event.target.value;
        setCharacters(updatedCharacters);
    };

    const handleEdit = (index) => {
        const updatedCharacters = [...characters];
        updatedCharacters[index].isEditable = true;
        setCharacters(updatedCharacters);
    };

    const handleSave = (index) => {
        // Update the character in the database
        const updatedCharacters = [...characters];
        updatedCharacters[index].isEditable = false;
        setCharacters(updatedCharacters);
        onAddCharacter(updatedCharacters);
    };

    const handleDelete = (index) => {
        // Delete the character from the database
        const updatedCharacters = characters.filter((_, i) => i !== index);
        setCharacters(updatedCharacters);
        onAddCharacter(updatedCharacters);
    };

    // Handle the "Allow voting for this character" button click
    const handleAllowVoting = () => {
        if (character.trim() !== "") {
            onAddCharacter(character);
            setCharacter("");
            setDisabled(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    placeholder="Enter character name"
                    disabled={disabled}
                />
                <button type="button" onClick={handleAllowVoting}>
                    Allow voting for this character
                </button>
                <button type="submit">Add another character</button>
            </form>
            {characters.map((char, index) => (
                <div key={index} className="character-input">
                    <input
                        type="text"
                        value={char.name}
                        disabled={!char.isEditable}
                        onChange={(event) => handleChange(event, index)}
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
        </div>
    );
};

export default CharacterInput;