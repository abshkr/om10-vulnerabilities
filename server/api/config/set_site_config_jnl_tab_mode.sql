/*
    define the SITE_JNL_TAB_MODE to control whether to use the TAB mode in journal screen
    Y: Use TAB mode to manage Overview, Live and Historical Journal screens
    N: Use MENU mode to manage Overview, Live and Historical Journal screens
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_JNL_TAB_MODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_JNL_TAB_MODE', 'Y', 'Use TAB mode to manage Overview, Live and Historical Journal screens', NULL );

commit;
