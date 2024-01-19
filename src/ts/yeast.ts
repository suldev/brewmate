interface Yeast {
    Name: string;
    Type: string;
    LoTemp: number; //F
    HiTemp: number; //F
    Attenuation: number;
    Flocculation: string;
    Notes: string | undefined;
    BestFor: string | undefined;
}