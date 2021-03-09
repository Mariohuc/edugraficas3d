import * as THREE from "three";
// Thanks to https://stackoverflow.com/questions/65568810/cannot-resolve-mathjs-number, 
// I use this way to import mathjs
import { create, all } from 'mathjs/lib/esm/number';
const config = {};
const math = create(all, config);

export class ParametricSurface {
  private _xFuncText: string = "cos(u)*(a + b*cos(v))";
  private _yFuncText: string = "sin(u)*(a + b*cos(v))"
  private _zFuncText: string = "b*sin(v)";
  private _segments: number = 40;
  private _uMin: number = 0;
  private _uMax: number = 6.283;
  private _vMin: number = 0;
  private _vMax: number = 6.282;
  private _xMin: number = -10;
  private _xMax: number = 10;
  private _yMin: number = -10;
  private _yMax: number = 10;
  private _zMin: number = -10;
  private _zMax: number = 10;
  private _param_a: number = 2;
  private _param_b: number = 1;
  private _param_c: number = 1;
  private _param_d: number = 1;
  private _param_e: number = 1;
  currentParam: string = "";
  // Properties to save 3D objects
  private _clippingPlanes = null;
  private graphGeometry = null;
  private wireMaterial = null;
  private graphMesh = null;
  private parser = math.parser();

  private _scene: THREE.Scene;

  constructor( scene: THREE.Scene ){
    this.scene = scene;
  }

  set xFuncText(val: string){
    this._xFuncText = val;
  }
  get xFuncText(): string{
    return this._xFuncText;
  }
  set yFuncText(val: string){
    this._yFuncText = val;
  }
  get yFuncText(): string{
    return this._yFuncText;
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

  set uMin(val: number){
    this._uMin = val;
  }
  get uMin(){
    return this._uMin;
  }
  set uMax(val: number){
    this._uMax = val;
  }
  get uMax(){
    return this._uMax;
  }

  set vMin(val: number){
    this._vMin = val;
  }
  get vMin(){
    return this._vMin;
  }
  set vMax(val: number){
    this._vMax = val;
  }
  get vMax(){
    return this._vMax;
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

  get uRange() {
    return this.uMax - this.uMin;
  }
  get vRange() {
    return this.vMax - this.vMin;
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

  getPSFuncTex() {
    let node = math.parse(this.xFuncText);
    
    let transformed = node.transform(node => {
      if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
        return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
      } else {
        return node;
      }
    });
    
    const xtemp = math.parse(  math.simplify(transformed.toString()).toString());

    node = math.parse(this.yFuncText);
    
    transformed = node.transform(node => {
      if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
        return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
      } else {
        return node;
      }
    });
    
    const ytemp = math.parse(  math.simplify(transformed.toString()).toString());

    node = math.parse(this.zFuncText);
    
    transformed = node.transform(node => {
      if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
        return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
      } else {
        return node;
      }
    });
    
    const ztemp = math.parse(  math.simplify(transformed.toString()).toString());
    return [
      "$$x = f(u,v) = " + xtemp.toTex() + "$$",
      "$$y = g(u,v) = " + ytemp.toTex() + "$$", 
      "$$z = h(u,v) = " + ztemp.toTex() + "$$"];
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
    let xFunc = null;
    let yFunc = null;
    let zFunc = null;
    if( newfunction === true ){
      let result = this.resetFunctions();
      xFunc = result['xFunc'];
      yFunc = result['yFunc'];
      zFunc = result['zFunc'];
    }else{
      xFunc = this.parser.get("f");
      yFunc = this.parser.get("g");
      zFunc = this.parser.get("h");
    }
    if( !xFunc || !yFunc || !zFunc ){
      throw new Error('There is no function');
    }
    let self = this;
    var meshFunction = function(u0, v0, target) {
      let u = self.uRange * u0 + self.uMin;
      let v = self.vRange * v0 + self.vMin;
      let x = xFunc(u,v);
      let y = yFunc(u,v);
      let z = zFunc(u,v);
      if (isNaN(x) || isNaN(y) || isNaN(z)) target.set(0, 0, 0);
      else target.set(x, y, z);
    };
    // true => sensible image tile repeat...
    this.graphGeometry = new THREE.ParametricBufferGeometry( meshFunction, this.segments, this.segments);
    this.graphGeometry.computeBoundingBox();
    this.zMin = this.graphGeometry.boundingBox.min.z;
    this.zMax = this.graphGeometry.boundingBox.max.z;
    
    this.setVertexColors();
    this.xMin = this.graphGeometry.boundingBox.min.x;
	  this.xMax = this.graphGeometry.boundingBox.max.x;
  	this.yMin = this.graphGeometry.boundingBox.min.y;
	  this.yMax = this.graphGeometry.boundingBox.max.y;
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

  resetFunctions() {
    try {
      this.parser.clear();
      this.parser.evaluate("f(u,v) = ".concat(this.xFuncText));
      this.parser.evaluate("g(u,v) = ".concat(this.yFuncText));
      this.parser.evaluate("h(u,v) = ".concat(this.zFuncText));
      this.parser.set("a", this.param_a);
      this.parser.set("b", this.param_b);
      this.parser.set("c", this.param_c);
      this.parser.set("d", this.param_d);
      this.parser.set("e", this.param_e);
      this.parser.evaluate("f(1,1)")
      this.parser.evaluate("g(1,1)")
      this.parser.evaluate("h(1,1)")
    } catch (error) {
      return null;
    }
    //return true;
    return { 'xFunc': this.parser.get("f"), 'yFunc': this.parser.get("g"), 'zFunc': this.parser.get("h") };
  }

}