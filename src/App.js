import React, {useEffect,useState}  from 'react';
import './App.css';
import RecipeCard from './RecipeCard';
import Recipe from './Recipe';
import { Button, Grid } from '@material-ui/core';
const App=()=>{

  const APP_ID='56a043aa';
  const APP_KEY='c0147a470c5283382da3966f2c78a29b';
 
  const[recipes,setRecipes]=useState([]);
  const[search,setSearch]=useState("");
  const[query,setQuery]=useState('chicken');
 
  useEffect(()=>{
    getRecipes();
  },[query]);
  
  const getRecipes = async () => {
    const response=await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data= await response.json();
    setRecipes(data.hits);
    
  };

  const UpdateSearch= (e) =>{
    setSearch(e.target.value);
  }

  const GetSearch= (e) =>{
    
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return(
    <div className="App">
      <div className="Navbar">
     <form onSubmit={GetSearch} className="search-form">
      <input
       type="text" 
       className="search-bar" 
       value={search} 
       onChange={UpdateSearch}
       placeholder="Search your food here"/>
      <Button type="submit" className="search-button" variant="contained" color="secondary"
      size="medium" style={{marginLeft:"5px"}}> Search </Button>
     </form>
     </div>
     <div className="recipes">
     {recipes.map(recip=>(
       
       <RecipeCard 
        key={recip.recipe.label}
        title={recip.recipe.label}
        calories={recip.recipe.calories}
        image={recip.recipe.image}  
        ingredients={recip.recipe.ingredients}
       />
     ))
     }
     </div>
     
     </div>
    
  )
}
export default App;
