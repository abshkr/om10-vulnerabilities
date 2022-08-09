

/*
    define the SITE_USE_PROD_OWNERSHIP for usage of Product Ownership in Omega system
    Y: Enable the Product Ownership in Omega system
    N: Disable the Product Ownership in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_PROD_OWNERSHIP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_PROD_OWNERSHIP', 'Y', 'Manage the product ownership in Omega system', NULL );

commit;


/*
    define the SITE_PROD_OWNERSHIP_LEVEL for the level of Product Ownership in Omega system
    TANK: the product ownership at tank level
    SITE: the product ownership at site level
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PROD_OWNERSHIP_LEVEL';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PROD_OWNERSHIP_LEVEL', 'TANK', 'The level of product ownership management', NULL );

commit;




/*
    define the SITE_OWNERSHIP_VOLUME_MODE to decide the volume mode used for site-level ownership stock management (SITE_PROD_OWNERSHIP_LEVEL = SITE)
    GOV: Gross Observed Volume (Ambient Volume)
    GSV: Gross Standard Volume (Corrected Volume)
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_OWNERSHIP_VOLUME_MODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_OWNERSHIP_VOLUME_MODE', 'GSV', 'The volume mode used for site-level ownership stock management. GOV: Gross Observed Volume, GSV: Gross Standard Volume', NULL );

commit;


/*
    define the SITE_OWNERSHIP_MASS_MODE to decide the mass mode used for site-level ownership stock management (SITE_PROD_OWNERSHIP_LEVEL = SITE)
    WiV: Weight in Vacuum
    WiA: Weight in Air
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_OWNERSHIP_MASS_MODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_OWNERSHIP_MASS_MODE', 'WiV', 'The mass mode used for site-level ownership stock management. WiV: Weight in Vacuum, WiA: Weight in Air', NULL );

commit;

