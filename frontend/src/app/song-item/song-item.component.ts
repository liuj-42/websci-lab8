import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
  @Input() played: string = "";
  @Input() name: string = "";
  // @Input() artists: Array<Array<String>> = [];
  @Input() artists: string = "";
  @Input() songLink: string = "";
  @Input() image: string = "";

  constructor() { }

  ngOnInit(): void {

    // console.log(this.artists)
  }

  parseArtists(arr: string) {
    console.log("parsing artists")
    // console.log(JSON.parse(arr))
    return JSON.parse(arr);
  }

  parse(date: string) {
    let timestamp = Date.parse(date);
    let diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) {
        return `${diff} seconds`;
    } else if (diff < 3600) {
        return `${Math.floor(diff/60)} minute${Math.floor(diff/60)===1?"":"s"}`;
    } else if (diff < 86400) {
        return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)===1?"":"s"}`;
    } else {
        return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)===1?"":"s"}`;
    }
  }

}
