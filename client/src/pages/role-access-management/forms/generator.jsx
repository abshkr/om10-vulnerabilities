import _ from 'lodash';

const generator = data => {
  return {
    menus: _.uniq(_.map(data, 'domain_text')),
    views: _.uniq(_.map(data, 'object_text'))
  };
};

export default generator;
