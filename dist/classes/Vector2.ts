// from: https://docs.unity3d.com/ScriptReference/Vector2.html
class Vector2{
    // Static Properties
    static down: Vector2 = new Vector2(0, -1);
    static left: Vector2 = new Vector2(-1, 0);
    static negativeInfinity: Vector2= new Vector2(-Infinity, -Infinity);
    static one: Vector2 = new Vector2(1,1);
    static positiveInfinity: Vector2 = new Vector2(Infinity, Infinity);
    static right: Vector2 = new Vector2(1,0);
    static up: Vector2 = new Vector2(0,1);
    static zero: Vector2 = new Vector2(0,0);

    // Properties
    x: number;
    y: number;

    // Public methods
    Equals(other: Vector2){
        // Returns true if the given vector is exactly equal to this vector.
        return (this.x == other.x && this.y == other.y);
    }
    Normalize(){
        // Returns this vector but with a magnitude of 1.
        return this.Divide(this.Magnitude());
    }
    Set(x: number, y:number){
        // Set x and y components of an existing Vector2.
        this.x = x;
        this.y = y;
    }
    Get(){
        // Returns an object with only X and Y
        return {x: this.x, y: this.y};
    }
    ToString(){
        // Return a formatted string with the X and Y values
        return "x: " + this.x + ", y: " + this.y;
    }

    // Static methods
    Magnitude () {
        // Returns the length of this vector
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Angle(other: Vector2){
        // Gets the unsigned angle in degrees between from and to.
        // Calculate the dot product of the two vectors
        const dotProduct = this.Dot(other);

        // Calculate the magnitudes of the vectors
        const magnitude1 = this.Magnitude();
        const magnitude2 = other.Magnitude();

        // Calculate the cosine of the angle
        const cosTheta = dotProduct / (magnitude1 * magnitude2);

        // Clamp the cosine value to the range [-1, 1] to handle floating-point imprecision
        const clampedCosTheta = Math.max(-1, Math.min(1, cosTheta));

        // Calculate the angle in radians and convert it to degrees
        const angleRadians = Math.acos(clampedCosTheta);
        return angleRadians * (180 / Math.PI); // In degrees
    }
    Distance(other: Vector2){
        return this.Subract(other).Magnitude();
    }
    // Operations
    Divide(num: number){
        // Returns the vector divided by a number
        return new Vector2(this.x/num, this.y/num);
    }
    Subract(other: Vector2){
        // Subtracts one vector from another.
        return new Vector2(this.x-other.x, this.y-other.y);
    }
    Dot(other: Vector2){
        // Returns the dot product between two Vector2
        return this.x * other.x + this.y * other.y;
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export {Vector2};