const expect = require('chai').expect;
const Sphere = require('../src/sphere');
const Vector3 = require('../src/vector');

describe("Sphere", ()=>{
    it('should know if point is in area', ()=>{
        let s = new Sphere(new Vector3(1,1,1), 3);
        expect(s.contain(new Vector3(2,2,2))).to.be.true;
    });
    it('should know if point is not in area', ()=>{
        let s = new Sphere(new Vector3(1,1,1), 3);
        expect(s.contain(new Vector3(5,5,5))).to.be.false;
    });
});