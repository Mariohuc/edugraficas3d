import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { Function } from './function';
import { MatSnackBar } from "@angular/material/snack-bar";

export class FunctionGUI {
  gui: GUI;

  constructor( function3d: Function, snackBar: MatSnackBar ){
    this.gui = new GUI();
    let folderFunction = this.gui.addFolder('Función');
    folderFunction.add(function3d, 'zFuncText').name('z = f(x,y) = ');

    let folderLimits = this.gui.addFolder( 'Cotas de variable' );
		let propsLimits = {
      set XMin(v){
        function3d.xMin = v;
        function3d.createGraph( false );
      },
			get XMin(){
        return function3d.xMin;
      },
      set XMax(v){
        function3d.xMax = v;
        function3d.createGraph( false );
      },
			get XMax(){
        return function3d.xMax;
      },
      set YMax(v){
        function3d.yMax = v;
        function3d.createGraph( false );
      },
			get YMax(){
        return function3d.yMax;
      },
      set YMin(v){
        function3d.yMin = v;
        function3d.createGraph( false );
      },
			get YMin(){
        return function3d.yMin;
      }
    }
    folderLimits.add( propsLimits, 'XMin').name('x Mínimo = ');
    folderLimits.add( propsLimits, 'XMax').name('x Máximo = ');
    folderLimits.add( propsLimits, 'YMin').name('y Mínimo = ');
    folderLimits.add( propsLimits, 'YMax').name('y Máximo = ');

    let folderParams = this.gui.addFolder( 'Parámetros' );
		let propsParams = {
      set Param_a(v){
        function3d.param_a = v;
        function3d.createGraph( false );
      },
			get Param_a(){
        return function3d.param_a;
      },
      set Param_b(v){
        function3d.param_b = v;
        function3d.createGraph( false );
      },
			get Param_b(){
        return function3d.param_b;
      },
      set Param_c(v){
        function3d.param_c = v;
        function3d.createGraph( false );
      },
			get Param_c(){
        return function3d.param_c;
      },
      set Param_d(v){
        function3d.param_d = v;
        function3d.createGraph( false );
      },
			get Param_d(){
        return function3d.param_d;
      },
      set Param_e(v){
        function3d.param_e = v;
        function3d.createGraph( false );
      },
			get Param_e(){
        return function3d.param_e;
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
          function3d.createGraph()
        } catch (error) {
          snackBar.open( 'La función es erronea', 'Cerrar');
        }
      }
    }

    this.gui.add( options, 'createGraph').name('Graficar función');

  }
}