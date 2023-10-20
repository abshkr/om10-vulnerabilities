/*
    define the WRI_EXPIRY_DAYS for the default number of days after the Effective date to set the Expiry Date for a WRI when it is created for the first time
*/
delete from SITE_CONFIG where CONFIG_KEY='WRI_EXPIRY_DAYS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('WRI_EXPIRY_DAYS', '3', 'The default number of days after the Effective date to set the Expiry Date for a WRI when it is created for the first time', 'W' );

commit;
