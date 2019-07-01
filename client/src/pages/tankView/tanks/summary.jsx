import { Chart } from "react-chartjs-2";

const summary = () => {
  let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;

  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function() {
      originalDoughnutDraw.apply(this, arguments);

      let chart = this.chart;
      let width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      let fontSize = (height / 180).toFixed(2);
      ctx.font = "bold " + fontSize + "em 'Oxygen', sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#36393f";

      const percent = chart.config.data.datasets[0].percentage;
      let sum = percent;

      if (sum !== 0) {
        let text = sum.toLocaleString() + "%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY - 15);
      }

      if (sum === 0) {
        sum = "No throughputs";
        let text = sum,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY - 15);
      }
    }
  });
};

export default summary;
