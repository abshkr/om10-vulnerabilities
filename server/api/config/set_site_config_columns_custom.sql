/*
    define the SITE_CUSTOM_COLUMN_XYZ to determine whether the customisable columns are enabled or disabled in the page XYZ
    Y: enable the customisable columns in the page XYZ.
    N: disable the customisable columns in the page XYZ.

    This new feature can be enabled or disabled in the following pages:
        Load Schedules (DONE in OM5K-10652)
        Order Listing
        Movement Nomination
        Nomination Schedules
        Special Movement
        Product Movement
        Transaction List
        Equipment Types
        Equipment List
        Tanker List
        Tank Status
        Site Balance
        Tank Inventory
        Product Inventory
        Personnel
        ID Assignment
        Base Products
        Drawer Products
        Companies
        Allocations
        Customers
        Delivery Locations
        Partners
        Partnership
        Tank Configuration
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_SCHEDULE';        -- Load Schedules (in previous patch)
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_CUSTORDER';       -- Order Listing
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_NOMINATION';      -- Movement Nomination
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_NOMSCHEDULE';     -- Nomination Schedules
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_SPECMOVEMENT';    -- Special Movement
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_PRODMOVEMENT';    -- Product Movement
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_TRNSLIST';        -- Transaction List
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_EQPTTYPE';        -- Equipment Types
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_EQPTLIST';        -- Equipment List
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_TNKRLIST';        -- Tanker List
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_TANKSTATUS';      -- Tank Status
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_SITEBALANCE';     -- Site Balance
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_TANKSTOCK';       -- Tank Inventory
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_PRODSTOCK';       -- Product Inventory
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_PERSONNEL';       -- Personnel
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_IDASSIGN';        -- ID Assignment
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_BASEPROD';        -- Base Products
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_DRAWPROD';        -- Drawer Products
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_COMPANYS';        -- Companies
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_ALLOCATION';      -- Allocations
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_CUSTOMERS';       -- Customers
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_DLVRYLOC';        -- Delivery Locations
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_PARTNERS';        -- Partners
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_PARTNERSHIP';     -- Partnership
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_TANKCONFIG';      -- Tank Configuration

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_SCHEDULE', 'N', 'Enable the customisable columns in the page Load Schedules', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_CUSTORDER', 'N', 'Enable the customisable columns in the page Order Listing', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_NOMINATION', 'N', 'Enable the customisable columns in the page Movement Nomination', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_NOMSCHEDULE', 'N', 'Enable the customisable columns in the page Nomination Schedules', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_SPECMOVEMENT', 'N', 'Enable the customisable columns in the page Special Movement', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_PRODMOVEMENT', 'N', 'Enable the customisable columns in the page Product Movement', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_TRNSLIST', 'N', 'Enable the customisable columns in the page Transaction List', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_EQPTTYPE', 'N', 'Enable the customisable columns in the page Equipment Types', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_EQPTLIST', 'N', 'Enable the customisable columns in the page Equipment List', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_TNKRLIST', 'N', 'Enable the customisable columns in the page Tanker List', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_TANKSTATUS', 'N', 'Enable the customisable columns in the page Tank Status', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_SITEBALANCE', 'N', 'Enable the customisable columns in the page Site Balance', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_TANKSTOCK', 'N', 'Enable the customisable columns in the page Tank Inventory', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_PRODSTOCK', 'N', 'Enable the customisable columns in the page Product Inventory', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_PERSONNEL', 'N', 'Enable the customisable columns in the page Personnel', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_IDASSIGN', 'N', 'Enable the customisable columns in the page ID Assignment', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_BASEPROD', 'N', 'Enable the customisable columns in the page Base Products', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_DRAWPROD', 'N', 'Enable the customisable columns in the page Drawer Products', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_COMPANYS', 'N', 'Enable the customisable columns in the page Companies', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_ALLOCATION', 'N', 'Enable the customisable columns in the page Allocations', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_CUSTOMERS', 'N', 'Enable the customisable columns in the page Customers', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_DLVRYLOC', 'N', 'Enable the customisable columns in the page Delivery Locations', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_PARTNERS', 'N', 'Enable the customisable columns in the page Partners', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_PARTNERSHIP', 'N', 'Enable the customisable columns in the page Partnership', 'C' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_CUSTOM_COLUMN_TANKCONFIG', 'N', 'Enable the customisable columns in the page Tank Configuration', 'C' );

commit;

