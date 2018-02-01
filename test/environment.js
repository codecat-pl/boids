const expect = require('chai').expect;
const sinon = require('sinon');

const Sphere = require('../src/sphere');
const Vector3 = require('../src/vector');
const BoidsFactory = require('../src/boids_factory');
const BoidsEnvironment = require('../src/environment');


describe('BoidsEnvironment', ()=>{
    let env, factory;
    let area = new Sphere(new Vector3(0,0,0), 5);

    beforeEach(()=>{
        env = new BoidsEnvironment();
        factory = new BoidsFactory(env);
    });

    it('should store created boids',()=>{
        let boid = factory.createBoid();
        expect(env.getBoids()).to.contain(boid)
    });

    it('should return boids in area',()=>{
        let boid = factory.createBoid();
        expect(env.getBoidsInArea(area)).to.contain(boid)
    });

    it('should not return boids if in area are no boids',()=>{
        let boid = factory.createBoid();
        let emptyArea = new Sphere(new Vector3(5,5,5), 1);
        expect(env.getBoidsInArea(emptyArea)).to.have.lengthOf(0)
    });

    it('should update all boids',()=>{
        let fakeBoid = {update: sinon.spy()};
        env.addBoid(fakeBoid);
        env.update();
        expect(fakeBoid.update.calledOnce).to.be.true;
    });


    it('should know average position of boids in area',()=>{
        factory.createBoid();
        factory.createBoid(new Vector3(2,2,2));
        expect(env.getBoidsAveragePositionInArea(area)).to.be.eql(new Vector3(1,1,1))
    });

    it('should know average position of boids in area',()=>{
        expect(env.getBoidsAveragePositionInArea(area)).to.be.eql(new Vector3(NaN,NaN,NaN))
    });



});

