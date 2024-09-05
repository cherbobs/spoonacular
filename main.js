// La clé API Spoonacular
const apiKey = '3b1c9a54f9eb4a2c8cdd15fb43c53537';

// Fonction pour rechercher des recettes avec un mot-clé et des filtres
async function searchRecipes(query, filters) {
  try {
    // Construire l'URL de base
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

    // Si l'utilisateur a entré une requête (mot-clé), l'ajouter à l'URL
    if (query) {
      url += `&query=${query}`;
    }

    // Ajouter les régimes alimentaires à l'URL
    if (filters.diets.length > 0) {
      url += `&diet=${filters.diets.join(',')}`;  // Spoonacular accepte plusieurs régimes séparés par des virgules
    }

    // Ajouter les intolérances alimentaires à l'URL
    if (filters.intolerances.length > 0) {
      url += `&intolerances=${filters.intolerances.join(',')}`;  // Même principe pour les intolérances
    }

    // Ajouter le filtre "very healthy" si sélectionné
    if (filters.veryHealthy) {
      url += `&veryHealthy=true`;
    }

    console.log("Requête API URL:", url);  // Afficher l'URL pour déboguer

    // Appel à l'API Spoonacular
    const response = await fetch(url);

    // Vérifier si la réponse est correcte
    if (!response.ok) throw new Error('Aucune recette trouvée');

    // Récupérer les données en format JSON
    const data = await response.json();

    // Vérifier s'il y a des résultats
    if (data.results.length === 0) {
      displayError('Aucune recette trouvée');
    } else {
      displayRecipes(data.results);  // Afficher les recettes
    }
  } catch (error) {
    displayError(error.message);
  }
}

// Fonction pour récupérer les filtres sélectionnés
function getSelectedFilters() {
  const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
  const diets = [];
  const intolerances = [];
  let veryHealthy = false;

  checkboxes.forEach(checkbox => {
    const value = checkbox.value;
    if (value === 'vegetarian' || value === 'vegan') {
      diets.push(value);
    } else if (value === 'glutenFree' || value === 'dairyFree') {
      intolerances.push(value);
    } else if (value === 'veryHealthy') {
      veryHealthy = true;
    }
  });

  return { diets, intolerances, veryHealthy };
}

// Gestionnaire d'événement pour le formulaire de recherche
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Récupérer la valeur de l'input de recherche (mot-clé)
  const query = document.getElementById('searchInput').value;

  // Récupérer les filtres sélectionnés
  const filters = getSelectedFilters();

  // Appeler la fonction pour rechercher des recettes avec le mot-clé et les filtres
  searchRecipes(query, filters);
});

// Fonction pour afficher les recettes
function displayRecipes(recipes) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';  // Vider les résultats précédents

  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe'); // Ajouter la classe 'recipe'
    recipeDiv.innerHTML = `
      <h3 class="recipe-title">${recipe.title}</h3>
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
  resultsDiv.innerHTML = `<p>${message}</p>`;
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Simuler la recherche
    const searchQuery = document.getElementById('searchInput').value;
    
    // Supprime le texte par défaut (message)
    const noResultsMessage = document.getElementById('no-results-message');
    
    if (searchQuery.trim() !== "") {
        // Simule des résultats (à remplacer avec les vrais résultats)
        document.getElementById('results').innerHTML = ''; // Vide les résultats
        noResultsMessage.style.display = 'none'; // Masquer le message

        // Ici, tu peux ajouter le code qui insère les recettes
        // Exemple :
        // let recipe = `<div class="recipe"><p>Recette pour: ${searchQuery}</p></div>`;
        // document.getElementById('results').innerHTML = recipe;
    } else {
        // Si le champ est vide, on réaffiche le message par défaut
        noResultsMessage.style.display = 'block';
    }
});
