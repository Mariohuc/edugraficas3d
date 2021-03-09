import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { PCScene3DService } from '../../shared/services/pcscene3D.service';
import { ParametricCurveService } from '../../shared/services/parametric-curve.service';
import { Scene3D } from '../../shared/models/scene3D';
import { ParametricCurve } from '../../shared/models/parametric-curve';
import { ParametricCurveGUI } from '../../shared/models/parametric-curve-gui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MathjaxDialogComponent } from '../../shared/mathjax-dialog/mathjax-dialog.component';

@Component({
  selector: 'app-parametric-curve',
  templateUrl: './parametric-curve.component.html',
  styleUrls: ['./parametric-curve.component.css']
})
export class ParametricCurveComponent implements OnInit, OnDestroy {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  pcurveGUI: ParametricCurveGUI;
  constructor(
    private scene3DService: PCScene3DService,
    private pCurveService: ParametricCurveService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnDestroy(): void {
    this.scene3DService.pcscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.removeChild(scene3D.getRenderer().domElement);      
      scene3D.isActive = false;
    });
    this.pcurveGUI.gui.destroy();
    delete this.pcurveGUI;
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    if( !this.scene3DService.pcscene3D ){
      const newscene = new Scene3D();
      await newscene.init();
      //newscene.resetCamera({ xMax: 1, yMax: 1, zMax: 1 });

      const pCurve = new ParametricCurve( newscene.getScene() );
      pCurve.init();
      this.pCurveService.pcurve = pCurve;
      
      newscene.resetCamera({ xMax: pCurve.xMax, yMax: pCurve.yMax, zMax: pCurve.zMax });

      this.scene3DService.pcscene3D = newscene;  
    }
    //SUBSCRIBE method is only used for accessing to the observable's value, nothing else.
    //It doesn't detect changes on insided value
    this.pCurveService.pcurve$.subscribe( pcurve3d => {
      this.pcurveGUI = new ParametricCurveGUI(pcurve3d, this._snackBar);
    });
    

    this.scene3DService.pcscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.appendChild(scene3D.getRenderer().domElement);
      scene3D.isActive = true;
      scene3D.animate();
    });
  }

  openDialog() {
    this.pCurveService.pcurve$.subscribe( pcurve3d => {
      
      this.dialog.open(MathjaxDialogComponent, {
        data: {
          title: 'Curva paramétrica',
          mathContent: pcurve3d.getPCFuncTex()
        }
      });
    });

    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.scene3DService.pcscene3D$.subscribe( scene3D => {
      scene3D.updateDimensions(event.target.innerWidth, event.target.innerHeight);
    })
  }

}
