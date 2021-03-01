import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MathjaxDialogComponent } from '../../shared/mathjax-dialog/mathjax-dialog.component';

import { QSScene3DService } from '../../shared/services/qsscene3D.service';
import { QuadricSurfaceService } from '../../shared/services/quadric-surface.service';
import { Scene3D } from '../../shared/models/scene3D';
import { QuadricSurface } from '../../shared/models/quadric-surface';
import { QuadricSurfaceGUI } from '../../shared/models/quadric-surface-gui';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quadric-surface',
  templateUrl: './quadric-surface.component.html',
  styleUrls: ['./quadric-surface.component.css']
})
export class QuadricSurfaceComponent implements OnInit, OnDestroy {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  qsurfaceGUI: QuadricSurfaceGUI;
  
  constructor(
    private scene3DService: QSScene3DService,
    private qSurfaceService: QuadricSurfaceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {
    
  }
  ngOnDestroy(): void {
    this.scene3DService.qsscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.removeChild(scene3D.getRenderer().domElement);     
      scene3D.isActive = false;
    });
    this.qsurfaceGUI.gui.destroy();
    delete this.qsurfaceGUI;
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    if( !this.scene3DService.qsscene3D ){
      const newscene = new Scene3D(10);
      await newscene.init();

      const qSurface = new QuadricSurface( newscene.getScene() );
      qSurface.init();
      this.qSurfaceService.qsurface = qSurface;
      
      newscene.resetCamera({ xMax: 4.5, yMax: 4.5, zMax: 3 });

      this.scene3DService.qsscene3D = newscene;  
    }
    //SUBSCRIBE method is only used for accessing to the observable's value, nothing else.
    //It doesn't detect changes on insided value
    this.qSurfaceService.qsurface$.subscribe( qsurface3d => {
      this.qsurfaceGUI = new QuadricSurfaceGUI(qsurface3d, this._snackBar);
    });
    

    this.scene3DService.qsscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.appendChild(scene3D.getRenderer().domElement);
      scene3D.isActive = true;
      scene3D.animate();
    });
  }

  openDialog() {
    this.qSurfaceService.qsurface$.subscribe( qsurface3d => {
      
      this.dialog.open(MathjaxDialogComponent, {
        data: {
          title: 'Superficie cuádrica',
          mathContent: qsurface3d.getQSFuncTex()
        }
      });
    });

    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.scene3DService.qsscene3D$.subscribe( scene3D => {
      scene3D.updateDimensions(event.target.innerWidth, event.target.innerHeight);
    })
  }

}
