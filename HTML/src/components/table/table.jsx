import React from "react";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import Download from "../download";

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

const PaginationConfig = { showSizeChanger: true, pageSizeOptions: ["10", "30", "50", "100"] };

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
    const { data, rowKey, change, resize, click } = this.props;

    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    return (
      <div>
        <Download data={data} />
        <Table
          bordered
          size="small"
          rowKey={rowKey}
          columns={resize ? columns : this.props.columns}
          dataSource={data}
          onChange={change}
          pagination={PaginationConfig}
          scroll={{ y: 500 }}
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
      </div>
    );
  }
}

export default DataTable;
