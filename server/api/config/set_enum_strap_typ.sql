/*
	add contents for Strapping Data Types: Product Level or Water Level
*/

delete from MSG_LOOKUP where MSG_ID in (3180, 3181);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3180, 'ENG', 'Product Level');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3181, 'ENG', 'Water Level');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3180, 'CHN', '油品液位');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3181, 'CHN', '水液位');

commit;

delete from ENUMITEM where ENUMTYPENAME='STRAP_TYPE';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STRAP_TYPE', 0, 'P', 3180);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STRAP_TYPE', 1, 'W', 3181);

commit;


-- Add VIEW for Strapping Data Types

CREATE OR REPLACE VIEW STRAP_TYPES
(STRAP_TYPE_ID, STRAP_TYPE_CODE, STRAP_TYPE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO STRAP_TYPE_ID
	, ENUMITEM.ENUM_CODE STRAP_TYPE_CODE
	, MSG_GLBL.MESSAGE STRAP_TYPE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='STRAP_TYPE';

/

commit;
