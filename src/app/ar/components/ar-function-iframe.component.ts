import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FScene3DService } from '../../shared/services/fscene3D.service';

@Component({
  selector: 'app-ar-function-iframe',
  template: `
    <a-scene
      #arContainer
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      <a-entity
        #model3d
        rotation="270 0 0"
        scale="0.12 0.12 0.12"
        animation-mixer
      ></a-entity>
      <a-camera gps-camera rotation-reader> </a-camera>
    </a-scene>
  `
})
export class ArFunctionIframeComponent implements OnInit {
  @ViewChild('model3d') _3dmodel: ElementRef;

  constructor(
    private scene3DService: FScene3DService
  ) {}

  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
    this.scene3DService.fscene3D$.subscribe( scene3D => {
      scene3D.exportGLTF()
        .then(() => this._3dmodel.nativeElement.setAttribute("gltf-model", URL.createObjectURL(scene3D.glTFBlob)))
        .catch((error) => console.error(error.message))      
    });

    navigator.geolocation.getCurrentPosition(position => {
      this._3dmodel.nativeElement.setAttribute(
        "gps-entity-place",
        `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`
      );
    });
  }
}