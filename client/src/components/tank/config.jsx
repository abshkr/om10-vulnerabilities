const config = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },

  layout: {
    padding: {
      left: 45,
      right: 0,
      top: 50,
      bottom: 5,
    },
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        position: 'right',
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          stepSize: 100,
          callback: (value, index, values) => {
            return `${value}%`;
          },
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

export default config;
