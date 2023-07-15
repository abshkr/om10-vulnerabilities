/*
    Add new columns PARAMX where X is 7,8,9,10, make the length 1000 bytes
*/

alter table REPORT_CLOSEOUT_JOB add PARAM7  VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB add PARAM8  VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB add PARAM9  VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB add PARAM10 VARCHAR2(1000);

/*
    Increase the size of columns (PARAM1~6) from 32 bytes to 1000 bytes
*/


alter table REPORT_CLOSEOUT_JOB modify PARAM1 VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB modify PARAM2 VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB modify PARAM3 VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB modify PARAM4 VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB modify PARAM5 VARCHAR2(1000);
alter table REPORT_CLOSEOUT_JOB modify PARAM6 VARCHAR2(1000);

commit;
