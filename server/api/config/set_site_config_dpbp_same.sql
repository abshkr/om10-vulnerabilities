/*
    define the SITE_SAME_DRAW_BASE_CODE for whether the single-based drawer product must have the same code as its base component
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SAME_DRAW_BASE_CODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SAME_DRAW_BASE_CODE', 'Y', 'The single-based drawer product must have the same code as its base component', NULL );

commit;
