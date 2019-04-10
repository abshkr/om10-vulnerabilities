import axios from "axios";
import * as API from "../../../constants/api";

const generate = (payload, isGenerating, token) => {
  const { supplier, customer, carrier, report, output, range } = payload;

  axios
    .get(
      `https://${
        API.URL
      }/api/on_demand/create.php?output=${output}&company=${supplier}&report=${report}&carrier=${carrier}&customer=${customer}&startdate=${
        !!range ? range[0].format("YYYY-MM-DD") : undefined
      }%20${!!range ? range[0].format("HH:mm:ss") : undefined}&enddate=${
        !!range ? range[1].format("YYYY-MM-DD") : undefined
      }%20${!!range ? range[0].format("HH:mm:ss") : undefined}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` }
      }
    )
    .then(res => {
      const { result, filepath } = res.data;
      if (result === "OK") {
        window.open(`https://${API.URL}/${filepath}`, "_blank");
        isGenerating(false);
      } else {
        isGenerating("error");
      }
    });
};

export default generate;
