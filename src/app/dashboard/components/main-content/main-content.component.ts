import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SpaceBackgroundEffect } from '../../../shared/models/spaceBackgroundEffect';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {
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
      await newspace.init('main-content');
      
      this.space = newspace;
      this.rendererContainer.nativeElement.appendChild(this.space.renderer.domElement);
      this.space.animate();
    }, 800)      
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    
    this.space.onWindowResize(document.getElementById('main-content').getBoundingClientRect().height);
  }
}
