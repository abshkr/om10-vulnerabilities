/* eslint-env jest */

import api from "./api";

it("API - Schema Validation.", () => {
  return api().catch(error =>
    expect(error).toEqual({
      message: "Schema Error."
    })
  );
});

it("API - Error Count.", () => {
  return api().then(data => expect(data.length).toEqual(0));
});
