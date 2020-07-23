import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHome: boolean;
  isCreate: boolean;

  constructor(public router: Router) { }

  ngOnInit() {
    this.isCreate = this.router.url.includes('create');
    this.isHome = !this.router.url.includes('edit') && !this.router.url.includes('create');
  }
}
