-- DROP TABLE OWNER_TRSA_REASONS;

/*
  add a table OWNER_TRSA_REASONS to handle base product ownership transaction reason codes
*/

CREATE TABLE OWNER_TRSA_REASONS 
(	
    OTR_ID                    NUMBER(9,0) NOT NULL, 
    OTR_CODE                  VARCHAR2(100 BYTE),
    OTR_TEXT                  VARCHAR2(200 BYTE) NOT NULL,
    OTR_TYPE                  NUMBER(2,0) DEFAULT 2 NOT NULL,
    OTR_FLAG                  NUMBER(1,0)
);

ALTER TABLE OWNER_TRSA_REASONS
ADD CONSTRAINT OWNER_TRSA_REASONS_PK PRIMARY KEY (OTR_ID);


/*
  change the type of the column REASON from NUMBER(2,0) to NUMBER(9,0)
*/
ALTER TABLE PRODOWNSHIP_TRANSACT MODIFY REASON NUMBER(9,0);



