/*
    define the SITE_TANK_VISCOSITY_ENABLED to control the visibility and editability of the tank viscosity in Tank Status screen
    Y: The field of tank viscosity is visible and editable in Tank Status screen
    N: The field of tank viscosity is not visible in Tank Status screen
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_TANK_VISCOSITY_ENABLED';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_TANK_VISCOSITY_ENABLED', 'N', 'Control the visibility and editability of the tank viscosity in Tank Status screen', NULL );

commit;


/*
    define the number of digits after decimal point for viscosity
    VISCOSITY:      5
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_PRECISION_VISCOSITY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_PRECISION_VISCOSITY', 5, 'Viscosity Precision', 'L' );

commit;
