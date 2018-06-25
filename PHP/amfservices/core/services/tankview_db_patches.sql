
/*
add the new column in table BASE_PRODS for TANKVIEW.
need to add this in Base Products screen
*/
alter table BASE_PRODS add BASE_COLOR VARCHAR2(32 BYTE);


/*
add the new configuration in table SITE_CONFIG to control Tank Status functionality for TANKVIEW.
need to manage it in the Site Configuration, General section.
*/
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_TANK_STATUS_ENFORCEMENT_FLAG', 'Y', 'The Tank Status Enforcement flag', 'R' );

commit;


/*
add enums 'TANK_STATUS_TYP' for the list of Tank Status
*/
insert into msg_lookup values(3150, 'ENG', 'In Service - Not used');
insert into msg_lookup values(3150, 'CHN', '在服务中 - 储罐待命');
insert into msg_lookup values(3151, 'ENG', 'In Service - Receiving');
insert into msg_lookup values(3151, 'CHN', '在服务中 - 油品进罐');
insert into msg_lookup values(3152, 'ENG', 'In Service - Settling');
insert into msg_lookup values(3152, 'CHN', '在服务中 - 油品沉降');
insert into msg_lookup values(3153, 'ENG', 'In Service - Loading');
insert into msg_lookup values(3153, 'CHN', '在服务中 - 油品出罐');
insert into msg_lookup values(3154, 'ENG', 'In Service - Working');
insert into msg_lookup values(3154, 'CHN', '在服务中 - 储罐工作');
insert into msg_lookup values(3155, 'ENG', 'Out Of Service - Offline');
insert into msg_lookup values(3155, 'CHN', '暂停服务 - 离线');

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('TANK_STATUS_TYP', 0, 'N', 3150);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('TANK_STATUS_TYP', 1, 'R', 3151);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('TANK_STATUS_TYP', 2, 'S', 3152);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('TANK_STATUS_TYP', 3, 'L', 3153);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('TANK_STATUS_TYP', 4, 'W', 3154);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('TANK_STATUS_TYP', 5, 'O', 3155);

commit;


/*
add VIEW 'TANK_STATUS_TYP' for the list of Tank Status
*/
CREATE OR REPLACE VIEW TANK_STATUS_TYP
(TANK_STATUS_ID, TANK_STATUS_CODE, TANK_STATUS_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO TANK_STATUS_ID
	, ENUMITEM.ENUM_CODE TANK_STATUS_CODE
	, MSG_GLBL.MESSAGE TANK_STATUS_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='TANK_STATUS_TYP';

/

commit;


/*
add the new columns in table TANKS for TANKVIEW
*/
alter table TANKS add TANK_STATUS NUMBER(2) default 0;
alter table TANKS add TANK_HH_LEVEL FLOAT;
alter table TANKS add TANK_H_LEVEL FLOAT;
alter table TANKS add TANK_L_LEVEL FLOAT;
alter table TANKS add TANK_LL_LEVEL FLOAT;
alter table TANKS add TANK_UH_LEVEL FLOAT;
alter table TANKS add TANK_UL_LEVEL FLOAT;

commit;


