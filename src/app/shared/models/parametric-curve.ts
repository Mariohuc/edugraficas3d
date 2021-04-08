import * as THREE from 'three';
// Thanks to https://stackoverflow.com/questions/65568810/cannot-resolve-mathjs-number,
// I use this way to import mathjs
import { create, all } from 'mathjs/lib/esm/number';
const config = {};
const math = create(all, config);

class CustomSinCurve extends THREE.Curve<THREE.Vector3> {
  private _scale;
  private _xFunc;
  private _yFunc;
  private _zFunc;
  private _tRange;
  private _tMin;
  constructor(scale = 1, xFunc, yFunc, zFunc, tRange, tMin) {
    super();
    this._scale = scale;
    this._xFunc = xFunc;
    this._yFunc = yFunc;
    this._zFunc = zFunc;
    this._tRange = tRange;
    this._tMin = tMin;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    t = t * this._tRange + this._tMin;

    return optionalTarget
      .set(this._xFunc(t), this._yFunc(t), this._zFunc(t))
      .multiplyScalar(this._scale);
  }
}

export class ParametricCurve {
  private _xFuncText: string = 't^3 + a*t';
  private _yFuncText: string = 't^4 + b*t^2';
  private _zFuncText: string = '(1/10)*(t^5 + (-10)*t)';
  private _segments: number = 120;
  private _radiusSegments: number = 6;
  private _tubeRadius: number = 0.1;
  private _tMin: number = -2;
  private _tMax: number = 2;
  private _xMin: number = 0;
  private _xMax: number = 0;
  private _yMin: number = 0;
  private _yMax: number = 0;
  private _zMin: number = 0;
  private _zMax: number = 0;
  private _param_a: number = -3;
  private _param_b: number = -4;
  private _param_c: number = 1;
  private _param_d: number = 1;
  private _param_e: number = 1;
  // Properties to save 3D objects
  private _clippingPlanes = null;
  private graphGeometry = null;
  private wireMaterial = null;
  private graphMesh = null;
  private parser = math.parser();

  private _scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  set xFuncText(val: string) {
    this._xFuncText = val;
  }
  get xFuncText(): string {
    return this._xFuncText;
  }
  set yFuncText(val: string) {
    this._yFuncText = val;
  }
  get yFuncText(): string {
    return this._yFuncText;
  }
  set zFuncText(val: string) {
    this._zFuncText = val;
  }
  get zFuncText(): string {
    return this._zFuncText;
  }

  set segments(val: number) {
    this._segments = val;
  }
  get segments() {
    return this._segments;
  }
  set radiusSegments(val: number) {
    this._radiusSegments = val;
  }
  get radiusSegments() {
    return this._radiusSegments;
  }
  set tubeRadius(val: number) {
    this._tubeRadius = val;
  }
  get tubeRadius() {
    return this._tubeRadius;
  }

  set tMin(val: number) {
    this._tMin = val;
  }
  get tMin() {
    return this._tMin;
  }
  set tMax(val: number) {
    this._tMax = val;
  }
  get tMax() {
    return this._tMax;
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

  set param_a(val: number) {
    this._param_a = val;
    this.parser.set('a', this._param_a);
  }
  get param_a(): number {
    return this._param_a;
  }
  set param_b(val: number) {
    this._param_b = val;
    this.parser.set('b', this._param_b);
  }
  get param_b(): number {
    return this._param_b;
  }
  set param_c(val: number) {
    this._param_c = val;
    this.parser.set('c', this._param_c);
  }
  get param_c(): number {
    return this._param_c;
  }
  set param_d(val: number) {
    this._param_d = val;
    this.parser.set('d', this._param_d);
  }
  get param_d(): number {
    return this._param_d;
  }
  set param_e(val: number) {
    this._param_e = val;
    this.parser.set('e', this._param_e);
  }
  get param_e(): number {
    return this._param_e;
  }

  get tRange() {
    return this.tMax - this.tMin;
  }

  get zRange() {
    return this.zMax - this.zMin;
  }

  set scene(val: THREE.Scene) {
    this._scene = val;
  }

  getGraphMesh() {
    return this.graphMesh;
  }

  async init() {
    this.createDefaultWireMaterial();
    this.createGraph();
  }

  getPCFuncTex() {
    let node = math.parse(this.xFuncText);

    let transformed = node.transform((node) => {
      if (node.isSymbolNode && 'a,b,c,d,e'.indexOf(node.name) !== -1) {
        return new math.ConstantNode(
          parseFloat(this.parser.get(node.name).toFixed(1))
        );
      } else {
        return node;
      }
    });

    const xtemp = math.parse( transformed.toString() );

    node = math.parse(this.yFuncText);

    transformed = node.transform((node) => {
      if (node.isSymbolNode && 'a,b,c,d,e'.indexOf(node.name) !== -1) {
        return new math.ConstantNode(
          parseFloat(this.parser.get(node.name).toFixed(1))
        );
      } else {
        return node;
      }
    });

    const ytemp = math.parse( transformed.toString() );

    node = math.parse(this.zFuncText);

    transformed = node.transform((node) => {
      if (node.isSymbolNode && 'a,b,c,d,e'.indexOf(node.name) !== -1) {
        return new math.ConstantNode(
          parseFloat(this.parser.get(node.name).toFixed(1))
        );
      } else {
        return node;
      }
    });

    const ztemp = math.parse( transformed.toString() );
    return [
      '$$x = f(t) = ' + xtemp.toTex() + '$$',
      '$$y = g(t) = ' + ytemp.toTex() + '$$',
      '$$z = h(t) = ' + ztemp.toTex() + '$$',
    ];
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

    let wireTexture = new THREE.TextureLoader().load('assets/images/square.png');
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
  addMeshTo(scene: THREE.Scene) {
    scene.add(this.graphMesh);
  }
  createGraph(newfunction: boolean = true) {
    let xFunc = null;
    let yFunc = null;
    let zFunc = null;
    if (newfunction === true) {
      let result = this.resetFunctions();
      xFunc = result['xFunc'];
      yFunc = result['yFunc'];
      zFunc = result['zFunc'];
    } else {
      xFunc = this.parser.get('f');
      yFunc = this.parser.get('g');
      zFunc = this.parser.get('h');
    }
    if (!xFunc || !yFunc || !zFunc) {
      throw new Error('There is no function');
    }
    const path = new CustomSinCurve( 1, xFunc, yFunc, zFunc, this.tRange, this.tMin);
    this.graphGeometry = new THREE.TubeGeometry(
      path,
      this.segments,
      this.tubeRadius,
      this.radiusSegments,
      false
    );

    this.setVertexColorsv2();

    this.graphGeometry.computeBoundingBox();
    this.xMin = this.graphGeometry.boundingBox.min.x;
    this.xMax = this.graphGeometry.boundingBox.max.x;
    this.yMin = this.graphGeometry.boundingBox.min.y;
    this.yMax = this.graphGeometry.boundingBox.max.y;
    this.zMin = this.graphGeometry.boundingBox.min.z;
    this.zMax = this.graphGeometry.boundingBox.max.z;
    if (this.graphMesh) {
      this._scene.remove(this.graphMesh);
    }
    this.wireMaterial.map.repeat.set(this.segments, this.radiusSegments);
    this.graphMesh = new THREE.Mesh(this.graphGeometry, this.wireMaterial);

    this.graphMesh.doubleSided = true;
    this.graphMesh.name = 'pcurve';
    this._scene.add(this.graphMesh);
    //commit("setZFuncTextTex");
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
      color.setHSL( (0.7 * (this.zMax - positions.getZ(i))) / this.zRange, 1, 0.5);
      colors.push(color.r, color.g, color.b);
    }
    this.graphGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );
  }

  private setVertexColorsv2() {
    if (!this.graphGeometry) {
      throw new Error('Graph Geometry is null');
    }
    var color, face, numberOfSides, vertexIndex;
    // faces are indexed using characters
    var faceIndices = ['a', 'b', 'c', 'd'];
    // first, assign colors to vertices as desired
    for (var s = 0; s <= this.segments; s++)
      for (var r = 0; r < this.radiusSegments; r++) {
        vertexIndex = r + s * this.radiusSegments;
        color = new THREE.Color(0xffffff);
        // according to length along curve, repeat once
        color.setHSL(((1 * s) / this.segments) % 1, 1, 0.5);
        // according to radius segment -- ribbons of color
        // color.setHSV( (1 * r / radiusSegments) % 1, 1, 1 );
        this.graphGeometry.colors[vertexIndex] = color; // use this array for convenience
      }
    // copy the colors as necessary to the face's vertexColors array.
    for (var i = 0; i < this.graphGeometry.faces.length; i++) {
      face = this.graphGeometry.faces[i];
      numberOfSides = face instanceof THREE.Face3 ? 3 : 4;
      for (var j = 0; j < numberOfSides; j++) {
        vertexIndex = face[faceIndices[j]];
        face.vertexColors[j] = this.graphGeometry.colors[vertexIndex];
      }
    }
  }

  resetFunctions() {
    try {
      this.parser.clear();
      this.parser.evaluate('f(t) = '.concat(this.xFuncText));
      this.parser.evaluate('g(t) = '.concat(this.yFuncText));
      this.parser.evaluate('h(t) = '.concat(this.zFuncText));
      this.parser.set('a', this.param_a);
      this.parser.set('b', this.param_b);
      this.parser.set('c', this.param_c);
      this.parser.set('d', this.param_d);
      this.parser.set('e', this.param_e);
      this.parser.evaluate('f(1)');
      this.parser.evaluate('g(1)');
      this.parser.evaluate('h(1)');
    } catch (error) {
      return null;
    }
    //return true;
    return {
      xFunc: this.parser.get('f'),
      yFunc: this.parser.get('g'),
      zFunc: this.parser.get('h'),
    };
  }
}
