import React, { useState, useEffect } from "react";
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    setCurrentVotingCategory,
    fetchVotingResults,
} from "../api";
import CategoryCard from "../components/CategoryCard";
import CharacterInput from "../components/CharacterInput";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [charList, setCharList] = useState([]);

    const handleAddCharacter = (characters) => {
        setCharList(characters);
    };

    const [charInputs, setCharInputs] = useState([
        <CharacterInput onAddCharacter={handleAddCharacter} />,
    ]);

    useEffect(() => {
        fetchCategoriesData();
    }, []);

    const fetchCategoriesData = async () => {
        try {
            const response = await fetchCategories();
            setCategories(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const subtitle = e.target.subtitle.value;
        const newCategory = {
            title,
            subtitle,
            characters: charList.map((char) => char.name),
            isOpen: true,
            votes: [],
        };
        try {
            await createCategory(newCategory);
            fetchCategoriesData();
            setCharList([]);
            setCharInputs([
                <CharacterInput onAddCharacter={handleAddCharacter} />,
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter((category) => category._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseVoting = async (id) => {
        try {
            const response = await updateCategory(id, { isOpen: false });
            const updatedCategories = categories.map((category) =>
                category._id === id ? response.data : category
            );
            setCategories(updatedCategories);
        } catch (err) {
            console.error(err);
        }
    };


    const handleSetVotingCategory = async (id) => {
        try {
            await setCurrentVotingCategory(id);
            fetchCategoriesData(); // Refresh the categories to reflect the updated 'isOpen' state
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            {charInputs}
            <form onSubmit={handleSubmitCategory}>
                <input type="text" name="title" placeholder="Category Title" required />
                <input
                    type="text"
                    name="subtitle"
                    placeholder="Category Subtitle"
                    required
                />
                <button type="submit">Create Category</button>
            </form>
            <div className="category-cards">
                {categories.map((category) => (
                    <CategoryCard
                        key={category._id}
                        category={category}
                        onDelete={handleDeleteCategory}
                        onClose={handleCloseVoting}
                        onSetVotingCategory={handleSetVotingCategory}
                        winner={category.winner}
                        voteCount={category.voteCount}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;