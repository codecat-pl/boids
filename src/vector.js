
module.exports = class Vector3{
    constructor(x=0,y=0,z=0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v){
        return new Vector3(this.x+v.x, this.y+v.y, this.z+v.z);
    }

    divide(scalar){
        return new Vector3(this.x/scalar, this.y/scalar, this.z/scalar);
    }

    substract(v){
        return new Vector3(this.x-v.x, this.y-v.y, this.z-v.z);
    }

    length(){
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
    }

    negate(){
        //used substraction and not just - to avoid -0
        return new Vector3(0-this.x, 0-this.y, 0-this.z);
    }

    normalize(){
        const len = this.length();
        return new Vector3(this.x/len, this.y/len, this.z/len)
    }

    static average(vectors){
        let count = vectors.length;
        return vectors.reduce((sum, vec)=>{
            return sum.add(vec);
        }, new Vector3()).divide(count);
    }

    static isVector( ob ) {
        return ob instanceof Vector3;
    }
}
