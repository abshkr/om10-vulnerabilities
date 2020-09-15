/*
    define the messages for special movement status
    0: Entering
    1: Completed
    2: Reversed
*/

delete from MSG_LOOKUP where MSG_ID in (3010, 3011, 3012);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3010, 'ENG', 'Entering');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3011, 'ENG', 'Completed');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3012, 'ENG', 'Reversed');
	
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3010, 'CHN', '信息输入中');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3011, 'CHN', '已完成');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3012, 'CHN', '已还原');

commit;
