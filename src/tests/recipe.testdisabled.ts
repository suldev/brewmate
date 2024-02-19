import { Recipe } from '../ts/recipe'
import { MongoGrain, getGrainAsync } from '../ts/grain'

describe('testing getGrainNamesAsync', async () => {
    var recipe: Recipe = new Recipe("test-recipe");
    test('recipe name should be test-recipe', () => {
        expect(recipe.name).toBe('test-recipe');
    });
    recipe.author = "Self.Test";
    test('recipe author should be Self.Test', () => {
        expect(recipe.author).toBe('Self.Test');
    });
    var gr: MongoGrain = await getGrainAsync("Pale Malt");
    getGrainAsync("Pale Malt (2 Row) Bel").then((grain) => {
        if(grain) {
            recipe.grains?.push({weightLbs: 10, grain: grain});
            test('recipe grain should be named Pale Malt (2 Row) Bel', () => {
                expect(recipe.grains[0].grain.name).toBe("Pale Malt (2 Row) Bel");
            });
        }
        try{
            
        }
        catch(error) {
            fail(error);
        }
        
    });
    
    test('length should result in 89', () => {
        getGrainNamesAsync().then((names) => {
            expect(names?.length).toBe(89);
        })
        .catch(() => fail('grain name count failed'));
    });
})