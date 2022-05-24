/*
    define the BOL_VERSION for the mode of BOL copyies
    JASPER: Jasper version of BOL.
    PLAIN_TEXT: Plain text or Jasper version of BOL.
*/
/* delete from SITE_CONFIG where CONFIG_KEY='BOL_VERSION';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI)
values ('BOL_VERSION', 'JASPER', 'Plain text or Jasper version of BOL', NULL );

commit;*/


-- update SITE_CONFIG set CONFIG_VALUE = 'JASPER' where CONFIG_KEY='BOL_VERSION';
update SITE_CONFIG set CONFIG_VALUE = 'PLAIN_TEXT' where CONFIG_KEY='BOL_VERSION';

commit;


-- init COMPANY_CONFIG

