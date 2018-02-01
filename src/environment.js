const Vector3 = require('./vector');

module.exports = class BoidsEnvironment{
    constructor(){
        this.boids = []
    }

    getBoids(){
        return this.boids;
    }

    getBoidsInArea(area){
        return this.boids.filter(boid=>area.contain(boid.position));
    }

    getBoidsAveragePositionInArea(area){
        const getPosition = boid=>boid.position;
        let positions = this.getBoidsInArea(area).map(getPosition);
        return Vector3.average(positions);
    }

    getBoidsAverageVelocityInArea(area){
        const getVelocity = boid=>boid.velocity;
        let velocities = this.getBoidsInArea(area).map(getVelocity);
        return Vector3.average(velocities);
    }

    addBoid(boid){
        this.boids.push(boid);
    }

    update(){
        this.boids.forEach(boid=>boid.update());
    }
};