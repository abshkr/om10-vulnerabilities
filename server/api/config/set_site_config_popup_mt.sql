/*
    define the SITE_POPUP_MT for the mode of Manual Transactions window
    Y: use popup window to manage Manual Transactions.
    N: use tab pane to manage Manual Transactions.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_POPUP_MT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_POPUP_MT', 'N', 'Use popup window to manage Manual Transactions', NULL );

commit;
