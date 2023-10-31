import ApexCharts from 'apexcharts'

const extralarge = window.innerWidth > 2300

const options = (labels,data, height) => ({
   series: [{
      name: "Temperature",
      data: data
   }],

   chart: {
      type: 'area',
      height: extralarge?350:200,
      zoom: {
         enabled: false
      },
   },
   dataLabels: {
      enabled: false
   },
   stroke: {
      curve: "smooth"
   },
   colors: ['#4267B2'],
   title: {
      text: "Bugun soatlik harorat",
      align: 'left'
   },
   labels,
   xaxis: {
      type: 'string',
      labels: {
         formatter: function(value) {
            if(!extralarge && value) {
               let hours = value.length > 4 ? value.slice(0,2):value.slice(0,1)

               return (Number( hours ) % 4 === 0)?value:""
            }
            return value
         }
      }
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