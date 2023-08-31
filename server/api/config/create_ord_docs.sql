-- DROP TABLE ORD_DOCS;

/*
A new table to store the document against the open orders - table ORD_DOCS
it should have the following columns:
    OD_ORDER_NO - the parent open order number, if null, the document belongs to all open orders
    OD_DOC_NAME - the document name
    OD_DOC_FOLDER - the relative folder
    OD_DOC_SIZE - the file size
    OD_DOC_CREATOR - the user who created/uploaded the document
    OD_DOC_CREATED - the time when the document is created/uploaded
    OD_DOC_DOWNLOADED - last time when the document is downloaded
    OD_DOC_DNLDCOUNTS - how many times are the document downloaded

Note: The foreign key will not be defined to link to open order table
*/

CREATE TABLE ORD_DOCS
(
    OD_ORDER_NO         NUMBER(9),
    OD_DOC_NAME         VARCHAR2(256),
    OD_DOC_FOLDER       VARCHAR2(256),
    OD_DOC_SIZE         FLOAT,
    OD_DOC_CREATOR      VARCHAR2(12),
    OD_DOC_CREATED      DATE            DEFAULT SYSDATE NOT NULL,
    OD_DOC_DOWNLOADED   DATE            DEFAULT SYSDATE NOT NULL,
    OD_DOC_DNLDCOUNTS   NUMBER(9)
);


ALTER TABLE ORD_DOCS
  ADD CONSTRAINT UK_ORD_DOCS UNIQUE (OD_ORDER_NO, OD_DOC_NAME);


COMMIT;