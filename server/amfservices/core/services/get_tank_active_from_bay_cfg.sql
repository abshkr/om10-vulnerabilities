select tk.TANK_CODE, tk.TANK_TERMINAL, tp.TANK_ACTIVE
from
	TANKS 							tk
	, (
		select distinct 
			p.PN_TANK_TANKCODE 		as TANK_CODE
			, p.PN_TANK_TANKDEPO 	as TANK_TERMINAL
			, 1 					as TANK_ACTIVE 
		from
			PIPENODE  				p
			, STREAM_LINKS 			s
		where
		p.PN_TANK_TANKCODE is not null
		and p.PN_TANK_TANKDEPO is not null
		and (p.PN_ID = s.STREAM_LINK_DOWN or p.PN_ID = s.STREAM_LINK_UP)
	)  								tp
where
	tk.TANK_CODE = tp.TANK_CODE(+)
	and tk.TANK_TERMINAL = tp.TANK_TERMINAL(+)
;
