import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

export class Scene3D {

  private renderer = null;
  private scene = null;
  private camera = null;
  private plane3D = null;
  private font3d = null;
  private axesItem = {
    number_size: 0.4,
    number_height: 0.07,
    axis_size: 25
  };

  private controls = null;
  private _glTFBlob = null;
  public glTFBlobURL = null; 
  private xPrefab = null;
  private yPrefab = null;
  private zPrefab = null;

  mesh = null;
  private _isInitialized: Boolean = false;
  private _isActive = false;

  constructor(axis_size = 25){
    this.axesItem.axis_size = axis_size;
  }

  get isInitialized(): Boolean {
    return this._isInitialized;
  }

  set isActive(val: boolean){
    this._isActive = val;
  }
  get isActive(){
    return this._isActive;
  }

  set glTFBlob(val: Blob){
    this._glTFBlob = val;
  }
  get glTFBlob(){
    return this._glTFBlob;
  }

  getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  getScene(): THREE.Scene{
    return this.scene;
  }

  async init(){
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    /* LIGHT */
    let light1 = new THREE.PointLight(0xffffff);
    light1.position.set(0, 0, 250);
    let light2 = new THREE.PointLight(0xffffff);
    light2.position.set(0, 0, -250);
    this.scene.add(light1);
    this.scene.add(light2);
    
    //Create axes and relative elements
    this.font3d = await this.load3DFont();

    this.createAxesElements();

    this.scene.add(this.plane3D);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x1c1c1c, 1);
    //this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.localClippingEnabled = true;

    //this.resetCamera({ xMax: 1, yMax: 1, zMax: 1 });
    this._isInitialized = true;
  }

  //Methos for loading 3d components
  private load3DFont(): Promise<any> {
    return new Promise(resolve => {
      var loader = new THREE.FontLoader();
      loader.load(`assets/fonts3d/helvetiker_regular.typeface.json`,
        response => resolve(response)    
      );
    });
  }

  private createAxesElements() {
    if ( !this.font3d ) return;
    this.plane3D = new THREE.Group();
    var axes_posXYZ = new THREE.AxesHelper(this.axesItem.axis_size);
    var axes_negXY = new THREE.AxesHelper(this.axesItem.axis_size);
    var axes_negZ = new THREE.AxesHelper(this.axesItem.axis_size);
    axes_negXY.rotation.x = Math.PI;
    axes_negXY.rotation.y = Math.PI;
    axes_negZ.rotation.x = Math.PI;
    
    this.plane3D.add(axes_posXYZ);
    this.plane3D.add(axes_negXY);
    this.plane3D.add(axes_negZ);
    // Create a point at origin
    this.plane3D.add( this.createPoint({ x: 0, y: 0, z: 0, color: 0xff0000}) );
    //Letter X
    this.xPrefab = this.createText({ x: this.axesItem.axis_size, y: 0, z: 0.3, text: "X", color: 0xff5500 });
    this.plane3D.add(this.xPrefab);
    //Letter Y
    this.yPrefab = this.createText({ x: 0, y: this.axesItem.axis_size, z: 0.3, text: "Y", color: 0x00ff00, forma: 2 });
    this.plane3D.add(this.yPrefab);
    //Letter Z
    this.zPrefab = this.createText({ x: 0, y: 0, z: this.axesItem.axis_size + 0.5, text: "Z", color: 0x1a1aff, forma: 2 });
    this.plane3D.add(this.zPrefab);

    // GRID HELPER
    let gridHelper = new THREE.GridHelper(this.axesItem.axis_size*2, this.axesItem.axis_size*2);
    // Rotate to lie in x-y plane
    gridHelper.rotation.x = Math.PI / 2;
    this.scene.add(gridHelper);
    // Create points for axis X
    var index = this.axesItem.axis_size - (this.axesItem.axis_size % 5);
    var temp = -index;
    while (index >= temp) {
      if (index === 0) {
        index -= 5;
        continue;
      }
      this.plane3D.add( this.createPoint({ x: index, y: 0, z: 0, color: 0xff5500 }) );
      this.plane3D.add( this.createText({
        x: index,
        y: 0,
        z: -(this.axesItem.number_size + 0.05),
        text: String(index),
        color: 0xff5500
      }) );
      index -= 5;
    }
    
    /* points for axis Y */
    index = -temp;
    while (index >= temp) {
      if (index === 0) {
        index -= 5;
        continue;
      }
      this.plane3D.add( this.createPoint({ x: 0, y: index, z: 0, color: 0x00ff00 }) );
      this.plane3D.add( this.createText({
        x: 0,
        y: index,
        z: -(this.axesItem.number_size + 0.05),
        text: String(index),
        color: 0x00ff00,
        forma: 2
      }));
      index -= 5;
    }
    
    /* points for axis Z */
    index = -temp;
    while (index >= temp) {
      if (index === 0) {
        index -= 5;
        continue;
      }
      this.plane3D.add( this.createPoint({ x: 0, y: 0, z: index, color: 0x1a1aff }));
      this.plane3D.add( this.createText({
        x: 0,
        y: 0.1,
        z: index,
        text: String(index),
        color: 0x1a1aff,
        forma: 2
      }));
      index -= 5;
    }
  }

  private createText({ x, y, z, text, color, forma = 1 }) {
    let textMesh: THREE.Mesh, textGeo;
    textGeo = new THREE.TextGeometry(text, {
      font: this.font3d,
      size: this.axesItem.number_size,
      height: this.axesItem.number_height
    });
    //textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);
    textMesh = new THREE.Mesh(
      textGeo,
      new THREE.MeshBasicMaterial({ color })
    );
    textGeo.computeBoundingBox();

    textMesh.position.set(x, y, z);
    textMesh.rotation.x = Math.PI / 2;
    if (forma === 1) {
      textMesh.rotation.y = Math.PI;
    } else if (forma === 2) {
      textMesh.rotation.y = Math.PI / 2;
    }
    textMesh.geometry.center(); //to ensure that the rotation of the mesh happens around its center, and not a corner.
    return textMesh; 
  }

  private createPoint( items ) {
    var sphere_geometry = new THREE.SphereBufferGeometry(0.08);
    var sphere_material = new THREE.MeshBasicMaterial({ color: items.color });
    var sphere_mesh = new THREE.Mesh(sphere_geometry, sphere_material);
    sphere_mesh.position.set(items.x, items.y, items.z);

    return sphere_mesh;   
  }

  resetCamera({ xMax, yMax, zMax }) {
    var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 0.1,
      FAR = 2000;

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.camera.position.set( 1.5 * xMax, 1.5 * yMax, zMax < 2 ? 4 * zMax : 4 );
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) 
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.04;

    this.controls.screenSpacePanning = false;
  }

  animate() {
    if( !this.isActive ) return;
    window.requestAnimationFrame(() => this.animate());
    
    this.xPrefab.rotation.y += 0.03;
    this.yPrefab.rotation.y += 0.03;
    this.zPrefab.rotation.y += 0.03;
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  updateDimensions( width, height ){
    this.renderer.setSize( width, height);
    // Thanks to Audreyk for this code section
    // Find more in https://discourse.threejs.org/t/react-x-three-js-resizing-is-not-working/13678
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    //this.renderer.render(this.scene, this.camera);
  }

  exportGLTF(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.scene) return reject();
      let gltfExporter = new GLTFExporter();
      
      let options = {
        onlyVisible: true,
        truncateDrawRange: true,
        trs: false,
        binary: false,
        forcePowerOfTwoTextures: false,
        maxTextureSize: 4096
      };
      gltfExporter.parse(
        this.scene,
        result => {
          if(!!this.glTFBlob){
            delete this._glTFBlob;
          }
          if (result instanceof ArrayBuffer) {
            //filename "scene.glb"        
            this.glTFBlob = new Blob([result], { type: "application/octet-stream" })
            
            //dispatch("uploadGlTFBlob", { filename: "sfgraph.glb" });
          } else {
            let output = JSON.stringify(result, null, 2);
            //filename "scene.gltf";
            this.glTFBlob = new Blob([output], { type: "text/plain" });
            //dispatch("uploadGlTFBlob", { filename: "sfgraph.gltf" });
          }
          //this.glTFBlobURL = URL.createObjectURL(this.glTFBlob);
          resolve();
        },
        options
      );
    });
  }
  
}