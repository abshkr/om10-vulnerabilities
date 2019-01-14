

-- Need a global flag to turn on or off the feature of ensuring that the quantity of product delivered is always less than or equal to the Ordered Quantity, the Safefill and the Capacity
delete from SITE_CONFIG where CONFIG_KEY='SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP', 'Y', 'Determine whether it is requred to check the capacity limiting of loads.', NULL );

commit;


-- Need a global flag to turn on or off the feature of determining base product quantities based on recipes when blending is performed externally
delete from SITE_CONFIG where CONFIG_KEY='SITE_EXTERNAL_BLENDING_ALLOWED';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_EXTERNAL_BLENDING_ALLOWED', 'Y', 'Determine whether it is requred to determine base product quantities based on recipes when blending is performed externally.', NULL );

commit;


-- Add a new classification called ¡°Bitumen¡±, this should be selectable as per other Product Classifications
/*
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (0,'Undefined',100000,100000,0,-400,500);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (1,'Jet Fuels/Kerosines',775,840,2,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (2,'Gasolines',653,820,1,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (3,'Lubricating oils',861,940,1,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (4,'Diesel oils/Fuel oils/Heating oils',800,1075,1,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (5,'Crude oil',770,990,5,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (6,'Additive',0,2000,3,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (7,'Ethanol/Water',0,1,4,-20,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (8,'L.P.G.',0,700,1,-300,200);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (9,'Individual/Special Petroleum Distillate',0,2000,3,null,null);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (10,'No Volume adjustment for temperature',0,0,6,null,null);
Insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (11,'Reported Additive',0,2000,0,null,null);
*/
-- not sure about the value of BCLASS_VCF_ALG for Bitumen
insert into BASECLASS (BCLASS_NO,BCLASS_DESC,BCLASS_DENS_LO,BCLASS_DENS_HI,BCLASS_VCF_ALG,BCLASS_TEMP_LO,BCLASS_TEMP_HI) values (12,'Bitumen',500,1500,5,-25,275);

commit;


-- Add a new ASTM Table D4311 ¨C Standard Practice for Determining Asphalt Volume Correction to a Base Temperature.
/*
COMPENSATION_MTHD	0	3039
COMPENSATION_MTHD	1	3040
COMPENSATION_MTHD	2	3041
COMPENSATION_MTHD	3	3042
COMPENSATION_MTHD	4	3043
COMPENSATION_MTHD	5	3044

3044	CHN	OIML_ETHANOL
3044	ENG	OIML_ETHANOL
3043	CHN	ASTM_C_OF_E
3043	ENG	ASTM_C_OF_E
3042	CHN	ASTM_API
3042	ENG	ASTM_API
3041	CHN	ASTM_DENSITY
3041	ENG	ASTM_DENSITY
3040	CHN	NO_COMPENSTN
3040	ENG	NO_COMPENSTN
3039	CHN	UNSPECIFIED
3039	ENG	UNSPECIFIED
*/
insert into MSG_LOOKUP ( MSG_ID, LANG_ID, MESSAGE ) values ( 3048, 'CHN', 'ASTM Table D4311' );
insert into MSG_LOOKUP ( MSG_ID, LANG_ID, MESSAGE ) values ( 3048, 'ENG', 'ASTM Table D4311' );

commit;

insert into ENUMITEM ( ENUMTYPENAME, ENUM_NO, ENUM_TMM ) values ( 'COMPENSATION_MTHD', 6, 3048 );

commit;


-- add new column as a falg for Limit Preset Mass QTY to Capacity @ Hot temperature
alter table 
	BASE_PRODS
	add
	BASE_LIMIT_PRESET_HT	NUMBER(1);

commit;
	

-- In the Drawer Product Screen 3 new fields are added for HOT TEMPERATURE. (as shown below)

-- 1. Check Hot Litres (tickbox)
-- 		a. Not User settable
--  	b. This will automatically be checked if any Base Products has the flag ¡°Limit Preset Mass QTY to Capacity @ Hot temperature¡± to Yes
alter table 
	PRODUCTS 
	add
	PROD_CHECK_HOT_VOLUME	NUMBER(1);

-- 2. Drawer Product Density @15C [Default: 1000 kg/m3]
--		If Check Hot Litres then the User can manually add or modify this value. Note this value is only used for estimating the HOT litres
alter table 
	PRODUCTS 
	add
	PROD_15_DENSITY	FLOAT;

-- 3. Drawer Product HOT Temp [Default 15C]
--		If Check Hot Litres then the User can manually add or modify this value. Note this value is only used for estimating the HOT litres
alter table 
	PRODUCTS 
	add
	PROD_HOT_TEMP	FLOAT;

commit;



-- In the Companies, Special Actions, Supplier Company special Actions TAB there will be a new switch and a new value field.

-- 1. Link to second Drawer Company ¨C Yes/No (user selectable)
delete from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER_FLAG';
commit;

insert into COMPANY_CONFIG 
( 
	CMPY_CODE
	, CONFIG_KEY
	, CONFIG_VALUE
	, CONFIG_COMMENT
) 
select 
	CMPY_CODE
	, 'CMPY_2ND_DRAWER_FLAG'
	, 'N'
	, 'Link to second Drawer Company (Yes/No)' 
from COMPANYS 
where (bitand(CMPY_TYPE,16)<>0)
;

commit;

-- 2. Linked Drawer Company
--       a. When ¡°Link to second Drawer company¡± = No then
--            Linked Drawer Company is blank and greyed out, no user input possible
--       b. When ¡°Link to second Drawer company¡± = Yes then
--            Linked Drawer Company is available for input by dropdown list from existing Companies that are drawers only
delete from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER';
commit;

insert into COMPANY_CONFIG 
( 
	CMPY_CODE
	, CONFIG_KEY
	, CONFIG_VALUE
	, CONFIG_COMMENT
) 
select 
	CMPY_CODE
	, 'CMPY_2ND_DRAWER'
	, ''
	, 'Linked Drawer Company' 
from COMPANYS 
where (bitand(CMPY_TYPE,16)<>0)
;

commit;
	

-- In the Drawer Product Screen 3 new fields are added for EXTERNAL BLENDIG. (as shown below)

-- 1. Check the flag of Link to second Drawer company (tickbox)
-- 		 a. For a NON Linked Drawer the check box is not ticked and the Linked company is greyed out
--  	 b. For a Linked Drawer a new field appears and it allows the User to pick from a dropdown list of Drawer products available from the Linked Drawer Company
alter table 
	PRODUCTS 
	add
	PROD_CHECK_2ND_DRAWER	NUMBER(1);

-- 2. Linked Drawer Company
alter table 
	PRODUCTS 
	add
	PROD_2ND_DRAWER	   VARCHAR2(16);

-- 3. Linked Drawer Product
alter table 
	PRODUCTS 
	add
	PROD_2ND_PRODUCT	VARCHAR2(36);

commit;


	