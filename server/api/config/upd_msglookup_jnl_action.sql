-- RECORD_ALTERED = 1872
update MSG_LOOKUP set MESSAGE = '[%] 修改 [%] 记录 [%]' where MSG_ID = 1872 and LANG_ID = 'CHN';
update MSG_LOOKUP set MESSAGE = '[%] altered [%] record [%]' where MSG_ID = 1872 and LANG_ID = 'ENG';
-- RECORD_ADD = 1873
update MSG_LOOKUP set MESSAGE = '[%] 新增 [%] 记录 [%]' where MSG_ID = 1873 and LANG_ID = 'CHN';
update MSG_LOOKUP set MESSAGE = '[%] added [%] record [%]' where MSG_ID = 1873 and LANG_ID = 'ENG';
-- RECORD_DELETE = 1874
update MSG_LOOKUP set MESSAGE = '[%] 删除 [%] 记录 [%]' where MSG_ID = 1874 and LANG_ID = 'CHN';
update MSG_LOOKUP set MESSAGE = '[%] deleted [%] record [%]' where MSG_ID = 1874 and LANG_ID = 'ENG';
/*
-- RECORD_ADDED = 22
update MSG_LOOKUP set MESSAGE = '[%] 新增 [%] 记录 [%]: [%]' where MSG_ID = 22 and LANG_ID = 'CHN';
update MSG_LOOKUP set MESSAGE = '[%] added [%] record with [%]: [%]' where MSG_ID = 22 and LANG_ID = 'ENG';
-- RECORD_CHANGED = 23
update MSG_LOOKUP set MESSAGE = '[%] 改变 [%] 记录 [%] [%] [%] 到 [%]' where MSG_ID = 22 and LANG_ID = 'CHN';
update MSG_LOOKUP set MESSAGE = '[%] changed [%] of record [%] with [%]  [%] to [%]' where MSG_ID = 22 and LANG_ID = 'ENG';
-- RECORD_DELETED = 24;
update MSG_LOOKUP set MESSAGE = '[%] 删除 [%] 记录 [%]: [%]' where MSG_ID = 22 and LANG_ID = 'CHN';
update MSG_LOOKUP set MESSAGE = '[%] deleted [%] record with [%]: [%]' where MSG_ID = 22 and LANG_ID = 'ENG';
*/

commit;
