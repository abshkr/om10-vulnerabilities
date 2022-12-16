/*
    define the SITE_SAML_ENABLED to enable the SAML authentication mode in Omega system
    Y: enabled, the option "SAML Authentication" will be visible or enabled in Login screen
    N: disabled, the option "SAML Authentication" will be hidden or disabled in Login screen
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SAML_ENABLED';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SAML_ENABLED', 'N', 'Enable the SAML authentication mode', NULL );

commit;


/*
    The following settings define the server, username and password of an Active Directory account.
    However, it can manage one server only. 
    To make multi-server available for Omega, we may need to create a table to store and manage the accounts (create_auth_servers.sql)
*/

/*
    define the SITE_SAML_SERVER to store the SAML authentication server IP
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SAML_SERVER';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SAML_SERVER', '', 'SAML authentication server IP', NULL );

commit;

/*
    define the SITE_SAML_USERNAME to store the SAML authentication server username
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SAML_USERNAME';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SAML_USERNAME', '', 'SAML authentication server username', NULL );

commit;

/*
    define the SITE_SAML_PASSWORD to store the SAML authentication server password
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SAML_PASSWORD';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SAML_PASSWORD', '', 'SAML authentication server password', NULL );

commit;
