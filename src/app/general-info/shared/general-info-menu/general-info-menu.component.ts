import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'general-info-menu',
  templateUrl: './general-info-menu.component.html',
  styleUrls: ['./general-info-menu.component.scss']
})
export class GeneralInfoMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { 
  }

  toggleMenu() {
  }
}
