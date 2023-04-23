import React, { useState } from "react";
import '../styles/CharacterInput.css';

const CharacterInput = ({ onAddCharacter }) => {
    const [character, setCharacter] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (character.trim() !== "") {
            onAddCharacter(character);
            setCharacter("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="Enter character name"
            />
            <button type="submit">Add another character</button>
        </form>
    );
};

export default CharacterInput;