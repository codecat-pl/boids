const Vector3 = require('./vector');
const Sphere = require('./sphere');

const getPosition = boid=>boid.position;
const getVelocity = boid=>boid.velocity;

module.exports = class Boid {
    constructor( env, headingRadius, centerRadius, omitRadius ) {
        this.position = new Vector3();
        this.velocity = new Vector3();
        this.headingRadius = headingRadius;
        this.centerRadius = centerRadius;
        this.omitRadius = omitRadius;
        this.environment = env;
        this.environment.addBoid(this)
    }

    getGroupAverage(from ,radius = Infinity ) {
        const area = new Sphere(this.position, radius);
        const list = this.environment.getBoidsInArea(area, this.id).map(from);
        return Vector3.average(list);
    }

    getGroupPosition( radius = Infinity ) {
        return this.getGroupAverage(getPosition, radius);
    }

    getAlignmentVector( radius = Infinity ) {
        return this.getGroupAverage(getVelocity, radius);
    }

    getSeparationVector( radius = Infinity ) {
        return this.getGroupPosition(radius).substract(this.position).negate().normalize();
    }

    getCohesionVector( radius = Infinity ) {
        return this.getGroupPosition(radius).substract(this.position);
    }

    apply( velocity ){
        this.appliedVelocity = velocity;
    }

    updateVelocity() {
        const separation = this.getSeparationVector(5).multiply(4);
        const cohesion = this.getCohesionVector(15).divide(50);
        const alignment = this.getAlignmentVector(15).divide(4);
        if(!separation.isNaN()) this.velocity = this.velocity.add(separation);
        if(!cohesion.isNaN()) this.velocity = this.velocity.add(cohesion);
        if(!alignment.isNaN()) this.velocity = this.velocity.add(alignment);
        if(this.appliedVelocity) this.velocity = this.velocity.add(this.appliedVelocity);

        if(this.velocity.length() > this.environment.MAX_SPEED)
            this.velocity = this.velocity
            .normalize()
            .multiply(this.environment.MAX_SPEED);
    }

    updatePosition() {
        this.position = this.position.add(this.velocity);
    }

    update(){
        this.updateVelocity();
        this.updatePosition();
    }
};