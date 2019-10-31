/*
	add contents for Partner Types
*/

insert into msg_lookup values(3051, 'CHN', '买方');
insert into msg_lookup values(3051, 'ENG', 'Sold To');
insert into msg_lookup values(3052, 'CHN', '接货方');
insert into msg_lookup values(3052, 'ENG', 'Ship To');
insert into msg_lookup values(3053, 'CHN', '承运方');
insert into msg_lookup values(3053, 'ENG', 'Carrier');

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('PARTNER_TYPE', 1, 'AG', 3051);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('PARTNER_TYPE', 2, 'WE', 3052);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('PARTNER_TYPE', 3, 'SP', 3053);

commit;


-- Add VIEW for Partner Types

CREATE OR REPLACE VIEW PARTNER_TYPES
(PARTNER_TYPE_ID, PARTNER_TYPE_CODE, PARTNER_TYPE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO PARTNER_TYPE_ID
	, ENUMITEM.ENUM_CODE PARTNER_TYPE_CODE
	, MSG_GLBL.MESSAGE PARTNER_TYPE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='PARTNER_TYPE';

/

commit;

