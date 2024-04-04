//Importer apiky og endpoint så du ikke skal skrive hele apikey og URL'en hele tiden
import { apikey, endpoint } from "./settings.js";

//Lave get-modulen som henter dataen ned fra Supabase. Lavet sammen med thunderclient. Den er skrevet med async og await så dataen hentes én af gangen.
export async function getRecipes() {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
  };

  let response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}


//WET - Write Everything Twice
//DRY - Don't Repeat Yourself
//AHA - Avoid Hasty Abstractions

//Lave post-modulen fra thunderclient. Her kan man lave sin nye opskrift. 
export async function createRecipe(recipe) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify(recipe);

  let response = await fetch(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  console.log(data);
}

//Lave delete-modulen fra thunderclient. Her kan man slette en opskrift. Vi bruger id til at finde opskriften, så vi vælger en specifik opskrift i stedet for at risikere at slette flere på én gang.
export async function deleteRecipe(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
  };

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

//Lave update-modulen som her bruges til at ændre boolean med studentFriendly. OGså her bruger vi ID, for at ændre en specifik opskrift.
export async function updateRecipe(id, state = true) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    studentFriendly: state,
  });

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}