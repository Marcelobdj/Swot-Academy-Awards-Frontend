import React from "react";
import '../styles/CategoryCard.css';

const CategoryCard = ({
    category,
    onDelete,
    onClose,
    onSetVotingCategory,
    winner,
    voteCount,
}) => {
    return (
        <div className="category-card">
            <h2>{category.title}</h2>
            <h3>{category.subtitle}</h3>
            {category.isOpen ? (
                <>
                    <button onClick={() => onClose(category._id)}>Close Voting</button>
                    <button onClick={() => onSetVotingCategory(category._id)}>
                        Set as Current Voting Category
                    </button>
                </>
            ) : (
                <>
                    <p>Voting is closed.</p>
                    {winner && voteCount && (
                        <p>
                            The winner is {winner} with {voteCount} votes.
                        </p>
                    )}
                </>
            )}
            <button onClick={() => onDelete(category._id)}>Delete Category</button>
        </div>
    );
};

export default CategoryCard;