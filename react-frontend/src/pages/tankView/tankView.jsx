/**
 * @description
 * Base Products Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import "./tankView.css";

const test = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 9, 0];

class TankView extends Component {
  render() {
    const name = "Tank View";
    return (
      <Page page={"Operations"} name={name} isLoading={false}>
        <div className="tank-view">
          {test.map((item, index) => {
            return (
              <div key={index} className="tank">
                <div className="titles">
                  <span> Name: {item} </span>
                  <span> Base Product: {item} </span>
                </div>
              </div>
            );
          })}
        </div>
      </Page>
    );
  }
}

export default auth(TankView);
