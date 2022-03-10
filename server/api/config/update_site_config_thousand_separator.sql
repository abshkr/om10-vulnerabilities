/*
    update  to make it editable in front-end Configuration >> General		
*/

update SITE_CONFIG set CONFIG_REQUIRED_BY_GUI='R' where CONFIG_KEY='SITE_DEC_TH_SEPERATORS';

commit;
