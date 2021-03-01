import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
// Thanks to https://stackoverflow.com/questions/65568810/cannot-resolve-mathjs-number
// I use this way to import mathjs
import { create, all } from 'mathjs/lib/esm/number';
const config = {};
const math = create(all, config);

export class QuadricSurface {
  private _equationText: string =
    'A*x^2 + B*y^2 + C*z^2 + D*x*y + E*y*z + F*x*z + G*x + H*y + I*z + J'; //default equation = 0
  private _segments: number = 40;
  private _resolution: number = 50;
  private _xMin: number = -10;
  private _xMax: number = 10;
  private _yMin: number = -10;
  private _yMax: number = 10;
  private _zMin: number = -10;
  private _zMax: number = 10;
  private _param_A: number = 1;
  private _param_B: number = 1;
  private _param_C: number = 1;
  private _param_D: number = 0;
  private _param_E: number = 0;
  private _param_F: number = 0;
  private _param_G: number = 0;
  private _param_H: number = 0;
  private _param_I: number = 0;
  private _param_J: number = -1;
  private _clippingPlanes = null;
  currentParam: string = '';
  // Properties to save 3D objects
  private graphGeometry = null;
  private wireMaterial = null;
  private graphMesh = null;
  private parser = math.parser();

  private _scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  set equationText(val: string) {
    this._equationText = val;
  }
  get equationText(): string {
    return this._equationText;
  }

  set segments(val: number) {
    this._segments = val;
  }
  get segments() {
    return this._segments;
  }

  set xMin(val: number) {
    this._xMin = val;
  }
  get xMin() {
    return this._xMin;
  }

  set xMax(val: number) {
    this._xMax = val;
  }
  get xMax() {
    return this._xMax;
  }

  set yMin(val: number) {
    this._yMin = val;
  }
  get yMin() {
    return this._yMin;
  }

  set yMax(val: number) {
    this._yMax = val;
  }
  get yMax() {
    return this._yMax;
  }

  set zMin(val: number) {
    this._zMin = val;
  }
  get zMin() {
    return this._zMin;
  }
  set zMax(val: number) {
    this._zMax = val;
  }
  get zMax() {
    return this._zMax;
  }

  set param_A(val: number) {
    this._param_A = val;
    this.parser.set('A', this._param_A);
  }
  get param_A(): number {
    return this._param_A;
  }
  set param_B(val: number) {
    this._param_B = val;
    this.parser.set('B', this._param_B);
  }
  get param_B(): number {
    return this._param_B;
  }
  set param_C(val: number) {
    this._param_C = val;
    this.parser.set('C', this._param_C);
  }
  get param_C(): number {
    return this._param_C;
  }
  set param_D(val: number) {
    this._param_D = val;
    this.parser.set('D', this._param_D);
  }
  get param_D(): number {
    return this._param_D;
  }
  set param_E(val: number) {
    this._param_E = val;
    this.parser.set('E', this._param_E);
  }
  get param_E(): number {
    return this._param_E;
  }
  set param_F(val: number) {
    this._param_F = val;
    this.parser.set('F', this._param_F);
  }
  get param_F(): number {
    return this._param_F;
  }
  set param_G(val: number) {
    this._param_G = val;
    this.parser.set('G', this._param_G);
  }
  get param_G(): number {
    return this._param_G;
  }
  set param_H(val: number) {
    this._param_H = val;
    this.parser.set('H', this._param_H);
  }
  get param_H(): number {
    return this._param_H;
  }
  set param_I(val: number) {
    this._param_I = val;
    this.parser.set('I', this._param_I);
  }
  get param_I(): number {
    return this._param_I;
  }
  set param_J(val: number) {
    this._param_J = val;
    this.parser.set('J', this._param_J);
  }
  get param_J(): number {
    return this._param_J;
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

  set scene(val: THREE.Scene) {
    this._scene = val;
  }

  getQSFuncTex() {
    const node = math.parse(this.equationText);
    
    const transformed = node.transform(node => {
      if (node.isSymbolNode && "A,B,C,D,E,F,G,H,I,J".indexOf(node.name) !== -1) {
        return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
      } else {
        return node;
      }
    });
    //console.log( math.simplify(transformed.toString()).toString() )
    const qstemp = math.parse( math.simplify(transformed.toString()).toString());
    return ["$$ f(x,y,z) = " + qstemp.toTex() + " = 0 $$"];
  }

  getOneParameter() {
    return this.parser.get(this.currentParam);
  }

  getGraphMesh() {
    return this.graphMesh;
  }

  async init() {
    this.createDefaultWireMaterial();
    this.resetParameters();
    this.createGraph();
  }

  private createDefaultWireMaterial() {
    this._clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 25), //plane in X positive
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 25), //plane in X negative
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 25), //plane in Y positive
      new THREE.Plane(new THREE.Vector3(0, 1, 0), 25), //plane in Y negative
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 25), //plane in Z positive
      new THREE.Plane(new THREE.Vector3(0, 0, 1), 25), //plane in Z negative
    ];

    this.wireMaterial = new THREE.MeshStandardMaterial({
      color: '#1565C0', // blue 800
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      clippingPlanes: this._clippingPlanes,
      flatShading: false,
    });
  }

  createGraph() {
    
    if (this.graphMesh) {
      this._scene.remove(this.graphMesh);
    }
    // true => sensible image tile repeat...
    let res = this._resolution;
    this.graphMesh = new MarchingCubes(res, this.wireMaterial);

    this.graphMesh.isolation = 0;
    this.graphMesh.scale.set( 4,4,4 ); // I've added this new line to fit to cartesian plane coordinates

    for (let k = 0; k < res; k++) {
      for (let j = 0; j < res; j++) {
        for (let i = 0; i < res; i++) {
          let x = (8 * (i - res / 2)) / res;
          let y = (8 * (j - res / 2)) / res;
          let z = (8 * (k - res / 2)) / res;

          this.graphMesh.field[i + j * res + k * res * res] = this.quadValue( x, y, z); // to have z as height
        }
      }
    }

    this.graphMesh.name = 'qsgraph';
    this._scene.add(this.graphMesh);
  }

  updateGraph() {

    let res = this._resolution;
    this.graphMesh.reset();
    for (let k = 0; k < res; k++) {
      for (let j = 0; j < res; j++) {
        for (let i = 0; i < res; i++) {
          let x = (8 * (i - res / 2)) / res;
          let y = (8 * (j - res / 2)) / res;
          let z = (8 * (k - res / 2)) / res;

          this.graphMesh.field[i + j * res + k * res * res] = this.quadValue( x, y, z); // to have z as height
        }
      }
    }
  }

  private setVertexColors() {
    if (!this.graphGeometry) {
      throw new Error('Graph Geometry is null');
    }
    let positions = this.graphGeometry.getAttribute('position');
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
    this.graphGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  }

  private quadValue(x, y, z) {
    return (
      this._param_A * x * x +
      this._param_B * y * y +
      this._param_C * z * z +
      this._param_D * x * y +
      this._param_E * y * z +
      this._param_F * x * z +
      this._param_G * x +
      this._param_H * y +
      this._param_I * z +
      this.param_J
    );
  }

  resetParameters() {
    try {
      this.parser.clear();
      this.parser.evaluate('f(x,y,z) = '.concat(this.equationText)); // f(x, y)
      this.parser.set('A', this.param_A);
      this.parser.set('B', this.param_B);
      this.parser.set('C', this.param_C);
      this.parser.set('D', this.param_D);
      this.parser.set('E', this.param_E);
      this.parser.set('F', this.param_F);
      this.parser.set('G', this.param_G);
      this.parser.set('H', this.param_H);
      this.parser.set('I', this.param_I);
      this.parser.set('J', this.param_J);
      this.parser.evaluate('f(1,1,1)');
    } catch (error) {
      throw new Error('There is no equation');
    }
    return this.parser.get('f');
  }
}
