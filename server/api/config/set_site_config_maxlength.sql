/*
    define the max length allowed for certain columns
    Name                 Table       Column     ClnLen  Site Config Code    CfgLen  DefLen  Frontend Variable
    Tank Code            TANKS       TANK_CODE  24    SITE_MAXLEN_TANKCODE  10      10      maxLengthTankCode
    Base Product Code    BASE_PRODS  BASE_CODE  20    SITE_MAXLEN_BASECODE  20      20      maxLengthBaseCode
    Drawer Product Code  PRODUCTS    PROD_CODE  36    SITE_MAXLEN_PRODCODE  18      18      maxLengthProdCode
    Tanker Code          TANKERS     TNKR_CODE  40    SITE_MAXLEN_TNKRCODE  20      20      maxLengthTnkrCode
    Personnel Code       PERSONNEL   PER_CODE   12    SITE_MAXLEN_PSNLCODE  12      12      maxLengthPsnlCode
    Company Code         COMPANYS    CMPY_CODE  16    SITE_MAXLEN_CMPYCODE  16      16      maxLengthCmpyCode
    Customer Account     CUSTOMER    CUST_ACCT  40    SITE_MAXLEN_CUSTACCT  40      40      maxLengthCustAcct
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_TANKCODE';
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_BASECODE';
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_PRODCODE';
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_TNKRCODE';
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_PSNLCODE';
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_CMPYCODE';
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_CUSTACCT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_TANKCODE', 10, 'Tank Code Maximum Length (10~24)', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_BASECODE', 20, 'Base Product Code Maximum Length (9~20)', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_PRODCODE', 18, 'Drawer Product Code Maximum Length (9~36)', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_TNKRCODE', 20, 'Tanker Code Maximum Length (20~40)', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_PSNLCODE', 12, 'Personnel Code Maximum Length (6~12)', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_CMPYCODE', 16, 'Company Code Maximum Length (8~16)', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_CUSTACCT', 40, 'Customer Account Maximum Length (20~40)', NULL );

commit;
