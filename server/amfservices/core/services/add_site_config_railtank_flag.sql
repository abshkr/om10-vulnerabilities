
delete from SITE_CONFIG where CONFIG_KEY='SITE_RAIL_TANK_AVAILABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_RAIL_TANK_AVAILABLE', 'Y', 'Determine whether eqipment type can have rail tank car.', NULL );

commit;
