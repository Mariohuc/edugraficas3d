import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.css'],
})
export class MathjaxComponent implements OnChanges {
  @Input() contents: string[];
  mathJaxObject: any;

  constructor(public gs:GlobalService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contents']) {
      // content refer to above property
      // console.log("content chnaged")
      this.renderMath();
    }
  }

  renderMath() {
    /* if (window['MathJax']) {
      window['MathJax'].typeset();
    } */

    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];

    let angObj = this;
    
    setTimeout(() => {
      angObj.mathJaxObject.Hub.Queue(['Typeset', angObj.mathJaxObject.Hub], 'mathContent'); 
      // 'mathContent' is an id of an HTML element
    }, 500);
    
  }

  loadMathConfig() {
    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
      },
      
      CommonHTML: { linebreaks: { automatic: true } },
      'HTML-CSS': { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } },
    });
  }

  ngOnInit(): void {
    this.loadMathConfig()
    this.renderMath();
    
  }
  
}
