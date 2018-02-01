
const {InvalidArgumentError} = require('./errors');
const Boid = require('./boid');
const Vector3 = require('./vector');

module.exports = class BoidsFactory{
    constructor(env){
        this.environment = env
        this.nextId = 0;
    }
    createBoid(pos = new Vector3(), velocity = new Vector3()){
        BoidsFactory.validateVectors(pos, velocity);

        let boid = new Boid(this.environment);
        boid.position = pos;
        boid.velocity = velocity;
        boid.id = this.nextId ++;
        return boid;
    }

    static validateVectors( pos, velocity ) {
        if (!Vector3.isVector(pos) || !Vector3.isVector(velocity))
            throw new InvalidArgumentError();
    }
}