import { Recipe } from '../ts/recipe'

describe('testing getGrainNamesAsync', () => {
    afterAll(() => {
        
    })
    var recipe: Recipe = new Recipe("test-recipe");
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
    recipe.AddGrain(2, "Caramel/Crystal Malt - 40L")
    .then(() => {
        test('recipe grain#1 should be Caramel/Crystal Malt - 40L', () => {
            expect(recipe.grains[0].grain.name).toBe("Caramel/Crystal Malt - 40L");
        });
    });
    recipe.AddGrain(12, "Pale Malt (2 Row) US")
    .then(() => {
        test('recipe grain#2 should be Pale Malt (2 Row) US', () => {
            expect(recipe.grains[1].grain.name).toBe("Pale Malt (2 Row) US");
        })
    });
    recipe.AddHop(1, "Simcoe")
    .then(() => {
        test('recipe hop#1 should be Simcoe', () => {
            expect(recipe.hops[1].hop.name).toBe("Simcoe");
        })
    });
    recipe.AddHop(0.5, "Citra")
    .then(() => {
        test('recipe hop#1 should be Citra', () => {
            expect(recipe.hops[1].hop.name).toBe("Citra");
        })
    });;
    recipe.AddYeast("1318 London Ale III")
    .then(() => {
        test('recipe yeast should be 1318 London Ale III', () => {
            expect(recipe.hops[1].hop.name).toBe("1318 London Ale III");
        })
    });
})