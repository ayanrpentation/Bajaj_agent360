import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Agent360';




  constructor(private titleService: Title) {}


  ngOnInit() {
    // const projectName = sessionStorage.getItem('projectName') || 'Default Project';
    // this.titleService.setTitle(`${projectName} 360`);
  }
  
}
