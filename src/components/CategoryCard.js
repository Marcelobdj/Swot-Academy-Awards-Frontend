import React from "react";
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, onDelete, onClose }) => {
    return (
        <div className="category-card">
            <h3>{category.title}</h3>
            <p>{category.subtitle}</p>
            {/* Display voting results here */}
            <button onClick={() => onClose(category._id)}>Close voting</button>
            <button onClick={() => onDelete(category._id)}>X</button>
        </div>
    );
};

export default CategoryCard;