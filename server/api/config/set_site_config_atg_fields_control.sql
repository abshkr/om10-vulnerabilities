/*
    define the SITE_ATG_FIELDS_EDITABLE to allow to manage the tank fields for ATG readings
    Y: User can manage the tank fields and switch them on or off for ATG readings.
    N: User can not manage the tank fields and switch them on or off for ATG readings.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ATG_FIELDS_EDITABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ATG_FIELDS_EDITABLE', 'N', 'Allow to manage the tank fields for ATG readings', NULL );

commit;
