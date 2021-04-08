import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { ImplicitSurface } from './implicit-surface';
import { MatSnackBar } from "@angular/material/snack-bar";

export class ImplicitSurfaceGUI {
  gui: GUI;

  constructor( isurface3d: ImplicitSurface, snackBar: MatSnackBar ){
    this.gui = new GUI();
    let folderFunction = this.gui.addFolder('Ecuación');
    folderFunction.add(isurface3d, 'equationText').name('f(x,y,z)');

    let folderParams = this.gui.addFolder( 'Parámetros' );
		let propsParams = {
      set Param_A(v){
        isurface3d.param_A = v;
        isurface3d.updateGraph();
      },
			get Param_A(){
        return isurface3d.param_A;
      },
      set Param_B(v){
        isurface3d.param_B = v;
        isurface3d.updateGraph();
      },
			get Param_B(){
        return isurface3d.param_B;
      },
      set Param_C(v){
        isurface3d.param_C = v;
        isurface3d.updateGraph();
      },
			get Param_C(){
        return isurface3d.param_C;
      },
      set Param_D(v){
        isurface3d.param_D = v;
        isurface3d.updateGraph();
      },
			get Param_D(){
        return isurface3d.param_D;
      },
      set Param_E(v){
        isurface3d.param_E = v;
        isurface3d.updateGraph();
      },
			get Param_E(){
        return isurface3d.param_E;
      }
    }
    folderParams.add( propsParams, 'Param_A', -9, 9 ).name('a = ');
    folderParams.add( propsParams, 'Param_B', -9, 9 ).name('b = ');
    folderParams.add( propsParams, 'Param_C', -9, 9 ).name('c = ');
    folderParams.add( propsParams, 'Param_D', -9, 9 ).name('d = ');
    folderParams.add( propsParams, 'Param_E', -9, 9 ).name('e = ');

    let options = {
      createGraph: function(){
        try {
          isurface3d.createGraph()
        } catch (error) {
          snackBar.open( 'La función es erronea', 'Cerrar');
        }
      }
    }

    this.gui.add( options, 'createGraph').name('Graficar función');

  }
}