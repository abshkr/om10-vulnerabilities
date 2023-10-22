/*
	add contents for WRI Status Types
    New	        Available for use
    Used	    Has been used for an unload
    No Contract	This WRI has no linked Contract
*/

delete from MSG_LOOKUP where MSG_ID in (3360,3361,3362);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3360, 'ENG', 'New');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3361, 'ENG', 'Used');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3362, 'ENG', 'No Contract');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3360, 'CHN', '已关联客户订单但尚未使用');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3361, 'CHN', '已关联客户订单并已经使用');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3362, 'CHN', '尚未与客户订单关联');

commit;

delete from ENUMITEM where ENUMTYPENAME='WRI_STATUS_TYPE';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_STATUS_TYPE', 0, 'N', 3360);   -- N: new
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_STATUS_TYPE', 1, 'U', 3361);   -- U: used
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_STATUS_TYPE', 2, 'I', 3362);   -- I: idle

commit;


-- Add VIEW for WRI Status Types

CREATE OR REPLACE VIEW WRI_STATUS_TYPES
(WRI_STATUS_ID, WRI_STATUS_CODE, WRI_STATUS_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO WRI_STATUS_ID
	, ENUMITEM.ENUM_CODE WRI_STATUS_CODE
	, MSG_GLBL.MESSAGE WRI_STATUS_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='WRI_STATUS_TYPE';

/

commit;
