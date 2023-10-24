/*
	add contents for WRI ID Stats: Assigned, In-Transit, Open, and Rejected
*/

delete from MSG_LOOKUP where MSG_ID in (3370,3371,3372, 3373);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3370, 'ENG', 'Assigned');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3371, 'ENG', 'In-Transit');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3372, 'ENG', 'Open');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3373, 'ENG', 'Rejected');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3370, 'CHN', '已赋值');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3371, 'CHN', '运输中');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3372, 'CHN', '已开放');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3373, 'CHN', '已拒绝');

commit;

delete from ENUMITEM where ENUMTYPENAME='WRI_ID_STAT';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 0, 'A', 3370);   -- A: Assigned
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 1, 'T', 3371);   -- T: In-Transit
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 2, 'O', 3372);   -- O: Open
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 3, 'R', 3373);   -- R: Rejected

commit;


-- Add VIEW for WRI Status Types

CREATE OR REPLACE VIEW WRI_ID_STATS
(WRI_ID_STAT_ID, WRI_ID_STAT_CODE, WRI_ID_STAT_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO WRI_ID_STAT_ID
	, ENUMITEM.ENUM_CODE WRI_ID_STAT_CODE
	, MSG_GLBL.MESSAGE WRI_ID_STAT_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='WRI_ID_STAT';

/

commit;
