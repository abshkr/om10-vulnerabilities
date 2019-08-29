import React, { useEffect, useState, useCallback } from "react";

import axios from "axios";
import Forms from "./forms";
import auth from "../../auth";
import columns from "./columns";
import { area } from "../../api";
import { search } from "../../utils";
import { Button, Modal, notification } from "antd";
import { Page, Download, Container, DataTable, Filter } from "../../components";

import "./area.css";

const Area = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object ? `${t("operations.editing")} (${object.area_k} / ${object.area_name})` : `${t("operations.create")}`,
      centered: true,
      icon: !!object ? "edit" : "form",
      width: "40vw",
      content: <Forms refresh={fetch} value={object} t={t} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  const fetch = useCallback(() => {
    axios
      .all([area.readArea()])
      .then(
        axios.spread(response => {
          setLoading(false);
          setData(response.data.records);
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: t("descriptions.requestFailed")
        });
      });
  }, [t]);

  const handleSearch = query => {
    const { value } = query.target;

    setFiltered(search(value, data));
    setValue(value);
  };

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [fetch]);

  const results = !!filtered ? filtered : data;

  const fields = columns(results, configuration, t);

  return (
    <Page page={t("pageMenu.accessControl")} name={t("pageNames.area")} isLoading={isLoading} block={true}>
      <Container>
        <Filter value={value} search={handleSearch} loading={isLoading} />
        <Download data={data} type={"equipment_list"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
        <Button
          shape="round"
          icon="plus"
          type="primary"
          style={{ float: "right", marginRight: 5 }}
          onClick={() => handleClick(null)}
          disabled={isLoading}
        >
          {t("operations.create")}
        </Button>
        <DataTable rowKey="area_k" columns={fields} data={results} isLoading={isLoading} click={handleClick} />
      </Container>
    </Page>
  );
};

export default auth(Area);
