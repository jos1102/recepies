import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../components/hooks/useGetUserID";
import { useCookies } from "react-cookie";

const getRandomColor = (lastColor, backgroundColor) => {
  let color;
  do {
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (color === lastColor || color === backgroundColor);
  return color;
};

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();
  let lastColor;
  const backgroundColor = "lightblue"; // set this to the background color of your app

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchsavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        if (Array.isArray(response.data.savedRecipes)) {
          setSavedRecipes(response.data.savedRecipes);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchsavedRecipes();
    fetchRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });

      if (Array.isArray(response.data.savedRecipes)) {
        setSavedRecipes(response.data.savedRecipes);
      }
    } catch (err) {
      console.log("you sucker");
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => {
          const color = getRandomColor(lastColor, backgroundColor);
          lastColor = color;
          return (
            <li key={recipe._id} style={{ backgroundColor: color }}>
              <div>
                <h2>{recipe.name}</h2>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
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
