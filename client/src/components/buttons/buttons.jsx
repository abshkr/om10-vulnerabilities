import React, { Component } from "react";
import { Button } from "antd";
export default class Buttons extends Component {
  render() {
    const { edit, close, submit, isLoading } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e8e8e8",
          padding: "10px 16px",
          textAlign: "right",
          left: 0,
          background: "#fff",
          borderRadius: "0 0 4px 4px"
        }}
      >
        <Button
          style={{
            marginRight: 8
          }}
          onClick={close}
        >
          Cancel
        </Button>
        {edit && (
          <Button
            style={{
              marginRight: 8
            }}
            onClick={close}
            type="primary"
          >
            Delete
          </Button>
        )}
        <Button shape="round" onClick={submit} type="primary" isLoading={isLoading}>
          {edit ? "Update" : "Create"}
        </Button>
      </div>
    );
  }
}
