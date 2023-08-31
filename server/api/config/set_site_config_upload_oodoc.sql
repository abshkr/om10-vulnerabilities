/*
    define the SITE_ALLOW_UPLOAD_OO_DOC for whether to allow the upload of document for open orders
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ALLOW_UPLOAD_OO_DOC';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ALLOW_UPLOAD_OO_DOC', 'N', 'Allow to upload document against open orders', NULL );

commit;


/*
    define the SITE_FILE_EXT_OO_DOC for restrictions of the file extensions of document for open orders
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_FILE_EXT_OO_DOC';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_FILE_EXT_OO_DOC', '.doc, .docx, .xls, .xlsx, .csv, .pdf, .txt', 'Configure the file extensions allowed in open order document upload', NULL );

commit;



