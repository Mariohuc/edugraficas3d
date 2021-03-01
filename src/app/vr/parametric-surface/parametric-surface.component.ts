import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MathjaxDialogComponent } from '../../shared/mathjax-dialog/mathjax-dialog.component';

import { PSScene3DService } from '../../shared/services/psscene3D.service';
import { ParametricSurfaceService } from '../../shared/services/parametric-surface.service';
import { Scene3D } from '../../shared/models/scene3D';
import { ParametricSurface } from '../../shared/models/parametric-surface';
import { ParametricSurfaceGUI } from '../../shared/models/parametric-surface-gui';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parametric-surface',
  templateUrl: './parametric-surface.component.html',
  styleUrls: ['./parametric-surface.component.css']
})
export class ParametricSurfaceComponent implements OnInit, OnDestroy {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  psurfaceGUI: ParametricSurfaceGUI;
  
  constructor(
    private scene3DService: PSScene3DService,
    private pSurfaceService: ParametricSurfaceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {
    
  }
  ngOnDestroy(): void {
    this.scene3DService.psscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.removeChild(scene3D.getRenderer().domElement);      
      scene3D.isActive = false;
    });
    this.psurfaceGUI.gui.destroy();
    delete this.psurfaceGUI;
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    if( !this.scene3DService.psscene3D ){
      const newscene = new Scene3D();
      await newscene.init();
      //newscene.resetCamera({ xMax: 1, yMax: 1, zMax: 1 });

      const pSurface = new ParametricSurface( newscene.getScene() );
      pSurface.init();
      this.pSurfaceService.psurface = pSurface;
      
      newscene.resetCamera({ xMax: pSurface.xMax, yMax: pSurface.yMax, zMax: pSurface.zMax });

      this.scene3DService.psscene3D = newscene;  
    }
    //SUBSCRIBE method is only used for accessing to the observable's value, nothing else.
    //It doesn't detect changes on insided value
    this.pSurfaceService.psurface$.subscribe( psurface3d => {
      this.psurfaceGUI = new ParametricSurfaceGUI(psurface3d, this._snackBar);
    });
    

    this.scene3DService.psscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.appendChild(scene3D.getRenderer().domElement);
      scene3D.isActive = true;
      scene3D.animate();
    });
  }

  openDialog() {
    this.pSurfaceService.psurface$.subscribe( psurface3d => {
      
      this.dialog.open(MathjaxDialogComponent, {
        data: {
          title: 'Superficie paramétrica',
          mathContent: psurface3d.getZFuncTex()
        }
      });
    });

    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.scene3DService.psscene3D$.subscribe( scene3D => {
      scene3D.updateDimensions(event.target.innerWidth, event.target.innerHeight);
    })
  }

}
