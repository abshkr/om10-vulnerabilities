import hexToRGB from '../utils/hex-to-rbg';

export const FONT_SIZE = 16;
export const FONT_FAMILY = '"Rubik", sans-serif';
export const FONT_TYPE = 'normal';
export const FONT_COLOR = '#36393f';
export const TITLE_ENABLED = true;

export const LEGEND_POSITION = 'bottom';
export const LEGEND_FULL_WIDTH = true;

export const LABEL_COLOR = '#36393f';
export const LABEL_POINT_STYLE = true;

export const DEFAULT_COLORS = [
  '#68A4EC',
  '#dd7e6b',
  '#f9cb9c',
  '#ffe599',
  '#b6d7a8',
  '#a2c4ca',
  '#a4c2f4',
  '#9fc6e8',
  '#b4a7d6',
  '#d5a6bd',
  '#DDF2FF',
  '#683E00',
  '#FFEDCB',
  '#897456',
  '#3E4756',
  '#A2ACBD',
  '#1E5854',
  '#EEE8A9',
  '#75FAC8',
  '#008A5F',
  '#EB865A',
  '#3EB66F',
  '#004EB6',
  '#8F97FF'
];

const HOVER_DEFAULT_COLORS = DEFAULT_COLORS.map(color => {
  return hexToRGB(color, 0.8);
});

export const BACKGROUND_COLOR = DEFAULT_COLORS;
export const BORDER_COLOR = DEFAULT_COLORS;
export const BORDER_WIDTH = 1.5;
export const HOVER_BACKGROUND_COLOR = HOVER_DEFAULT_COLORS;
export const HOVER_BORDER_COLOR = DEFAULT_COLORS;
