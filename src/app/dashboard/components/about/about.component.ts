import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SpaceBackgroundEffect } from '../../../shared/models/spaceBackgroundEffect';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  @ViewChild('logincontent') rendererContainer: ElementRef;
  space: SpaceBackgroundEffect;

  constructor() { }

  ngOnDestroy(): void {
    
    this.rendererContainer.nativeElement.removeChild(this.space.renderer.domElement); 
    
    delete this.space;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    setTimeout( async ()=>{
      const newspace = new SpaceBackgroundEffect();
      await newspace.init('about-content');
      
      this.space = newspace;
      this.rendererContainer.nativeElement.appendChild(this.space.renderer.domElement);
      this.space.animate();
    }, 500)      
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.space.onWindowResize(document.getElementById('main-content').getBoundingClientRect().height);
  }

}
