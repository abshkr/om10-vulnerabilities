import _ from 'lodash';

const generator = (data, values) => {
  console.log(data, values);
  return [];
};

const setter = (data) => {
  console.log(_.uniq(_.map(data, 'object_text')));

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

    payload[element.object_text] = value;
  });

  return payload;
};

export { generator, setter };
