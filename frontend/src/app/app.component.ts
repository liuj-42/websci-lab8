import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { PieComponent } from './pie/pie.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedin = false;
  lab4Show = true;
  lab5Show = false;
  pie_1: any;
  pie_2: any;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    if (searchParams.has("error")) {
      console.log("redirected")
      this.loggedin = false;
    }
    // console.log(`1: ${this.loggedin}`)
    // console.log("alive")
    if (searchParams.has("logged_in")) {
      // console.log("logged in");
      this.loggedin = true;
    }
    // console.log(`2: ${this.loggedin}`)
  }

  lab4() {
    this.lab4Show = true;
    this.lab5Show = false;
  }

  lab5(pie1: PieComponent, pie2: PieComponent) {
    // this.httpService.get("http://localhost:3000/populate").subscribe(() => {
      this.lab4Show = false;
      this.lab5Show = true;
    // })
  }


}

let searchParams = new URLSearchParams(window.location.search);
