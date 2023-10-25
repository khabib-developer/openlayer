import ApexCharts from 'apexcharts'

const options = (labels,data) => ({
   series: [{
      name: "Temperature",
      data: data
   }],

   chart: {
      type: 'area',
      height: 350,
      zoom: {
         enabled: false
      },
   },
   dataLabels: {
      enabled: false
   },
   stroke: {
      curve: 'straight'
   },
   colors: ['#FF7F00'],
   title: {
      text: "Today's Hourly Temperature",
      align: 'left'
   },
   labels,
   xaxis: {
      type: 'string',
   },
   yaxis: {
      opposite: true
   },
   legend: {
      horizontalAlign: 'left'
   },

});




export async function drawChart(el, labels, data) {
   const chart = new ApexCharts(el, options(labels, data));
   await chart.render();
}