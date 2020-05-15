import React from 'react';
import { List, Card, Divider } from 'antd';
import { SETTINGS } from '../../../constants';

const data = [
  {
    title: `Latest Release Version Notes (${SETTINGS.VERSION}) - 15/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Area Screen Completion</p>
          <p>- Site Configuration and Features Completion</p>
          <p>- Events and Warnings Completion</p>
          <p>- User Profile Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Site Configuration Hook Added to Aid with Application State across different sites.</p>

          <p>- Better Error Messages Directly Coming from PHP. </p>

          <p>- EULA and Copyright Notice Redirect Added to the Settings Bar.</p>

          <p>- Background Color Changed to fit the document provided by management.</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- SVG Icons showing up smaller than intended of Firefox and Edge now fixed.</p>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>

        <>
          <Divider>Next Release Targets -> 19/05/2020</Divider>
          <p>- Load Schedules</p>
          <p>- Gate Permissions</p>
          <p>- Time Codes</p>
          <p>- Delivery Locations</p>
          <p>- Addresses </p>
          <p>- Equipment Types</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.2.0) - 12/05/2020`,
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
