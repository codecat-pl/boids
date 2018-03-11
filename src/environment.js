const Vector3 = require('./vector');
const Config = require('./config');

class BoidsEnvironment{
    constructor(){
        this.boids = [];
        this.MAX_SPEED = Config.get('maxSpeed');
        this.MAX_DISTANCE = Config.get('maxDistanceFromCenter');
    }

    getBoids(){
        return this.boids;
    }

    getBoidsInArea(area, p){
        return this.boids.filter(boid=>boid.id!==p && area.contain(boid.position));
    }

    getBoidsAveragePositionInArea(area, boid){
        const getPosition = boid=>boid.position;
        let positions = this.getBoidsInArea(area, boid).map(getPosition);
        return Vector3.average(positions);
    }

    getBoidsAverageVelocityInArea(area, boid){
        const getVelocity = boid=>boid.velocity;
        let velocities = this.getBoidsInArea(area, boid).map(getVelocity);
        console.log(velocities);
        return Vector3.average(velocities);
    }

    addBoid(boid){
        this.boids.push(boid);
    }

    redirect(){
        this.boids.forEach(boid=>{
            if(boid.position.length() > this.MAX_DISTANCE){
                boid.apply(boid.position.negate().divide(100));
            }
        })
    }

    update(){
        this.redirect();
        this.boids.forEach(boid=>boid.update());
    }
}


module.exports = BoidsEnvironment;
