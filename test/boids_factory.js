const expect = require('chai').expect;
const {InvalidArgumentError} = require('../src/errors');
const Vector3 = require('../src/vector');
const BoidsFactory = require('../src/boids_factory');
const Boid = require('../src/boid');
const BoidsEnvironment = require('../src/environment');


describe('BoidsFactory', ()=>{
    let env, factory;
    beforeEach(()=>{
        env = new BoidsEnvironment();
        factory = new BoidsFactory(env);
    });

    it('should create boids',()=>{
        let creation = factory.createBoid();
        expect(creation).to.be.instanceOf(Boid)
    });

    it('should create boids with unique id',()=>{
        let creation = factory.createBoid();
        let creation2 = factory.createBoid();
        expect(creation.id).to.be.eql(0);
        expect(creation2.id).to.be.eql(1);
    });


    it('should create boid in specific environment',()=>{
        let creation = factory.createBoid();
        expect(creation.environment).to.be.eql(env);
    });

    it('should create boid in specific position',()=>{
        let creation = factory.createBoid(new Vector3(2,2,2));
        expect(creation.position).to.be.eql(new Vector3(2,2,2));
    });

    it('should throw if position is not Vector3 or undefined',()=>{
        expect(()=>factory.createBoid(2)).to.throw(InvalidArgumentError)
    });

    it('should create boid with velocity if set', ()=>{
        let creation = factory.createBoid(new Vector3(),new Vector3(2,2,2));
        expect(creation.velocity).to.be.eql(new Vector3(2,2,2));
    });
    it('should throw if velocity is not Vector3 or undefined', ()=>{
        const wrongCreation = ()=>factory.createBoid(new Vector3(),5);
        expect(wrongCreation).to.throw(InvalidArgumentError)
    });
});
