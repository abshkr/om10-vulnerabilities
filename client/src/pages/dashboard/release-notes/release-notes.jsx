import React from 'react';
import { List, Card, Divider } from 'antd';
import { SETTINGS } from '../../../constants';

const data = [
  {
    title: `Latest Release Version Notes (${SETTINGS.VERSION})`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Partners Screen Completion</p>
          <p>- Key Reader Devices Completion</p>
          <p>- Product Groups Screen Completion</p>

          <p>- Dashboard Screen Home Section Completion</p>
          <p>- Dashboard Overview Section Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Release Notes Tabs Added</p>

          <p>- Bigger Icons and Menu Structure Changed to Support Better Viewing.</p>
          <p>
            - Home Menu Buttons Positioed Differently Compared to the previous version to help with
            accessibility
          </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p> Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },
];

const ReleaseNotes = () => {
  return (
    <List
      itemLayout="vertical"
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <Card
          style={{ marginBottom: 20 }}
          bodyStyle={{ padding: 10 }}
          hoverable
          title={item.title}
          size="small"
        >
          <List.Item.Meta style={{ marginBottom: 5 }} description={item.description} />
          {item.content}
        </Card>
      )}
    />
  );
};

export default ReleaseNotes;
