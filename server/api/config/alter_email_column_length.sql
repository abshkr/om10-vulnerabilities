/*
    Increase the size of email columns from 256 bytes to 512 bytes
*/

alter table COMPANYS modify CMPY_REPORT_RECEIVERS VARCHAR2(512);
alter table REPORT_CMPY modify RPT_EMAIL VARCHAR2(512);

/*
    define the max length allowed for email columns
    Name                 Table       Column                 ClnLen   Site Config Code        CfgLen  DefLen  Frontend Variable
    Company Email        COMPANYS    CMPY_REPORT_RECEIVERS  512      SITE_MAXLEN_EMAIL       512     512     maxLengthEmail
    Report Email         REPORT_CMPY RPT_EMAIL              512      SITE_MAXLEN_EMAIL       512     512     maxLengthEmail
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MAXLEN_EMAIL';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MAXLEN_EMAIL', 512, 'Email Address Maximum Length (64~512)', NULL );

commit;
