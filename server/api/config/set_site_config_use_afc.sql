/*
    define the SITE_USE_ADAPTIVE_FLOW_CONTROL for usage of Adaptive Flow Control in Omega system
    Y: Enable the Adaptive Flow Control in Omega system
    N: Disable the Adaptive Flow Control in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_ADAPTIVE_FLOW_CONTROL';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_ADAPTIVE_FLOW_CONTROL', 'N', 'Use Adaptive Flow Control in Omega system', NULL );

commit;
