#!/usr/bin/python

import sys, string
from lxml import etree



def __save(xmldoc, to_file):
	resstr = __rename(xmldoc,
				{'ns0_toberenamed' : '_-DS1_-TSW_C_OILTKT02_EXT1',
			 	 'ns0_xmlns_toberenamed' : 'xmlns:ns0',
				 'gextdel_toberenamed' : '_-DS1_-TSW_C_GEXTDEL'
				})

	xmlhdr = '<?xml version="1.0" encoding="UTF-8"?>'
	data_str = xmlhdr + '\n' + resstr
	with open(to_file, "w") as ofile:
		ofile.write(data_str)

def __create_empty_nodes(node, name_list):
	for nn in name_list:
		etree.SubElement(node, nn)

def __retrieve(node, path, defaultval, valueOnly=True):
	try:
		if valueOnly:
			res = node.find(path).text
		elif not valueOnly:
			res = node.xpath(path)

		if res is None:
			return defaultval
		else:
			return res
	except Exception as err:
		return defaultval


def __rename(xmltree, rename_list):
	""" Rename the xml node name as per Shell's requirement. The xml node name they
		wanted violates xml rules. Therefore, cannot be done directly when the node
		was first created in the DOM.
	"""

	str = etree.tostring(xmltree, pretty_print=True).decode()
	for item in rename_list:
		str = string.replace(str, item, rename_list[item])
	return str


if __name__ == "__main__":

	msg_str = ''
	intree = None
	outtree = None
	try:
		data_file = sys.argv[1]
		dest_file = sys.argv[2]
		print('argv1',data_file)
		print('argv2',dest_file)

	except Exception as err:
		raise

	parser = etree.XMLParser(remove_blank_text=True)
	intree = etree.parse(data_file, parser).getroot()


	outtree = etree.Element('ns0_toberenamed')
	outtree.set('ns0_xmlns_toberenamed', 'http://www.sap.com/schemas/xml/DS1_F_TSW_C_OILTKT02_EXT1')
	idoc = etree.SubElement(outtree, 'IDOC')
	idoc.set('BEGIN', '1')

	edi_dc40 = etree.SubElement(idoc, 'EDI_DC40')
	edi_dc40.set('SEGMENT', '1')
	__create_empty_nodes(edi_dc40,
		['TABNAM','MANDT','DOCNUM','DOCREL','STATUS','DIRECT','OUTMOD','EXPRSS','TEST','IDOCTYP','CIMTYP',
		 'MESTYP','MESCOD','MESFCT','STD','STDVRS','STDMES','SNDPOR','SNDPRT','SNDPFC','SNDPRN','SNDSAD',
		 'SNDLAD','RCVPOR','RCVPRT','RCVPFC','RCVPRN','RCVSAD','RCVLAD','CREDAT','CRETIM','REFINT','REFGRP',
		 'REFMES','ARCKEY','SERIAL'
		])
	edi_dc40.find('DIRECT').text = '1'
	edi_dc40.find('SNDPOR').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_OM_PORT', '')
	edi_dc40.find('SNDPRT').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_OM_PRTNR_TYP', '')
	edi_dc40.find('SNDPRN').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_OM_PRTNR_NR', '')
	edi_dc40.find('RCVPOR').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_HST_PORT', '')
	edi_dc40.find('RCVPRT').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_HST_PRTNR_TYP', '')
	edi_dc40.find('RCVPRN').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_HST_PRTNR_NR', '')
	edi_dc40.find('REFINT').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_TKT', '')
	edi_dc40.find('REFGRP').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_HEADER_INFO/SGB_TRM_LOC_CODE', '')
	edi_dc40.find('REFMES').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_MSG_REF', '')
	edi_dc40.find('ARCKEY').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_ARCHIVE_KEY/SGB_TKT_ARCH_KEY_1', '') \
			+ __retrieve(intree, 'SGB_TKT_HDR/SGB_ARCHIVE_KEY/SGB_TKT_SEP', '') \
			+ __retrieve(intree, 'SGB_TKT_HDR/SGB_ARCHIVE_KEY/SGB_DATE_TIME_2', '') \
			+ __retrieve(intree, 'SGB_TKT_HDR/SGB_ARCHIVE_KEY/SGB_TKT_SEP_1', '') \
			+ __retrieve(intree, 'SGB_TKT_HDR/SGB_ARCHIVE_KEY/SGB_TKT', '') \
			+ __retrieve(intree, 'SGB_TKT_HDR/SGB_ARCHIVE_KEY/SGB_TKT_ARCH_FILLER', '')



	e1oijtkth_i = etree.SubElement(idoc, 'E1OIJTKTH_I')
	e1oijtkth_i.set('SEGMENT', '1')
	__create_empty_nodes(e1oijtkth_i,
		['TICKETNR','TICKET_VERSION','TICKET_PURPOSE','TICKET_TYPE','TPLST','TSYST','CARRIER','SHIPPER',
		 'ERNAM','CREATION'
		])
	e1oijtkth_i.find('TICKETNR').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_NUM', '')
	e1oijtkth_i.find('TICKET_VERSION').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_VER', '')
	e1oijtkth_i.find('TICKET_PURPOSE').text = __retrieve(intree, 'SGB_TKT_HDR/SGB_TKT_PURPOSE', '')


	num_of_items = __retrieve(intree, 'SGB_TKT_STRUCT/STD_REPEAT_COUNT', 0)
	res = __retrieve(intree, 'SGB_TKT_STRUCT/SGB_1_TKT_ITEM_DET', [], False)
	for node in res:

		e1oijtkti_i = etree.SubElement(e1oijtkth_i, 'E1OIJTKTI_I')
		e1oijtkti_i.set('SEGMENT', '1')
		__create_empty_nodes(e1oijtkti_i,
			['ITEM','SITYP','NOMNR','NOMTK','NOMIT','RECEIVER','LOCID','TANKNR','VEHICLE','MENGE',
			 'GROSQUAN','MEINS','MATNR','TANKAGE','SUPPLIER','POSTING','CONSIGNE','EVENTTYPE',
			 'EVENT_DATE','SHTYPE','VSTEL','CHARG_O','WERKS_O','LGORT_O','CHARG_D','WERKS_D',
			 'LGORT_D','TIME_ST_LOAD_STA','TIME_ST_LOAD_END','TIME_ST_LED_OT','CLOSE_NOMIT'
			])
		e1oijtkti_i.find('ITEM').text = __retrieve(node, 'SGB_TKT_ITEM_NUM', '')
		e1oijtkti_i.find('NOMTK').text = __retrieve(node, 'SGB_TKT_TECH_KEY', '')
		e1oijtkti_i.find('NOMIT').text = __retrieve(node, 'SGB_TKT_ITEM_KEY', '')
		e1oijtkti_i.find('MENGE').text = __retrieve(node, 'SGB_TKT_AMB_QTY', '')
		e1oijtkti_i.find('MEINS').text = __retrieve(node, 'SGB_UNITS_OF_MEASURE', '')
		e1oijtkti_i.find('POSTING').text = __retrieve(node, 'SGB_POST_DATE', '') \
											+ __retrieve(node, 'SGB_POST_TIME', '')
		e1oijtkti_i.find('TIME_ST_LOAD_END').text = __retrieve(node, 'SGB_LOAD_DATE', '') \
											+ __retrieve(node, 'SGB_LOAD_TIME', '')
		e1oijtkti_i.find('TIME_ST_LED_OT').text = __retrieve(node, 'SGB_DATE_UTC', '') \
											+ __retrieve(node, 'SGB_TIME_UTC', '')

		gextdel = etree.SubElement(e1oijtkti_i, 'gextdel_toberenamed')
		gextdel.set('SEGMENT', '1')
		__create_empty_nodes(gextdel,
			['OIC_DLAND1','OIC_DREGIO','OIC_DCOUNC','OIC_DCITYC','OIC_PBATCH','OIC_PTRIP',
			 'OIC_MOT','OIC_TRUCKN','OIC_LIFNR','OIA_BASELO','OID_EXTBOL','OID_MISCDL'
			])
		gextdel.find('OIC_PTRIP').text = __retrieve(node, 'SGB_TKT_TKR_CODE', '')
		gextdel.find('OID_EXTBOL').text = __retrieve(node, 'SGB_LOAD_ID', '')


		altqtys = __retrieve(node, 'SGB_ALT_QTYS_STRUCT/SGB_1_ALT_QTY_DET', [], False)
		for alt in altqtys:

			e1oijtkti_02 = etree.SubElement(e1oijtkti_i, 'E1OIJTKTI_O2')
			e1oijtkti_02.set('SEGMENT', '1')
			__create_empty_nodes(e1oijtkti_02, ['MSEHI','ADQNT','MANEN'])
			e1oijtkti_02.find('MSEHI').text = __retrieve(alt, 'SGB_TKT_ALT_QTY_UOM', '')
			e1oijtkti_02.find('ADQNT').text = __retrieve(alt, 'SGB_TKT_ALT_QTY', '')
			e1oijtkti_02.find('MANEN').text = __retrieve(alt, 'SGB_ALT_STATUS', '')



		e1oijtkti_o1_1 = etree.SubElement(e1oijtkti_i, 'E1OIJTKTI_O1_1')
		e1oijtkti_o1_1.set('SEGMENT', '1')
		__create_empty_nodes(e1oijtkti_o1_1,
			['QCI_MAN_IND','UMRSL','CMODE','FDICHEH','FDICH','COEFF','BDICHEH','BDICH','BHVALEH',
			 'BHVAL','TSTMP','TSTEH','MTTMP','MTTEH','THVAL','TDICHEH','TDICH','MTPRES','MTPRESEH',
			 'TPRED','TPREDEH','TPRHV','TPRHVEH','TTMPHV','TTMPHVEH','ATPRES','ATPRESEH','VAPRES',
			 'VAPRESEH','THVALEH','MTCOMBTMP','MTCOMBTEH','MTCOMBPRES','MTCOMBPRESEH','TSTMPCAL',
			 'TSTMPCALEH','TPREDCAL','TPREDCALEH','HYDRO','ABIND','ABFAC','MCF','BSWCN','BSWCNEH',
			 'HVCLS','HVCLS_TO','DEFAULT_GUID','CH4RATIO','N2RATIO','CO2RATIO','C2H6RATIO','C3H8RATIO',
			 'H2ORATIO','H2SRATIO','H2RATIO','CORATIO','O2RATIO','ISOC4H10RATIO','NC4H10RATIO',
			 'ISOC5H12RATIO','NC5H12RATIO','C6H14RATIO','C7H16RATIO'
			])
		e1oijtkti_o1_1.find('QCI_MAN_IND').text = __retrieve(node, 'SGB_QCI_MAN_INDR', '')
		e1oijtkti_o1_1.find('BDICHEH').text = __retrieve(node, 'SGB_QTY_DETAILS/SGB_DENS_BASE_UOM', '')
		res = __retrieve(node, 'SGB_QTY_DETAILS/SGB_DENS_BASE', '')
		e1oijtkti_o1_1.find('BDICH').text = str(int(res)/100)
		res = __retrieve(node, 'SGB_TKT_TST_TEMP', '')
		e1oijtkti_o1_1.find('TSTMP').text = str(int(res)/10)
		e1oijtkti_o1_1.find('TSTEH').text = __retrieve(node, 'SGB_TKT_TST_TEMP_UOM', '')
		res = __retrieve(node, 'SGB_QTY_DETAILS/SGB_AMB_TEMP', '')
		e1oijtkti_o1_1.find('MTTMP').text = str(int(res)/10)
		e1oijtkti_o1_1.find('MTTEH').text = __retrieve(node, 'SGB_TKT_TEMP_UOM', '')
		e1oijtkti_o1_1.find('TDICHEH').text = __retrieve(node, 'SGB_QTY_DETAILS/SGB_DENS_15_UOM', '')
		res = __retrieve(node, 'SGB_QTY_DETAILS/SGB_DENSITY_15', '')
		e1oijtkti_o1_1.find('TDICH').text = str(int(res)/100)
		e1oijtkti_o1_1.find('ABIND').text = __retrieve(node, 'SGB_AIR_BUOY', '')


	__save(outtree, dest_file)
