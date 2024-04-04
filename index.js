
//Starter med at importere vores moduler
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "./modules/data.js";

import { setupCountries } from "./modules/setup.js";

setupCountries();

//Henter recipies fra vores database ved at bruge vores modul "getRecipes". Vi laver en template for hver recipes. 
async function showRecipes() {
  const response = await getRecipes();
  const el = document.querySelector("template").content;
  const parent = document.querySelector(".recipes");
  parent.innerHTML = "";
  response.forEach((rec) => {
    const clone = el.cloneNode(true);
    clone.querySelector("[data-name]").textContent = rec.name;
    clone.querySelector("[data-origin]").textContent = rec.origin;
    //Her sørge vi for at når vi opdatere om retten er studentfriendly så kan man enten se det som status eller ej
    if (rec.studentFriendly) {
      clone.querySelector(".status").hidden = false;
    } else {
      clone.querySelector(".status").hidden = true;
    }

    //Her laver vi vores delete-knap med delete-modulet. Vi har sat "await" på de to funtioner, for at de ikke opdatere samtidigt men venter på der sker en "update". Det samme laver vi med "updateRecipe".
    clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
    clone
      .querySelector("button[data-action='delete']")
      .addEventListener("click", async () => {
        await deleteRecipe(rec.id);
        await showRecipes();
      });
    clone
      .querySelector("button[data-action='update']")
      .addEventListener("click", async () => {
        await updateRecipe(rec.id, !rec.studentFriendly);
        await showRecipes();
      });
    parent.appendChild(clone);
  });
}
showRecipes();

//Vi laver en ny funtion som viser submit af en ny recipe.
function handleSubmit() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    console.log(e);
    //stop refresh
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData.get("ingredients").split("\n"));

    await createRecipe({
      name: formData.get("name"),
      description: formData.get("description"),
      ingredients: formData.get("ingredients").split("\n"),
      serves: formData.get("serves"),
      allergens: formData.get("allergens").split("\n"),
      diet: formData.get("diet"),
      studentFriendly: formData.get("studentFriendly"),
      origin: formData.get("origin"),
    });
    showRecipes();
  });
}
handleSubmit();