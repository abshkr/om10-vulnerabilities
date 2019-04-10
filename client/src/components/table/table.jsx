import React from "react";
import { Table, Icon } from "antd";
import { Resizable } from "react-resizable";
import "./table.css";

const loader = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

const paginationConfig = {
  showSizeChanger: true,
  pageSizeOptions: ["10", "30", "50", "100"],
  defaultPageSize: 100
};

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns
    };
  }

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const { data, rowKey, change, resize, click, isLoading, scroll } = this.props;

    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    return (
      <Table
        bordered
        size="small"
        loading={{
          indicator: loader,
          spinning: isLoading
        }}
        rowKey={rowKey}
        components={this.components}
        columns={resize ? columns : this.props.columns}
        dataSource={data}
        onChange={change}
        pagination={paginationConfig}
        scroll={{ x: !!scroll ? scroll : 2400, y: "80vh" }}
        onRow={record => {
          return {
            onClick: () => {
              if (click !== undefined) {
                click(record);
              }
            }
          };
        }}
      />
    );
  }
}

export default DataTable;
