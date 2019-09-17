import React, { useState, useEffect, useCallback } from "react";

import { Page, Filter, DataTable, Download, Container } from "../../components";
import { Button, Modal, notification } from "antd";
import { personnel } from "../../api";
import { search } from "../../utils";
import columns from "./columns";
import auth from "../../auth";
import Forms from "./forms";
import axios from "axios";

import "./personnel.css";

const Personnel = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [roles, setRoles] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [resize, setResize] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object ? `${t("operations.editing")} (${object.per_code} / ${object.per_code})` : `${t("operations.create")}`,
      centered: true,
      width: "50vw",
      icon: !!object ? "edit" : "form",
      content: <Forms value={object} refresh={fetch} t={t} expiry={expiry} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  const handleSearch = query => {
    const { value } = query.target;

    setFiltered(search(value, data));
    setValue(value);
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([personnel.readPersonnel(), personnel.readPersonnelRoles(), personnel.readPersonnelExpiryTypes()])
      .then(
        axios.spread((personnel, roles, expiry) => {
          setLoading(false);
          setRoles(roles.data.records);
          setExpiry(expiry.data.records);
          setData(personnel.data.records);
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

  useEffect(() => {
    fetch();
  }, [fetch]);

  const results = !!filtered ? filtered : data;

  return (
    <Page page={t("pageMenu.accessControl")} name={t("pageNames.personnel")} isLoading={isLoading} block={true}>
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
        <Download data={data} type={"personnel"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
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
        <DataTable
          rowKey="per_code"
          resize={resize}
          columns={columns(results, roles, configuration, t)}
          data={results}
          isLoading={isLoading}
          click={handleClick}
        />
      </Container>
    </Page>
  );
};

export default auth(Personnel);
