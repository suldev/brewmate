import { MongoGrain, getGrainAsync } from './grain'
import { MongoHop } from './hops'
import { MongoYeast } from './yeast'

export class Recipe {
    name: string;
    author?: string;
    date?: Date;
    description?: string;
    preBoilGravity?: number;
    originalGravity?: number;
    finalGravity?: number;
    preBoilVolume?: number;
    postBoilVolume?: number;
    finalVolume?: number;
    grains?: [{weightLbs: number, grain: MongoGrain}];
    hops?: [{weightOz: number, hop: MongoHop}];
    yeasts?: [{yeast: MongoYeast}];

    constructor(Name: string) {
        this.name = Name;
    }

    AlcoholContent(): number {
        if(this.originalGravity && this.finalGravity) {
            return (this.originalGravity - this.finalGravity) * 131;
        }
        return 0;
    }
    ColorSRM(): number{
        if(this.grains && this.finalVolume) {
            var colorSRM = 0;
            for(const grain of this.grains) {
                colorSRM += grain.grain.colorSRM * grain.weightLbs / this.finalVolume;
            }
            return 3.0 * colorSRM + 4.8;
        } else {
            return 0;
        }
    }
    CalculateGravities() {
        if(this.grains && this.yeasts && this.preBoilVolume && this.postBoilVolume) {
            this.preBoilGravity = 0;
            this.originalGravity = 0;
            this.finalGravity = 0;
            for(const grain of this.grains) {
                var extract = 1.0;
                if(grain.grain.type == "Grain") {
                    extract = 0.72;
                }
                this.preBoilGravity += grain.grain.potential * grain.weightLbs * extract / this.preBoilVolume;
                this.originalGravity += grain.grain.potential * grain.weightLbs * extract / this.postBoilVolume;
            }
            this.preBoilGravity = this.preBoilGravity / 1000.0 + 1;
            this.originalGravity = this.originalGravity / 1000.0 + 1;
            for(const yeast of this.yeasts) {
                this.finalGravity += yeast.yeast.attenuation;
            }
            this.finalGravity = 1.0 + (this.originalGravity - 1.0) * (1.0 - this.finalGravity / this.yeasts.length);
        }
    }
}

function recipeToForm(recipe: Recipe) {
    const form = document.getElementById("main-form") as HTMLElement | null;
    
}