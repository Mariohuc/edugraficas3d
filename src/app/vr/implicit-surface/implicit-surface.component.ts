import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MathjaxDialogComponent } from '../../shared/mathjax-dialog/mathjax-dialog.component';

import { ISScene3DService } from '../../shared/services/isscene3D.service';
import { ImplicitSurfaceService } from '../../shared/services/implicit-surface.service';
import { Scene3D } from '../../shared/models/scene3D';
import { ImplicitSurface } from '../../shared/models/implicit-surface';
import { ImplicitSurfaceGUI } from '../../shared/models/implicit-surface-gui';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-implicit-surface',
  templateUrl: './implicit-surface.component.html',
  styleUrls: ['./implicit-surface.component.css']
})
export class ImplicitSurfaceComponent implements OnInit, OnDestroy {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  isurfaceGUI: ImplicitSurfaceGUI;
  
  constructor(
    private scene3DService: ISScene3DService,
    private iSurfaceService: ImplicitSurfaceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {
    
  }
  ngOnDestroy(): void {
    this.scene3DService.isscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.removeChild(scene3D.getRenderer().domElement);     
      scene3D.isActive = false;
    });
    this.isurfaceGUI.gui.destroy();
    delete this.isurfaceGUI;
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    if( !this.scene3DService.isscene3D ){
      const newscene = new Scene3D(10);
      await newscene.init();

      const iSurface = new ImplicitSurface( newscene.getScene() );
      iSurface.init();
      this.iSurfaceService.isurface = iSurface;
      
      newscene.resetCamera({ xMax: 4.5, yMax: 4.5, zMax: 3 });

      this.scene3DService.isscene3D = newscene;  
    }
    //SUBSCRIBE method is only used for accessing to the observable's value, nothing else.
    //It doesn't detect changes on insided value
    this.iSurfaceService.isurface$.subscribe( isurface3d => {
      this.isurfaceGUI = new ImplicitSurfaceGUI(isurface3d, this._snackBar);
    });
    

    this.scene3DService.isscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.appendChild(scene3D.getRenderer().domElement);
      scene3D.isActive = true;
      scene3D.animate();
    });
  }

  openDialog() {
    this.iSurfaceService.isurface$.subscribe( isurface3d => {
      
      this.dialog.open(MathjaxDialogComponent, {
        data: {
          title: 'Superficie implícita',
          mathContent: isurface3d.getQSFuncTex()
        }
      });
    });

    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.scene3DService.isscene3D$.subscribe( scene3D => {
      scene3D.updateDimensions(event.target.innerWidth, event.target.innerHeight);
    })
  }

}
