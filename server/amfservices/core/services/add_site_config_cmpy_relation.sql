

-- Need a global flag to turn on or off the Company Relation button and screen
delete from SITE_CONFIG where CONFIG_KEY='SITE_COMPANY_RELATION_ALLOWED';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_COMPANY_RELATION_ALLOWED', 'Y', 'Determine whether the Company Relation screen is enabled.', NULL );
commit;

-- Define the default parent company roles in Company Relation screen
delete from SITE_CONFIG where CONFIG_KEY='SITE_COMPANY_RELATION_PARENT_ROLES';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_COMPANY_RELATION_PARENT_ROLES', '1', 'The default parent company roles available to choose', NULL );
commit;

-- Define the default child company roles in Company Relation screen
delete from SITE_CONFIG where CONFIG_KEY='SITE_COMPANY_RELATION_CHILD_ROLES';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_COMPANY_RELATION_CHILD_ROLES', '2,6', 'The default child company roles available to choose', NULL );
commit;
