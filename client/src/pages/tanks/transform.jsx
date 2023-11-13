const transform = (data) => {
  const payload = [];

  const background = {
    'In Service - Not used': '#e4e6f9',
    'Out of Service': '#d1e3f9',
    'In Service - Working': '#fffff2',
    'In Service - Loading': '#def0d2',
    'In Service - Settling': '#ffebb2',
    'In Service - Receiving': '#e1dbf8',
    'Out Of Service - Offline': '#fa4659',
  };

  if (data) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      element.tank_water_lvl = element.tank_water_lvl === undefined ? 0 : element.tank_water_lvl;
      element.tank_water = element.tank_water === undefined ? 0 : element.tank_water;
      element.tank_prod_lvl = element.tank_prod_lvl === undefined ? 0 : element.tank_prod_lvl;
      element.tank_ifc = element.tank_ifc === undefined ? 0 : element.tank_ifc;
      element.tank_roof_weight = element.tank_roof_weight === undefined ? 0 : element.tank_roof_weight;
      element.tank_sg = element.tank_sg === undefined ? '' : element.tank_sg;
      element.tank_prod_c_of_e =
        element.tank_prod_c_of_e === '0' ||
        element.tank_prod_c_of_e === 0 ||
        element.tank_prod_c_of_e === undefined
          ? ''
          : element.tank_prod_c_of_e;

      payload.push({
        ...element,
        background: background[element.tank_status_name],
        avatar: element.tank_base_color,
      });
    }
  }

  return payload;
};

export default transform;
