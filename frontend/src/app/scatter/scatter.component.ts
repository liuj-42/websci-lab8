import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  private data!: any;
  private svg: any;
  private margin = 50;
  private width = 1600 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get("http://localhost:3000/db/2").subscribe((dataRaw) => {
      let data = JSON.parse(JSON.stringify(dataRaw));
      this.data = data[0]["data"]
      this.createSvg();
      this.drawPlot();
    })
  }


  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .style("overflow","visible")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")")
}

private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 4000000])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d.Popularity))
    .attr("cy", (d: any) => y(d.Followers))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("span")
    .classed("tooltip",true)
    .text((d: any) => d.Artist)
    .attr("x", (d: any) => x(d.Popularity))
    .attr("y", (d: any) => y(d.Followers))

    this.svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", this.width)
    .attr("y", this.height - 6)
    .text("Spotify popularity");

    this.svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Followers");

    // this.svg.
    
}

}
