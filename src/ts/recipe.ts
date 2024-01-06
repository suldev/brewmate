function formRecipe() {
    const form = document.getElementById("main-form") as HTMLElement | null;
    hiLiteSubNav("b-hb-recipe");
    if(form != null) {
        console.log("formRecipe");
        form.innerHTML = "";
        var p = document.createElement("p");
        p.innerHTML = "Recipes";
        form.appendChild(p);
    }
}