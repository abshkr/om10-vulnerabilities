import _ from 'lodash';

const authLevel = (user, page) => {
  const auth = _.find(user?.privilege, ['object_text', page]);

  if (auth) {
    return {
      canDelete: auth.priv_update === '1' && auth.priv_delete === '1',
      canUpdate: auth.priv_update === '1',
      canCreate: auth.priv_create === '1'
    };
  } else {
    return false;
  }
};

export default authLevel;
