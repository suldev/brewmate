import { BMMongo } from "./mongodb";

let bm = new BMMongo('brewmate','password','1','brewmate');
bm.connect();
bm.getYeastNamesAsync()
.then((result) => {
    result?.forEach(element => {
        console.log(element);
    })
})
/*
var recipe = new Recipe("testRecipe");
recipe.AddGrain(5, "Caramel/Crystal Malt - 40L")
.then(() => {
    console.log(recipe.grains[0].grain);
    recipe.AddHop(2, "Chinook")
    .then(() => {
        console.log(recipe.hops[0].hop);
        recipe.AddYeast("WLP026 Premium Bitter Ale")
        .then(() => {
            console.log(recipe.yeasts[0].yeast);
        })
    });
});*/