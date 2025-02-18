import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-circle-gauge',
  templateUrl: './circle-gauge.component.html',
  styleUrls: ['./circle-gauge.component.css']
})
export class CircleGaugeComponent implements AfterViewInit {
  private data = [
    { label: 'Conversion', value: 80, color: '#4CAF50' },
    { label: 'Engagement', value: 65, color: '#2196F3' },
    { label: 'Feedback', value: 50, color: '#FFC107' }
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.createGaugeChart();
  }

  private createGaugeChart(): void {
    const width = 400;
    const height = 400;
    const thickness = 20;

    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius((d: any, i: any) => radius - (i + 1) * thickness - 10)
      .outerRadius((d: any, i: any) => radius - i * thickness - 10)
      .startAngle(0)
      .endAngle((d: any) => (d.value / 100) * 2 * Math.PI);

    const backgroundArc = d3
      .arc()
      .innerRadius((d: any, i: any) => radius - (i + 1) * thickness - 10)
      .outerRadius((d: any, i: any) => radius - i * thickness - 10)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    svg
      .selectAll('.bg-arc')
      .data(this.data)
      .enter()
      .append('path')
      .attr('class', 'bg-arc')
      .attr('d', (d: any, i: any) => backgroundArc(null, i))
      .attr('fill', '#e6e6e6')
      .attr('stroke', '#ccc');

    svg
      .selectAll('.arc')
      .data(this.data)
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('d', (d: any, i: any) => arcGenerator(d, i))
      .attr('fill', (d: any) => d.color);

    svg
      .selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', 0)
      .attr('y', (d: any, i: any) => -radius + (i + 1) * thickness + 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text((d: any) => `${d.label}: ${d.value}%`);
  }
}
