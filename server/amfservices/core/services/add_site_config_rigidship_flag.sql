
delete from SITE_CONFIG where CONFIG_KEY='SITE_RIGID_SHIP_AVAILABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_RIGID_SHIP_AVAILABLE', 'Y', 'Determine whether eqipment type can have rigid ship.', NULL );

commit;
