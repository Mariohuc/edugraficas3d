import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToGitHub(){
    window.open('https://github.com/Mariohuc/edugraficas3d', "_blank") || window.location.replace('https://github.com/Mariohuc/edugraficas3d');
  }

}
