/*
    define the WRI_PARTIAL_MATCH for whether to filter WRI number with partial or complete match
	Y	Allows driver to enter only a part of the numeric included in the WRI number, minimum 2 digits
	N	Requires the driver to enter the complete numeric sequence in the WRI number 
*/
delete from SITE_CONFIG where CONFIG_KEY='WRI_PARTIAL_MATCH';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('WRI_PARTIAL_MATCH', 'N', 'Allows driver to enter only a part of the numeric included in the WRI number, minimum 2 digits', 'W' );

commit;
