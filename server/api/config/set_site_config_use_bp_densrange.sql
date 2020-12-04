/*
    define the SITE_USE_BASEPROD_DENSRANGE for usage of density range from base products
    Y: Use density range from base products
    N: Use density range from base classes
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_BASEPROD_DENSRANGE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_BASEPROD_DENSRANGE', 'N', 'Use density range from base products', NULL );

commit;
