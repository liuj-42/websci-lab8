import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  @Input() title: String = "";
  @Input() type: String = "";
  @Input() name: String = "pie";
  // data!: any[];
  private data = [
    {"Artist": "Vue", "Popularity": "24", "Times_present": "2014"},
    {"Artist": "React", "Popularity": "99", "Times_present": "2013"},
    {"Artist": "Angular", "Popularity": "46", "Times_present": "2016"},
    {"Artist": "Backbone", "Popularity": "23", "Times_present": "2010"},
    {"Artist": "Ember", "Popularity": "12", "Times_present": "2011"},
  ];
  private data2 = [
    {"Artist":"1-25", "Popularity": 12},
    {"Artist":"26-50", "Popularity": 2},
    {"Artist":"51-75" , "Popularity": 8},
    {"Artist":"76-100", "Popularity": 5}
  ]
  private svg: any;
  private margin = 50;
  private width = 500;
  private height = 500;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get("http://localhost:3000/db/1").subscribe((dataRaw) => {
      console.log(dataRaw)
      let data = JSON.parse(JSON.stringify(dataRaw))[0]["data"][0];
      let dataParsed: any = [];
      let artists = new Set();
      let artistsArr: any = [];
      let artistsPopularity: any = {};
      let pop = [
        {"Artist":"1-25", "Popularity": 0, "Times_present": 0},
        {"Artist":"26-50", "Popularity": 0, "Times_present": 0},
        {"Artist":"51-75" , "Popularity": 0, "Times_present": 0},
        {"Artist":"76-100", "Popularity": 0, "Times_present": 0}
      ]
      if (this.type === "1") {
        Object.keys(data).forEach((key: any) => {
          let temp = {
            Name: data[key][0],
            Popularity: data[key][1],
            Duration: data[key][2],
            Artist: data[key][3],
          }
          
          artistsPopularity[data[key][3]] = data[key][1];
          artists.add(data[key][3]);
          artistsArr.push(data[key][3]);
          dataParsed.push(temp);
        })
        console.log(dataParsed)
        let artistCount: any[] = [];
        Array.from(artists).forEach((artist: any) => {
          artistCount.push(this.count(artistsArr, artist));
        })
        console.log(artistCount)
        // let artistCount = artists.map()
        // let artistsArr
        artistsArr = Array.from(artists);
        console.log(artists)
        console.log(artistsArr)
        let data_: any[] = [];
        for (let x = 0; x < artistCount.length; x++) {
          data_.push({
            Artist: artistsArr[x],
            Times_present: artistCount[x],
            Popularity: artistsPopularity[artistsArr[x]],
          })
        }
        this.data = data_;
        console.log(data_)
      } else {
        Object.keys(data).forEach((key: any) => {
          let temp = {
            Name: data[key][0],
            Popularity: data[key][1],
            Duration: data[key][2],
            Artist: data[key][3],
          }
          let pop_ = parseInt(data[key][1]);
          if (pop_ <= 25) {
            pop[0]["Times_present"]! += 1;
          } else if (pop_ <= 50) {
            pop[1]["Times_present"]! += 1;
          } else if (pop_ <= 75) {
            pop[2]["Times_present"]! += 1;
          } else {
            pop[3]["Times_present"]! += 1;
          }
  
          
          artistsPopularity[data[key][3]] = data[key][1];
          artists.add(data[key][3]);
          artistsArr.push(data[key][3]);
          // dataParsed.push(temp);
        })
        dataParsed = pop;
        this.data = dataParsed;
      }



      // console.log("data:")
      // console.log(data);
      // this.data = dataParsed;
      // pie1.data = dataParsed;
      // pie2.data = dataParsed;
      this.start();

    })
  }

  count(arr: any[], item: any) {
    let result = 0;
      arr.forEach(el => {
      if (el === item) {
        result++;
      }
    })
    return result;
  }

  start() {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select(`figure.${this.name}`)
    .append("svg")
    .style("overflow","visible")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Times_present.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);

}

private drawChart(): void {
      const pie = d3.pie<any>().value((d: any) => Number(d.Times_present));


    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    let labelLocation: any;
    if (this.type === "1") {
      labelLocation = d3.arc()
      .innerRadius(this.radius + 20)
      .outerRadius(this.radius - 5)
    } else {
      labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);
    }

  

      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.Artist)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15)  


    }




}
