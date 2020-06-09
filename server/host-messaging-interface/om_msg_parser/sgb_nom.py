#!/usr/bin/python

import sys, csv
from lxml import etree


def __load_store_loc_map(map_file):
	store_loc_map = {}
	if map_file is not None:
		try:
			with open(map_file, 'r') as dataf:
				rdr = csv.reader(filter(lambda row: row[0]!='#' and row[0]!='\n', dataf))
				for row in rdr:
					store_loc_map[row[0].strip()] = [row[1].strip(), row[2].strip(), row[3].strip()]
				return store_loc_map
		except Exception as err:
			print (err)
			return {}
	else:
		return {}


def __load_conpat_map(map_file):
	conpat_map = {}
	if map_file is not None:
		try:
			with open(map_file, 'r') as dataf:
				rdr = csv.reader(filter(lambda row: row[0]!='#' and row[0]!='\n', dataf))
				for row in rdr:
					conpat_map[row[0].strip()] = [row[1].strip(), row[2].strip(), row[3].strip(), row[4].strip()]
				return conpat_map
		except Exception as err:
			print (err)
			return {}
	else:
		return {}


def __idoc_num(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	idocnum = etree.SubElement(idoc[0], 'IDOCNUM')
	idocnum.text = idoc[0].find("EDI_DC40/DOCNUM").text
	changed = True

	return changed


def __idoc_create_date(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	node = idoc[0].xpath("E1OIK03[IDDAT='001']")
	idoc_cdate = etree.SubElement(idoc[0], 'IDOC_CREATE_DATE')
	idoc_cdate.text = node[0].find("DATUM").text
	changed = True

	return changed


def __nom_tech_key(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	techkey = etree.SubElement(idoc[0], 'NOMTECHKEY')
	techkey.text = idoc[0].find("E1OIK02/BELNR").text
	changed = True

	return changed

def __nom_create_date(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	cdate = etree.SubElement(idoc[0], 'NOMCREATEDATE')
	cdate.text = idoc[0].find("E1OIK02/DATUM").text
	changed = True

	return changed

def __ext_nom_num(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	extnom = etree.SubElement(idoc[0], 'EXTNOMNUM')
	extnom.text = idoc[0].find("E1OIK12/VALUE").text
	changed = True

	return changed


def __loc_type(xmltree):
	changed = False

	res = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01")
	for node in res:
		print('node:',node)
		loc_type = etree.SubElement(node, 'LOCTYPE')
		try:
			loc_type.text = node.find("_-DS1_-MM_C_Z1OIP01/LOC_TYPE").text
			changed = True
		except Exception as err:
			pass
	return changed

	
def __prod_idx(xmltree):
	changed = False

	res = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01")
	for i,node in enumerate(res):
		res = node.find("PRODDET")
		if res and len(res) > 0:
			proddet = res[0]
		else:
			proddet = etree.SubElement(node, 'PRODDET')

		prodidx = etree.SubElement(proddet, 'PRODIDX')
		prodidx.text = str(i)

		changed = True
	return changed
	



def __line_item_count(xmltree):
	changed = False
	path = "//_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01"
	res = xmltree.xpath(path)
	nli_count = len(res)
	print('SGB_NOM_ITEM_COUNT:',nli_count)
	path = "/_-DS1_-MM_C_ZOILNOM02/IDOC"
	parent = xmltree.xpath(path)
	if len(parent) > 0:
		cnt_fieldnm = "NUM_OF_E1OIP01"
		path = path + '/' + cnt_fieldnm
		res = xmltree.xpath(path)
		if len(res) > 0:
			res[0].text = str(nli_count)
		else:
			nli = etree.SubElement(parent[0], cnt_fieldnm)
			nli.text = str(nli_count)
			#nli.tail = "\n"
		changed = True
	return changed


def __line_item_from_to(xmltree):
	changed = False

	storeloc_map = __load_store_loc_map('store_loc.map')
	conpat_map = __load_conpat_map('conpat.map')

	res = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIPA1[PARVW='TL']")
	for node in res:
		print('node:',node)
		val = node.find("PARTN").text
		plantcode = val[:val.find('/')].strip()
		storeloc = val[val.find('/')+1:].strip()

		pstyp = node.getparent().find("PSTYP").text
		if pstyp == 'O':
			print('disposal')
			changed = True

			from_pc = etree.SubElement(node.getparent(), 'FROM_PLANTCODE')
			from_pc.text = plantcode
			from_supp = etree.SubElement(node.getparent(), 'FROM_SUPPLIER')
			if storeloc in storeloc_map:
				#TODO: Journal: Supplier code %s derived from storage location code %s."
				from_supp.text = storeloc_map[storeloc][1]
			from_store_loc = etree.SubElement(node.getparent(), 'FROM_STORE_LOC')
			if storeloc in storeloc_map:
				#TODO: Journal: Storage location code %s mapped to company code %s."
				from_store_loc.text = storeloc_map[storeloc][2]
			from_desc = etree.SubElement(node.getparent(), 'FROM_DESC')
			from_desc.text = val
			from_desc2 = etree.SubElement(node.getparent(), 'FROM_DESC2')
			from_desc2.text = ''

			# Set TO fields blank
			to_pc = etree.SubElement(node.getparent(), 'TO_PLANTCODE')
			to_pc.text = ''
			to_supp = etree.SubElement(node.getparent(), 'TO_SUPPLIER')
			to_supp.text = ''
			to_store_loc = etree.SubElement(node.getparent(), 'TO_STORE_LOC')
			to_store_loc.text = ''
			to_desc = etree.SubElement(node.getparent(), 'TO_DESC')
			to_desc.text = ''
			to_desc2 = etree.SubElement(node.getparent(), 'TO_DESC2')
			to_desc2.text = ''

		elif pstyp == 'D':
			print('receipt')
			changed = True

			# Set FROM fields blank
			from_pc = etree.SubElement(node.getparent(), 'FROM_PLANTCODE')
			from_pc.text = ''
			from_supp = etree.SubElement(node.getparent(), 'FROM_SUPPLIER')
			from_supp.text = ''
			from_store_loc = etree.SubElement(node.getparent(), 'FROM_STORE_LOC')
			from_store_loc.text = ''
			from_desc = etree.SubElement(node.getparent(), 'FROM_DESC')
			from_desc.text = ''
			from_desc2 = etree.SubElement(node.getparent(), 'FROM_DESC2')
			from_desc2.text = ''

			to_pc = etree.SubElement(node.getparent(), 'TO_PLANTCODE')
			to_pc.text = plantcode
			to_supp = etree.SubElement(node.getparent(), 'TO_SUPPLIER')
			if storeloc in storeloc_map:
				#TODO: Journal: Supplier code %s derived from storage location code %s."
				to_supp.text = storeloc_map[storeloc][1]
			to_store_loc = etree.SubElement(node.getparent(), 'TO_STORE_LOC')
			if storeloc in storeloc_map:
				#TODO: Journal: Storage location code %s mapped to company code %s."
				to_store_loc.text = storeloc_map[storeloc][2]
			to_desc = etree.SubElement(node.getparent(), 'TO_DESC')
			to_desc.text = val
			to_desc2 = etree.SubElement(node.getparent(), 'TO_DESC2')
			to_desc2.text = ''

		elif pstyp == 'IT':
			print('transfer')
			changed = True

			# TODO: need to match the number of subelement in SGB message group, drop _DS1_MM_C_Z1OIP01
			loc_type = node.find("_DS1_MM_C_Z1OIP01/LOC_TYPE").text
			print('LOC_TYPE:',loc_type)
			if loc_type == 'O':
				print('transfer-disposal')
			elif loc_type == 'D':
				print('transfer-receipt')

	return changed




def __update(xmltree, fieldnm, match_values, qualifier_node, data_node):
	changed = False
	found = False
	res = xmltree.xpath(qualifier_node)
	if len(res) == 1:
		if res[0].text in match_values:
			found = True

	res = xmltree.xpath(data_node)
	if len(res) == 1:
		if not found:
			res[0].text = ''
			changed = True
		print(fieldnm, data_node, changed, res[0].text)

	return changed



def __save(xmldoc, to_file):
	#This method "lost" the original xml header of the file
	#etree.ElementTree(xmldoc.getroot()).write(to_file)
	#print('saved')	

	xmlhdr = '<?xml version="1.0" encoding="UTF-8"?>'
	data_str = xmlhdr + '\n' + etree.tostring(xmldoc, pretty_print=True).decode()
	#data_str = xmlhdr + etree.tostring(xmldoc).decode()
	with open(to_file, "w") as ofile:
		ofile.write(data_str)
		print('saved')	



if __name__ == "__main__":

	msg_str = ''
	xmltree = None

	try:
		data_file = sys.argv[1]
	except Exception as err:
		raise

	#NOTE: The original xml header of the file is lost after parsing
	#xmltree = etree.parse(data_file).getroot()

	parser = etree.XMLParser(remove_blank_text=True)
	xmltree = etree.parse(data_file, parser).getroot()

	changed = False

	changed |= __update(xmltree, 'SGB_NOM_TECH_KEY', ['001'],
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIK02/QUALF",
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIK02/BELNR")

	changed |= __update(xmltree, 'SGB_EXT_NOM_NUM', ['008'],
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIK12/QUALF",
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIK12/VALUE")

	changed |= __line_item_count(xmltree)

	changed |= __update(xmltree, 'SGB_PROD_CODE', ['004'],
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP19/QUALF",
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP19/IDTNR")

	changed |= __update(xmltree, 'SGB_PROD_QTY', ['011'],
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP21/QUALF",
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP21/MENGE")

	changed |= __update(xmltree, 'SGB_UNITS_OF_MEASURE', ['011'],
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP21/QUALF",
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP21/MENEE")

	changed |= __update(xmltree, 'SGB_SCHD_DATE_TIME', ['009'],
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP03/IDDAT",
				"/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01/E1OIP03/DATUM")

	# NOTE: Must do the following AFTER the above updates
	changed |= __idoc_num(xmltree)
	changed |= __idoc_create_date(xmltree)
	changed |= __nom_tech_key(xmltree)
	changed |= __nom_create_date(xmltree)
	changed |= __ext_nom_num(xmltree)
	changed |= __loc_type(xmltree)
	changed |= __prod_idx(xmltree)
	changed |= __line_item_from_to(xmltree)

	# Save all the changes made in the dom tree back to file
	print('any change',changed)
	if changed:
		__save(xmltree, data_file)
