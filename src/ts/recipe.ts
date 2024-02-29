import { Grain } from "./grain";
import { Hop } from "./hops";
import { BMMongo } from "./mongodb";
import { Yeast } from "./yeast";

interface IGrain {
    weightLbs: number,
    grain: Grain
}

interface IHop {
    weightOz: number,
    hop: Hop
}

interface IYeast {
    yeast: Yeast
}

export class Recipe {
    #library: BMMongo;
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
    grains: IGrain[];
    hops: IHop[];
    yeasts: IYeast[];

    constructor(Name: string) {
        this.name = Name;
        this.#library = new BMMongo('brewmate','password','1','brewmate');
        this.grains = [];
        this.hops = [];
        this.yeasts = [];
    }

    async AddGrain(weightLbs: number, name: string) {
        try {
            var grain = await this.#library.getGrainAsync(name);
            if(grain) {
                return this.grains.push({weightLbs: 5, grain: grain});
            }
            throw new Error(`grain ${name} not found`);
        } catch(error) {
            console.log(error);
        }
    }

    async AddHop(weightLbs: number, name: string) {
        try {
            var hop = await this.#library.getHopAsync(name);
            if(hop) {
                return this.hops.push({weightOz: 5, hop: hop});
            }
            throw new Error(`hop ${name} not found`);
        } catch(error) {
            console.log(error);
        }
    }

    async AddYeast(name: string) {
        try {
            var yeast = await this.#library.getYeastAsync(name);
            if(yeast) {
                return this.yeasts.push({yeast: yeast});
            }
            throw new Error(`yeast ${name} not found`);
        } catch(error) {
            console.log(error);
        }
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