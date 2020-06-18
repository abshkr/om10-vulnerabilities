import React from 'react';
import { Divider, Collapse } from 'antd';
import { SETTINGS } from '../../../constants';

const { Panel } = Collapse;

const data = [
  {
    title: `Latest Release Version Notes (${SETTINGS.VERSION}) - 19/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Manual Transaction Completion</p>

          <p>Links from Order Listings to Manual Transactions</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- New Versioning </p>

          <p>Links from Customers to Order Listings with parameters</p>

          <p>Links from Customers to Delivery Locations with parameters</p>

          <p>Manage Address Templates in Addresses</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>
            OM5K-6305 - <a>https://dev.diamondkey.com/browse/OM5K-6305</a>
          </p>
          <p>
            OM5K-6455 - <a>https://dev.diamondkey.com/browse/OM5K-6455</a>
          </p>
          <p>
            OM5K-6471 - <a>https://dev.diamondkey.com/browse/OM5K-6471</a>
          </p>
          <p>
            OM5K-6472 - <a>https://dev.diamondkey.com/browse/OM5K-6472</a>
          </p>
          <p>
            OM5K-6473 - <a>https://dev.diamondkey.com/browse/OM5K-6473</a>
          </p>
          <p>
            OM5K-6493 - <a>https://dev.diamondkey.com/browse/OM5K-6493</a>
          </p>
          <p>
            OM5K-6497 - <a>https://dev.diamondkey.com/browse/OM5K-6497</a>
          </p>
          <p>
            OM5K-6499 - <a>https://dev.diamondkey.com/browse/OM5K-6499</a>
          </p>
          <p>
            OM5K-6508 - <a>https://dev.diamondkey.com/browse/OM5K-6508</a>
          </p>
          <p>
            OM5K-6533 - <a>https://dev.diamondkey.com/browse/OM5K-6533</a>
          </p>
          <p>
            OM5K-6535 - <a>https://dev.diamondkey.com/browse/OM5K-6535</a>
          </p>
          <p>
            OM5K-6536 - <a>https://dev.diamondkey.com/browse/OM5K-6536</a>
          </p>
          <p>
            OM5K-6537 - <a>https://dev.diamondkey.com/browse/OM5K-6537</a>
          </p>
          <p>
            OM5K-6538 - <a>https://dev.diamondkey.com/browse/OM5K-6538</a>
          </p>
          <p>
            OM5K-6553 - <a>https://dev.diamondkey.com/browse/OM5K-6553</a>
          </p>
          <p>
            OM5K-6554 - <a>https://dev.diamondkey.com/browse/OM5K-6554</a>
          </p>
          <p>
            OM5K-6555 - <a>https://dev.diamondkey.com/browse/OM5K-6555</a>
          </p>
          <p>
            OM5K-6558 - <a>https://dev.diamondkey.com/browse/OM5K-6558</a>
          </p>
          <p>
            OM5K-6562 - <a>https://dev.diamondkey.com/browse/OM5K-6562</a>
          </p>
          <p>
            OM5K-6563 - <a>https://dev.diamondkey.com/browse/OM5K-6563</a>
          </p>
          <p>
            OM5K-6669 - <a>https://dev.diamondkey.com/browse/OM5K-6669</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: ` Release Version Notes (10.0.11-dev) - 15/06/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>
          <p>
            OM5K-6311 - <a>https://dev.diamondkey.com/browse/OM5K-6311</a>
          </p>
          <p>
            OM5K-6598 - <a>https://dev.diamondkey.com/browse/OM5K-6598</a>
          </p>
          <p>
            OM5K-6197 - <a>https://dev.diamondkey.com/browse/OM5K-6197</a>
          </p>
          <p>
            OM5K-6456 - <a>https://dev.diamondkey.com/browse/OM5K-6456</a>
          </p>
          <p>
            OM5K-6491 - <a>https://dev.diamondkey.com/browse/OM5K-6491</a>
          </p>
          <p>
            OM5K-6125 - <a>https://dev.diamondkey.com/browse/OM5K-6125</a>
          </p>
          <p>
            OM5K-6500 - <a>https://dev.diamondkey.com/browse/OM5K-6500</a>
          </p>
          <p>
            OM5K-6507 - <a>https://dev.diamondkey.com/browse/OM5K-6507</a>
          </p>
          <p>
            OM5K-6478 - <a>https://dev.diamondkey.com/browse/OM5K-6478</a>
          </p>
          <p>
            OM5K-6498 - <a>https://dev.diamondkey.com/browse/OM5K-6498</a>
          </p>
          <p>
            OM5K-6637 - <a>https://dev.diamondkey.com/browse/OM5K-6637</a>
          </p>
          <p>
            OM5K-6470 - <a>https://dev.diamondkey.com/browse/OM5K-6470</a>
          </p>
          <p>
            OM5K-6461 - <a>https://dev.diamondkey.com/browse/OM5K-6461</a>
          </p>
          <p>
            OM5K-6461 - <a>https://dev.diamondkey.com/browse/OM5K-6461</a>
          </p>
          <p>
            OM5K-6640 - <a>https://dev.diamondkey.com/browse/OM5K-6640</a>
          </p>
          <p>
            OM5K-6620 - <a>https://dev.diamondkey.com/browse/OM5K-6620</a>
          </p>
          <p>
            OM5K-6325 - <a>https://dev.diamondkey.com/browse/OM5K-6325</a>
          </p>
          <p>
            OM5K-6626 - <a>https://dev.diamondkey.com/browse/OM5K-6626</a>
          </p>
          <p>
            OM5K-6305 - <a>https://dev.diamondkey.com/browse/OM5K-6305</a>
          </p>
          <p>
            OM5K-6372 - <a>https://dev.diamondkey.com/browse/OM5K-6372</a>
          </p>
          <p>
            OM5K-6510 - <a>https://dev.diamondkey.com/browse/OM5K-6510</a>
          </p>
          <p>
            OM5K-6108 - <a>https://dev.diamondkey.com/browse/OM5K-6108</a>
          </p>
          <p>
            OM5K-6445 - <a>https://dev.diamondkey.com/browse/OM5K-6445</a>
          </p>
          <p>
            OM5K-6486 - <a>https://dev.diamondkey.com/browse/OM5K-6486</a>
          </p>
          <p>
            OM5K-6315 - <a>https://dev.diamondkey.com/browse/OM5K-6315</a>
          </p>
          <p>
            OM5K-6369 - <a>https://dev.diamondkey.com/browse/OM5K-6369</a>
          </p>
          <p>
            OM5K-6611 - <a>https://dev.diamondkey.com/browse/OM5K-6611</a>
          </p>

          <p>
            OM5K-6454 - <a>https://dev.diamondkey.com/browse/OM5K-6454</a>
          </p>

          <p>
            OM5K-6342 - <a>https://dev.diamondkey.com/browse/OM5K-6342</a>
          </p>

          <p>
            OM5K-6371 - <a>https://dev.diamondkey.com/browse/OM5K-6371</a>
          </p>

          <p>
            OM5K-6518 - <a>https://dev.diamondkey.com/browse/OM5K-6518</a>
          </p>

          <p>
            OM5K-6197 - <a>https://dev.diamondkey.com/browse/OM5K-6197</a>
          </p>

          <p>
            OM5K-6631 - <a>https://dev.diamondkey.com/browse/OM5K-6631</a>
          </p>

          <p>
            OM5K-6629 - <a>https://dev.diamondkey.com/browse/OM5K-6629</a>
          </p>

          <p>
            OM5K-6195 - <a>https://dev.diamondkey.com/browse/OM5K-6195</a>
          </p>

          <p>
            OM5K-6612 - <a>https://dev.diamondkey.com/browse/OM5K-6612</a>
          </p>

          <p>
            OM5K-6647 - <a>https://dev.diamondkey.com/browse/OM5K-6647</a>
          </p>

          <p>
            OM5K-6621 - <a>https://dev.diamondkey.com/browse/OM5K-6621</a>
          </p>

          <p>
            OM5K-6628 - <a>https://dev.diamondkey.com/browse/OM5K-6628</a>
          </p>

          <p>
            OM5K-6599 - <a>https://dev.diamondkey.com/browse/OM5K-6599</a>
          </p>

          <p>
            OM5K-6597 - <a>https://dev.diamondkey.com/browse/OM5K-6597</a>
          </p>

          <p>
            OM5K-6607 - <a>https://dev.diamondkey.com/browse/OM5K-6607</a>
          </p>

          <p>
            OM5K-6609 - <a>https://dev.diamondkey.com/browse/OM5K-6609</a>
          </p>

          <p>
            OM5K-6610 - <a>https://dev.diamondkey.com/browse/OM5K-6610</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.10-dev) - 12/06/2020`,
    content: (
      <>
        <>
          <>
            <Divider>Features</Divider>
            <p>- Development of all main screens completed</p>
          </>

          <>
            <Divider>Enhancements</Divider>

            <p>- Added main menu titles to sub menus </p>
            <p>- Sub menu icons completed where icons were available. </p>
            <p>- User logged in id and site code added to the bottom right corner of the Omega screen </p>
          </>

          <>
            <Divider>Bug Fixes</Divider>
            <p>
              OM5K-6449 - <a>https://dev.diamondkey.com/browse/OM5K-6449</a>
            </p>
            <p>
              OM5K-6448 - <a>https://dev.diamondkey.com/browse/OM5K-6448</a>
            </p>
            <p>
              OM5K-6371 - <a>https://dev.diamondkey.com/browse/OM5K-6371</a>
            </p>
            <p>
              OM5K-6364 - <a>https://dev.diamondkey.com/browse/OM5K-6364</a>
            </p>
            <p>
              OM5K-6515 - <a>https://dev.diamondkey.com/browse/OM5K-6515</a>
            </p>
            <p>
              OM5K-6310 - <a>https://dev.diamondkey.com/browse/OM5K-6310</a>
            </p>
            <p>
              OM5K-6338 - <a>https://dev.diamondkey.com/browse/OM5K-6338</a>
            </p>
            <p>
              OM5K-6316 - <a>https://dev.diamondkey.com/browse/OM5K-6316</a>
            </p>
            <p>
              OM5K-6602 - <a>https://dev.diamondkey.com/browse/OM5K-6602</a>
            </p>
            <p>
              OM5K-6601 - <a>https://dev.diamondkey.com/browse/OM5K-6601</a>
            </p>
            <p>
              OM5K-6312 - <a>https://dev.diamondkey.com/browse/OM5K-6312</a>
            </p>
            <p>
              OM5K-6399 - <a>https://dev.diamondkey.com/browse/OM5K-6399</a>
            </p>
            <p>
              OM5K-6451 - <a>https://dev.diamondkey.com/browse/OM5K-6451</a>
            </p>
            <p>
              OM5K-6351 - <a>https://dev.diamondkey.com/browse/OM5K-6351</a>
            </p>
            <p>
              OM5K-6194 - <a>https://dev.diamondkey.com/browse/OM5K-6194</a>
            </p>
            <p>
              OM5K-6176 - <a>https://dev.diamondkey.com/browse/OM5K-6176</a>
            </p>
            <p>
              OM5K-6117 - <a>https://dev.diamondkey.com/browse/OM5K-6117</a>
            </p>
            <p>
              OM5K-6109 - <a>https://dev.diamondkey.com/browse/OM5K-6109</a>
            </p>
            <p>
              OM5K-6086 - <a>https://dev.diamondkey.com/browse/OM5K-6086</a>
            </p>
            <p>
              OM5K-6450 - <a>https://dev.diamondkey.com/browse/OM5K-6450</a>
            </p>
            <p>
              OM5K-6489 - <a>https://dev.diamondkey.com/browse/OM5K-6489</a>
            </p>
            <p>
              OM5K-6513 - <a>https://dev.diamondkey.com/browse/OM5K-6513</a>
            </p>
            <p>
              OM5K-6519 - <a>https://dev.diamondkey.com/browse/OM5K-6519</a>
            </p>
            <p>
              OM5K-6440 - <a>https://dev.diamondkey.com/browse/OM5K-6440</a>
            </p>
            <p>
              OM5K-5394 - <a>https://dev.diamondkey.com/browse/OM5K-5394</a>
            </p>
            <p>
              OM5K-6104 - <a>https://dev.diamondkey.com/browse/OM5K-6104</a>
            </p>
            <p>
              OM5K-6120 - <a>https://dev.diamondkey.com/browse/OM5K-6120</a>
            </p>
            <p>
              OM5K-6196 - <a>https://dev.diamondkey.com/browse/OM5K-6196</a>
            </p>
            <p>
              OM5K-6309 - <a>https://dev.diamondkey.com/browse/OM5K-6309</a>
            </p>
            <p>
              OM5K-6314 - <a>https://dev.diamondkey.com/browse/OM5K-6314</a>
            </p>
            <p>
              OM5K-6327 - <a>https://dev.diamondkey.com/browse/OM5K-6327</a>
            </p>
            <p>
              OM5K-6335 - <a>https://dev.diamondkey.com/browse/OM5K-6335</a>
            </p>
          </>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.9-dev) - 09/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Movement Nomination Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- New Versioning </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the bug fixes in the version document on Confluence.</p>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.8.0-dev) - 05/06/2020`,
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
        <Panel header={entry.title} key={index} forceRender>
          {entry.content}
        </Panel>
      ))}
    </Collapse>
  );
};

export default ReleaseNotes;
