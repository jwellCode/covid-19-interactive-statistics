<template>
    <div class="linechart-container mb-5">
        <div class="linchart-headline">
            <h2 class="mx-auto">COVID-19 Fallzahlen Entwicklung</h2>        
            <form id="linechartCountrySelect" class="mx-auto">
                <select name="countries" v-model="countrySelect" v-on:change="changeCountry()">
                    <!-- <option value = "global" selected>Weltweit</option> -->
                    <option value = "germany">Deutschland</option>
                    <option value = "italy">Italien</option>
                    <option value = "sweden">Schweden</option>
                </select>
            </form>          
        </div>
        <div class="linechart-graph">
            <svg id="linechart" class="mx-auto"></svg>
        </div>
        <div class="linechart-settings"> 
            <input v-on:input="chart_config.weatherActive = chart_config.weatherActive === 'temp' ? 'relHumidity' : 'temp'; weatherToggle()" type="checkbox" id="ws" class="weather-switch" name="weather-switch"/>
            <span class="toggle-label"> Temperatur </span>
            <label for="ws" id="weather-toggle" v-bind:class="{ toggled: chart_config.weatherActive === 'relHumidity' }" class="toggle">
                <span class="toggle-knop"></span>
            </label>
            <span class="toggle-label"> Luftfeuchtigkeit </span>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import { data } from 'autoprefixer';
import historicalWeatherData from "~/data/historicWeatherData.csv";

export default {
    data () {
        return {
            chart_config: {
                margin: 75,
                width: 500, 
                height: 500,
                toppadding: 10,
                colors: {
                    'temp': 'lightcoral',
                    'relHumidity': 'cornflowerblue'
                },
                startDate: '2020-01-01T00:00:00Z',
                now: '2021-01-01T00:00:00Z',
                weatherActive: 'temp'
            },            
            cases: [],
            countrySelect: 'germany'         
        }
    },
    computed: {
        linechartSvg:  function(){ 
            return d3.select('svg#linechart');
        },
        weatherData: function() {
            return d3.csvParse(historicalWeatherData, d3.autoType);  
        }
    },
    methods: {
        weatherToggle: function () {

            // Remove previous chart elements
            d3.select('path.weather-line').remove();
            d3.select('g.weather-axis').remove();
            d3.select('text.weather-label').remove();

            let weatherDataParse = d3.timeParse('%b');

            let currWeatherData = this.weatherData.filter( data => data.country === this.countrySelect);

            let yScale = d3.scaleLinear()
                .range([this.chart_config.height, 0])
                .domain([0, d3.max(currWeatherData, d => d[this.chart_config.weatherActive]  + this.chart_config.toppadding)]);

            let xScale = d3.scaleTime()
                .range([0, this.chart_config.width])
                .domain(d3.extent(currWeatherData, d => weatherDataParse(d.Period) ));

            let line = d3.line()
                .x(d => xScale(weatherDataParse(d.Period)))
                .y(d => yScale(d[this.chart_config.weatherActive]))
                .curve(d3.curveCatmullRom.alpha(0.5));

            // y Axis for active weather condition
            let yAxis = d3.axisRight(yScale)
                .ticks(10);
            
            // Set Graph
            this.linechartSvg.append('path')
                .datum(currWeatherData)
                .attr('class', `weather-line line-${this.chart_config.weatherActive}`)
                .attr('fill', 'none')
                .attr('stroke', this.chart_config.colors[this.chart_config.weatherActive])
                .attr('stroke-width', 3)            
                .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
                .attr('d', line);

            // Set y Axis
            this.linechartSvg.append('g')
                .attr('class', 'weather-axis y-axis')
                .attr('transform', `translate( ${this.chart_config.margin + this.chart_config.width}, ${this.chart_config.margin})`)
                .call(yAxis);

            let label = this.chart_config.weatherActive === 'temp' ? 'Temperatur (°C)' : 'Luftfeuchtigkeit (%)';

            // Set y Axis Label
            this.linechartSvg.append('text')
                .attr('x', this.chart_config.margin )
                .attr('y',  this.chart_config.margin / 4 )
                .attr('class', 'weather-label')
                .attr('transform-origin', 'center center')
                .attr('transform', 'rotate(90)')
                .text(label);
        },
        countryToggle: function() {
            var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

            // Remove previous chart elements
            d3.select('path.cases-line').remove();
            d3.select('g.cases-axis').remove();
            d3.select('text.cases-label').remove();

            let xScale = d3.scaleTime()
                .range([0, this.chart_config.width])
                .domain(d3.extent(this.cases, d => parseTime(d.Date) ));

            let yScaleCases = d3.scaleLinear()
                .range([this.chart_config.width, 0])
                .domain([0, d3.max(this.cases, d => d['Confirmed']  + this.chart_config.toppadding)]);

            // y Axis for Covid19 cases
            let yAxisCases = d3.axisLeft(yScaleCases)
                .ticks(10);

            let lineCases = d3.line()
                .x(d => xScale(parseTime(d.Date)))
                .y(d => yScaleCases(d['Confirmed']))
                .curve(d3.curveCatmullRom.alpha(1));

            // Cases Graph
            this.linechartSvg.append('path')
                .datum(this.cases)
                .attr('class', 'cases-line')
                .attr('fill', 'none')
                .attr('stroke', 'GoldenRod')
                .attr('stroke-width', 3)            
                .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
                .attr('d', lineCases);

            // yAxis cases
            this.linechartSvg.append('g')
                .attr('class', 'cases-axis y-axis')
                .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`)
                .call(yAxisCases);

            // Set y Axis Cases Label
            this.linechartSvg.append('text')
                .attr('x', this.chart_config.height )
                .attr('y',  this.chart_config.margin / 4 )
                .attr('class', 'cases-label')
                .attr('transform-origin', 'center center')
                .attr('transform', 'rotate(-90)')
                .text('Fallzahlen');
        },
        drawXAxis: function() {
            var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

            let xScale = d3.scaleTime()
                .range([0, this.chart_config.width])
                .domain(d3.extent(this.cases, d => parseTime(d.Date) ));

            let xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat('%b'));

            // x Axis (Time)
            this.linechartSvg.append('g')
                .attr('class', 'axis x-axis')
                .attr('transform', `translate( ${this.chart_config.margin}, ${this.chart_config.height + this.chart_config.margin})`)
                .call(xAxis);
        },
        changeCountry: function() {
            this.cases = [];

            this.$axios.$get(`https://api.covid19api.com/country/${this.countrySelect}?from=${this.startDate}&to=${this.chart_config.now}`)
                .then( data => {
                    // data for every 7 days                          
                    for (let i = 0; i < data.length; i = i + 7) {
                        this.cases.push(data[i]);
                    }
                    
                    this.countryToggle();
                    this.weatherToggle();
                });
        }
    },
    mounted () {

        this.linechartSvg
            .attr('width', (this.chart_config.height + 2 * this.chart_config.margin))
            .attr('height', (this.chart_config.height + 2 * this.chart_config.margin));

        this.$axios.$get(`https://api.covid19api.com/country/${this.countrySelect}?from=${this.startDate}&to=${this.chart_config.now}`)
                .then( data => {
                    // data for every 7 days                          
                    for (let i = 0; i < data.length; i = i + 7) {
                        this.cases.push(data[i]);
                    }
                    // Weather Graph and Axis
                    this.weatherToggle();   
                    // Cases by Country
                    this.countryToggle();
                    // Time Axis
                    this.drawXAxis();
                });
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

    .linchart-headline {
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply place-self-center;
        @apply divide-y-2;
        @apply divide-solid;
    }

    .linchart-headline > h2 {
        @apply pb-4;
        @apply font-light;
        @apply text-lg;
    }

    #linechartCountrySelect {
        @apply pt-4;
    }

    #linechartCountrySelect > select {
        @apply text-xl;
        @apply font-semibold;
        @apply text-center;
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
        @apply bg-red-500;
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
        @apply bg-indigo-400;
    }

    .toggled > span.toggle-knop {
        @apply transform; 
        @apply translate-x-10;
    }
</style>