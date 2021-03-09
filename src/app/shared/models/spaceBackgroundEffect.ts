import * as THREE from 'three';

export class SpaceBackgroundEffect {
  private _renderer = null;
  private _scene = null;
  private _camera = null;
  private _starGeo = null;

  private _stars = null;

  constructor() {}

  get renderer(){
    return this._renderer;
  }

  async init(el) {
    this._scene = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this._camera.position.z = 1;
    this._camera.rotation.x = Math.PI / 2;
    
    this._renderer = new THREE.WebGLRenderer();
    let scrollHeight = document.getElementById(el).getBoundingClientRect().height;
    
    this._renderer.setSize(window.innerWidth, ( window.innerHeight < scrollHeight ? scrollHeight : window.innerHeight ) );
    //document.body.appendChild(this._renderer.domElement);
    let star = null;
    this._starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
      star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.02;
      this._starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load('assets/images/star.png');
    let starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7, map: sprite });

    this._stars = new THREE.Points(this._starGeo, starMaterial);
    this._scene.add(this._stars);
  }

  animate() {
    this._starGeo.vertices.forEach(p => {
      p.velocity += p.acceleration
      p.y -= p.velocity;
      
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    this._starGeo.verticesNeedUpdate = true;
    this._stars.rotation.y +=0.002;
  
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame( () => this.animate() );
  }

  onWindowResize( height: number) {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    
    this._renderer.setSize(window.innerWidth, (window.innerHeight < height ? height : window.innerHeight ) );
  }
}
