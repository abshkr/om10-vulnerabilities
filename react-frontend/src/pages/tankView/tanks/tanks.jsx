import React from "react";
import { WaterWave } from "ant-design-pro/lib/Charts";
import { Badge, Modal } from "antd";
import status from "./status";
import Tank from "./tank";

const handleClick = tank => {
  Modal.info({
    title: tank.tank_name,
    centered: true,
    width: 1024,
    maskClosable: true,
    content: <Tank tank={tank} />
  });
};

const Tanks = ({ results }) => {
  return (
    <div className="tank-view">
      {!!results &&
        results.map((item, index) => {
          return (
            <div key={index} className="tank" disabled onClick={() => handleClick(item)}>
              <div className="titles">
                <span> {item.tank_name} </span>
              </div>

              <div className="tank-body">
                <WaterWave
                  color={status[item.tank_status_name]}
                  height={180}
                  title={item.tank_base_name}
                  percent={
                    Math.round((item.tank_cor_vol / item.tank_ullage) * 100, 2) < 100
                      ? Math.round((item.tank_cor_vol / item.tank_ullage) * 100, 2)
                      : 100
                  }
                />

                <div className="tank-status">
                  <Badge status="default" text="HH" />
                  <Badge status="processing" text="H" />
                  <Badge status="default" text="L" />
                  <Badge status="default" text="LL" />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Tanks;
