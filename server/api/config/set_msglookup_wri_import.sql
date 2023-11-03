/*
    define the messages for WRI import
*/

delete from MSG_LOOKUP where MSG_ID in (3380);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3380, 'ENG', 'WRI data imported by %');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3380, 'CHN', '废品记录编号数据由用户%上传');

commit;
