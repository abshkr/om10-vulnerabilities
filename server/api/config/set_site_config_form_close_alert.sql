/*
    define the SITE_FORM_CLOSE_ALERT for whether to alert the user when a form is about to close
    Y: Alert the user when a form is about to close
    N: Do not alert the user when a form is about to close
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_FORM_CLOSE_ALERT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_FORM_CLOSE_ALERT', 'N', 'Alert the user when a form is about to close', NULL );

commit;
