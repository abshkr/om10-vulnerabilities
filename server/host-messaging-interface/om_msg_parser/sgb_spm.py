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
	outtree.set('ns0_xmlns_toberenamed', 'http://www.sap.com/schemas/xml/DS1_F_HM_C_ZOILMDD2_TAS_01')
	idoc = etree.SubElement(outtree, 'IDOC')
	idoc.set('BEGIN', '1')

	edi_dc40 = shell_utils.edi_dc40(idoc, intree)
	edi_dc40.find('DIRECT').text = '1'
	mapping = [
		{ 'target' : 'SNDPOR', 'source' : 'SGB_SPMVMT_HEADER_INFO/SGB_OM_PORT', 'default_value' : '' },
		{ 'target' : 'SNDPRT', 'source' : 'SGB_SPMVMT_HEADER_INFO/SGB_OM_PRTNR_TYP', 'default_value' : '' },
		{ 'target' : 'SNDPRN', 'source' : 'SGB_SPMVMT_HEADER_INFO/SGB_OM_PRTNR_NR', 'default_value' : '' },
		{ 'target' : 'RCVPOR', 'source' : 'SGB_SPMVMT_HEADER_INFO/SGB_HST_PORT', 'default_value' : '' },
		{ 'target' : 'RCVPRT', 'source' : 'SGB_SPMVMT_HEADER_INFO/SGB_HST_PRTNR_TYP', 'default_value' : '' },
		{ 'target' : 'RCVPRN', 'source' : 'SGB_SPMVMT_HEADER_INFO/SGB_HST_PRTNR_NR', 'default_value' : '' },
		{ 'target' : 'REFINT', 'source' : 'SGB_SPMVMT_INTCHANGE_REF', 'default_value' : '' },
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

	e1oilgm = etree.SubElement(idoc, 'E1OILGM')
	e1oilgm.set('SEGMENT', '1')
	utils.create_empty_nodes(e1oilgm,
		['ACTION','LIDNO','LOADDATE','LOADTIME','BWART','WERKS','LGORT','CHARG','TSTMP','TSTEH','TDICH',
		 'MTTMP','MTTEH','MATNR','TRQNT','TRUOM','HNDLTYPE','OIPIPEVAL','OIC_LIFNR','OIC_DCITYC',
		 'OIC_DCOUNC','OIC_DREGIO','OIC_DLAND1','OIC_OCITYC','OIC_OCOUNC','OIC_OREGIO','OIC_OLAND1',
		 'OIC_PORGIN','OIC_PDESTN','OIC_PTRIP','OIC_PBATCH','OIC_MOT','OIC_AORGIN','OIC_ADESTN',
		 'OIC_TRUCKN','OIA_BASELO','UMMAT','UMWRK','UMLGO','UMCHA','WEMPF','SGTXT','HYDRO','ABIND'
		])
	mapping = [
		{ 'target' : 'LIDNO', 'source' : 'SGB_SPMVMT_LOAD_ID', 'default_value' : '' },
		{ 'target' : 'LOADDATE', 'source' : 'SGB_SPMVMT_DATE', 'default_value' : '' },
		{ 'target' : 'LOADTIME', 'source' : 'SGB_SPMVMT_TIME', 'default_value' : '' },
		{ 'target' : 'BWART', 'source' : 'SGB_SPMVMT_MVMT_TYPE', 'default_value' : '' },
		{ 'target' : 'WERKS', 'source' : 'SGB_SPMVMT_PLANT_CODE', 'default_value' : '' },
		{ 'target' : 'LGORT', 'source' : 'SGB_SPMVMT_ST_LOCATION', 'default_value' : '' },
		{ 'target' : 'CHARG', 'source' : 'SGB_SPMVMT_BATCH', 'default_value' : '' },
		{ 'target' : 'TSTEH', 'source' : 'SGB_SPMVMT_UOM_STD_TEMP', 'default_value' : '' },
		{ 'target' : 'MTTEH', 'source' : 'SGB_SPMVMT_UOM_AMB_TEMP', 'default_value' : '' },
		{ 'target' : 'MATNR', 'source' : 'SGB_SPMVMT_MATERIAL_CODE', 'default_value' : '' },
		{ 'target' : 'TRQNT', 'source' : 'SGB_SPMVMT_AMB_QTY', 'default_value' : '' },
		{ 'target' : 'TRUOM', 'source' : 'SGB_SPMVMT_UOM_AMB_QTY', 'default_value' : '' },
		{ 'target' : 'UMMAT', 'source' : 'SGB_SPMVMT_TO_MATERIAL_CODE', 'default_value' : '' },
		{ 'target' : 'UMWRK', 'source' : 'SGB_SPMVMT_TO_PLANT_CODE', 'default_value' : '' },
		{ 'target' : 'UMLGO', 'source' : 'SGB_SPMVMT_TO_ST_LOCATION', 'default_value' : '' },
		{ 'target' : 'UMCHA', 'source' : 'SGB_SPMVMT_BATCH_1', 'default_value' : '' },
		{ 'target' : 'SGTXT', 'source' : 'SGB_SPMVMT_MVMT_NO', 'default_value' : '' },
		{ 'target' : 'ABIND', 'source' : 'SGB_SPMVMT_AIR_BUOY', 'default_value' : '' }
	]
	utils.fill(e1oilgm, intree, mapping)

	res = utils.retrieve(intree, 'SGB_SPMVMT_STD_TEMP', '')
	e1oilgm.find('TSTMP').text = str(float(int(res)/10))
	res = utils.retrieve(intree, 'SGB_SPMVMT_DENS_STD', '')
	e1oilgm.find('TDICH').text = str(float(int(res)/1000))
	res = utils.retrieve(intree, 'SGB_SPMVMT_AMBIENT_TEMP', '')
	e1oilgm.find('MTTMP').text = str(float(int(res)/10))

	oilm001 = etree.SubElement(e1oilgm, '_-DS1_-HM_C_OILM001')
	oilm001.set('SEGMENT', '1')
	utils.create_empty_nodes(e1oilgm,
		['TCODE','USNAM','PBLNR','BISMT','ZMATIND','AUFNR','SHKZG','KOSTL','SGTXT','GRUND'])
	mapping = [
		{ 'target' : 'TCODE', 'source' : 'SGB_SPMVMT_TRAN_CODE', 'default_value' : '' },
		{ 'target' : 'USNAM', 'source' : 'SGB_SPMVMT_USER_NAME', 'default_value' : '' },
		{ 'target' : 'PBLNR', 'source' : 'SGB_SPMVMT_SMGR_PLANT_CODE', 'default_value' : '' },
		{ 'target' : 'SGTXT', 'source' : 'SGB_SPMVMT_COMMENTS', 'default_value' : '' },
		{ 'target' : 'GRUND', 'source' : 'SGB_SPMVMT_REASON_CODE', 'default_value' : '' }
	]
	utils.fill(e1oilgm, intree, mapping)

	res = utils.retrieve(intree, 'SGB_SPMVMT_ALT_QTYS_STRUCT/SGB_SPMVMT_1_ALT_QTY_DET', [], False)
	for node in res:

		e1oilt2 = etree.SubElement(e1oilgm, 'E1OILT2')
		e1oilt2.set('SEGMENT', '1')
		utils.create_empty_nodes(e1oilt2, ['ADQNT1','ADUOM1','MANEN1'])
		mapping = [
			{ 'target' : 'ADQNT1', 'source' : 'SGB_SPMVMT_ALT_QTY', 'default_value' : '' },
			{ 'target' : 'ADUOM1', 'source' : 'SGB_SPMVMT_ALT_QTY_UOM', 'default_value' : '' },
			{ 'target' : 'MANEN1', 'source' : 'SGB_SPMVMT_ADDITIONAL_IND', 'default_value' : '' },
		]
		utils.fill(e1oilt2, node, mapping)

	resstr = utils.rename(outtree,
				{'ns0_toberenamed' : 'ns0:_-DS1_-HM_C_ZOILMDD2_TAS_01',
			 	 'ns0_xmlns_toberenamed' : 'xmlns:ns0'
				})

	utils.save(resstr, dest_file, False)

