// La clé API Spoonacular
const apiKey = '2be4e9cae6df489392d6f4695853d35e';


// Fonction pour rechercher des recettes à partir d'une requête utilisateur
async function searchRecipes(query) {
    console.log('Recherche en cours pour:', query);  // Ajoute cette ligne
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`);
      if (!response.ok) throw new Error('Aucune recette trouvée');
      const data = await response.json();
      console.log(data);  // Ajoute cette ligne pour vérifier les résultats
      if (data.results.length === 0) {
        displayError('Aucune recette trouvée');
      } else {
        displayRecipes(data.results);  // Afficher les recettes
      }
    } catch (error) {
      displayError(error.message);
    }
  }
  

// Fonction pour afficher les recettes dans le HTML
function displayRecipes(recipes) {
  const resultsDiv = document.getElementById('results');
  
  // Vider les résultats précédents
  resultsDiv.innerHTML = '';  
  
  // Boucle sur les recettes et créer des éléments HTML pour chaque recette
  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
    `;
    
    // Ajouter un gestionnaire de clic pour chaque recette
    recipeDiv.addEventListener('click', function() {
      getRecipeDetails(recipe.id);  // Utiliser l'ID de la recette pour obtenir les détails
    });

    resultsDiv.appendChild(recipeDiv);
  });
}

// Fonction pour récupérer les détails d'une recette
async function getRecipeDetails(recipeId) {
    console.log('Chargement des détails pour la recette ID:', recipeId);  // Ajoute cette ligne pour suivre la requête
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
      if (!response.ok) throw new Error('Impossible de récupérer les détails de la recette');
      
      const recipeDetails = await response.json();
      console.log('Détails de la recette obtenus :', recipeDetails);  // Vérifie les détails reçus
      displayRecipeDetails(recipeDetails);
    } catch (error) {
      displayError(error.message);
    }
  }



// Fonction pour afficher les détails d'une recette dans le HTML
function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // Vider les résultats précédents
  
    recipes.forEach(recipe => {
      const recipeDiv = document.createElement('div');
      recipeDiv.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
      `;
      
      // Rediriger vers une nouvelle page avec l'ID de la recette dans l'URL
      recipeDiv.addEventListener('click', function() {
        window.location.href = `recipeDetails.html?id=${recipe.id}`;
      });
  
      resultsDiv.appendChild(recipeDiv);
    });
  }
  

// Fonction pour afficher un message d'erreur
function displayError(message) {
  const resultsDiv = document.getElementById('results');
  
  // Vider les résultats précédents et afficher un message d'erreur
  resultsDiv.innerHTML = `<p>${message}</p>`;
}

// Gestionnaire d'événement pour le formulaire de recherche
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Récupérer la valeur de l'input de recherche
  const query = document.getElementById('searchInput').value;
  
  // Appeler la fonction pour rechercher des recettes avec la requête utilisateur
  searchRecipes(query);
});
