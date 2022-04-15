import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
// import { DataService, Item } from '../data.service';
import * as d3 from 'd3';
// import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';



@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  data: any[] = [
    {"Artist":["POLKADOT STINGRAY", "UK Rampage", "Ado", "Helios+trope", "Vaundy"],
    "Followers":[295960, 4531, 1010729, 961, 748253] ,
    "Popularity": [55, 27, 71, 28, 74]
  }]

  private svg: any;
  private margin = 50;
  private width = 1500 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private httpService: HttpService ) { }

  ngOnInit(): void {

    // this.test();
    this.httpService.get("http://localhost:3000/db/2").subscribe((data) => {
      console.log(data);
      // data = JSON.parse(JSON.stringify(data)) as JSON;
      let data_obj = JSON.parse(JSON.stringify(data));
      console.log(data_obj);
      console.log(data_obj[0]["data"]);
      this.data = data_obj[0]["data"];
      this.createSvg();
      this.drawBars(this.data);
      // console.log(data["data"])
      // return data;
    })
    // Comment out the line above and uncomment the line below when you're
    // ready to try fetching JSON from a REST API endpoint.
    // Comment out the private data [] above too.
    // d3.json('https://api.jsonbin.io/b/5eee6a5397cb753b4d149343').then((data: any) => this.drawBars(data));
  }

  private createSvg(): void {
      this.svg = d3.select("figure#bar")
      .append("svg")
      .style("overflow","visible")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
      // Create the X-axis band scale
      const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Artist))
      .padding(0.2);

      // Draw the X-axis on the DOM
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

      // Create the Y-axis band scale
      const y = d3.scaleLinear()
      .domain([0, 4000000])
      .range([this.height, 0]);

      // Draw the Y-axis on the DOM
      this.svg.append("g")
      .call(d3.axisLeft(y));

      // Create and fill the bars
      this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Artist))
      .attr("y", (d: any) => y(d.Followers))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Followers))
      .attr("fill", "#d04a35");
      
      this.svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", this.width)
      .attr("y", this.height - 6)
      .text("Artist");

      this.svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Followers");
  }

}

