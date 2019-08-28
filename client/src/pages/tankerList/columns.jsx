import React from "react";
import { Icon } from "antd";
import {
  generateOptions,
  validateDateTime,
  convertToLocale
} from "../../utils";
import { Trans } from "react-i18next";

const columns = (data, config) => [
  {
    title: <Trans i18nKey="fields.code" />,
    dataIndex: "tnkr_code",
    key: "tnkr_code",
    width: 100,
    align: "center",
    onFilter: (value, record) => record.tnkr_code.indexOf(value) === 0,
    sorter: (a, b) => a.tnkr_code.localeCompare(b.tnkr_code),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: <Trans i18nKey="fields.name" />,
    dataIndex: "tnkr_name",
    key: "eqpt_code",
    onFilter: (value, record) => record.tnkr_name.indexOf(value) === 0,
    sorter: (a, b) => a.tnkr_name.localeCompare(b.tnkr_name),
    width: 200
  },
  {
    title: <Trans i18nKey="fields.carrier" />,
    dataIndex: "tnkr_carrier_name",
    key: "tnkr_carrier_name",
    filters: generateOptions(data, "tnkr_carrier_name"),
    onFilter: (value, record) => record.tnkr_carrier_name.indexOf(value) === 0,
    width: 250
  },
  {
    title: <Trans i18nKey="fields.owner" />,
    dataIndex: "tnkr_owner_name",
    key: "tnkr_owner_name",
    filters: generateOptions(data, "tnkr_owner_name"),
    onFilter: (value, record) => record.tnkr_owner_name.indexOf(value) === 0,
    width: 250
  },
  {
    title: <Trans i18nKey="fields.equipmentType" />,
    dataIndex: "tnkr_eqpt_name",
    key: "tnkr_eqpt_name",
    width: 200,
    filters: generateOptions(data, "tnkr_eqpt_name"),
    onFilter: (value, record) => record.tnkr_eqpt_name.indexOf(value) === 0
  },
  {
    title: <Trans i18nKey="fields.baseDepot" />,
    dataIndex: "tnkr_base_site_name",
    key: "tnkr_base_site_name",
    align: "center",
    filters: generateOptions(data, "tnkr_base_site_name"),
    width: 150
  },
  {
    title: <Trans i18nKey="fields.locked" />,
    dataIndex: "tnkr_lock",
    key: "tnkr_lock",
    align: "center",
    onFilter: (value, record) => record.tnkr_lock.indexOf(value) === 0,
    sorter: (a, b) => (a.tnkr_lock === b.tnkr_lock ? 0 : a.tnkr_lock ? -1 : 1),
    width: 60,
    render: text => (
      <span>
        <Icon type={!text ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: <Trans i18nKey="fields.active" />,
    dataIndex: "tnkr_active",
    key: "tnkr_active",
    align: "center",
    onFilter: (value, record) => record.tnkr_active.indexOf(value) === 0,
    sorter: (a, b) =>
      a.tnkr_active === b.tnkr_active ? 0 : a.tnkr_active ? -1 : 1,
    width: 60,
    render: text => (
      <span>
        <Icon type={!text ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: <Trans i18nKey="fields.bayCheck" />,
    dataIndex: "tnkr_bay_loop_ch",
    key: "tnkr_bay_loop_ch",
    align: "center",
    onFilter: (value, record) => record.tnkr_bay_loop_ch.indexOf(value) === 0,
    sorter: (a, b) =>
      a.tnkr_bay_loop_ch === b.tnkr_bay_loop_ch
        ? 0
        : a.tnkr_bay_loop_ch
        ? -1
        : 1,
    width: 100,
    render: text => (
      <span>
        <Icon type={!text ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: <Trans i18nKey="fields.archived" />,
    dataIndex: "tnkr_archive",
    key: "tnkr_archive",
    align: "center",
    onFilter: (value, record) => record.tnkr_archive.indexOf(value) === 0,
    sorter: (a, b) =>
      a.tnkr_archive === b.tnkr_archive ? 0 : a.tnkr_archive ? -1 : 1,
    width: 60,
    render: text => (
      <span>
        <Icon type={!text ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: <Trans i18nKey="fields.lastModified" />,
    dataIndex: "tnkr_last_modified",
    key: "tnkr_last_modified",
    align: "center",
    width: 250,
    sorter: (a, b) =>
      validateDateTime(b.tnkr_last_modified) -
      validateDateTime(a.tnkr_last_modified),
    render: text => <span>{convertToLocale(text)}</span>
  },
  {
    title: <Trans i18nKey="fields.lastUsed" />,
    dataIndex: "tnkr_last_used",
    key: "tnkr_last_used",
    align: "center",
    width: 250,
    sorter: (a, b) =>
      validateDateTime(b.tnkr_last_used) - validateDateTime(a.tnkr_last_used),

    render: text => <span>{convertToLocale(text)}</span>
  }
];

export default columns;
