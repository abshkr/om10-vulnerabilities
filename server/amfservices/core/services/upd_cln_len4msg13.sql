

-- table PARTNER
alter table PARTNER modify PRTNR_NAME1 VARCHAR2(210);
alter table PARTNER modify PRTNR_NAME2 VARCHAR2(210);
alter table PARTNER modify PRTNR_NAME3 VARCHAR2(210);
alter table PARTNER modify PRTNR_NAME4 VARCHAR2(210);
alter table PARTNER modify PRTNR_NAME5 VARCHAR2(210);

-- table DB_ADDRESS_LINE
alter table DB_ADDRESS_LINE modify DB_ADDR_LINE VARCHAR2(210);

-- table COMPANYS
alter table COMPANYS modify CMPY_NAME VARCHAR2(300);

-- table DELV_DETAILS
alter table DELV_DETAILS modify DD_INSTRUCTION VARCHAR2(420);
alter table DELV_DETAILS modify DD_LPG_REMARK VARCHAR2(420);

-- table DELV_DETAILS_ITEM
alter table DELV_DETAILS_ITEM modify DDI_ITEM_DESC VARCHAR2(300);

commit;
