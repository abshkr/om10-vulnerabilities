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
      ctx.font = fontSize + "em 'Oxygen', sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#36393f";

      const percent = chart.config.data.datasets[0].percentage;
      const code = chart.config.data.datasets[0].title;

      let sum = percent;

      if (sum !== 0) {
        let text = sum.toLocaleString() + "%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        let title = code,
          titleX = Math.round((width - ctx.measureText(code).width) / 2),
          titleY = height / 2;

        ctx.fillText(title, titleX, titleY - 15);
        ctx.fillText(text, textX, textY + 10);
      }

      if (sum === 0) {
        sum = "No throughputs";
        let text = sum,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        let title = code,
          titleX = Math.round((width - ctx.measureText(code).width) / 2),
          titleY = height / 2;

        ctx.fillText(title, titleX, titleY - 15);
        ctx.fillText(text, textX, textY + 5);
      }
    }
  });
};

export default summary;
