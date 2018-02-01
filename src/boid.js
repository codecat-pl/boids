const Vector3 = require('./vector');
const Sphere = require('./sphere');
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

    getGroupPosition( radius = Infinity ) {
        let area = new Sphere(this.position, radius);
        return this.environment.getBoidsAveragePositionInArea(area);
    }

    getAlignmentVector( radius = Infinity ) {
        let area = new Sphere(this.position, radius);
        return this.environment.getBoidsAverageVelocityInArea(area);
    }

    getSeparationVector( radius = Infinity ) {
        return this.getGroupPosition(radius).negate().normalize();
    }

    getCohesionVector() {
        return this.getGroupPosition().substract(this.position);
    }

    updateVelocity() {
        this.velocity = new Vector3()
            .add(this.getSeparationVector())
            .add(this.getCohesionVector())
            .add(this.getAlignmentVector())
    }

    updatePosition() {
        this.position = this.position.add(this.velocity);
    }

    update(){
        this.updateVelocity();
        this.updatePosition();
    }
};