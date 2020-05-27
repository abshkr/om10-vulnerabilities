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
