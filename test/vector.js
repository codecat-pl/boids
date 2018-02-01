const expect = require('chai').expect;
const Vector3 = require('../src/vector');

describe('Vector3', ()=>{
    it('should be 3D vector', ()=>{
        let v = new Vector3();
        expect(v).to.have.property('x');
        expect(v).to.have.property('y');
        expect(v).to.have.property('z');
    });

    it('should now if object is vector', ()=>{
        expect(Vector3.isVector(5)).to.be.false;
        expect(Vector3.isVector([1,2,3])).to.be.false;
        expect(Vector3.isVector({x:1, y:1,z:1})).to.be.false;
        expect(Vector3.isVector(new Vector3())).to.be.true;
    })

    it('should know its length - zero',()=>{
        let vec = new Vector3(0,0,0);
        expect(vec.length()).to.be.eql(0);
    });

    it('should know its length - one',()=>{
        let vec = new Vector3(1,0,0);
        expect(vec.length()).to.be.eql(1);
    });

    it('should know its length - other',()=>{
        let vec = new Vector3(1,2,-3);
        expect(vec.length()).to.be.eql(Math.sqrt(Math.pow(1,2) + Math.pow(2,2) + Math.pow(-3,2)));
    });

    it('should add to other vector3',()=>{
        let v1 = new Vector3(1,2,1);
        let v2 = new Vector3(2,1,2);
        let result = v1.add(v2);
        expect(result).to.be.eql({x:3,y:3,z:3});
    });

    it('should substract from other vector3',()=>{
        let v1 = new Vector3(1,2,3);
        let v2 = new Vector3(1,1,1);
        let result = v1.substract(v2);
        expect(result).to.be.eql({x:0,y:1,z:2});
    });


    it('should divide by scalar', ()=>{
        let v1 = new Vector3(2,2,2);
        let result = v1.divide(2);
        expect(result).to.be.eql({x:1,y:1,z:1});
    });

    it('should calc average from vectors',()=>{
        let result = Vector3.average([new Vector3(1,1,1), new Vector3(1,3,5)]);
        expect(Vector3.isVector(result)).to.be.true;
        expect(result).to.be.eql(new Vector3(1,2,3));
    });

    it('should calc average from vectors',()=>{
        let result = Vector3.average([]);
        expect(Vector3.isVector(result)).to.be.true;
        expect(result).to.be.eql(new Vector3(NaN,NaN,NaN));
    });


    it('should negate itself', ()=>{
        const negation = new Vector3(1, -2, 3).negate();
        expect(negation).to.be.eql(new Vector3(-1,2,-3));
    })

    it('should normalize itself', ()=>{
        const normal = new Vector3(1, -2, 3).normalize();
        expect(normal.length()).to.be.eql(1);
    })


});
