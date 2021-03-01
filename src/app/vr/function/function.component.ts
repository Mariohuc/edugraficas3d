import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { MathjaxDialogComponent } from '../../shared/mathjax-dialog/mathjax-dialog.component';

import { FScene3DService } from '../../shared/services/fscene3D.service';
import { FunctionService } from '../../shared/services/function.service';
import { Scene3D } from '../../shared/models/scene3D';
import { Function } from '../../shared/models/function';
import { FunctionGUI } from '../../shared/models/function-gui';



@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit, OnDestroy {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  functionGUI: FunctionGUI;
  
  constructor(
    private scene3DService: FScene3DService,
    private functionService: FunctionService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {
    
  }
  ngOnDestroy(): void {
    this.scene3DService.fscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.removeChild(scene3D.getRenderer().domElement); 
      scene3D.isActive = false;
    });
    this.functionGUI.gui.destroy();
    delete this.functionGUI;
  }

  ngOnInit(): void{
  }

  async ngAfterViewInit() {
    if( !this.scene3DService.fscene3D ){
      const newscene = new Scene3D();
      await newscene.init();
      //newscene.resetCamera({ xMax: 1, yMax: 1, zMax: 1 });

      const zFunction = new Function( newscene.getScene() );
      zFunction.init();
      this.functionService.function = zFunction;
      
      newscene.resetCamera({ xMax: zFunction.xMax, yMax: zFunction.yMax, zMax: zFunction.zMax });

      this.scene3DService.fscene3D = newscene;  
    }
    //SUBSCRIBE method is only used for accessing to the observable's value, nothing else.
    //It doesn't detect changes on insided value
    this.functionService.function$.subscribe( function3d => {
      this.functionGUI = new FunctionGUI(function3d, this._snackBar);
    });
    

    this.scene3DService.fscene3D$.subscribe( scene3D => {
      this.rendererContainer.nativeElement.appendChild(scene3D.getRenderer().domElement);
      scene3D.isActive = true;
      scene3D.animate();
    });
  }

  openDialog() {
    this.functionService.function$.subscribe( function3d => {
      
      this.dialog.open(MathjaxDialogComponent, {
        data: {
          title: 'Función Z',
          mathContent: function3d.getZFuncTex()
        }
      });
    });

    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.scene3DService.fscene3D$.subscribe( scene3D => {
      scene3D.updateDimensions(event.target.innerWidth, event.target.innerHeight);
    })
    //this.scene.getRenderer().setSize(event.target.innerWidth, event.target.innerHeight);
  }

}
