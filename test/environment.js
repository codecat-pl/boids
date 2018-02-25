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
        const boid = factory.createBoid();
        expect(env.getBoids()).to.contain(boid)
    });

    it('should return boids in area',()=>{
        const boid = factory.createBoid();
        expect(env.getBoidsInArea(area)).to.contain(boid)
    });

    it('should return boids in area without one of with specified id',()=>{
        factory.createBoid();
        factory.createBoid();
        const boid = factory.createBoid();
        expect(env.getBoidsInArea(area, boid.id)).to.not.contain(boid)
    });

    it('should not return boids if in area are no boids',()=>{
        factory.createBoid();
        const emptyArea = new Sphere(new Vector3(5,5,5), 1);
        expect(env.getBoidsInArea(emptyArea)).to.have.lengthOf(0)
    });

    it('should update all boids',()=>{
        const boid = factory.createBoid();
        boid.update = sinon.spy();
        env.update();
        expect(boid.update.calledOnce).to.be.true;
    });


    it('should apply velocity toward center if boid is too far',()=>{
        const boid = factory.createBoid(new Vector3(1000,0,0));
        boid.apply = sinon.spy();
        env.redirect();
        expect(boid.apply.withArgs(new Vector3(-10,0,0)).calledOnce).to.be.true;
    });

    it('should apply velocity before update on env update',()=>{
        const boid = factory.createBoid(new Vector3(1000,0,0));
        boid.apply = sinon.spy();
        boid.update = sinon.spy();
        env.update();
        expect(boid.apply.calledBefore(boid.update)).to.equal(true);

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

