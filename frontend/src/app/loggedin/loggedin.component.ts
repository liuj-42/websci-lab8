import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  name: String = "unknown";
  product: String = "unknown";
  gotData: boolean = false;
  data!: any[];

  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
    // console.log(this);
    this.getInfo()
      .then(() => {
        console.log("Fetching songs");
        this.getRecent();
      })
  }

  async getInfo() {
    this.httpService.get(`http://localhost:3000/info`).subscribe( data => {
      console.log(data);
      let dataJSON = JSON.parse(JSON.stringify(data));
      this.name = dataJSON["display_name"];
      this.product = dataJSON["product"];
    })
  }

  async getRecent() {
    this.httpService.get(`http://localhost:3000/recent`).subscribe( data => {

      this.populateRecentlyPlayed(data)
        // .then( () => );
    }, error => {
      console.log("error")
      document.location.href = 'http://localhost:3000?error';
    })
  }

  async populateRecentlyPlayed(dataRaw: any) {
    let data = JSON.parse(JSON.stringify(dataRaw))

    console.log(data);
    this.data = data;
    this.gotData = true
    console.log("ready to build song cards")
  }


}
