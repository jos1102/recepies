import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../components/hooks/useGetUserID";

const getRandomColor = (lastColor, backgroundColor) => {
  let color;
  do {
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (color === lastColor || color === backgroundColor);
  return color;
};

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();
  let lastColor;
  const backgroundColor = "white"; // set this to the background color of your app

  useEffect(() => {
    const fetchsavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchsavedRecipes();
  }, []);

  return (
    <div className="recipes-container">
      <h1>Saved Recipes</h1>
      <ul>
        {Array.isArray(savedRecipes) &&
          savedRecipes.map((recipe) => {
            const color = getRandomColor(lastColor, backgroundColor);
            lastColor = color;
            return (
              <li key={recipe._id} style={{ backgroundColor: color }}>
                <div>
                  <h2>{recipe.name}</h2>
                </div>
                <div className="ingredients">
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
