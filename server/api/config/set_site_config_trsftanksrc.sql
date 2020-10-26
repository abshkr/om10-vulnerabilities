/*
    define the SITE_TRANSFER_TANK_SOURCE for usage of Specific Gravity in tanks
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_TRANSFER_TANK_SOURCE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_TRANSFER_TANK_SOURCE', 'FROM', 'The source tank used for VCF calculation in transfer nomination', NULL );

commit;
