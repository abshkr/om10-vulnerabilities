#!/usr/bin/python

import sys, string
from lxml import etree

import utils
import shell_utils



if __name__ == "__main__":

	msg_str = ''
	intree = None
	outtree = None
	try:
		data_file = sys.argv[1]
		dest_file = sys.argv[2]
	except Exception as err:
		raise

	parser = etree.XMLParser(remove_blank_text=True)
	intree = etree.parse(data_file, parser).getroot()

	outtree = etree.Element('ns0_toberenamed')
	outtree.set('ns0_xmlns_toberenamed', 'http://www.sap.com/schemas/xml/DS1_F_HM_C_OILLPD02')
	idoc = etree.SubElement(outtree, 'IDOC')
	idoc.set('BEGIN', '1')

	edi_dc40 = shell_utils.edi_dc40(idoc, intree)
	edi_dc40.find('DIRECT').text = '1'
	mapping = [
		{ 'target' : 'SNDPOR', 'source' : 'SGB_PID_HEADER_INFO/SGB_OM_PORT', 'default_value' : '' },
		{ 'target' : 'SNDPRT', 'source' : 'SGB_PID_HEADER_INFO/SGB_OM_PRTNR_TYP', 'default_value' : '' },
		{ 'target' : 'SNDPRN', 'source' : 'SGB_PID_HEADER_INFO/SGB_OM_PRTNR_NR', 'default_value' : '' },
		{ 'target' : 'RCVPOR', 'source' : 'SGB_PID_HEADER_INFO/SGB_HST_PORT', 'default_value' : '' },
		{ 'target' : 'RCVPRT', 'source' : 'SGB_PID_HEADER_INFO/SGB_HST_PRTNR_TYP', 'default_value' : '' },
		{ 'target' : 'RCVPRN', 'source' : 'SGB_PID_HEADER_INFO/SGB_HST_PRTNR_NR', 'default_value' : '' },
		{ 'target' : 'REFINT', 'source' : 'SGB_PID_INTCHANGE_REF', 'default_value' : '' },
		{ 'target' : 'REFGRP', 'source' : 'SGB_MSG_HEADER_5/SGB_TRM_LOC_CODE', 'default_value' : '' },
		{ 'target' : 'REFMES', 'source' : 'SGB_MSG_REF', 'default_value' : '' }
	]
	utils.fill(edi_dc40, intree, mapping)

	mapping2 = [
		{ 'target' : 'ARCKEY',
		  'source' : [ { 'field' : 'SGB_MSG_PID_ARCHIVE_KEY/SGB_TRM_ARC_CODE', 'default_value' : '' },
					   { 'field' : 'SGB_MSG_PID_ARCHIVE_KEY/SGB_PID_SLASH_STR', 'default_value' : '' },
					   { 'field' : 'SGB_MSG_PID_ARCHIVE_KEY/SGB_DATE_TIME_2', 'default_value' : '' },
					   { 'field' : 'SGB_MSG_PID_ARCHIVE_KEY/SGB_PID_SLASH_STR_1', 'default_value' : '' },
					   { 'field' : 'SGB_MSG_PID_ARCHIVE_KEY/SGB_PID_TRANSACTION_ID', 'default_value' : '' }
					 ]
		}
	]
	utils.add_and_fill(edi_dc40, intree, mapping2)

	e1oilih = etree.SubElement(idoc, 'E1OILIH')
	e1oilih.set('SEGMENT', '1')
	utils.create_empty_nodes(e1oilih,
		['LIDNO','LIDADDON','LOADDATE','LOADTIME','OIBLKIND'])
	mapping = [
		{ 'target' : 'LIDNO', 'source' : 'SGB_PID_LOAD_ID', 'default_value' : '' },
		{ 'target' : 'LOADDATE', 'source' : 'SGB_PID_DATE', 'default_value' : '' },
		{ 'target' : 'LOADTIME', 'source' : 'SGB_PID_TIME', 'default_value' : '' }
	]
	utils.fill(e1oilih, intree, mapping)

	e1wvinh = etree.SubElement(e1oilih, 'E1WVINH')
	e1wvinh.set('SEGMENT', '1')
	utils.create_empty_nodes(e1wvinh,
		['LGORT','IBLNR','GJAHR','SOBKZ','GIDAT','XBLNI','DNAME','DDATE','DTIME','LGOBE','SOTXT',
		 'FILIALE','NAME1','NAME2','VPDAT','KEORD','ORDNG','INVNU'
		])
	mapping = [
		{ 'target' : 'LGORT', 'source' : 'SGB_STORAGE_LOCATION', 'default_value' : '' },
		{ 'target' : 'DDATE', 'source' : 'SGB_PID_DATE_1', 'default_value' : '' },
		{ 'target' : 'DTIME', 'source' : 'SGB_PID_TIME_1', 'default_value' : '' },
		{ 'target' : 'FILIALE', 'source' : 'SGB_PID_PLANT_CODE', 'default_value' : '' },
	]
	utils.fill(e1wvinh, intree, mapping)

	res = utils.retrieve(intree, 'SGB_PRD_1_BASE_ITEM_DET', [], False)
	for node in res:

		e1wvini = etree.SubElement(e1wvinh, 'E1WVINI')
		e1wvini.set('SEGMENT', '1')
		utils.create_empty_nodes(e1wvini,
			['ZEILI','QUALARTNR','ARTNR','CHARG','BSTAR','ERFMG','ERFME','EXVKP','EXVKW','WAERS',
			 'LIFNR','XNULL','KWART','BTEXT','MAKTX','WWGPA','WWMAKTX','VPALT','PV_GRUND','VRKPE',
			 'ABTNR','ABTTXT','LAYVR','VTEXT','SORTF','LTEXT','SORF2','IBLNR','GJAHR','SOBKZ','SOTXT',
			 'GIDAT','SALES_ORDER','SALES_ORDER_ITEM','ITEM_SHORT_TEXT','SALES_PRICE','PDC_DATE',
			 'PDC_TIME'
			])
		mapping = [
			{ 'target' : 'ZEILI', 'source' : 'SGB_ITEM_NUMBER', 'default_value' : '' },
			{ 'target' : 'ARTNR', 'source' : 'SGB_MATERIAL_CODE', 'default_value' : '' },
			{ 'target' : 'BSTAR', 'source' : 'SGB_PID_STOCK_TYPE', 'default_value' : '' },
			{ 'target' : 'ERFMG', 'source' : 'SGB_PID_CORR_QTY', 'default_value' : '' },
			{ 'target' : 'ERFME', 'source' : 'SGB_PID_UOM', 'default_value' : '' },
			{ 'target' : 'XNULL', 'source' : 'SGB_ZERO_IND', 'default_value' : '' },
			{ 'target' : 'GIDAT', 'source' : 'SGB_PID_DATE', 'default_value' : '' },
			{ 'target' : 'PDC_TIME', 'source' : 'SGB_PID_TIME', 'default_value' : '' },
		]
		utils.fill(e1wvini, node, mapping)

		e1wvini = etree.SubElement(e1wvini, '_-DS1_-HM_C_OILM001')
		e1wvini.set('SEGMENT', '1')
		utils.create_empty_nodes(e1wvini,
			['TCODE','USNAM','PBLNR','BISMT','ZMATIND','AUFNR','SHKZG','KOSTL','SGTXT','GRUND'])
		mapping = [
			{ 'target' : 'TCODE', 'source' : 'SGB_TRANSACTION_CODE', 'default_value' : '' },
			{ 'target' : 'USNAM', 'source' : 'SGB_USER_NAME', 'default_value' : '' },
			{ 'target' : 'PBLNR', 'source' : 'SGB_PID_PLANT_CODE', 'default_value' : '' },
			{ 'target' : 'BISMT', 'source' : 'SGB_MATR_LEG_CODE', 'default_value' : '' },
			{ 'target' : 'SGTXT', 'source' : 'SGB_COMMENTS', 'default_value' : '' },
		]
		utils.fill(e1wvini, node, mapping)

		e1oilt2 = etree.SubElement(e1wvini, 'E1OILT2')
		e1oilt2.set('SEGMENT', '1')
		utils.create_empty_nodes(e1oilt2, ['ADQNT1','ADUOM1','MANEN1'])
		mapping = [
			{ 'target' : 'ADQNT1', 'source' : 'SGB_PID_ALT_QTY', 'default_value' : '' },
			{ 'target' : 'ADUOM1', 'source' : 'SGB_PID_MASS_UOM', 'default_value' : '' },
			{ 'target' : 'MANEN1', 'source' : 'SGB_ZERO_IND_1', 'default_value' : '' },
		]
		utils.fill(e1oilt2, node, mapping)

		e1oilii = etree.SubElement(e1wvini, 'E1OILII')
		e1oilii.set('SEGMENT', '1')
		utils.create_empty_nodes(e1oilii, ['TSTMP','TSTEH','TDICH','MTTMP','MTTEH','HYDRO','ABIND'])
		mapping = [
			{ 'target' : 'TSTEH', 'source' : 'SGB_PID_UOM_2', 'default_value' : '' },
			{ 'target' : 'MTTEH', 'source' : 'SGB_UOM_TEMP', 'default_value' : '' },
			{ 'target' : 'ABIND', 'source' : 'SGB_ZERO_IND_3', 'default_value' : '' },
		]
		utils.fill(e1oilii, node, mapping)

		res = utils.retrieve(node, 'SGB_PID_TEMP_REF_DEN', '')
		e1oilii.find('TSTMP').text = str(float(int(res)/10))
		res = utils.retrieve(node, 'SGB_DENS_STD', '')
		e1oilii.find('TDICH').text = str(float(int(res)/100))
		res = utils.retrieve(node, 'SGB_TEMP_AMBIENT', '')
		e1oilii.find('MTTMP').text = str(float(int(res)/10))

	resstr = utils.rename(outtree,
				{'ns0_toberenamed' : 'ns0:_-DS1_-HM_C_OILLPD02',
			 	 'ns0_xmlns_toberenamed' : 'xmlns:ns0'
				})

	utils.save(resstr, dest_file, False)

