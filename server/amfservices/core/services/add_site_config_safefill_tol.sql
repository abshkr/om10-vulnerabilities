
/* 
	Site level settings for safefill tolerance
		SAFEFILL_TOLERANCE_QTY 20
		SAFEFILL_TOLERANCE_PERCENT 0.2
	Company level settings for safefill tolerance	
		SAFEFILL_TOLERANCE_CHECK N

*/ 


delete from SITE_CONFIG where CONFIG_KEY='SAFEFILL_TOLERANCE_QTY';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SAFEFILL_TOLERANCE_QTY', '20', 'Safefill Tolerance Quantity (0 - 10000 L)', 'R' );
commit;

delete from SITE_CONFIG where CONFIG_KEY='SAFEFILL_TOLERANCE_PERCENT';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SAFEFILL_TOLERANCE_PERCENT', '0.2', 'Safefill Tolerance Percentage (0.00 - 100.00%)', 'R' );
commit;
