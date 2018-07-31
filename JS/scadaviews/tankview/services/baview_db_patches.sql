/*
	Following statements are for implemetation of Loading Bay Types
*/

-- Add enums for Loading Bay Types

insert into msg_lookup values(3100, 'ENG', 'Truck Bottom Loading');
insert into msg_lookup values(3100, 'CHN', '油槽车下装发油');
insert into msg_lookup values(3101, 'ENG', 'Truck Top Loading');
insert into msg_lookup values(3101, 'CHN', '油槽车上装发油');
insert into msg_lookup values(3102, 'ENG', 'Rail Loading');
insert into msg_lookup values(3102, 'CHN', '铁路槽车发油');
insert into msg_lookup values(3103, 'ENG', 'Ship Loading');
insert into msg_lookup values(3103, 'CHN', '油船发油');

insert into ENUMITEM values('LOAD_BAY_TYPES', 1, 3100);
insert into ENUMITEM values('LOAD_BAY_TYPES', 2, 3101);
insert into ENUMITEM values('LOAD_BAY_TYPES', 3, 3102);
insert into ENUMITEM values('LOAD_BAY_TYPES', 4, 3103);

commit;


-- Add VIEW for Loading Bay Types

CREATE OR REPLACE VIEW LOAD_BAY_TYP
(BAY_TYPE_ID, BAY_TYPE_DESC)
AS 
SELECT 
	ENUMITEM.ENUM_NO BAY_TYPE_ID
	, MSG_GLBL.MESSAGE BAY_TYPE_DESC
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='LOAD_BAY_TYPES';

/


-- add column BAY_AREA.BA_PHYSTYPE to store Loading Bay Type
/* 
ID			CODE			DESC
1			B_TRUCK			Truck Bottom Loading
2			T_TRUCK			Truck Top Loading
3			TRAIN			Rail Loading
4			SHIP			Ship Loading
*/

alter table BAY_AREA add BA_PHYSTYPE NUMBER(2) default 1;



/*
	Following statements are for implemetation of Loading Arm Types
*/

-- Add enums for Loading Arm Types

insert into msg_lookup values(3110, 'ENG', 'Bottom');
insert into msg_lookup values(3110, 'CHN', '下装式');
insert into msg_lookup values(3111, 'ENG', 'Top');
insert into msg_lookup values(3111, 'CHN', '上装式');

insert into ENUMITEM values('LOAD_ARM_TYPES', 0, 1900);
insert into ENUMITEM values('LOAD_ARM_TYPES', 1, 3110);
insert into ENUMITEM values('LOAD_ARM_TYPES', 2, 3111);

commit;



-- Add VIEW for Loading Arm Types

CREATE OR REPLACE VIEW LOAD_ARM_TYP
(ARM_TYPE_ID, ARM_TYPE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO ARM_TYPE_ID
	, MSG_GLBL.MESSAGE ARM_TYPE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='LOAD_ARM_TYPES';

/



/*
	Following statements are for implemetation of Blending Types
*/

-- Add enums for Blending Types

insert into msg_lookup values(3115, 'ENG', 'Unknown');
insert into msg_lookup values(3115, 'CHN', '未知');
insert into msg_lookup values(3116, 'ENG', 'Straight Product');
insert into msg_lookup values(3116, 'CHN', '无需调和');
insert into msg_lookup values(3117, 'ENG', 'Sidestream Blend');
insert into msg_lookup values(3117, 'CHN', '支线调和');
insert into msg_lookup values(3118, 'ENG', 'Ratio Blend');
insert into msg_lookup values(3118, 'CHN', '比例调和');
insert into msg_lookup values(3119, 'ENG', 'Sequential Blend');
insert into msg_lookup values(3119, 'CHN', '顺序调和');

insert into ENUMITEM values('BLEND_TYPES', 0, 3115);
insert into ENUMITEM values('BLEND_TYPES', 1, 3116);
insert into ENUMITEM values('BLEND_TYPES', 2, 3117);
insert into ENUMITEM values('BLEND_TYPES', 3, 3118);
insert into ENUMITEM values('BLEND_TYPES', 4, 3119);

commit;



-- Add VIEW for Blending Types

CREATE OR REPLACE VIEW BLEND_TYP
(BLEND_TYPE_ID, BLEND_TYPE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO BLEND_TYPE_ID
	, MSG_GLBL.MESSAGE BLEND_TYPE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='BLEND_TYPES';

/



-- add column BA_ARMS.BAA_BLENDTYPE to store Belnding Type
/* 
ID			CODE			NAME
0			UNKNOWN			Unknown
1			STRAIGHT		Straight Product
2			SIDESTREAM		Sidestream Blend
3			RATIO			Ratio Blend
4			SEQUENTIAL		Sequential Blend
*/

alter table BA_ARMS add BAA_BLENDTYPE NUMBER(2) default 1;

update BA_ARMS set BAA_BLENDTYPE=3 where BAA_CODE in (select stream_armcode from gui_pipenode where stream_seq>1);
commit;

