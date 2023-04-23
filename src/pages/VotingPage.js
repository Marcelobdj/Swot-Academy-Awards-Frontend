import React, { useState, useEffect } from "react";
import { fetchCategories, updateCategory } from "../api";
import '../styles/VotingPage.css';

const VotingPage = () => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetchCurrentCategory();
    }, []);

    const fetchCurrentCategory = async () => {
        try {
            const response = await fetchCategories();
            const openCategory = response.data.find((category) => category.isOpen);
            setCategory(openCategory);
        } catch (err) {
            console.error(err);
        }
    };

    const handleVote = async (e) => {
        e.preventDefault();
        const selectedCharacter = e.target.character.value;
        const comment = e.target.comment.value;

        // Update the category with the user's vote and comment
        if (category) {
            const updatedCategory = {
                ...category,
                votes: [...category.votes, { character: selectedCharacter, comment }],
            };
            try {
                await updateCategory(category._id, updatedCategory);
                fetchCurrentCategory();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="voting-page">
            {category ? (
                <div>
                    <h1>{category.title}</h1>
                    <h2>{category.subtitle}</h2>
                    <form onSubmit={handleVote}>
                        <select name="character">
                            {category.characters.map((character, index) => (
                                <option key={index} value={character}>
                                    {character}
                                </option>
                            ))}
                        </select>
                        <textarea name="comment" placeholder="Add a comment (optional)"></textarea>
                        <button type="submit">Vote</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Bem vindo ao SWOT3 Academy Awards</h1>
                    <p>Por favor, aguarde</p>
                </div>
            )}
        </div>
    );
};

export default VotingPage;