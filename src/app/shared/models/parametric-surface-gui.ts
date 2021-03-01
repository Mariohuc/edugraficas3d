import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { ParametricSurface } from './parametric-surface';
import { MatSnackBar } from "@angular/material/snack-bar";

export class ParametricSurfaceGUI {
  gui: GUI;

  constructor( psurface3d: ParametricSurface, snackBar: MatSnackBar ){
    this.gui = new GUI();
    let folderFunction = this.gui.addFolder('Función');
    folderFunction.add(psurface3d, 'xFuncText').name('x = f(u,v) = ');
    folderFunction.add(psurface3d, 'yFuncText').name('y = g(u,v) = ');
    folderFunction.add(psurface3d, 'zFuncText').name('z = h(u,v) = ');

    let folderLimits = this.gui.addFolder( 'Cotas de variable' );
		let propsLimits = {
      set UMin(v){
        psurface3d.uMin = v;
        psurface3d.createGraph( false );
      },
			get UMin(){
        return psurface3d.uMin;
      },
      set UMax(v){
        psurface3d.uMax = v;
        psurface3d.createGraph( false );
      },
			get UMax(){
        return psurface3d.uMax;
      },
      set VMax(v){
        psurface3d.vMax = v;
        psurface3d.createGraph( false );
      },
			get VMax(){
        return psurface3d.vMax;
      },
      set VMin(v){
        psurface3d.vMin = v;
        psurface3d.createGraph( false );
      },
			get VMin(){
        return psurface3d.vMin;
      }
    }
    folderLimits.add( propsLimits, 'UMin').name('u Mínimo = ');
    folderLimits.add( propsLimits, 'UMax').name('u Máximo = ');
    folderLimits.add( propsLimits, 'VMin').name('v Mínimo = ');
    folderLimits.add( propsLimits, 'VMax').name('v Máximo = ');

    let folderParams = this.gui.addFolder( 'Parámetros' );
		let propsParams = {
      set Param_a(v){
        psurface3d.param_a = v;
        psurface3d.createGraph( false );
      },
			get Param_a(){
        return psurface3d.param_a;
      },
      set Param_b(v){
        psurface3d.param_b = v;
        psurface3d.createGraph( false );
      },
			get Param_b(){
        return psurface3d.param_b;
      },
      set Param_c(v){
        psurface3d.param_c = v;
        psurface3d.createGraph( false );
      },
			get Param_c(){
        return psurface3d.param_c;
      },
      set Param_d(v){
        psurface3d.param_d = v;
        psurface3d.createGraph( false );
      },
			get Param_d(){
        return psurface3d.param_d;
      },
      set Param_e(v){
        psurface3d.param_e = v;
        psurface3d.createGraph( false );
      },
			get Param_e(){
        return psurface3d.param_e;
      }
    }
    folderParams.add( propsParams, 'Param_a', -5, 5 ).name('a = ');
    folderParams.add( propsParams, 'Param_b', -5, 5 ).name('b = ');
    folderParams.add( propsParams, 'Param_c', -5, 5 ).name('c = ');
    folderParams.add( propsParams, 'Param_d', -5, 5 ).name('d = ');
    folderParams.add( propsParams, 'Param_e', -5, 5 ).name('e = ');

    let options = {
      createGraph: function(){
        try {
          psurface3d.createGraph()
        } catch (error) {
          snackBar.open( 'La función(s) es erronea', 'Cerrar');
        }
      }
    }

    this.gui.add( options, 'createGraph').name('Graficar función');

  }
}