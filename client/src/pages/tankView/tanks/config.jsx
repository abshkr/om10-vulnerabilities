const config = {
  maintainAspectRatio: false,
  cutoutPercentage: 70,
  title: {
    display: true,
    fontColor: "#36393f",
    fontSize: 16
  },

  tooltips: {
    enabled: true,
    callbacks: {
      label: (tooltipItems, data) => {
        const array = [];
        const set = data.datasets[0].data;
        const size = set.length;
        const meta = data.datasets[0]._meta;
        const tipIndex = tooltipItems.index;
        try {
          for (let index = 0; index < size; index++) {
            if (meta[Object.keys(meta)[0]].data[index].hidden === false) {
              array.push(set[meta[Object.keys(meta)[0]].data[index]._index]);
            }
          }
        } catch (e) {}

        const sum = array.reduce((a, b) => a + b, 0);

        if (set[tipIndex] === 1) {
          return data.labels[tipIndex] + ": " + set[tipIndex] + " Litres / " + Math.round((set[tipIndex] / sum) * 100, 2) + "%";
        }
        if (set[tipIndex] !== 1) {
          return data.labels[tipIndex] + ": " + set[tipIndex] + " Litres / " + Math.round((set[tipIndex] / sum) * 100, 2) + "%";
        }
      }
    }
  },

  legend: {
    display: false
  }
};

export default config;
