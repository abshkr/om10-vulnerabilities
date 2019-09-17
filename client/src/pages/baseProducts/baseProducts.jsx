import React, { useEffect, useCallback, useState } from "react";

import axios from "axios";
import Forms from "./forms";
import auth from "../../auth";
import columns from "./columns";
import { search } from "../../utils";
import { baseProducts } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

const BaseProducts = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [resize, setResize] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object ? `${t("operations.editing")} (${object.base_code} / ${object.base_name})` : `${t("operations.create")}`,
      centered: true,
      icon: !!object ? "edit" : "form",
      width: "40vw",
      content: <Forms refresh={fetch} value={object} t={t} data={data} configuration={configuration} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([baseProducts.readBaseProduct()])
      .then(
        axios.spread(response => {
          setLoading(false);
          setData(response.data.records);
        })
      )
      .catch(error => {
        setLoading(false);
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
    fetch();
  }, [fetch]);

  const results = !!filtered ? filtered : data;
  const fields = columns(results, configuration, t);

  return (
    <Page page={t("pageMenu.schedules")} name={t("pageNames.baseProducts")} isLoading={isLoading} block={true}>
      <Container>
        <Filter value={value} search={handleSearch} loading={isLoading} />
        <Button
          shape="round"
          type="primary"
          icon={resize ? "shrink" : "arrows-alt"}
          style={{ float: "right" }}
          onClick={() => setResize(!resize)}
          disabled={isLoading}
        />
        <Download data={data} type={"base_products"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
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
        <DataTable rowKey="tnkr_code" resize={resize} columns={fields} data={results} isLoading={isLoading} click={handleClick} scroll={"120vw"} />
      </Container>
    </Page>
  );
};

export default auth(BaseProducts);
