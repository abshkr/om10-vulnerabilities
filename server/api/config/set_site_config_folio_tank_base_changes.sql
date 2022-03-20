/*
    define the SITE_FOLIO_TANK_BASE_CHANGE to determine whether it is allowed to manage the base product changes in tanks during the folio period
    Y: Allow to manage the base product changes in tanks during the folio period.
    N: Does not allow to manage the base product changes in tanks during the folio period.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_FOLIO_TANK_BASE_CHANGE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_FOLIO_TANK_BASE_CHANGE', 'Y', 'Allow to manage the base product changes in tanks during the folio period.', NULL );

commit;

