(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{TDBs:function(t,e,a){"use strict";a.r(e),a.d(e,"DashboardModule",function(){return f});var n=a("ofXK"),r=a("tyNb"),i=a("onrN"),o=a("mrSG"),c=a("Womt");class s{constructor(){this._renderer=null,this._scene=null,this._camera=null,this._starGeo=null,this._stars=null}get renderer(){return this._renderer}init(t){return Object(o.a)(this,void 0,void 0,function*(){this._scene=new c.O,this._camera=new c.F(60,window.innerWidth/window.innerHeight,1,1e3),this._camera.position.z=1,this._camera.rotation.x=Math.PI/2,this._renderer=new c.X;let e=document.getElementById(t).getBoundingClientRect().height;this._renderer.setSize(window.innerWidth,window.innerHeight<e?e:window.innerHeight);let a=null;this._starGeo=new c.l;for(let t=0;t<6e3;t++)a=new c.W(600*Math.random()-300,600*Math.random()-300,600*Math.random()-300),a.velocity=0,a.acceleration=.02,this._starGeo.vertices.push(a);let n=(new c.T).load("assets/images/star.png"),r=new c.J({color:11184810,size:.7,map:n});this._stars=new c.I(this._starGeo,r),this._scene.add(this._stars)})}animate(){this._starGeo.vertices.forEach(t=>{t.velocity+=t.acceleration,t.y-=t.velocity,t.y<-200&&(t.y=200,t.velocity=0)}),this._starGeo.verticesNeedUpdate=!0,this._stars.rotation.y+=.002,this._renderer.render(this._scene,this._camera),requestAnimationFrame(()=>this.animate())}onWindowResize(t){this._camera.aspect=window.innerWidth/window.innerHeight,this._camera.updateProjectionMatrix(),this._renderer.setSize(window.innerWidth,window.innerHeight<t?t:window.innerHeight)}}var d=a("fXoL"),b=a("XiUz"),m=a("Wp6s"),l=a("bTqV");const g=["logincontent"],u=["logincontent"],h=[{path:"home",component:(()=>{class t{constructor(){}ngOnDestroy(){this.rendererContainer.nativeElement.removeChild(this.space.renderer.domElement),delete this.space}ngOnInit(){}ngAfterViewInit(){setTimeout(()=>Object(o.a)(this,void 0,void 0,function*(){const t=new s;yield t.init("main-content"),this.space=t,this.rendererContainer.nativeElement.appendChild(this.space.renderer.domElement),this.space.animate()}),500)}onWindowResize(t){this.space.onWindowResize(document.getElementById("main-content").getBoundingClientRect().height)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=d.Hb({type:t,selectors:[["app-main-content"]],viewQuery:function(t,e){if(1&t&&d.Ec(g,1),2&t){let t;d.oc(t=d.cc())&&(e.rendererContainer=t.first)}},hostBindings:function(t,e){1&t&&d.bc("resize",function(t){return e.onWindowResize(t)},!1,d.rc)},decls:84,vars:0,consts:[["id","main-content","fxLayout","","fxLayoutAlign","center"],["id","space-renderer"],["logincontent",""],["fxFlex.gt-md","70","fxFlex.gt-xs","90","fxFlex","100"],["fxLayout","row wrap","fxLayoutAlign","center"],["fxFlex.gt-lg","45","fxFlex.gt-md","45","fxFlex.gt-xs","45","fxFlex","100",1,"math-card"],[1,"global-card"],["mat-card-avatar","",1,"example-header-image",2,"background-image","url(assets/images/math-card-avatar.png)"],[1,"title"],["mat-card-image","","src","assets/images/function.png","alt","Funciones"],[1,"subtitle"],[1,"sub-content"],[1,"equation"],[1,"i-equation"],[1,"math-card-actions"],["mat-button","","routerLink","/vr/function-grapher",1,"graph-button"],["mat-button","","routerLink","/ar/ar-function-grapher",1,"ar-button"],["mat-card-avatar","",1,"example-header-image",2,"background-image","url(assets/images/math-card-avatar-2.png)"],["mat-card-image","","src","assets/images/parametric-surface.png","alt","Superficies"],["mat-button","","routerLink","/vr/parametric-surface-grapher",1,"graph-button"],["mat-card-avatar","",1,"example-header-image",2,"background-image","url(assets/images/math-card-avatar-3.png)"],["mat-card-image","","src","assets/images/parametric-curve.png","alt","Curvas"],["mat-button","","routerLink","/vr/parametric-curve-grapher",1,"graph-button"],["mat-card-avatar","",1,"example-header-image",2,"background-image","url(assets/images/math-card-avatar-4.png)"],["mat-card-image","","src","assets/images/quadric-surface.png","alt","Cu\xe1dricas"],[1,"qs-math-card-actions"],["mat-button","","routerLink","/vr/quadric-surface-grapher",1,"graph-button"]],template:function(t,e){1&t&&(d.Tb(0,"div",0),d.Ob(1,"div",1,2),d.Tb(3,"div",3),d.Tb(4,"div",4),d.Tb(5,"div",5),d.Tb(6,"mat-card",6),d.Tb(7,"mat-card-header"),d.Ob(8,"div",7),d.Tb(9,"mat-card-title",8),d.Bc(10,"Funciones Z"),d.Sb(),d.Sb(),d.Ob(11,"img",9),d.Tb(12,"mat-card-content"),d.Tb(13,"div",10),d.Tb(14,"p",11),d.Bc(15," Grafica una funci\xf3n de la forma: "),d.Sb(),d.Sb(),d.Tb(16,"p",12),d.Tb(17,"i",13),d.Bc(18,"z = f(x, y)"),d.Sb(),d.Sb(),d.Sb(),d.Tb(19,"mat-card-actions",14),d.Tb(20,"button",15),d.Bc(21,"Graficar"),d.Sb(),d.Tb(22,"button",16),d.Bc(23,"Ver en AR"),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Tb(24,"div",5),d.Tb(25,"mat-card",6),d.Tb(26,"mat-card-header"),d.Ob(27,"div",17),d.Tb(28,"mat-card-title",8),d.Bc(29,"Superficies param\xe9tricas"),d.Sb(),d.Sb(),d.Ob(30,"img",18),d.Tb(31,"mat-card-content"),d.Tb(32,"div",10),d.Tb(33,"p",11),d.Bc(34,"Grafica una superficie param\xe9trica de la forma:"),d.Sb(),d.Sb(),d.Tb(35,"p",12),d.Tb(36,"i",13),d.Bc(37,"x = f(u, v), y = g(u, v), z = h(u, v)"),d.Sb(),d.Sb(),d.Sb(),d.Tb(38,"mat-card-actions",14),d.Tb(39,"button",19),d.Bc(40,"Graficar"),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Tb(41,"div",5),d.Tb(42,"mat-card",6),d.Tb(43,"mat-card-header"),d.Ob(44,"div",20),d.Tb(45,"mat-card-title",8),d.Bc(46,"Curvas Param\xe9tricas"),d.Sb(),d.Sb(),d.Ob(47,"img",21),d.Tb(48,"mat-card-content"),d.Tb(49,"div",10),d.Tb(50,"p",11),d.Bc(51,"Grafica una superficie param\xe9trica de la forma:"),d.Sb(),d.Sb(),d.Tb(52,"p",12),d.Tb(53,"i",13),d.Bc(54,"x = f(t), y = g(t), z = h(t)"),d.Sb(),d.Sb(),d.Sb(),d.Tb(55,"mat-card-actions",14),d.Tb(56,"button",22),d.Bc(57,"Graficar"),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Tb(58,"div",5),d.Tb(59,"mat-card",6),d.Tb(60,"mat-card-header"),d.Ob(61,"div",23),d.Tb(62,"mat-card-title",8),d.Bc(63,"Superficies cu\xe1dricas"),d.Sb(),d.Sb(),d.Ob(64,"img",24),d.Tb(65,"mat-card-content"),d.Tb(66,"div",10),d.Tb(67,"p",11),d.Bc(68," Grafica una superficie cu\xe1drica de la forma: "),d.Sb(),d.Sb(),d.Tb(69,"p",12),d.Tb(70,"i",13),d.Bc(71,"Ax"),d.Tb(72,"sup"),d.Bc(73,"2"),d.Sb(),d.Bc(74," + By"),d.Tb(75,"sup"),d.Bc(76,"2"),d.Sb(),d.Bc(77," + Cz"),d.Tb(78,"sup"),d.Bc(79,"2"),d.Sb(),d.Bc(80," + Dxy + Eyz + Fxz + Gx + Hy + Iz + J = 0"),d.Sb(),d.Sb(),d.Sb(),d.Tb(81,"mat-card-actions",25),d.Tb(82,"button",26),d.Bc(83,"Graficar"),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb())},directives:[b.c,b.b,b.a,m.a,m.e,m.c,m.h,m.f,m.d,m.b,l.a,r.f],styles:["#space-renderer[_ngcontent-%COMP%]{width:100%;height:auto;margin:0;background:#000;overflow:hidden;position:absolute;top:0;left:0;z-index:-1}.math-card[_ngcontent-%COMP%]{margin:5px}.example-header-image[_ngcontent-%COMP%]{background-size:cover;margin-top:0;margin-bottom:.5em}.global-card[_ngcontent-%COMP%]{background-color:purple}.function-card[_ngcontent-%COMP%]{background-color:#019baf}.pcurve-card[_ngcontent-%COMP%]{background-color:#caad07}.psurface-card[_ngcontent-%COMP%]{background-color:purple}.qsurface-card[_ngcontent-%COMP%]{background-color:#ff4500}.math-card[_ngcontent-%COMP%]   .graph-button[_ngcontent-%COMP%]{background-color:#0418cf;color:#fff;border:2px solid #fff}.math-card[_ngcontent-%COMP%]   .graph-button[_ngcontent-%COMP%]:hover{background-color:#fff;color:#0418cf;border-color:#0418cf}.math-card[_ngcontent-%COMP%]   .ar-button[_ngcontent-%COMP%]{background-color:#e00202;color:#fff;border:2px solid #fff}.math-card[_ngcontent-%COMP%]   .ar-button[_ngcontent-%COMP%]:hover{background-color:#fff;color:#e00202;border-color:#e00202}.math-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;justify-content:start;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.math-card[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-family:Arial,sans-serif;margin-bottom:5px;display:flex;justify-content:start}.math-card[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]   .sub-content[_ngcontent-%COMP%]{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.math-card[_ngcontent-%COMP%]   .equation[_ngcontent-%COMP%]{margin-top:5px;display:flex;justify-content:center;font-size:medium;font-style:oblique;font-family:Cambria,Georgia,serif;font-variant:normal}.math-card[_ngcontent-%COMP%]   .equation[_ngcontent-%COMP%]   .i-equation[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.math-card[_ngcontent-%COMP%]   .math-card-actions[_ngcontent-%COMP%]{padding-top:5px}.math-card[_ngcontent-%COMP%]   .qs-math-card-actions[_ngcontent-%COMP%]{padding-top:0}.math-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-family:Cambria,Georgia,serif;font-size:20px;font-style:normal;font-variant:normal;font-weight:700;line-height:28.4px;margin:.2em 0}"]}),t})()},{path:"about",component:(()=>{class t{constructor(){}ngOnDestroy(){this.rendererContainer.nativeElement.removeChild(this.space.renderer.domElement),delete this.space}ngOnInit(){}ngAfterViewInit(){setTimeout(()=>Object(o.a)(this,void 0,void 0,function*(){const t=new s;yield t.init("about-content"),this.space=t,this.rendererContainer.nativeElement.appendChild(this.space.renderer.domElement),this.space.animate()}),500)}onWindowResize(t){this.space.onWindowResize(document.getElementById("main-content").getBoundingClientRect().height)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=d.Hb({type:t,selectors:[["app-about"]],viewQuery:function(t,e){if(1&t&&d.Ec(u,1),2&t){let t;d.oc(t=d.cc())&&(e.rendererContainer=t.first)}},hostBindings:function(t,e){1&t&&d.bc("resize",function(t){return e.onWindowResize(t)},!1,d.rc)},decls:26,vars:0,consts:[["id","about-content","fxLayout","","fxLayoutAlign","center"],["id","space-renderer"],["logincontent",""],["fxFlex.gt-md","70","fxFlex.gt-xs","90","fxFlex","100"],["fxLayout","row wrap","fxLayoutAlign","center"],["fxFlex","100",1,"math-card"],[1,"global-card"],["mat-card-avatar","",1,"example-header-image"],[1,"title"],[1,"subtitle"],[1,"sub-content"],["href","https://github.com/stemkoski/stemkoski.github.com","target","_blank"],["href","https://github.com/TungstenHub/tngt-threejs","target","_blank"]],template:function(t,e){1&t&&(d.Tb(0,"div",0),d.Ob(1,"div",1,2),d.Tb(3,"div",3),d.Tb(4,"div",4),d.Tb(5,"div",5),d.Tb(6,"mat-card",6),d.Tb(7,"mat-card-header"),d.Ob(8,"div",7),d.Tb(9,"mat-card-title",8),d.Bc(10,"Acerca de"),d.Sb(),d.Sb(),d.Tb(11,"mat-card-content"),d.Tb(12,"div",9),d.Tb(13,"p",10),d.Bc(14," Bienvenido, gracias por darte una vuelta por aqu\xed. Te comento que este proyecto nace con el fin de entretener a estudiantes como t\xfa, y que a trav\xe9s de la visualizaci\xf3n de superficies, asociados a 4 tipos de funciones matematicas, puedas aprender desde una perspectiva mas real y menos abstracta."),d.Ob(15,"br"),d.Ob(16,"br"),d.Bc(17," Un agradecimiento para "),d.Tb(18,"strong"),d.Tb(19,"a",11),d.Bc(20,"Lee Stemkoski"),d.Sb(),d.Sb(),d.Bc(21," por su proyecto el cual sent\xf3 las bases y gran parte de los algoritmos para este proyecto, y un agradecimiento final para "),d.Tb(22,"strong"),d.Tb(23,"a",12),d.Bc(24,"TungstenHub"),d.Sb(),d.Sb(),d.Bc(25," ya que su trabajo sirvi\xf3 para definir la l\xf3gica interna para la construcci\xf3n de superficies cu\xe1dricas. "),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb(),d.Sb())},directives:[b.c,b.b,b.a,m.a,m.e,m.c,m.h,m.d],styles:["#space-renderer[_ngcontent-%COMP%]{width:100%;height:auto;margin:0;background:#000;overflow:hidden;position:absolute;top:0;left:0;z-index:-1}.math-card[_ngcontent-%COMP%]{margin:5px}.example-header-image[_ngcontent-%COMP%]{background-image:url(/assets/images/math-card-avatar.png);background-size:cover;margin-top:0;margin-bottom:.5em}.global-card[_ngcontent-%COMP%]{background-color:#daa520}.math-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;justify-content:start;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.math-card[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-family:Arial,sans-serif;margin-bottom:5px;display:flex;justify-content:start}.math-card[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]   .sub-content[_ngcontent-%COMP%]{margin:0}.math-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-family:Cambria,Georgia,serif;font-size:20px;font-style:normal;font-variant:normal;font-weight:700;line-height:28.4px;margin:.2em 0}"]}),t})()},{path:"",redirectTo:"/home",pathMatch:"full"}];var p=a("YUcS");let f=(()=>{class t{}return t.\u0275mod=d.Lb({type:t}),t.\u0275inj=d.Kb({factory:function(e){return new(e||t)},imports:[[n.c,r.g.forChild(h),i.a,p.a]]}),t})()}}]);