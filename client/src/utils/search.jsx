import _ from "lodash";

const search = (target, data) => {
  const filtered = [];
  _.forEach(data, function(value) {
    const flatMap = _.toArray(value);
    const stringMap = flatMap.toString();
    if (stringMap.toLowerCase().includes(target.toLowerCase()) && target !== "") {
      filtered.push(value);
    }
  });

  return target === "" ? null : filtered;
};

export default search;
