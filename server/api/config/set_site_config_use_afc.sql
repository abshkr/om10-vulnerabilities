/*
    define the SITE_USE_ADAPTIVE_FLOW_CONTROL for usage of Adaptive Flow Control in Omega system
    Y: Enable the Adaptive Flow Control in Omega system
    N: Disable the Adaptive Flow Control in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_ADAPTIVE_FLOW_CONTROL';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_ADAPTIVE_FLOW_CONTROL', 'N', 'Use Adaptive Flow Control in Omega system', 'F' );

commit;

/*
    define the SITE_AFC_ARM_PRIORITY to specify the Arm Priority configuration for all arms - LILO or LIFO.
    LILO: Last In Last Out
    LIFO: Last In First Out
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_AFC_ARM_PRIORITY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_AFC_ARM_PRIORITY', 'LILO', 'The sitewide Arm Priority (LILO or LIFO) for all arms in Adaptive Flow Control', 'F' );

commit;

/*
    Set all base arm priorities with site-wide value
*/
UPDATE BASE_PRODS 
SET AFC_PRIORITY = NVL((select NVL(config_value, 'LILO') from site_config where config_key='SITE_AFC_ARM_PRIORITY'), 'LILO'); 

commit;