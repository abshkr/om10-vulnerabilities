-- DROP TABLE WRI;

/*
A new table to store the WRI records - table WRI
it should have the following columns:
    WRI_number	            20(X)	H1B-278300-W8S
    ID_Status	            Enum	Assigned, In-Transit, Open
    Producer_Name	        60(X)	LAING O'ROURKE AUSTRALIA CONSTRUCTION PTY LIMITED
    Pickup_Location	        100(X)	77-143 Mansfield Rd, Melbourne Airport, Melbourne, Victoria, 3045, Australia
    Waste_Classification	20(X)	N120-S-RPW-Cat A
    Vehicle_Registration	10(X)	AFL989
    Contract_Number	        (same as Open Order no type)	9000023
    WRI_Effective Date	    Date	29/09/2023
    WRI_Expiry Date	        Date	2/10/2023
    WRI_Status	            Enum	New, Used, No_Contract

Note: The foreign key will not be defined to link to open order table
*/

CREATE TABLE WRI
(
    WRI_NUMBER               VARCHAR2(20)    NOT NULL,
    ID_STATUS                NUMBER(4)       DEFAULT 2,
    PRODUCER_NAME            VARCHAR2(60),
    PICKUP_LOCATION          VARCHAR2(100),
    WASTE_CLASSIFICATION     VARCHAR2(20),
    VEHICLE_REGISTRATION     VARCHAR2(10),
    CONTRACT_NUMBER          NUMBER(9),
    WRI_EFFECTIVE_DATE       DATE            DEFAULT SYSDATE NOT NULL,
    WRI_EXPIRY_DATE          DATE            DEFAULT SYSDATE+3 NOT NULL,
    WRI_STATUS               NUMBER(4)       DEFAULT 2,
    CONSTRAINT PK_WRI PRIMARY KEY(WRI_NUMBER)
);

ALTER TABLE WRI
  ADD CONSTRAINT FK_WRI_CONTRACT FOREIGN KEY (CONTRACT_NUMBER)
    REFERENCES CUST_ORDER (ORDER_NO);


COMMIT;