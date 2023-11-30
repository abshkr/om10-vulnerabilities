const config = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  // legend: {
  //   display: false,
  // },

  layout: {
    padding: {
      left: 45,
      right: 0,
      top: 50,
      bottom: 5,
    },
  },
  // tooltips: {
  //   enabled: false,
  // },
  scales: {
    x: {
      stacked: true,
      display: false,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      stacked: true,
      // display: false,
      position: 'right',
      ticks: {
        drawBorder: false,
        suggestedMin: 0,
        suggestedMax: 100,
        stepSize: 100,
        callback: (value, index, values) => {
          return `${value}%`;
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};

export default config;
