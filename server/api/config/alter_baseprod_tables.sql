/*
    Add new column BASE_GAINLOSS_UNIT in table BASE_PRODS to store the unit mode for the management of "Mass Based Tolerance - Special Movements - Gain/Loss"
    0: Volume Unit
    1: Mass Unit
*/
alter table BASE_PRODS add BASE_GAINLOSS_UNIT NUMBER(2) DEFAULT 0;
