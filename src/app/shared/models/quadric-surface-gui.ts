import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { QuadricSurface } from './quadric-surface';
import { MatSnackBar } from "@angular/material/snack-bar";

export class QuadricSurfaceGUI {
  gui: GUI;

  constructor( qsurface3d: QuadricSurface, snackBar: MatSnackBar ){
    this.gui = new GUI();

    let folderParams = this.gui.addFolder( 'Parámetros' );
		let propsParams = {
      set Param_A(v){
        qsurface3d.param_A = v;
        qsurface3d.updateGraph();
      },
			get Param_A(){
        return qsurface3d.param_A;
      },
      set Param_B(v){
        qsurface3d.param_B = v;
        qsurface3d.updateGraph();
      },
			get Param_B(){
        return qsurface3d.param_B;
      },
      set Param_C(v){
        qsurface3d.param_C = v;
        qsurface3d.updateGraph();
      },
			get Param_C(){
        return qsurface3d.param_C;
      },
      set Param_D(v){
        qsurface3d.param_D = v;
        qsurface3d.updateGraph();
      },
			get Param_D(){
        return qsurface3d.param_D;
      },
      set Param_E(v){
        qsurface3d.param_E = v;
        qsurface3d.updateGraph();
      },
			get Param_E(){
        return qsurface3d.param_E;
      },
      set Param_F(v){
        qsurface3d.param_F = v;
        qsurface3d.updateGraph();
      },
			get Param_F(){
        return qsurface3d.param_F;
      },
      set Param_G(v){
        qsurface3d.param_G = v;
        qsurface3d.updateGraph();
      },
			get Param_G(){
        return qsurface3d.param_G;
      },
      set Param_H(v){
        qsurface3d.param_H = v;
        qsurface3d.updateGraph();
      },
			get Param_H(){
        return qsurface3d.param_H;
      },
      set Param_I(v){
        qsurface3d.param_I = v;
        qsurface3d.updateGraph();
      },
			get Param_I(){
        return qsurface3d.param_I;
      },
      set Param_J(v){
        qsurface3d.param_J = v;
        qsurface3d.updateGraph();
      },
			get Param_J(){
        return qsurface3d.param_J;
      },
    }
    folderParams.add( propsParams, 'Param_A', -9, 9 ).name('A = ');
    folderParams.add( propsParams, 'Param_B', -9, 9 ).name('B = ');
    folderParams.add( propsParams, 'Param_C', -9, 9 ).name('C = ');
    folderParams.add( propsParams, 'Param_D', -9, 9 ).name('D = ');
    folderParams.add( propsParams, 'Param_E', -9, 9 ).name('E = ');
    folderParams.add( propsParams, 'Param_F', -9, 9 ).name('F = ');
    folderParams.add( propsParams, 'Param_G', -9, 9 ).name('G = ');
    folderParams.add( propsParams, 'Param_H', -9, 9 ).name('H = ');
    folderParams.add( propsParams, 'Param_I', -9, 9 ).name('I = ');
    folderParams.add( propsParams, 'Param_J', -9, 9 ).name('J = ');

    let options = {
      createGraph: function(){
        try {
          qsurface3d.createGraph()
        } catch (error) {
          snackBar.open( 'La función es erronea', 'Cerrar');
        }
      }
    }

    this.gui.add( options, 'createGraph').name('Graficar función');

  }
}