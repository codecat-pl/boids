const expect = require('chai').expect;
const {InvalidArgumentError} = require('../src/errors');

describe('Errors', ()=>{
    it('InvalidArgumentError default message', ()=>{
        const err = new InvalidArgumentError();
        expect(err.message).to.be.eql('Argument supplied to function is invalid')
    });
    it('InvalidArgumentError message can be changed', ()=>{
        const err = new InvalidArgumentError('oko');
        expect(err.message).to.be.eql('oko')
    });
});