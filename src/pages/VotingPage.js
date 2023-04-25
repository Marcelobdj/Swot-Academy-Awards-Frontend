import React, { useState, useEffect } from "react";
import { fetchCategories, updateCategory, fetchVotingResults } from "../api";
import '../styles/VotingPage.css';

const VotingPage = () => {
    const [category, setCategory] = useState(null);
    const [votingResults, setVotingResults] = useState(null);

    useEffect(() => {
        fetchCurrentCategory();
    }, []);

    const fetchCurrentCategory = async () => {
        try {
            const response = await fetchCategories();
            const openCategory = response.data.find((category) => category.isOpen);
            setCategory(openCategory);
            if (!openCategory) {
                const closedCategory = response.data.find((category) => !category.isOpen);
                if (closedCategory) {
                    const results = await fetchVotingResults(closedCategory._id);
                    setVotingResults(results.data);
                }
            }
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
                    <div className="characters-list">
                        <h3>Characters allowed to be voted:</h3>
                        <ul>
                            {category.characters.map((character, index) => (
                                <li key={index}>{character}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : votingResults ? (
                <div>
                    <h1>{votingResults.category.title}</h1>
                    <h2>{votingResults.category.subtitle}</h2>
                    <p>
                        Voting is closed. The winner is {votingResults.winner} with{" "}
                        {votingResults.voteCount} votes.
                    </p>
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