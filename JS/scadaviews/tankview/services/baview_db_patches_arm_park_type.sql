

-- add column BA_ARMS.BAA_PARKTYPE to store a type to tell if arm has park/unpark signal
/*
0			is configured in RTC, so bayview will rely on the value from SCADAMAN
1			not configured in RTC, so bayview will treat it parked
*/

alter table BA_ARMS add BAA_PARKTYPE NUMBER(2) default 0;

update BA_ARMS set BAA_PARKTYPE=1 where BAA_BAD_LNK in (select BA_CODE from BAY_AREA where BA_PHYSTYPE=5);
commit;
