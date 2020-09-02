/*
    define the max length allowed for certain columns
    TANKS.TANK_CODE:            10
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_TANKCODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_TANKCODE', 10, 'Tank Code Max Length', NULL );

commit;
