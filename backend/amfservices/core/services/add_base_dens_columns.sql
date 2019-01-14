

-- add column BASE_DENS_LO and BASE_DENS_HI to BASE_PRODS
/*
-- drop for testing purpose
alter table BASE_PRODS drop column BASE_DENS_LO;
alter table BASE_PRODS drop column BASE_DENS_HI;
*/
alter table BASE_PRODS add BASE_DENS_LO FLOAT;
alter table BASE_PRODS add BASE_DENS_HI FLOAT;

-- the initial value is set as the one in BASECLASS, if these two columns are null or blank

update 
	BASE_PRODS bp 
set 
	bp.BASE_DENS_LO = (select bc.BCLASS_DENS_LO from BASECLASS bc where bc.BCLASS_NO=bp.BASE_CAT)
where 
	bp.BASE_DENS_LO is NULL
;

update 
	BASE_PRODS bp 
set 
	bp.BASE_DENS_HI = (select bc.BCLASS_DENS_HI from BASECLASS bc where bc.BCLASS_NO=bp.BASE_CAT)
where 
	bp.BASE_DENS_HI is NULL
;

commit;
