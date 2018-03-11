


module.exports = class Config {
    static get(name){
        if(!Config.instance)
            Config.instance = new Config();
        return Config.instance[name];
    }

    constructor(){
        this.maxSpeed = 1;
        this.maxDistanceFromCenter = 100;

        this.separationArea = 2;
        this.cohesionArea = 6;
        this.alignmentArea = 6;

        this.separationCoefficient = 4;
        this.cohesionCoefficient = 1/50;
        this.alignmentCoefficient = 1/4;
    }

};