/*
    define the max length allowed for certain columns
    Name                 Table         Column          ClnLen   Site Config Code        CfgLen  DefLen  Frontend Variable
    SLP ID/VIN Number    TRANSP_EQUIP  SLP_ID          120      SITE_MAXLEN_SLP         40      40      maxLengthSLP
    SLP ID/VIN Number    TRANSP_EQUIP  VIN_NUMBER      120      SITE_MAXLEN_SLP         40      40      maxLengthSLP
    SLP ID/VIN Number    TANKERS       SLP_ID          120      SITE_MAXLEN_SLP         40      40      maxLengthSLP
    SLP ID/VIN Number    PERSONNEL     SLP_ID          120      SITE_MAXLEN_SLP         40      40      maxLengthSLP
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_SLP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_SLP', 40, 'SLP ID/VIN Number Maximum Length (40~120)', NULL );

commit;
