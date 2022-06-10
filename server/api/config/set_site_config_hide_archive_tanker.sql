/*
    define the SITE_HIDE_ARCHIVE_TANKER for whether to show archived tanker in frontend
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_HIDE_ARCHIVE_TANKER';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_HIDE_ARCHIVE_TANKER', 'Y', 'Hide the archived tanker(s) frm tanker list screen and dropdown lists', NULL );

commit;
