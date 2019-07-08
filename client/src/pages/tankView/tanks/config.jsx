const config = {
  maintainAspectRatio: false,
  cutoutPercentage: 75,
  title: {
    display: false
  },

  tooltips: {
    enabled: true,
    callbacks: {
      label: (tooltipItems, data) => {
        const index = tooltipItems.index;
        const set = data.datasets[0].values;
        const percent = data.datasets[0].data;
        return ` ${index === 0 ? "Volume" : "Total Capacity"}: ${set[index]} Litres / ${percent[index]}%`;
      }
    }
  },

  legend: {
    display: false
  }
};

export default config;
