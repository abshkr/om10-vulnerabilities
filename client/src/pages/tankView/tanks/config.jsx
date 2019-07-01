const config = title => {
  return {
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    title: {
      display: true,
      text: title,
      fontColor: "#36393f",
      fontSize: 13,
      position: "bottom"
    },

    tooltips: {
      enabled: true,
      callbacks: {
        label: (tooltipItems, data) => {
          const index = tooltipItems.index;
          const set = data.datasets[0].values;
          const percent = data.datasets[0].data;
          return ` ${index === 0 ? "Volume" : "Ullage"}: ${set[index]} Litres / ${percent[index]}%`;
        }
      }
    },

    legend: {
      display: false
    }
  };
};

export default config;
