/*
    A new feature was added on Company screen in OM5K-9091:     
    when a type is unticked, system will check if this type of company has child records, 
    and will stop it from being unticked if the children are found.
 
    This is to prevent the user from unticking company type accidentally while these company types have been used in child records 
    such as tankers, equipment, schedule, etc. In the past, when it happened, the SQLS involving the company types usually return 
    less records than it should do.

    If the customer does not want this feature at all, here is a quick fix for it:
    Go to the folder “…api/config”, you should be able to find a file with the name “childTableColumns.json”, 
    change its name to “childTableColumns2.json”.

    Since all the relationship between table COMPANYS and its child tables are defined in this file, system will not find any children to check 
    if it cannot locate the file. In that way, the type unticking can be done without warning as before .

    In long term, we can make the following enhancement:
        1. Add a site configuration SITE_TYPE_UNTICK_CHECK to enable or disable this feature on ALL types
        2. Add the following site configurations to control the individual type independently
            SITE_TYPE_UNTICK_CHECK_1MANAGER - Site Manager type
            SITE_TYPE_UNTICK_CHECK_2SUPPLIER - Supplier type
            SITE_TYPE_UNTICK_CHECK_3CARRIER - Carrier type
            SITE_TYPE_UNTICK_CHECK_4CUSTOMER - Customer type
            SITE_TYPE_UNTICK_CHECK_5DRAWER - Drawer type
            SITE_TYPE_UNTICK_CHECK_6ISSUER - Issuer type
            SITE_TYPE_UNTICK_CHECK_7EMPLOYER - Employer type
            SITE_TYPE_UNTICK_CHECK_8HOST - Host type
        3. If this feature is enabled, use a site configuration SITE_TYPE_UNTICK_FORCED to decide if allowing user to untick 
            even if the child records found.
        4. ada new tab "Company Types" in Configuration screen which is accessible only by user 9999
 
    All above site configuration settings have boolean values Y and N
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK';               -- enable or disable to check if the type of company has the child records when any of types is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_1MANAGER';       -- enable or disable to check if the site manager company has the child records when the site manager type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_2SUPPLIER';      -- enable or disable to check if the supplier company has the child records when the supplier type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_3CARRIER';       -- enable or disable to check if the carrier company has the child records when the carrier type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_4CUSTOMER';      -- enable or disable to check if the customer company has the child records when the customer type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_5DRAWER';        -- enable or disable to check if the drawer company has the child records when the drawer type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_6ISSUER';        -- enable or disable to check if the issuer company has the child records when the issuer type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_7EMPLOYER';      -- enable or disable to check if the employer company has the child records when the employer type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_CHECK_8HOST';          -- enable or disable to check if the host company has the child records when the host type is unticked
delete from SITE_CONFIG where CONFIG_KEY='SITE_TYPE_UNTICK_FORCED';              -- enable or disable to allow the user to untick the type even if the type of company has the child records

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK', 'N', 'Check if the type of company has the child records when any of types is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_1MANAGER', 'N', 'Check if the site manager company has the child records when the site manager type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_2SUPPLIER', 'N', 'Check if the supplier company has the child records when the supplier type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_3CARRIER', 'N', 'Check if the carrier company has the child records when the carrier type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_4CUSTOMER', 'N', 'Check if the customer company has the child records when the customer type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_5DRAWER', 'N', 'Check if the drawer company has the child records when the drawer type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_6ISSUER', 'N', 'Check if the issuer company has the child records when the issuer type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_7EMPLOYER', 'N', 'Check if the employer company has the child records when the employer type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_CHECK_8HOST', 'N', 'Check if the host company has the child records when the host type is unticked', 'U' );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_TYPE_UNTICK_FORCED', 'N', 'Allow the user to untick the type even if the type of company has the child records', 'U' );

commit;

