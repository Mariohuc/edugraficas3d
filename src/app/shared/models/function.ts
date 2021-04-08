import * as THREE from "three";
// Thanks to https://stackoverflow.com/questions/65568810/cannot-resolve-mathjs-number 
// I use this way to import mathjs
import { create, all } from 'mathjs/lib/esm/number';

const config = { }
const math = create(all, config)

//import * as math from 'mathjs';


export class Function {
  private _zFuncText: string = "sin(sqrt(a*x^2  + b*y^2))"; //default function
  private _segments: number = 40;
  private _xMin: number = -10;
  private _xMax: number = 10;
  private _yMin: number = -10;
  private _yMax: number = 10;
  private _zMin: number = -10;
  private _zMax: number = 10;
  private _param_a: number = 1;
  private _param_b: number = 1;
  private _param_c: number = 1;
  private _param_d: number = 1;
  private _param_e: number = 1;
  private _clippingPlanes = null;
  currentParam: string = "";
  // Properties to save 3D objects
  private graphGeometry = null;
  private wireMaterial = null;
  private graphMesh = null;
  private parser = math.parser();

  private _scene: THREE.Scene;

  constructor( scene: THREE.Scene ){
    this.scene = scene;
  }

  set zFuncText(val: string){
    this._zFuncText = val;
  }
  get zFuncText(): string{
    return this._zFuncText;
  }

  set segments( val: number){
    this._segments = val;
  }
  get segments(){
    return this._segments;
  }

  set xMin(val: number){
    this._xMin = val;
  }
  get xMin(){
    return this._xMin;
  }

  set xMax(val: number){
    this._xMax = val;
  }
  get xMax(){
    return this._xMax;
  }

  set yMin(val: number){
    this._yMin = val;
  }
  get yMin(){
    return this._yMin;
  }

  set yMax(val: number){
    this._yMax = val;
  }
  get yMax(){
    return this._yMax;
  }

  set zMin(val: number){
    this._zMin = val;
  }
  get zMin(){
    return this._zMin;
  }
  set zMax(val: number){
    this._zMax = val;
  }
  get zMax(){
    return this._zMax;
  }

  set param_a( val:number ){
    this._param_a = val;
    this.parser.set("a", this._param_a);
  }
  get param_a(): number{
    return this._param_a;
  }
  set param_b( val:number ){
    this._param_b = val;
    this.parser.set("b", this._param_b);
  }
  get param_b(): number{
    return this._param_b;
  }
  set param_c( val:number ){
    this._param_c = val;
    this.parser.set("c", this._param_c);
  }
  get param_c(): number{
    return this._param_c;
  }
  set param_d( val:number ){
    this._param_d = val;
    this.parser.set("d", this._param_d);
  }
  get param_d(): number{
    return this._param_d;
  }
  set param_e( val:number ){
    this._param_e = val;
    this.parser.set("e", this._param_e);
  }
  get param_e(): number{
    return this._param_e;
  }

  get xRange() {
    return this.xMax - this.xMin;
  }
  get yRange() {
    return this.yMax - this.yMin;
  }
  get zRange() {
    return this.zMax - this.zMin;
  }

  set scene(val: THREE.Scene){
    this._scene = val;
  }
  

  getOneParameter() {
    return this.parser.get(this.currentParam);
  }

  getGraphMesh(){
    return this.graphMesh;
  }

  async init(){
    this.createDefaultWireMaterial();
    this.createGraph();
  }

  getZFuncTex() {
    const node = math.parse(this.zFuncText);
    
    const transformed = node.transform(node => {
      if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
        return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
      } else {
        return node;
      }
    });
    //console.log( math.simplify(transformed.toString()).toString() )
    const ztemp = math.parse( transformed.toString() );
    return ["$$z = f(x,y) = " + ztemp.toTex() + "$$"];
  }

  private createDefaultWireMaterial() {
    
    this._clippingPlanes = [
      new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 25 ),//plane in X positive
      new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 25 ), //plane in X negative
      new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 25 ),//plane in Y positive
      new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 25 ),//plane in Y negative
      new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 25 ),//plane in Z positive
      new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 25 ),//plane in Z negative
    ];
    
    let wireTexture = new THREE.TextureLoader().load("assets/images/square.png");
    wireTexture.wrapS = wireTexture.wrapT = THREE.RepeatWrapping;
    wireTexture.repeat.set(this.segments, this.segments);
    this.wireMaterial = new THREE.MeshBasicMaterial({
      map: wireTexture,
      vertexColors: true,
      side: THREE.DoubleSide,
      clippingPlanes: this._clippingPlanes,
      clipShadows: true
    });
  }
  addMeshTo( scene: THREE.Scene ){
    
    scene.add( this.graphMesh )
  }
  createGraph( newfunction: boolean = true ) {   
    let result = null;
    if( newfunction === true ){
      result = this.resetParameters();
    }else{
      result = this.parser.get("f");
    }
    if( !result ){
      throw new Error('There is no function');
    }
    let self = this;
    var meshFunction = function(x, y, target) {
      x = self.xRange * x + self.xMin;
      y = self.yRange * y + self.yMin;
      var z = result(x, y);
      if (isNaN(z)) target.set(0, 0, 0);
      else target.set(x, y, z);
    };
    // true => sensible image tile repeat...
    this.graphGeometry = new THREE.ParametricBufferGeometry( meshFunction, this.segments, this.segments);
    this.graphGeometry.computeBoundingBox();
    this.zMin = this.graphGeometry.boundingBox.min.z;
    this.zMax = this.graphGeometry.boundingBox.max.z;
    
    this.setVertexColors();
    if (this.graphMesh) {
      this._scene.remove(this.graphMesh);
    }
    this.wireMaterial.map.repeat.set(this.segments, this.segments);
    this.graphMesh = new THREE.Mesh(this.graphGeometry, this.wireMaterial);
  
    this.graphMesh.doubleSided = true;
    this.graphMesh.name = "fgraph";
    this._scene.add(this.graphMesh);
    //commit("setZFuncTextTex");
   
  }

  private setVertexColors() {   
    if (!this.graphGeometry){
      throw new Error('Graph Geometry is null')
    }
    let positions = this.graphGeometry.getAttribute("position");
    let color: THREE.Color;
    let colors = [];
    for (let i = 0; i < positions.count; i++) {
      color = new THREE.Color(0x0000ff);
      color.setHSL(
        (0.7 * (this.zMax - positions.getZ(i))) / this.zRange,
        1,
        0.5
      );
      colors.push(color.r, color.g, color.b);
    }
    this.graphGeometry.setAttribute( "color", new THREE.Float32BufferAttribute(colors, 3));  
  }

  resetParameters() {
    try {
      this.parser.clear();
      this.parser.evaluate("f(x,y) = ".concat(this.zFuncText)); // f(x, y)
      this.parser.set("a", this.param_a);
      this.parser.set("b", this.param_b);
      this.parser.set("c", this.param_c);
      this.parser.set("d", this.param_d);
      this.parser.set("e", this.param_e);
      this.parser.evaluate("f(10,10)")
      //var zmax_pos = math.abs(this.parser.evaluate("f(10,10)"));
      //var zmax_neg = math.abs(this.parser.evaluate("f(-10,-10)"));
      /* var major = zmax_pos > zmax_neg ? zmax_pos : zmax_neg;
      if (major >= 100) {
        this.xMax = 3;
        this.yMax = 3;
        this.xMin = -3;
        this.yMin = -3;
      } else if (major >= 50) {
        this.xMax = 6;
        this.yMax = 6;
        this.xMin = -6;
        this.yMin = -6;
      } */
    } catch (error) {
      return null;
    }
    return this.parser.get("f");
  }

}