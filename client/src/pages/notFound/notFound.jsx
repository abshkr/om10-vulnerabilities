import React, { Component } from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router-dom";

import "./notFound.css";

class NotFound extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <div className="not-found">
        <Result
          status="404"
          title="404"
          subTitle="'Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" shape="round" onClick={this.handleClick}>
              Back Home
            </Button>
          }
        />
      </div>
    );
  }
}

export default withRouter(NotFound);
