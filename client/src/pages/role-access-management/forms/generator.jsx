import _ from 'lodash';

const generator = (data, values) => {
  const payload = [];

  _.forEach(data, (element) => {
    const changed = values[element.object_text];

    if (changed) {
      element.priv_create = changed.includes('Create');
      element.priv_delete = changed.includes('Delete');
      element.priv_protect = changed.includes('Password');
      element.priv_update = changed.includes('Update');
      element.priv_view = changed.includes('View');
      element.priv_extra = changed.includes('Extra');
      element.priv_extra2 = changed.includes('Extra2');
    }

    payload.push(element);
  });

  return payload;
};

const setter = (data) => {
  const payload = {};

  _.forEach(data, (element) => {
    const value = [];

    if (element.priv_view) {
      value.push('View');
    }

    if (element.priv_create) {
      value.push('Create');
    }

    if (element.priv_update) {
      value.push('Update');
    }

    if (element.priv_delete) {
      value.push('Delete');
    }

    if (element.priv_protect) {
      value.push('Password');
    }

    if (element.priv_extra) {
      value.push('Extra');
    }

    if (element.priv_extra2) {
      value.push('Extra2');
    }

    payload[element.object_text] = value;
  });

  return payload;
};

export { generator, setter };
