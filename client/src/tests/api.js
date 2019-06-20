const newman = require("newman");

const api = () => {
  return new Promise((resolve, reject) => {
    newman.run(
      {
        collection: require("./schema.json")
      },
      (error, summary) => {
        !!error
          ? reject({
              message: "Schema Error."
            })
          : resolve(summary.run.failures);
      }
    );
  });
};

export default api;
