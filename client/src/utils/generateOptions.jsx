import _ from "lodash";

const generateOptions = (data, key) => {
  const results = [];
  _.map(_.uniqBy(data, key), function(item) {
    results.push({
      text: !!item[key] ? _.capitalize(item[key]) : "N/A",
      value: !!item[key] ? item[key] : "null"
    });
  });

  return results;
};

export default generateOptions;
