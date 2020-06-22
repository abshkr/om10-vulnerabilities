import sys, string
from lxml import etree

import utils

def edi_dc40(parent_node, source_dom):
	edi_dc40 = etree.SubElement(parent_node, 'EDI_DC40')
	edi_dc40.set('SEGMENT', '1')
	utils.create_empty_nodes(edi_dc40,
		['TABNAM','MANDT','DOCNUM','DOCREL','STATUS','DIRECT','OUTMOD','EXPRSS','TEST','IDOCTYP','CIMTYP',
		 'MESTYP','MESCOD','MESFCT','STD','STDVRS','STDMES','SNDPOR','SNDPRT','SNDPFC','SNDPRN','SNDSAD',
		 'SNDLAD','RCVPOR','RCVPRT','RCVPFC','RCVPRN','RCVSAD','RCVLAD','CREDAT','CRETIM','REFINT','REFGRP',
		 'REFMES','ARCKEY','SERIAL'
		])

	return edi_dc40


