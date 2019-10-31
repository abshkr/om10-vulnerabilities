
/*
	add new column ENUM_CODE, so the enum list can be referred not only by index but also code
*/
alter table ENUMITEM add ENUM_CODE VARCHAR2(100);


/*
	add contents for locale languages
*/

insert into msg_lookup values(3200, 'CHN', '中文 - 中国');
insert into msg_lookup values(3200, 'ENG', 'Chinese - China');
insert into msg_lookup values(3201, 'CHN', '中文 - 香港');
insert into msg_lookup values(3201, 'ENG', 'Chinese - Hong Kong');
insert into msg_lookup values(3202, 'CHN', '中文 - 新加坡');
insert into msg_lookup values(3202, 'ENG', 'Chinese - Singapore');
insert into msg_lookup values(3203, 'CHN', '中文 - 台湾');
insert into msg_lookup values(3203, 'ENG', 'Chinese - Taiwan');
insert into msg_lookup values(3204, 'CHN', '英语 - 澳大利亚');
insert into msg_lookup values(3204, 'ENG', 'English - Australia');
insert into msg_lookup values(3205, 'CHN', '英语 - 英国');
insert into msg_lookup values(3205, 'ENG', 'English - United Kingdom');
insert into msg_lookup values(3206, 'CHN', '英语 - 美国');
insert into msg_lookup values(3206, 'ENG', 'English - United States');
insert into msg_lookup values(3207, 'CHN', '法语 - 法国');
insert into msg_lookup values(3207, 'ENG', 'French - France');
insert into msg_lookup values(3208, 'CHN', '德语 - 德国');
insert into msg_lookup values(3208, 'ENG', 'German - Germany');
insert into msg_lookup values(3209, 'CHN', '印度语 - 印度');
insert into msg_lookup values(3209, 'ENG', 'Hindi - India');
insert into msg_lookup values(3210, 'CHN', '意大利语 - 意大利');
insert into msg_lookup values(3210, 'ENG', 'Italian - Italy');
insert into msg_lookup values(3211, 'CHN', '日语 - 日本');
insert into msg_lookup values(3211, 'ENG', 'Japanese - Japan');
insert into msg_lookup values(3212, 'CHN', '马来语 - 文莱');
insert into msg_lookup values(3212, 'ENG', 'Malay - Brunei');
insert into msg_lookup values(3213, 'CHN', '马来语 - 马来西亚');
insert into msg_lookup values(3213, 'ENG', 'Malay - Malaysia');
insert into msg_lookup values(3214, 'CHN', '西班牙语 - 西班牙');
insert into msg_lookup values(3214, 'ENG', 'Spanish - Spain');
insert into msg_lookup values(3215, 'CHN', '泰语 - 泰国');
insert into msg_lookup values(3215, 'ENG', 'Thai - Thailand');
insert into msg_lookup values(3216, 'CHN', '越南语 - 越南');
insert into msg_lookup values(3216, 'ENG', 'Vietnamese - Vietnam');


insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 0, 'zh_CN', 3200);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 1, 'zh_HK', 3201);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 2, 'zh_SG', 3202);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 3, 'zh_TW', 3203);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 4, 'en_AU', 3204);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 5, 'en_GB', 3205);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 6, 'en_US', 3206);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 7, 'fr_FR', 3207);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 8, 'de_DE', 3208);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES', 9, 'hi_IN', 3209);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',10, 'it_IT', 3210);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',11, 'ja_JP', 3211);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',12, 'ms_BN', 3212);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',13, 'ms_MY', 3213);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',14, 'es_ES', 3214);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',15, 'th_TH', 3215);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('LOCALE_LANGUAGES',16, 'vi_VN', 3216);


commit;


-- Add VIEW for Locale Languages

CREATE OR REPLACE VIEW LOCALE_LANGUAGES
(LOCALE_ID, LOCALE_CODE, LOCALE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO LOCALE_ID
	, ENUMITEM.ENUM_CODE LOCALE_CODE
	, MSG_GLBL.MESSAGE LOCALE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='LOCALE_LANGUAGES';

/

commit;

