/*
    define the max length allowed for certain columns
    Name                 Table       Column          ClnLen   Site Config Code        CfgLen  DefLen  Frontend Variable
    Order Reference Code CUST_ORDER  ORDER_REF_CODE  32       SITE_MAXLEN_ORDREFCODE  16      16      maxLengthOrderRefCode
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_ORDREFCODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_ORDREFCODE', 16, 'Order Reference Code Maximum Length (16~32)', NULL );

commit;
