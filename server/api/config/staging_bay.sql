/*
    define the SITE_USE_STAGING_BAY to determine whether the Staging Bay is enabled for the site
    Y: enable the Staging Bay for the site
    N: disable the Staging Bay for the site
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_STAGING_BAY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_STAGING_BAY', 'Y', 'Enable the Staging Bay for the site', NULL );

commit;


/*
    define the SITE_CMPY_LOAD_OPTIONS_DEFAULT to set the default value of the company load options:
    a. it is the STRING value contains 8 characters/bytes;
    b. each character/byte has the value 0, 1, 2, or 3
        0 - No check
        1 - To restrict loading at Loading bays to Normal loads only.
        2 - To restrict loading at Loading bays to Pickup loads only.
        3 - To enable loading at Loading bays to both Normal and Pickup loads.
    c. each character/byte represents the loading option of a company type:
        byte1: SITE MANAGER
        byte2: SUPPLIER
        byte3: CARRIER
        byte4: CUSTOMER
        byte5: DRAWER
        byte6: ISSUER
        byte7: EMPLOYER
        byte8: HOST
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CMPY_LOAD_OPTIONS_DEFAULT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CMPY_LOAD_OPTIONS_DEFAULT', '00000000', 'The default value of the company load options when Staging Bay enabled', NULL );

commit;


/*
    define the SITE_CMPY_LOAD_OPTIONS_EDITABLE to set the editibility of company load options:
    a. it is the STRING value contains 8 characters/bytes;
    b. each character/byte has the value 0 or 1
        0 - not editable
        1 - editable
    c. each character/byte represents the editability of the loading option  of a company type:
        byte1: SITE MANAGER
        byte2: SUPPLIER
        byte3: CARRIER
        byte4: CUSTOMER
        byte5: DRAWER
        byte6: ISSUER
        byte7: EMPLOYER
        byte8: HOST
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CMPY_LOAD_OPTIONS_EDITABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CMPY_LOAD_OPTIONS_EDITABLE', '01001000', 'Set the editibility of company load options when Staging Bay enabled', NULL );

commit;
