/*
    define the messages for user status
    0: Inactive
    1: Active
    2: Locked
    3: Deleted
*/

delete from MSG_LOOKUP where MSG_ID in (3217, 3218, 3219, 3220);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3217, 'ENG', 'INACTIVE');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3218, 'ENG', 'ACTIVE');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3219, 'ENG', 'LOCKED');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3220, 'ENG', 'DELETED');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3217, 'CHN', '冻结');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3218, 'CHN', '活跃状态');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3219, 'CHN', '已锁定');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3220, 'CHN', '已删除');

commit;
