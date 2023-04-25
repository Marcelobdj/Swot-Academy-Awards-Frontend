import React from "react";
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, onDelete, onClose, onSetVotingCategory, winner, voteCount }) => {

    const handleSetVotingCategory = () => {
        onSetVotingCategory(category._id);
    };

    return (
        <div className="category-card">
            <h3>{category.title}</h3>
            <p>{category.subtitle}</p>
            {category.isOpen ? (
                <>
                    <button onClick={() => onClose(category._id)}>Close voting</button>
                    <button onClick={handleSetVotingCategory}>Set as Voting Category</button>
                </>
            ) : (
                <div>
                    <p>Voting is closed for this category.</p>
                    <p>
                        Winner: {winner} with {voteCount} vote{voteCount > 1 ? 's' : ''}
                    </p>
                </div>
            )}
            <button onClick={() => onDelete(category._id)}>X</button>
        </div>
    );
};

export default CategoryCard;