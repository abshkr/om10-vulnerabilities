-- alter table CLOSEOUT_TANK drop column TANK_BASE;
-- alter table CLOSEOUT_TANK drop column TANK_BASENAME;
-- alter table CLOSEOUT_METER drop column METER_BASE;
-- alter table CLOSEOUT_METER drop column METER_BASENAME;


-- Add new columns TANK_BASECODE and TANK_BASENAME in table CLOSEOUT_TANK to store the base product code and name at the specific closeout time
alter table CLOSEOUT_TANK add TANK_BASECODE VARCHAR2(20);
alter table CLOSEOUT_TANK add TANK_BASENAME VARCHAR2(40);

-- Add new columns METER_BASECODE and METER_BASENAME in table CLOSEOUT_METER to store the base product code and name at the specific closeout time
alter table CLOSEOUT_METER add METER_BASECODE VARCHAR2(20);
alter table CLOSEOUT_METER add METER_BASENAME VARCHAR2(40);
