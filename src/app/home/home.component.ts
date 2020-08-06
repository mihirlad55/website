import { Component, OnInit, ViewChild } from '@angular/core';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('header') header: HeaderComponent;

  constructor() { }

  ngOnInit(): void {
  }
}
