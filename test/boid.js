const expect = require('chai').expect;
const {InvalidArgumentError} = require('../src/errors');
const Sphere = require('../src/sphere');
const Vector3 = require('../src/vector');
const BoidsFactory = require('../src/boids_factory');
const Boid = require('../src/boid');
const BoidsEnvironment = require('../src/environment');
const sinon = require('sinon');


describe('boids',()=>{
    let boid, env, factory;

    beforeEach(()=>{
        env = new BoidsEnvironment();
        factory = new BoidsFactory(env);
        boid = factory.createBoid();
    });

    afterEach(()=>{
        boid = env = factory = null;
    });


    it('creation should add to environment', ()=>{
        let env = new BoidsEnvironment();
        let boid = new Boid(env);
        expect(env.getBoids()).to.contain(boid);
    });


    it('should have position in 3D', ()=>{
        checkIfPropertyIs3DVector(boid, 'position');
    });

    it('should have velocity vector in 3D', ()=>{
        checkIfPropertyIs3DVector(boid, 'velocity');
    });

    it('should have default position in zero', ()=>{
        expect(boid.position).to.be.eql({x:0, y:0, z:0});
    });

    it('should have default velocity zero', ()=>{
        expect(boid.velocity).to.be.eql({x:0, y:0, z:0});
    });

    it('should move by velocity on update', ()=>{
        boid.velocity = new Vector3(1, 1, 1);
        boid.updatePosition();
        expect(boid.position).to.be.eql({x:1, y:1, z:1});
    });

    it('should know average position of surrounding boids',()=>{
        factory.createBoid(new Vector3(2,2,2));
        expect(boid.getGroupPosition(Infinity)).to.be.eql(new Vector3(2,2,2));
    });

    it('should know average position of surrounding boids',()=>{
        factory.createBoid(new Vector3(2,2,2));
        factory.createBoid(new Vector3(4,4,4));
        expect(boid.getGroupPosition(Infinity)).to.be.eql(new Vector3(3,3,3));
    });

    it('should know average position of surrounding boids to some distance',()=>{
        const radius = 5;
        factory.createBoid(new Vector3(2,2,2));
        factory.createBoid(new Vector3(10,10,10));
        expect(boid.getGroupPosition(radius)).to.be.eql(new Vector3(2,2,2))
    });

    it('should know where surrounding boids are heading', ()=>{
        const radius = 5;
        factory.createBoid(new Vector3(), new Vector3(2,2,2));
        expect(boid.getAlignmentVector(radius)).to.be.eql(new Vector3(2,2,2))
    });

    it('should know how to avoid boids that are too close', ()=>{
        factory.createBoid(new Vector3(-1,0,0));
        factory.createBoid(new Vector3(0,-1,0));
        factory.createBoid(new Vector3(0,0,-1));
        const result = boid.getSeparationVector();
        const expected = new Vector3(1,1,1).normalize()
        comparePositions(expected, result);
    });

    it('should update velocity according to neighbors', ()=>{
        factory.createBoid(new Vector3(), new Vector3(1,0,0));
        factory.createBoid(new Vector3(), new Vector3(0,1,0));
        const result = boid.getAlignmentVector();
        const expected = Vector3.average([new Vector3(1,0,0), new Vector3(0,1,0)]);
        comparePositions(expected, result);
        //expect(boid.velocity).to.be.eql(new Vector3(-0.5,-0.5,0))
    });


    it('should update velocity according to neighbors', ()=>{
        factory.createBoid(new Vector3(1,0,0), new Vector3(0,6,0));
        const result = boid.getAlignmentVector();
        const expected = new Vector3(0,6,0);
        comparePositions(expected,result);
    });

    it('should update velocity and position',()=>{
        let env = new BoidsEnvironment();
        let boid = new BoidsFactory(env).createBoid();
        boid.updatePosition = sinon.spy();
        boid.updateVelocity = sinon.spy();
        env.update();
        expect(boid.updatePosition.calledOnce).to.be.true;
        expect(boid.updateVelocity.calledOnce).to.be.true;
    });

    it('should not exceed maximum velocity',()=>{
        factory.createBoid(new Vector3(1,0,0), new Vector3(0,16,0));
        boid.updateVelocity();
        expect(Math.abs(boid.velocity.length())).to.be.most(env.MAX_SPEED);
    });

    it('should add aplied velocity during velocity update',()=>{
        boid.apply(new Vector3(100,0,0));
        boid.updateVelocity();
        expect(boid.velocity.x).to.be.closeTo(env.MAX_SPEED, 0.001);
    });

    function comparePositions(expected, actual){
        expect(actual.x).to.be.closeTo(expected.x, 0.0000001);
        expect(actual.y).to.be.closeTo(expected.y, 0.0000001);
        expect(actual.z).to.be.closeTo(expected.z, 0.0000001);
    }

    function checkIfPropertyIs3DVector(ob, property){
        expect(ob).to.have.property(property);
        expect(Vector3.isVector(ob[property])).to.be.true;
    }
});

