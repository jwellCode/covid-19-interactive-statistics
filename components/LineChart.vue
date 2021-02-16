<template>
  <div>
    <h2
      id="subtitle"
      class="mb-8 md:mb-12 font-medium text-center text-4xl md:text-5xl text-black"
    >
      Landesinterne Untersuchung über Zeit
    </h2>

    <div class="linechart-container">
      <div class="linchart-headline">
        <h2 class="mx-auto text-center">COVID-19 Fallzahlen Entwicklung</h2>

        <form id="linechartCountrySelect" class="mx-auto">
          <select
            v-model="countrySelect"
            @change="changeCountry"
            name="countries"
          >
            <!-- <option value = "global" selected>Weltweit</option> -->
            <option value="germany">Deutschland</option>
            <option value="venezuela">Venezuela</option>
            <option value="mexico">Mexiko</option>
            <option value="sweden">Schweden</option>
            <option value="estonia">Estland</option>
            <option value="austria">Österreich</option>
          </select>
        </form>
      </div>

      <div class="linechart-graph">
        <svg id="linechart" class="mx-auto" :viewBox="viewBox"></svg>
      </div>

      <div class="linechart-settings">
        <input
          v-on:input="
            chart_config.weatherActive =
              chart_config.weatherActive === 'maxTemp'
                ? 'relHumidity'
                : 'maxTemp'
            weatherToggle()
          "
          type="checkbox"
          id="ws"
          class="weather-switch"
          name="weather-switch"
        />

        <span class="toggle-label"> Temperatur </span>

        <label
          for="ws"
          id="weather-toggle"
          v-bind:class="{
            toggled: chart_config.weatherActive === 'relHumidity',
          }"
          class="toggle"
        >
          <span class="toggle-knop"></span>
        </label>

        <span class="toggle-label"> Luftfeuchtigkeit </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3"
import historicalWeatherData from "~/data/historic-weather-data.csv"
import covidCasesGermany from "~/data/corona-data-germany.json"
import covidCasesEstonia from "~/data/corona-data-estonia.json"
import covidCasesMexico from "~/data/corona-data-mexico.json"
import covidCasesSweden from "~/data/corona-data-sweden.json"
import covidCasesVenezuela from "~/data/corona-data-venezuela.json"
import covidCasesAustria from "~/data/corona-data-austria.json"

export default {
  data() {
    return {
      chart_config: {
        margin: 75,
        width: 750,
        height: 500,
        toppadding: 10,
        strokeWidth: 4,
        colors: {
          maxTemp: "lightcoral",
          relHumidity: "cornflowerblue",
          cases: "GoldenRod",
        },
        weatherActive: "maxTemp",
      },
      countrySelect: "germany",
      cases: {
        germany: covidCasesGermany,
        estonia: covidCasesEstonia,
        mexico: covidCasesMexico,
        sweden: covidCasesSweden,
        venezuela: covidCasesVenezuela,
        austria: covidCasesAustria,
      },
    }
  },

  computed: {
    linechartSvg() {
      return d3.select("svg#linechart")
    },
    weatherData() {
      return d3.csvParse(historicalWeatherData, d3.autoType)
    },
    meanWeather() {
      let meanWeather = [
        { date: "Jan", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Feb", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Mar", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Apr", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "May", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Jun", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Jul", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Aug", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Sep", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Oct", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Nov", maxTemp: 0, relHumidity: 0, amount: 0 },
        { date: "Dec", maxTemp: 0, relHumidity: 0, amount: 0 },
      ]

      this.weatherData
        .filter((data) => data.country === this.countrySelect)
        .forEach((data) => {
          meanWeather[parseInt(data.Period.substring(0, 2)) - 1].maxTemp +=
            data["maxTemp"]
          meanWeather[parseInt(data.Period.substring(0, 2)) - 1].relHumidity +=
            data["relHumidity"]
          meanWeather[parseInt(data.Period.substring(0, 2)) - 1].amount += 1
        })
      return meanWeather
    },
    viewBox() {
      return `0 0 ${this.chart_config.width + this.chart_config.margin * 2} ${this.chart_config.height + this.chart_config.margin * 2}`
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize)

    // Cases by Country
    this.countryToggle()
    // Weather Graph and Axis
    this.weatherToggle()
    // Time Axis
    this.drawXAxis()
  },

  methods: {
    weatherToggle() {
      // Remove previous chart elements
      d3.select("path.weather-line").remove()
      d3.select("g.weather-axis").remove()
      d3.select("text.weather-label").remove()
      d3.select("rect.weather-label-box").remove()

      //const weatherDataParse = d3.timeParse("%m/%d/%Y %H:%M:%S")
      const weatherDataParse = d3.timeParse("%b")

      const yScale = d3
        .scaleLinear()
        .range([this.chart_config.height, 0])
        .domain([
          0,
          d3.max(
            this.meanWeather,
            (d) =>
              d[this.chart_config.weatherActive] / d["amount"] +
              this.chart_config.toppadding
          ),
        ])

      const xScale = d3
        .scaleTime()
        .range([0, this.chart_config.width])
        .domain(d3.extent(this.meanWeather, (d) => weatherDataParse(d.date)))

      const line = d3
        .line()
        .x((d) => xScale(weatherDataParse(d.date)))
        .y((d) => yScale(d[this.chart_config.weatherActive] / d["amount"]))
        .curve(d3.curveCatmullRom.alpha(0.5))

      // y Axis for active weather condition
      const yAxis = d3.axisRight(yScale).ticks(10)

      // Set Graph
      this.linechartSvg
        .append("path")
        .datum(this.meanWeather)
        .attr("class", `weather-line line-${this.chart_config.weatherActive}`)
        .attr("fill", "none")
        .attr(
          "stroke",
          this.chart_config.colors[this.chart_config.weatherActive]
        )
        .attr("stroke-width", this.chart_config.strokeWidth)
        .attr(
          "transform",
          `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
        )
        .attr("d", line)

      // Set y Axis
      this.linechartSvg
        .append("g")
        .attr("class", "weather-axis y-axis")
        .attr(
          "transform",
          `translate( ${this.chart_config.margin + this.chart_config.width}, ${
            this.chart_config.margin
          })`
        )
        .call(yAxis)

      const label =
        this.chart_config.weatherActive === "maxTemp"
          ? "Temperatur °C"
          : "Luftfeuchtigkeit (%)"

      this.linechartSvg
        .append("rect")
        .attr("class", "weather-label-box")
        .attr("x", this.chart_config.width - 25)
        .attr("y", this.chart_config.margin - 30)
        .attr("width", 10)
        .attr("height", 10)
        .style(
          "fill",
          this.chart_config.colors[this.chart_config.weatherActive]
        )

      // Set y Axis Label
      this.linechartSvg
        .append("text")
        .attr("x", this.chart_config.width - 5)
        .attr("y", this.chart_config.margin - 20)
        .attr("class", "weather-label")
        .attr("font-size", `${this.chart_config.labelSize}px`)
        .style(
          "fill",
          this.chart_config.colors[this.chart_config.weatherActive]
        )
        .text(label)
    },

    countryToggle() {
      const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")

      // Remove previous chart elements
      d3.select("path.cases-line").remove()
      d3.select("g.cases-dots").remove()
      d3.select("g.cases-axis").remove()
      d3.select("text.cases-label").remove()

      let currCaseData = []
      // data for every 7 days
      for (let i = 0; i < this.cases[this.countrySelect].length; i = i + 7) {
        if (this.cases[this.countrySelect][i].Province === "") {
          if (i === 0) {
            this.cases[this.countrySelect][i].Daily = 0
            currCaseData.push(this.cases[this.countrySelect][i])
          } else {
            this.cases[this.countrySelect][i].Daily =
              this.cases[this.countrySelect][i].Confirmed -
              this.cases[this.countrySelect][i - 1].Confirmed
            currCaseData.push(this.cases[this.countrySelect][i])
          }
        }
      }

      const xScale = d3
        .scaleTime()
        .range([0, this.chart_config.width])
        .domain(d3.extent(currCaseData, (d) => parseTime(d.Date)))

      const yScaleCases = d3
        .scaleLinear()
        .range([this.chart_config.height, 0])
        .domain([
          0,
          d3.max(
            currCaseData,
            (d) => d["Daily"] + this.chart_config.toppadding
          ),
        ])

      // y Axis for Covid19 cases
      const yAxisCases = d3.axisLeft(yScaleCases).ticks(10)

      const lineCases = d3
        .line()
        .x((d) => xScale(parseTime(d.Date)))
        .y((d) => yScaleCases(d.Daily))
        .curve(d3.curveCatmullRom.alpha(0))

      // Cases Graph
      this.linechartSvg
        .append("path")
        .datum(currCaseData)
        .attr("class", "cases-line")
        .attr("fill", "none")
        .attr("stroke", this.chart_config.colors["cases"])
        .attr("stroke-width", this.chart_config.strokeWidth)
        .attr(
          "transform",
          `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
        )
        .attr("d", lineCases)

      this.linechartSvg
        .append("g")
        .attr("class", "cases-dots")
        .attr(
          "transform",
          `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
        )
        .selectAll("dot")
        .data(currCaseData)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(parseTime(d.Date)))
        .attr("cy", (d) => yScaleCases(d.Daily))
        .attr("r", 3)
        .attr("fill", this.chart_config.colors["cases"])
        .attr("stroke", "white")
        .attr("stroke-width", 2)

      // yAxis cases
      this.linechartSvg
        .append("g")
        .attr("class", "cases-axis y-axis")
        .attr(
          "transform",
          `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
        )
        .call(yAxisCases)

      this.linechartSvg
        .append("rect")
        .attr("x", this.chart_config.margin / 2 - 20)
        .attr("y", this.chart_config.margin - 30)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", this.chart_config.colors["cases"])

      // Set y Axis Cases Label
      this.linechartSvg
        .append("text")
        .attr("x", this.chart_config.margin / 2)
        .attr("y", this.chart_config.margin - 20)
        .attr("class", "cases-label")
        .attr("font-size", `${this.chart_config.labelSize}px`)
        .style("fill", this.chart_config.colors["cases"])
        .text("Fallzahlen")
    },

    drawXAxis() {
      const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")

      d3.selectAll("g.linechart-x-axis").remove()

      const xScale = d3
        .scaleTime()
        .range([0, this.chart_config.width])
        .domain(
          d3.extent(this.cases[this.countrySelect], (d) => parseTime(d.Date))
        )

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"))

      // x Axis (Time)
      this.linechartSvg
        .append("g")
        .attr("class", "axis linechart-x-axis")
        .attr(
          "transform",
          `translate( ${this.chart_config.margin}, ${
            this.chart_config.height + this.chart_config.margin
          })`
        )
        .call(xAxis)
    },

    changeCountry() {
      this.countryToggle()
      this.weatherToggle()
    },
    handleResize() {
      this.chart_config.labelSize = window.innerWidth <= 450 ? 25 : 20
      this.weatherToggle()
      this.countryToggle()
      this.drawXAxis()
    },
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleResize)
  },
}
</script>

<style scoped>
text {
  @apply text-xl;
}

input[type="checkbox"] {
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
  @apply mx-auto;
  @apply inline-flex;
  @apply justify-evenly;
  @apply items-center;
  @apply place-self-center;
}

.toggle-label {
  @apply text-xs;
  @apply xs:text-base;
}

#weather-toggle {
  @apply mx-0;
}

.toggle {
  @apply my-1;
  @apply block;
  @apply w-16;
  @apply xs:w-20;
  @apply h-8;
  @apply xs:h-10;
  @apply mx-auto;
  @apply bg-red-500;
  @apply border-4;
  @apply rounded-full;
  @apply cursor-pointer;
}

.toggle-knop {
  @apply block;
  @apply w-5;
  @apply xs:w-6;
  @apply h-5;
  @apply xs:h-6;
  @apply bg-white;
  @apply rounded-full;
  @apply cursor-pointer;
  @apply relative;
  @apply left-0.5;
  @apply xs:left-1;
  @apply top-0.5;
  @apply xs:top-1;

  @apply transition-transform;
  @apply duration-150;
  @apply ease-out;
}

.toggled {
  @apply bg-indigo-400;
}

.toggled > span.toggle-knop {
  @apply transform;
  @apply translate-x-6;
  @apply xs:translate-x-10;
}
</style>
