<template>
  <div class="linechart-container">
      <svg id="linechart" class="mx-auto"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { data } from 'autoprefixer';

export default {
    data () {
        return {
            data:
            [
                {temp: 3.3, humidity: 85, date: new Date(2020, 0)},
                {temp: 5.3, humidity: 82, date: new Date(2020, 1)},
                {temp: 5.3, humidity: 79, date: new Date(2020, 2)},
                {temp: 10.5, humidity: 74, date: new Date(2020, 3)},
                {temp: 11.9, humidity: 71, date: new Date(2020, 4)},
                {temp: 16.8, humidity: 72, date: new Date(2020, 5)},
                {temp: 17.7, humidity: 71, date: new Date(2020, 6)},
                {temp: 19.9, humidity: 75, date: new Date(2020, 7)},
                {temp: 14.8, humidity: 79, date: new Date(2020, 8)},
                {temp: 10.2, humidity: 82, date: new Date(2020, 9)},
                {temp: 6.0, humidity: 84, date: new Date(2020, 10)},
                {temp: 3.0, humidity: 85, date: new Date(2020, 11)},
            ],
            chart_config: {
                margin: 50,
                width: 500, 
                height: 500,
                toppadding: 10
            }
        }
    },
    mounted () {

        let svg = d3.select('svg#linechart')
            .attr('width', (this.chart_config.height + 2 * this.chart_config.margin))
            .attr('height', (this.chart_config.height + 2 * this.chart_config.margin))
            .attr('transform', `translate( ${-this.chart_config.margin}, ${-this.chart_config.margin})`);

        let xScale = d3.scaleTime()
            .range([0, this.chart_config.width])
            .domain(d3.extent(this.data, d => d.date ));

        let yScaleTemp = d3.scaleLinear()
            .range([this.chart_config.height, 0])
            .domain([0, d3.max(this.data, d => d.temp  + this.chart_config.toppadding)]);

        let yScaleHumidity = d3.scaleLinear()
            .range([this.chart_config.height, 0])
            .domain([0, d3.max(this.data, d => d.humidity  + this.chart_config.toppadding)]);

        let lineTemp = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScaleTemp(d.temp))
            .curve(d3.curveCatmullRom.alpha(0.5));

        let lineHumidity = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScaleHumidity(d.humidity))
            .curve(d3.curveCatmullRom.alpha(0.5));
        
        let xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat('%b'));
        let yAxisTemp = d3.axisLeft(yScaleTemp)
            .ticks(10);
        let yAxisHumidity = d3.axisRight(yScaleHumidity)
            .ticks(10);

        // Temperature Graph
        svg.append('path')
            .datum(this.data)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'lightcoral')
            .attr('stroke-width', 3)            
            .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
            .attr('d', lineTemp);

        // Humidity Graph
        svg.append('path')
            .datum(this.data)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'cornflowerblue')
            .attr('stroke-width', 3)            
            .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
            .attr('d', lineHumidity);

        // x Axis (Time)
        svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.height + this.chart_config.margin})`)
            .call(xAxis);
        
        // y Axis (Temperature)
        svg.append('g')
            .attr('class', 'axis y-axis')
            .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
            .call(yAxisTemp);

        // y Axis Label (Temperature)
        svg.append("text")
            .attr("x", this.chart_config.height - this.chart_config.margin )
            .attr("y",  this.chart_config.margin / 2 )
            .attr('transform-origin', 'center center')
            .attr('transform', 'rotate(-90)')
            .text('Temperatur (°C)');
        
        // y Axis (Humidity)
        svg.append('g')
            .attr('class', 'axis y-axis')
            .attr('transform', `translate( ${this.chart_config.margin + this.chart_config.width}, ${this.chart_config.margin})`)
            .call(yAxisHumidity);

        // y Axis Label (Humidity)
        svg.append("text")
            .attr("x", this.chart_config.margin )
            .attr("y",  this.chart_config.margin / 2 )
            .attr('transform-origin', 'center center')
            .attr('transform', 'rotate(90)')
            .text('Luftfeuchte (%)');
    }
}
</script>

<style scoped>
    text {
        @apply text-xl
    }
</style>