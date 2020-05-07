import { CHART_CONFIG } from '../../constants';

const config = {
  cutoutPercentage: 70,

  elements: {
    center: {
      color: CHART_CONFIG.FONT_COLOR,
      fontStyle: CHART_CONFIG.FONT_FAMILY,
    },
  },

  legend: {
    position: 'bottom',
    fullWidth: CHART_CONFIG.LEGEND_FULL_WIDTH,

    labels: {
      fontColor: CHART_CONFIG.LABEL_COLOR,
      fontFamily: CHART_CONFIG.FONT_FAMILY,
      usePointStyle: true,
    },
  },
};

export default config;
