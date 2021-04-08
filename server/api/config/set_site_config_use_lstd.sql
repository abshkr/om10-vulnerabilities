/*
    define the SITE_STD_LITRE_UNIT to specify the unit for standard volume.
    COR: L (cor)
    STD: L (std)
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_STD_LITRE_UNIT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_STD_LITRE_UNIT', 'STD', 'The sitewide unit of standard volume', NULL );

commit;

/*
    Set the unit in MSG_LOOKUP
*/
UPDATE MSG_LOOKUP 
SET MESSAGE = DECODE(
    NVL((select NVL(config_value, 'COR') from site_config where config_key='SITE_STD_LITRE_UNIT'), 'COR'),
    'COR', 'l (cor)', 'l (std)'
)
WHERE MSG_ID = 1793 and LANG_ID='ENG'; 

commit;

/*
UPDATE MSG_LOOKUP 
SET MESSAGE = '升 (标准)'
WHERE MSG_ID = 1793 and LANG_ID='CHN'; 
*/