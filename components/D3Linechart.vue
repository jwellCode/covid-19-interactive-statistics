<template>
    <div class="linechart-container">
        <div class="linechart-graph">
            <svg id="linechart" class="mx-auto"></svg>
        </div>
        <div class="linechart-settings"> 
            <input v-on:input="toggle()" type="checkbox" id="ws" class="weather-switch" name="weather-switch"/>
            <span class="toggle-label"> Luftfeuchtigkeit </span>
            <label for="ws" id="weather-toggle" class="toggle">
                <span class="toggle-knop"></span>
            </label>
            <span class="toggle-label"> Temperatur </span>
        </div>
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
                toppadding: 10,
                colors: {
                    'temp': 'lightcoral',
                    'humidity': 'cornflowerblue'
                }
            },
            weatherActive: 'humidity'
        }
    },
    methods: {
        toggle: function () {

            let svg = d3.select('svg#linechart');

            // Remove previous chart elements
            d3.select('path.weather-line').remove();
            d3.select('g.weather-axis').remove();
            d3.select('g.weather-axis').remove();
            d3.select('text.weather-label').remove();

            let toggleLabel = document.getElementById('weather-toggle');
            toggleLabel.classList.contains('toggled') ? toggleLabel.classList.remove('toggled') : toggleLabel.classList.add('toggled');

            this.weatherActive = this.weatherActive === 'temp' ? 'humidity' : 'temp';

            let yScale = d3.scaleLinear()
                .range([this.chart_config.height, 0])
                .domain([0, d3.max(this.data, d => d[this.weatherActive]  + this.chart_config.toppadding)]);

            let xScale = d3.scaleTime()
                .range([0, this.chart_config.width])
                .domain(d3.extent(this.data, d => d.date ));

            let line = d3.line()
                .x(d => xScale(d.date))
                .y(d => yScale(d[this.weatherActive]))
                .curve(d3.curveCatmullRom.alpha(0.5));

            let yAxis = d3.axisRight(yScale)
                .ticks(10);
            
            // Set Graph
            svg.append('path')
                .datum(this.data)
                .attr('class', `weather-line line-${this.weatherActive}`)
                .attr('fill', 'none')
                .attr('stroke', this.chart_config.colors[this.weatherActive])
                .attr('stroke-width', 3)            
                .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
                .attr('d', line);

            // Set y Axis
            svg.append('g')
                .attr('class', 'weather-axis y-axis')
                .attr('transform', `translate( ${this.chart_config.margin + this.chart_config.width}, ${this.chart_config.margin})`)
                .call(yAxis);

            let label = this.weatherActive === 'temp' ? 'Temperatur (°C)' : 'Luftfeuchtigkeit (%)';

            // Set y Axis Label
            svg.append('text')
                .attr('x', this.chart_config.margin )
                .attr('y',  this.chart_config.margin / 4 )
                .attr('class', 'weather-label')
                .attr('transform-origin', 'center center')
                .attr('transform', 'rotate(90)')
                .text(label);
        }
    },
    mounted () {

        let svg = d3.select('svg#linechart')
            .attr('width', (this.chart_config.height + 2 * this.chart_config.margin))
            .attr('height', (this.chart_config.height + 2 * this.chart_config.margin));

        let xScale = d3.scaleTime()
            .range([0, this.chart_config.width])
            .domain(d3.extent(this.data, d => d.date ));
        
        let xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat('%b'));

        // placeholder for cases axis
        let yAxis = d3.axisLeft(xScale)
            .ticks(0);

        // Weather Graph and Axis
        this.toggle();

        // x Axis (Time)
        svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.height + this.chart_config.margin})`)
            .call(xAxis);

        svg.append('g')
            .attr('class', 'case-axis y-axis')
            .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
            .call(yAxis);
    }
}
</script>

<style scoped>
    text {
        @apply text-xl;
    }

    input[type=checkbox] {
        @apply hidden;
    }

    .linechart-settings {
        @apply min-w-full;
        @apply px-64;
        @apply inline-flex;
        @apply justify-evenly;
        @apply items-center;
        @apply place-self-center;
    }

    .toggle {
        @apply block;
        @apply w-20;
        @apply h-10;
        @apply mx-auto;
        @apply bg-indigo-400;
        @apply border-4;
        @apply rounded-full;
        @apply cursor-pointer;
    }

    .toggle-knop {
        @apply block;
        @apply w-6;
        @apply h-6;
        @apply bg-white;
        @apply rounded-full;
        @apply cursor-pointer;
        @apply relative;
        @apply left-1;
        @apply top-1;

        @apply transition-transform;
        @apply duration-150;   
        @apply ease-out;     
    }

    .toggled {
        @apply bg-red-500;
    }

    .toggled > span.toggle-knop {
        @apply transform; 
        @apply translate-x-10;
    }
</style>