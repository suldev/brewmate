import { Recipe } from '../ts/recipe'

describe('testing recipe class', () => {
    var recipe: Recipe = new Recipe("test-recipe");
    recipe.connect();

    test('recipe name should be test-recipe', () => {
        expect(recipe.name).toBe('test-recipe');
    });
    recipe.author = "Self.Test";
    test('recipe author should be Self.Test', () => {
        expect(recipe.author).toBe('Self.Test');
    });
    recipe.description = "This is a self-test recipe";
    test('recipe description should be This is a self-test recipe', () => {
        expect(recipe.description).toBe('This is a self-test recipe');
    });
    test('recipe grain#1 should be 2 lb Caramel/Crystal Malt - 40L', async() => {
        await recipe.AddGrain(2, "Caramel/Crystal Malt - 40L").then(() => {
            expect(recipe.grains[0].grain.name).toBe("Caramel/Crystal Malt - 40L");
            expect(recipe.grains[0].weightLbs).toBe(2);
        });
    });
    test('recipe grain#2 should be 10 lb Pale Malt (2 Row) US', async() => {
        await recipe.AddGrain(10, "Pale Malt (2 Row) US").then(() => {
            expect(recipe.grains[1].grain.name).toBe("Pale Malt (2 Row) US");
            expect(recipe.grains[1].weightLbs).toBe(10);
        });
    });
    test('recipe hop#1 should be 1.0 oz Simcoe', async() => {
        await recipe.AddHop(1, "Simcoe").then(() => {
            expect(recipe.hops[0].hop.name).toBe("Simcoe");
            expect(recipe.hops[0].weightOz).toBe(1);
        });
    });
    test('recipe hop#1 should be 0.5 oz Citra', async() => {
        await recipe.AddHop(0.5, "Citra").then(() => {
            expect(recipe.hops[1].hop.name).toBe("Citra");
            expect(recipe.hops[1].weightOz).toBe(0.5);
        });
    });
    afterAll(async() => {
        recipe.Close();
    });
})