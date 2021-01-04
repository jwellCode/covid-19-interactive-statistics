<template>
  <div class="w-50">
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
  </div>
</template>

<script>
    import { D3LineChart } from 'vue-d3-charts';

    export default {
        components: {
            D3LineChart,
        },
        data() {
            return {
            chart_data: [
                {global: 238, germany: 134, date: '2020-01'},
                {global: 938, germany: 478, date: '2020-02'},
                {global: 1832, germany: 1392, date: '2020-03'},
                {global: 2092, germany: 2343, date: '2020-04'},
                {global: 2847, germany: 2346, date: '2020-05'},
                {global: 2576, germany: 2233, date: '2020-06'},
                {global: 2524, germany: 2325, date: '2020-07'},
                {global: 1648, germany: 2456, date: '2020-08'},
                {global: 2479, germany: 2329, date: '2020-09'},
                {global: 3200, germany: 2438, date: '2020-10'},
                {global: 3700, germany: 2329, date: '2020-11'},
                {global: 4000, germany: 2438, date: '2020-12'}
            ],
            chart_config: {
                values: ['global', 'germany'],
                date: {
                    key: 'date',
                    inputFormat: '%Y-%m',
                    outputFormat: '%Y-%m',
                },
                points:{
                    visibleSize: 2,
                    hoverSize: 4
                },
                tooltip: {
                    labels: true
                },
                axis: {
                    yTitle: 'Fallzahlen',
                    yTicks: 10,
                    xTicks: 10
                }
            }
            }
        }
    }

</script>

<style>

</style>