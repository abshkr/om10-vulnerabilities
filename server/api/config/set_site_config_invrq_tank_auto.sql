/*
    define the SITE_INVRQ_TANK_AUTOGAUGING to determine whether the inventory request is limited to tanks with automatic gauging only
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_INVRQ_TANK_AUTOGAUGING';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_INVRQ_TANK_AUTOGAUGING', 'N', 'Determine whether the inventory request is limited to tanks with automatic gauging only', NULL );

commit;
