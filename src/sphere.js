
module.exports = class Sphere{
    constructor(pos, rad){
        this.position = pos;
        this.radius = rad;
    }
    contain(point){
        return this.distanceToCenter(point) < this.radius;
    }

    distanceToCenter( point ) {
        return this.position.substract(point).length();
    }
};
