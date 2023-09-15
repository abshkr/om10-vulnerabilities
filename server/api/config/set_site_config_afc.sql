/*
Add the following site configuration settings, to be visible in the frontend:
    FSC_GATES: Y (default) or N, Should the FSC be in charge of gate comms at all times?
    RETURN_TO_SECONDARY_SECS: 60 (default), How long to wait before FSC will return to secondary after being primary.
*/
delete from SITE_CONFIG where CONFIG_KEY='FSC_GATES';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('FSC_GATES', 'Y', 'Should the FSC be in charge of gate comms at all times?', 'G' );

commit;

delete from SITE_CONFIG where CONFIG_KEY='RETURN_TO_SECONDARY_SECS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('RETURN_TO_SECONDARY_SECS', '60', 'How long to wait before FSC will return to secondary after being primary?', 'G' );

commit;
