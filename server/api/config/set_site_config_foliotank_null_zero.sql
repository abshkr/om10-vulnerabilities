/*
    define the SITE_FOLIOTANK_NULL_AS_ZERO to allow the NULL quantity in folio tank to be displayed as ZERO
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_FOLIOTANK_NULL_AS_ZERO';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_FOLIOTANK_NULL_AS_ZERO', 'Y', 'Show NULL quantity as ZERO in folio tanks', NULL );

commit;
