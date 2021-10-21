import { Component, OnInit } from '@angular/core';
import { SideBarService } from './sidebar/sidebar.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(public nav: SideBarService) { }

  ngOnInit() { 
    
  }
  

}
