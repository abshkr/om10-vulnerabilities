/*
    define the SITE_LDAP_ENABLED to enable the LDAP authentication mode in Omega system
    Y: enabled, the option "LDAP Authentication" will be visible or enabled in Login screen
    N: disabled, the option "LDAP Authentication" will be hidden or disabled in Login screen
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_LDAP_ENABLED';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_LDAP_ENABLED', 'N', 'Enable the LDAP authentication mode', NULL );

commit;


/*
    The following settings define the server, username and password of an Active Directory account.
    However, it can manage one server only. 
    To make multi-server available for Omega, we may need to create a table to store and manage the accounts (create_auth_servers.sql)
*/

/*
    define the SITE_LDAP_SERVER to store the LDAP authentication server IP
*/
/* delete from SITE_CONFIG where CONFIG_KEY='SITE_LDAP_SERVER';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_LDAP_SERVER', '', 'LDAP authentication server IP', NULL );

commit;
 */
/*
    define the SITE_LDAP_USERNAME to store the LDAP authentication server username
*/
/* delete from SITE_CONFIG where CONFIG_KEY='SITE_LDAP_USERNAME';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_LDAP_USERNAME', '', 'LDAP authentication server username', NULL );

commit; */

/*
    define the SITE_LDAP_PASSWORD to store the LDAP authentication server password
*/
/* delete from SITE_CONFIG where CONFIG_KEY='SITE_LDAP_PASSWORD';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_LDAP_PASSWORD', '', 'LDAP authentication server password', NULL );

commit; */
