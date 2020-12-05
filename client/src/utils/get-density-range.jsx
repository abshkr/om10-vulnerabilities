import _ from 'lodash';

const getDensityValue = (baseDensity, classDensity, defaultDensity, manageFlag, useFlag) => {
  let density = defaultDensity;

  if (!baseDensity) {
    if (!classDensity) {
      density = defaultDensity;
    } else {
      density = classDensity;
    }
  } else {
    if (manageFlag && useFlag) {
      density = baseDensity;
    } else {
      if (!classDensity) {
        density = defaultDensity;
      } else {
        density = classDensity;
      }
    }
  }

  return density;
};

const getDensityRange = (values) => {
  const densLo = getDensityValue(
    values?.minBaseDensity,
    values?.minClassDensity,
    values?.minDefaultDensity,
    values?.manageFlag,
    values?.useFlag
  );
  const densHi = getDensityValue(
    values?.maxBaseDensity,
    values?.maxClassDensity,
    values?.maxDefaultDensity,
    values?.manageFlag,
    values?.useFlag
  );

  const densRange = {
    min: densLo,
    max: densHi,
  };

  return densRange;
};

export default getDensityRange;
