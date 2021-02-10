-- STRAPS
-- add new column STRAP_TYPE to store the type of strappings: 0, product level; 1, water level.
-- make its default value ZERO so that the existing data will not be affected.
-- add an enum STRAP_TYPES for this column.
alter table STRAPS add STRAP_TYPE NUMBER(1) DEFAULT 0;

