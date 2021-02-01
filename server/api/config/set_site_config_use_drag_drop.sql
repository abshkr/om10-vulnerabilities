/*
    define the SITE_USE_DRAG_DROP for usage of Drag&Drop feature in Omega system
    Y: Enable the Drag&Drop feature in Omega system
    N: Disable the Drag&Drop feature in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_DRAG_DROP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_DRAG_DROP', 'N', 'Use Drag and Drop in Omega system', NULL );

commit;
