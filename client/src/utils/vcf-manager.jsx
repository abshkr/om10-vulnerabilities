import { message } from 'antd';

const getVCF = (table, density, temperature) => {
  let vcf = 1;
  let api = 0;
  let alpha = 0;
  let delta = 0;
  let mans = 0;

  let k0 = 0;
  let k1 = 0;
  let k2 = 0;

  if (table === '54B') {
    delta = temperature - 15;

    if (density > 1075) {
      message.warn('Density Out of Range, too High, 653-1075 Kg/M3 !');
      mans = -1;
    } else if (density > 838.9) {
      k0 = 186.9696;
      k1 = 0.4862;
      k2 = 0;
    } else if (density > 787.9) {
      k0 = 594.5418;
      k1 = 0;
      k2 = 0;
    } else if (density > 770.2) {
      k0 = 2680.3206;
      k1 = 0;
      k2 = -0.00336312;
    } else if (density > 350) {
      k0 = 346.4228;
      k1 = 0.4388;
      k2 = 0;
    } else {
      message.warn('API Out of Range, too Low, 0-85 !');
      mans = -2;
    }
  } else if (table === '6B') {
    delta = temperature - 60;
    api = density;

    density = (141.5 * 999.012) / (131.5 + api);

    if (api < 0) {
      message.warn('API Out of Range, too Low, 0-85 !');
      mans = -3;
    } else if (api <= 37) {
      k0 = 103.872;
      k1 = 0.2701;
      k2 = 0;
    } else if (api < 48) {
      k0 = 330.301;
      k1 = 0;
      k2 = 0;
    } else if (api <= 52) {
      k0 = 1489.067;
      k1 = 0;
      k2 = -0.0018684;
    } else if (api <= 85) {
      k0 = 192.4571;
      k1 = 0.2438;
      k2 = 0;
    } else {
      message.warn('API Out of Range, too High, 0-85 !');
      mans = -4;
    }
  } else {
    message.warn('Invalid ASTM Table, Must be 54B or 6B !');
    mans = -5;
  }

  if (mans >= 0) {
    alpha = k0 / Math.pow(density, 2.0) + k1 / density + k2;
    vcf = Math.exp(-alpha * delta * (1 + 0.8 * alpha * delta));
  }

  return vcf;
};

export const standard54B = (observed, density, temperature) => {
  const vcf = getVCF('54B', density, temperature);
  const volume = vcf * observed;

  return volume;
};

export const massInVaccum = (observed, density) => {
  if (density > 1.5 || density < 0.5) {
    message.warn('DEN_VAC must be in KG/L');

    return 0;
  } else {
    const payload = observed * density;

    return payload;
  }
};

export const massInAir = (observed, density) => {
  const buoyancy = 0.0011;

  if (density > 1.5 || density < 0.5) {
    message.warn('DEN_VAC must be in KG/L');

    return 0;
  } else {
    const payload = observed * (density - buoyancy);

    return payload;
  }
};

export const temperatureC2F = (temperature) => {
  const payload = (9.0 / 5.0) * temperature + 32.0;

  return payload;
};

export const temperatureF2C = (temperature) => {
  const payload = ((temperature - 32.0) * 5.0) / 9.0;

  return payload;
};

export const temepratureDensity = (density, temperature, type) => {
  let payload = 0;

  if (type === 'C') {
    payload = density * getVCF('54B', density, temperature);
  } else if (type === 'F') {
    payload = density * getVCF('54B', density, temperatureF2C(temperature));
  } else {
    message.warn('usage: Density_Temp(Density,Temp,[C|F])');
    payload = density;
  }

  return payload;
};

export const api = (density) => {
  const payload = 141.5 / (density / 999.016) - 131.5;

  return payload;
};

export const density = (api) => {
  const payload = (141.5 / (api + 131.5)) * 999.016;

  return payload;
};

export const densityAt15C = (api) => {
  const at60F = density(api);
  const payload = at60F / getVCF('54B', at60F, temperatureF2C(60));

  return payload;
};

export const densityAt60F = (density) => {
  const payload = density * getVCF('54B', density, temperatureF2C(60));

  return payload;
};

export const densityAtXC = (density, temperature) => {
  const payload = density * getVCF('54B', density, temperature);

  return payload;
};

export const density15CFromXC = (density, temperature, digits) => {
  let densXC;
  let dens15C;
  let i;
  let len;
  let steps;

  steps = 1 / Math.pow(10, digits);
  len = (1075 - 653 + 1) * 100;

  if (temperature > 15) {
    dens15C = density;
    for (i = 0; i < len; i++) {
      dens15C += steps;
      densXC = dens15C * getVCF('54B', dens15C, temperature);
      if (densXC.toFixed(digits) === density.toFixed(digits)) {
        break;
      }
      if (densXC > density) {
        break;
      }
    }
  } else if (temperature < 15) {
    dens15C = density;

    for (i = 0; i < len; i++) {
      dens15C -= steps;
      densXC = dens15C * getVCF('54B', dens15C, temperature);
      if (densXC.toFixed(digits) === density.toFixed(digits)) {
        break;
      }
      if (densXC < density) {
        break;
      }
    }
  } else {
    dens15C = density;
  }

  return dens15C;
};
