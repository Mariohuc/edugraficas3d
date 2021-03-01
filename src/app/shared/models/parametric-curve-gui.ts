import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { ParametricCurve } from './parametric-curve';
import { MatSnackBar } from "@angular/material/snack-bar";

export class ParametricCurveGUI {
  gui: GUI;

  constructor( pcurve3d: ParametricCurve, snackBar: MatSnackBar ){
    this.gui = new GUI();
    let folderFunction = this.gui.addFolder('Función');
    folderFunction.add(pcurve3d, 'xFuncText').name('x = f(t) = ');
    folderFunction.add(pcurve3d, 'yFuncText').name('y = g(t) = ');
    folderFunction.add(pcurve3d, 'zFuncText').name('z = h(t) = ');

    let folderLimits = this.gui.addFolder( 'Cotas de variable' );
		let propsLimits = {
      set TMin(v){
        pcurve3d.tMin = v;
        pcurve3d.createGraph( false );
      },
			get TMin(){
        return pcurve3d.tMin;
      },
      set TMax(v){
        pcurve3d.tMax = v;
        pcurve3d.createGraph( false );
      },
			get TMax(){
        return pcurve3d.tMax;
      }
    }
    folderLimits.add( propsLimits, 'TMin').name('t Mínimo = ');
    folderLimits.add( propsLimits, 'TMax').name('t Máximo = ');

    let folderParams = this.gui.addFolder( 'Parámetros' );
		let propsParams = {
      set Param_a(v){
        pcurve3d.param_a = v;
        pcurve3d.createGraph( false );
      },
			get Param_a(){
        return pcurve3d.param_a;
      },
      set Param_b(v){
        pcurve3d.param_b = v;
        pcurve3d.createGraph( false );
      },
			get Param_b(){
        return pcurve3d.param_b;
      },
      set Param_c(v){
        pcurve3d.param_c = v;
        pcurve3d.createGraph( false );
      },
			get Param_c(){
        return pcurve3d.param_c;
      },
      set Param_d(v){
        pcurve3d.param_d = v;
        pcurve3d.createGraph( false );
      },
			get Param_d(){
        return pcurve3d.param_d;
      },
      set Param_e(v){
        pcurve3d.param_e = v;
        pcurve3d.createGraph( false );
      },
			get Param_e(){
        return pcurve3d.param_e;
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
          pcurve3d.createGraph()
        } catch (error) {
          snackBar.open( 'La función(s) es erronea', 'Cerrar');
        }
      }
    }

    this.gui.add( options, 'createGraph').name('Graficar función');

  }
}