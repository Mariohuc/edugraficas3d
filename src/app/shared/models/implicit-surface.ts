import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
// Thanks to https://stackoverflow.com/questions/65568810/cannot-resolve-mathjs-number
// I use this way to import mathjs
import { create, all } from 'mathjs/lib/esm/number';
const config = {};
const math = create(all, config);

export class ImplicitSurface {
  private _equationText: string = '(x^2)/a^2 + (y^2)/b^2 + (z^2)/c^2 = 1'; // 'A*x^2 + B*y^2 + C*z^2 + D*x*y + E*y*z + F*x*z + G*x + H*y + I*z + J'; //default equation = 0
  private _segments: number = 60;
  private _resolution: number = 60;
  private _xMin: number = -10;
  private _xMax: number = 10;
  private _yMin: number = -10;
  private _yMax: number = 10;
  private _zMin: number = -10;
  private _zMax: number = 10;
  private _param_A: number = 2;
  private _param_B: number = 4;
  private _param_C: number = 2;
  private _param_D: number = 0;
  private _param_E: number = 0;
  
  private _clippingPlanes = null;
  // Properties to save 3D objects
  private graphGeometry = null;
  private wireMaterial = null;
  private graphMesh = null;
  private mCubesMesh = null;
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
    this.parser.set('a', this._param_A);
  }
  get param_A(): number {
    return this._param_A;
  }
  set param_B(val: number) {
    this._param_B = val;
    this.parser.set('b', this._param_B);
  }
  get param_B(): number {
    return this._param_B;
  }
  set param_C(val: number) {
    this._param_C = val;
    this.parser.set('c', this._param_C);
  }
  get param_C(): number {
    return this._param_C;
  }
  set param_D(val: number) {
    this._param_D = val;
    this.parser.set('d', this._param_D);
  }
  get param_D(): number {
    return this._param_D;
  }
  set param_E(val: number) {
    this._param_E = val;
    this.parser.set('e', this._param_E);
  }
  get param_E(): number {
    return this._param_E;
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
    if( /^[^\s][^=]+=[\s]*[0][\s]*$/.test(this.equationText) ) {
      const node = math.parse(this.equationText.split('=')[0]);
      const transformed = node.transform(node => {
        if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
          return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
        } else {
          return node;
        }
      });
  
      const eqtemp = math.parse( math.simplify(transformed.toString()).toString());
      return ["$$" + eqtemp.toTex() + " = 0 $$"];
    }else if( /^[\s]*[0][\s]*=[^=]+[^\s]$/.test(this.equationText) ){ 
      const node = math.parse(this.equationText.split('=')[1]);
      const transformed = node.transform(node => {
        if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
          return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
        } else {
          return node;
        }
      });
  
      const eqtemp = math.parse( math.simplify(transformed.toString()).toString());
      return ["$$ 0 = " + eqtemp.toTex() + "$$"];
    }else if( /^[^\s][^=]+=[^=]+[^\s]$/.test(this.equationText) ) {
      let temp = this.equationText.split('=');
      const left_node = math.parse(temp[0]);
      const l_transformed = left_node.transform(node => {
        if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
          return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
        } else {
          return node;
        }
      });
      const l_eqtemp = math.parse( l_transformed.toString());

      const right_node = math.parse(temp[1]);
      const r_transformed = right_node.transform(node => {
        if (node.isSymbolNode && "a,b,c,d,e".indexOf(node.name) !== -1) {
          return new math.ConstantNode( parseFloat(this.parser.get(node.name).toFixed(1)) );
        } else {
          return node;
        }
      });
  
      const r_eqtemp = math.parse( r_transformed.toString() );

      return ["$$ " + l_eqtemp.toTex() + " = " + r_eqtemp.toTex() + "$$"];
    }
    
    
  }

  getGraphMesh() {
    return this.graphMesh;
  }

  async init() {
    this.createDefaultWireMaterial();
    //this.resetParameters();
    this.createGraph();
  }

  private createDefaultWireMaterial() {
    this._clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 10), //plane in X positive
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 10), //plane in X negative
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 10), //plane in Y positive
      new THREE.Plane(new THREE.Vector3(0, 1, 0), 10), //plane in Y negative
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 10), //plane in Z positive
      new THREE.Plane(new THREE.Vector3(0, 0, 1), 10), //plane in Z negative
    ];

    this.wireMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
      clippingPlanes: this._clippingPlanes,
      clipShadows: true
    });
  }

  createGraph() {
    
    let f = this.resetParameters();
    if( !f ){
      throw new Error('There is no function');
    }
    // true => sensible image tile repeat...
    let res = this._resolution;
    this.mCubesMesh = new MarchingCubes(res, new THREE.MeshStandardMaterial({ color: '#1565C0' }));  // blue 800

    this.mCubesMesh.isolation = 0;
    //this.mCubesMesh.scale.set( 12,12,12 ); // I've added this new line to fit to cartesian plane coordinates

    for (let k = 0; k <= res; k++) {
      for (let j = 0; j <= res; j++) {
        for (let i = 0; i <= res; i++) {
          let x = (24 * (i - res / 2)) / res;
          let y = (24 * (j - res / 2)) / res;
          let z = (24 * (k - res / 2)) / res;
          /* let x = i - res / 2;
          let y = j - res / 2;
          let z = k - res / 2; */
          //this.mCubesMesh.field[i + j * res + k * res * res] = this.quadValue( x, y, z); // to have z as height
          //this.mCubesMesh.field[i + j * res + k * res * res] = z - ((x*x)/16 + (y*y)/64);
          this.mCubesMesh.field[i + j * res + k * res * res] = f(x,y,z);
        }
      }
    }

    //this.mCubesMesh.name = 'qsgraph';
    //this._scene.add(this.mCubesMesh);
    this.graphGeometry = this.mCubesMesh.generateBufferGeometry();
    
    this.graphGeometry.scale(12, 12, 12);
    this.graphGeometry.computeBoundingBox();
    this.zMin = this.graphGeometry.boundingBox.min.z;
    this.zMax = this.graphGeometry.boundingBox.max.z;
    
    this.setVertexColors();
    if (this.graphMesh) {
      this._scene.remove(this.graphMesh);
    }
    this.graphMesh = new THREE.Mesh(this.graphGeometry, this.wireMaterial);
  
    this.graphMesh.doubleSided = true;
    this.graphMesh.name = "isgraph";
    //this.graphMesh.scale.set(12,12,12);
    this._scene.add( this.graphMesh );
  }

  updateGraph() {
    let f = this.parser.get("f");
    let res = this._resolution;
    this.mCubesMesh.reset();
    for (let k = 0; k <= res; k++) {
      for (let j = 0; j <= res; j++) {
        for (let i = 0; i <= res; i++) {
          let x = (24 * (i - res / 2)) / res;
          let y = (24 * (j - res / 2)) / res;
          let z = (24 * (k - res / 2)) / res;
          /* let x = i - res / 2;
          let y = j - res / 2;
          let z = k - res / 2; */
          //this.mCubesMesh.field[i + j * res + k * res * res] = this.quadValue( x, y, z); // to have z as height
          this.mCubesMesh.field[i + j * res + k * res * res] = f(x,y,z);
        }
      }
    }
    this.graphGeometry = this.mCubesMesh.generateBufferGeometry();
    
    this.graphGeometry.scale(12, 12, 12);
    this.graphGeometry.computeBoundingBox();
    this.zMin = this.graphGeometry.boundingBox.min.z;
    this.zMax = this.graphGeometry.boundingBox.max.z;
    
    this.setVertexColors();
    if (this.graphMesh) {
      this._scene.remove(this.graphMesh);
    }
    this.graphMesh = new THREE.Mesh(this.graphGeometry, this.wireMaterial);
  
    this.graphMesh.doubleSided = true;
    this.graphMesh.name = "isgraph";
    //this.graphMesh.scale.set(12,12,12);
    this._scene.add( this.graphMesh );
  }

  private setVertexColors() {
    if (!this.graphGeometry) {
      throw new Error('Graph Geometry is null');
    }
    let positions = this.graphGeometry.getAttribute('position');
    let color: THREE.Color;
    let colors = [];
    for (let i = 0; i < positions.count; i++) {
      color = new THREE.Color(0x800080);
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
      this._param_E * y * z
    );
  }

  resetParameters() {
    // /^[^\s][^=]+=[^=]+[^\s]$/.test('0 = x + 6') un signo = al medio
    // /^[^\s][^=]+=[\s]*[0][\s]*$/.test('0 + 5 = 0') signo = al medio y cero al final
    // /^[\s]*[0][\s]*=[^=]+[^\s]$/.test('0 = x + 6') signo = al medio y cero al inicio
    let zero_equation = null;
    if( /^[^\s][^=]+=[\s]*[0][\s]*$/.test(this.equationText) ) 
      zero_equation = this.equationText.split('=')[0];
    else if( /^[\s]*[0][\s]*=[^=]+[^\s]$/.test(this.equationText) ) 
      zero_equation = this.equationText.split('=')[1];
    else if( /^[^\s][^=]+=[^=]+[^\s]$/.test(this.equationText) ) {
      let temp = this.equationText.split('=');
      zero_equation = temp[0] + " - (" + temp[1] + ")";
    }
    if( !zero_equation ) return null;
    try {
      this.parser.clear();
      this.parser.evaluate('f(x,y,z) = '.concat(zero_equation)); // f(x, y)
      this.parser.set('a', this.param_A);
      this.parser.set('b', this.param_B);
      this.parser.set('c', this.param_C);
      this.parser.set('d', this.param_D);
      this.parser.set('e', this.param_E);
      
      this.parser.evaluate('f(1,1,1)');
    } catch (error) {
      return null;
    }
    return this.parser.get('f');
  }
}
