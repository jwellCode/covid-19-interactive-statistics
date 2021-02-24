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
            @change="toggleCountryCasesGraph"
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

      <div id="linechart-container" class="linechart-graph">
        <svg id="linechart" class="mx-auto" :viewBox="viewBox"></svg>
      </div>

      <div class="linechart-settings">
        <div class="weather-settings">
          <input
            v-on:input="toggleWeatherGraph()"
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
        <div class="case-settings">
          <span class="mb-2">Fallzahlen Kategorie:</span>
          <form id="linchartCasetypeSelect" class="mx-auto">
            <div
              v-for="(status, caseType) in chart_config.casetypeActive"
              v-bind:key="caseType"
              class="mb-1"
            >
              <input
                type="checkbox"
                v-bind:id="`${caseType}Checkbox`"
                v-model="chart_config.casetypeActive[caseType].active"
                v-on:input="toggleCaseTypes(caseType)"
                class="hidden"
              />
              <label
                v-bind:for="`${caseType}Checkbox`"
                class="case-settings-label"
              >
                <div class="case-settings-checkbox">
                  <div
                    v-bind:style="`background-color: ${chart_config.colors[caseType]}`"
                    v-bind:class="{ unchecked: !status.active }"
                  ></div>
                </div>
                {{ status.name }}
              </label>
            </div>
          </form>
        </div>
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
          WeeklyConfirmed: "rgba(218, 165, 32, 0.33)",
          WeeklyDeaths: "rgba(217, 79, 32, 0.33)",
          WeeklyRecovered: "rgba(217, 125, 32, 0.33)",
        },
        weatherActive: "maxTemp",
        casetypeActive: {
          WeeklyConfirmed: {
            name: "wöchentliche Fälle",
            active: true,
          },
          WeeklyRecovered: {
            name: "wöchentliche Genesene",
            active: false,
          },
          WeeklyDeaths: {
            name: "wöchentliche Tode",
            active: false,
          },
        },
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

    caseData() {
      let currCaseData = []
      // data for every 7 days
      for (let i = 0; i < this.cases[this.countrySelect].length; i = i + 7) {
        if (this.cases[this.countrySelect][i].Province === "") {
          if (i === 0) {
            this.cases[this.countrySelect][i].WeeklyConfirmed = 0
            this.cases[this.countrySelect][i].WeeklyDeaths = 0
            this.cases[this.countrySelect][i].WeeklyRecovered = 0
            currCaseData.push(this.cases[this.countrySelect][i])
          } else {
            this.cases[this.countrySelect][i].WeeklyConfirmed =
              this.cases[this.countrySelect][i].Confirmed -
              this.cases[this.countrySelect][i - 1].Confirmed
            this.cases[this.countrySelect][i].WeeklyDeaths =
              this.cases[this.countrySelect][i].Deaths -
              this.cases[this.countrySelect][i - 1].Deaths
            this.cases[this.countrySelect][i].WeeklyRecovered =
              this.cases[this.countrySelect][i].Recovered -
              this.cases[this.countrySelect][i - 1].Recovered
            currCaseData.push(this.cases[this.countrySelect][i])
          }
        }
      }
      return currCaseData
    },
    yScaling() {
      return d3
        .scaleLinear()
        .range([this.chart_config.height, 0])
        .domain([
          0,
          d3.max(
            this.caseData,
            (d) => d["WeeklyConfirmed"] + this.chart_config.toppadding
          ),
        ])
    },

    viewBox() {
      return `0 0 ${this.chart_config.width + this.chart_config.margin * 2} ${
        this.chart_config.height + this.chart_config.margin * 2
      }`
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize)

    // Cases by Country
    this.drawCaseGraph()
    // Weather Graph and Axis
    this.drawWeatherGraph()
    // Time Axis
    this.drawXAxis()
  },

  methods: {
    drawWeatherGraph() {
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

    removeWeatherGraph() {
      // Remove previous chart elements
      d3.select("path.weather-line").remove()
      d3.select("g.weather-axis").remove()
      d3.select("text.weather-label").remove()
    },

    toggleWeatherGraph() {
      this.chart_config.weatherActive =
        this.chart_config.weatherActive === "maxTemp"
          ? "relHumidity"
          : "maxTemp"
      this.removeWeatherGraph()
      this.drawWeatherGraph()
    },

    drawCaseGraph() {
      const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")

      let currCaseData = this.caseData

      const xScale = d3
        .scaleTime()
        .range([0, this.chart_config.width])
        .domain(d3.extent(currCaseData, (d) => parseTime(d.Date)))

      const yScaleCases = this.yScaling

      // y Axis for Covid19 cases
      const yAxisCases = d3.axisLeft(yScaleCases).ticks(10)

      // Path for every case type
      for (const [caseType, status] of Object.entries(
        this.chart_config.casetypeActive
      )) {
        const lineCases = d3
          .area()
          .x((d) => xScale(parseTime(d.Date)))
          .y0(yScaleCases(0))
          .y1((d) => yScaleCases(d[caseType]))

        let hidden = status.active ? "" : "hidden"

        // Cases Graph
        this.linechartSvg
          .append("path")
          .datum(currCaseData)
          .attr("id", `cases-line-${caseType}`)
          .attr("class", `cases-line ${hidden}`)
          .attr("pointer-events", "visibleStroke")
          .attr("fill", this.chart_config.colors[caseType])
          .attr("stroke", this.chart_config.colors[caseType])
          .attr("stroke-width", 3)
          .attr(
            "transform",
            `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
          )
          .attr("d", lineCases)

        this.linechartSvg
          .append("g")
          .attr("id", `cases-dots-${caseType}`)
          .attr("class", `cases-dots ${hidden}`)
          .attr(
            "transform",
            `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
          )
          .selectAll("dot")
          .data(currCaseData)
          .enter()
          .append("circle")
          .attr("class", "single-dot")
          .attr("cx", (d) => xScale(parseTime(d.Date)))
          .attr("cy", (d) => yScaleCases(d[caseType]))
          .attr("r", 3)
          .attr("fill", this.chart_config.colors[caseType])
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          .attr("type", caseType)

        d3.selectAll(".single-dot")
          .on("mouseover", this.drawHoverTooltip)
          .on("mouseleave", this.removeHoverTooltip)
          .on("mousemove", this.moveHoverTooltip)

        // yAxis cases
        this.linechartSvg
          .append("g")
          .attr("class", "cases-axis y-axis")
          .attr(
            "transform",
            `translate( ${this.chart_config.margin}, ${this.chart_config.margin})`
          )
          .call(yAxisCases)
      }

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

    removeCasesGraph() {
      // Remove case chart elements
      d3.selectAll("path.cases-line").remove()
      d3.selectAll("g.cases-dots").remove()
      d3.selectAll("g.cases-axis").remove()
      d3.selectAll("text.cases-label").remove()
    },

    toggleCountryCasesGraph() {
      this.removeCasesGraph()
      this.drawCaseGraph()
      // remove and draw weathergraph ontop of the cases graph
      this.removeWeatherGraph()
      this.drawWeatherGraph()
    },

    toggleCaseTypes(caseType) {
      d3.select(`#cases-line-${caseType}`).classed(
        "hidden",
        this.chart_config.casetypeActive[caseType].active
      )
      d3.select(`#cases-dots-${caseType}`).classed(
        "hidden",
        this.chart_config.casetypeActive[caseType].active
      )
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

    drawHoverTooltip(event, data) {
      let circle = d3.select(event.target)
      d3.select("#linechart-container")
        .append("div")
        .attr(
          "style",
          `position: absolute;
          top:  ${event.pageY - 25}px; 
          left:  ${event.pageX + 15}px; 
          border: 1px solid DimGrey;
          border-radius: 5px;
          background-color: white;
          min-width: 50px;
          max-width: 150px;
          padding: 2px 5px;
          font-size: 0.8rem`
        )
        .attr("class", "hoverTooltip")
        .text(
          `${
            this.chart_config.casetypeActive[circle.attr("type")].name.split(
              " "
            )[1]
          }: ${data[circle.attr("type")]}`
        )
    },

    removeHoverTooltip(event, data) {
      d3.select(".hoverTooltip").remove()
    },

    moveHoverTooltip(event, data) {
      this.removeHoverTooltip()
      this.drawHoverTooltip(event, data)
    },

    handleResize() {
      this.chart_config.labelSize = window.innerWidth <= 450 ? 25 : 20
      this.removeWeatherGraph()
      this.drawWeatherGraph()
      this.removeCasesGraph()
      this.drawCaseGraph()
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

input.weather-switch {
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
  @apply flex;
  @apply flex-col;
  @apply space-y-5;
  @apply inline-flex;
  @apply justify-evenly;
  @apply items-center;
  @apply place-self-center;
}

.weather-settings {
  @apply mx-auto;
  @apply flex;
  @apply flex-none;
  @apply items-center;
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
  @apply mx-3;
  width: 3.75rem;
  @apply xs:w-20;
  height: 1.95rem;
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
  @apply left-1;
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

.case-settings {
  @apply mx-auto;
  @apply flex;
  @apply flex-col;
  @apply justify-items-center;
}

.case-settings-label {
  @apply flex;
  @apply flex-row;
  @apply items-center;
}

.case-settings-checkbox {
  @apply w-6;
  @apply h-6;
  @apply mr-1;
  @apply flex;
  @apply border;
  @apply rounded;
  @apply border-gray-700;
}

.case-settings-checkbox > div {
  @apply w-4;
  @apply h-4;
  @apply m-1;
  @apply place-self-center;
  @apply rounded;
}

.unchecked {
  background-color: white !important;
}
</style>
