/*
    define the messages for load types
    0	SPECIAL
    1	PREORDER
    2	PRESCHEDULE
    3	OPEN ORDER
    4	HOST DETAILS
    5	IMPORT
*/

delete from MSG_LOOKUP where MSG_ID in (1825, 1826, 1827, 1828, 1829, 1830);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1825, 'ENG', 'SPECIAL');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1826, 'ENG', 'PREORDER');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1827, 'ENG', 'PRESCHEDULE');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1828, 'ENG', 'OPEN ORDER');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1829, 'ENG', 'HOST DETAILS');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1830, 'ENG', 'IMPORT');
	
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1825, 'CHN', '特殊货单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1826, 'CHN', '油品提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1827, 'CHN', '油仓提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1828, 'CHN', '客户开放订单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1829, 'CHN', '主机详情');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (1830, 'CHN', '油品进库');

commit;
