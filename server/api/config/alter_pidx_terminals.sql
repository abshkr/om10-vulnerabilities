/*
    Add the following new columns in table TERMINAL for the feature of Petroleum Industry Data eXchange (PIDX) standards at a terminal:

    TERM_PIDX_ID:           PIDXTerminalIdentifier, example value TGB000032
    TERM_PIDX_OWNER:        PIDXTerminalOwner, example value 614
    TERM_PIDX_LOCID_TYPE:   LocationIdentifierType, example value SPLC (Source Point Location Code)
    TERM_PIDX_LOCID:        LocationIdentifier, example value 990119

    Note: All fields keep the max length to 12 Alphanumeric
*/

alter table TERMINAL add TERM_PIDX_ID VARCHAR2(12);
alter table TERMINAL add TERM_PIDX_OWNER VARCHAR2(12);
alter table TERMINAL add TERM_PIDX_LOCID_TYPE VARCHAR2(12);
alter table TERMINAL add TERM_PIDX_LOCID VARCHAR2(12);
