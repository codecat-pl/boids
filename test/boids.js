const expect = require('chai').expect;
const Boids = require('../src/boids');

describe('entry', ()=>{
    it('should contain environment, factory and vector', ()=>{
        expect(Boids).to.have.property('Environment');
        expect(Boids).to.have.property('Factory');
        expect(Boids).to.have.property('Vector3');
    })
});