-- alter table PRODUCT_MVMNTS drop column PMV_SRC_BASE;
-- alter table PRODUCT_MVMNTS drop column PMV_DST_BASE;


-- Add new columns PMV_SRC_BASE and PMV_DST_BASE in table PRODUCT_MVMNTS to store from and to base products in tank transfer product movement
alter table PRODUCT_MVMNTS add PMV_SRC_BASE VARCHAR2(20);
alter table PRODUCT_MVMNTS add PMV_DST_BASE VARCHAR2(20);

-- may need to populate the new fields with the value in PMV_PRDCTLNK
update PRODUCT_MVMNTS set PMV_SRC_BASE = PMV_PRDCTLNK, PMV_DST_BASE = NULL where PMV_SRCTYPE = 3 and PMV_DSTTYPE != 3;
update PRODUCT_MVMNTS set PMV_SRC_BASE = NULL, PMV_DST_BASE = PMV_PRDCTLNK where PMV_SRCTYPE != 3 and PMV_DSTTYPE = 3;
update PRODUCT_MVMNTS set PMV_SRC_BASE = PMV_PRDCTLNK where PMV_SRCTYPE = 3 and PMV_DSTTYPE = 3 and PMV_SRC_BASE is NULL;
update PRODUCT_MVMNTS set PMV_DST_BASE = PMV_PRDCTLNK where PMV_SRCTYPE = 3 and PMV_DSTTYPE = 3 and PMV_DST_BASE is NULL;

-- Add new column PMV_MONITOR in table PRODUCT_MVMNTS to store the monitoring object in the product movement
-- Its vaule can be either S (Source) or D (Destination)
alter table PRODUCT_MVMNTS add PMV_MONITOR VARCHAR2(30);

-- may need to populate the new fields with the value in PMV_PRDCTLNK
update PRODUCT_MVMNTS set PMV_MONITOR = 'S' where PMV_SRCTYPE = 3 and PMV_DSTTYPE != 3;
update PRODUCT_MVMNTS set PMV_MONITOR = 'D' where PMV_SRCTYPE != 3 and PMV_DSTTYPE = 3;
update PRODUCT_MVMNTS set PMV_MONITOR = 'S' where PMV_SRCTYPE = 3 and PMV_DSTTYPE = 3 and PMV_MONITOR is NULL;
