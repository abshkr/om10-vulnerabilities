import React from 'react';
import { Divider, Collapse } from 'antd';
import { SETTINGS } from '../../../constants';

const { Panel } = Collapse;

const data = [
  {
    title: `Latest Release Version Notes (${SETTINGS.VERSION}) - 05/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Load Schdules Screen Completion</p>
          <p>- Favourites Function Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Overview screen chart legend moved to the right hand side to help with spacing. </p>
          <p>
            - Base Product Storage & Currrent Folio Throughput now has the ability to filter by Base
            Classification.
          </p>
          <p>- Weekly Throughput now has a Linear and Logarithmic Mode. </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.7.0-dev) - 02/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Companies Screen Completion</p>
          <p>- Delivery Details Completion</p>
          <p>- Ability To Search the Pages</p>
          <p>- Delivery Details Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Ability To Toggle Between Classes </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.6.0-dev) - 29/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Load Bays Completion</p>
          <p>- Drawer Products Completion </p>
          <p>- Order Listings Completion </p>
          <p>- New Menu Structure </p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- New Icons for the Menu</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.5.0-dev) - 26/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Allocatioms Screen Completion</p>
          <p>- Folio Scheduling Completion </p>
          <p>- Customers Completion </p>
          <p>- Addresses Completion </p>
          <p>- Equipment Types Completion </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.4.0-dev) - 22/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Gate Permission Screen Completion</p>
          <p>- Time Codes Screen Completion </p>
          <p>- Tank Groups Screen Completion </p>
          <p>- Partnership Screen Completion </p>
          <p>- Delivery Locations Screen Completion </p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Increased Menu Icon Sizes</p>

          <p>- Background color change to match the existing OMEGA Backend. </p>

          <p>- Login Page Changes to match the design specifications</p>

          <p>- Home Page Changes to match the design specifications</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.3.0-dev) - 15/05/2020`,
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
    title: `Release Version Notes (10.2.0-dev) - 12/05/2020`,
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
    <Collapse defaultActiveKey={['0']}>
      {data.map((entry, index) => (
        <Panel header={entry.title} key={index}>
          {entry.content}
        </Panel>
      ))}
    </Collapse>
  );
};

export default ReleaseNotes;
