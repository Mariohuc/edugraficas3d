import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FScene3DService } from '../../shared/services/fscene3D.service';
import { FunctionService } from '../../shared/services/function.service';
import { Scene3D } from '../../shared/models/scene3D';
import { Function } from '../../shared/models/function';
import { FunctionGUI } from '../../shared/models/function-gui';

@Component({
  selector: 'app-ar-function',
  templateUrl: './ar-function.component.html',
  styleUrls: ['./ar-function.component.css']
})
export class ArFunctionComponent implements OnInit, OnDestroy  {
  @ViewChild('iframe', {static: false}) iframe: ElementRef;
  
  urlArViewer: string;
  urlArViewerSafe: SafeResourceUrl;

  constructor(
    private scene3DService: FScene3DService,
    private functionService: FunctionService,
    private _snackBar: MatSnackBar,
    public sanitizer: DomSanitizer
  ) {
    this.urlArViewer = 'assets/embed-html/location-ar-viewer.html'
  }
  
  ngOnInit(): void {
    this.urlArViewerSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArViewer);
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.onload = () => {
      this.scene3DService.fscene3D$.subscribe( scene3D => {
        scene3D.exportGLTF()
          .then(() => this.iframe.nativeElement.contentWindow.setGLTFModel( URL.createObjectURL(scene3D.glTFBlob) ))
          .catch((error) => console.error(error.message)) 
      });

      navigator.geolocation.getCurrentPosition(position => {
        this.iframe.nativeElement.contentWindow.setCoordsToModel(position.coords.latitude, position.coords.longitude);
      });
    }
    
  }
  ngOnDestroy(): void {
    this.scene3DService.fscene3D$.subscribe( scene3D => {
      delete scene3D.glTFBlob;
    });
  }
}
