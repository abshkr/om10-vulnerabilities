/* eslint-disable */

const fs = require("fs");
const path = require("path");
const lessToJS = require("less-vars-to-js");
const withLess = require("@zeit/next-less");
const withFonts = require("next-fonts");

const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./style.less"), "utf8")
);

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withFonts(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: antdVariables // make your antd custom effective
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader"
        });
      }
      return config;
    }
  })
);
