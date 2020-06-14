#!/usr/bin/python

import sys, os, csv
from datetime import datetime
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


def __header(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	try:
		res = idoc[0].find("HDR")
		if res is not None and len(res) > 0:
			hdr = res[0]
		else:
			hdr = etree.SubElement(idoc[0], 'HDR')

		res = hdr.find("MSGTYPE")
		if res is not None and len(res) > 0:
			msgtyp = res[0]
		else:
			msgtyp = etree.SubElement(hdr, 'MSGTYPE')
		msgtyp.text = 'OILNOM          ';

		res = hdr.find("VERSION")
		if res is not None and len(res) > 0:
			ver = res[0]
		else:
			ver = etree.SubElement(hdr, 'VERSION')
		ver.text = '10.00.00'


		idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
		node = idoc[0].xpath("E1OIK03[IDDAT='001']")
		res = hdr.find("EVTDATE")
		if res is not None and len(res) > 0:
			evtdate = res[0]
		else:
			evtdate = etree.SubElement(hdr, 'EVTDATE')

		edate = node[0].find("DATUM").text.strip()
		eyear = edate[:4]
		emon = edate[4:6]
		eday = edate[6:]
		etime = node[0].find("UZEIT").text.strip()
		ehour = etime[:2]
		emin = etime[2:4]
		esec = etime[4:]
		evtdate.text = eday + '.' + emon + '.' + eyear + ehour + ':' + emin + ':' + esec;

		# TODO: use first field of filename (plant code) to derive site code from config
		res = hdr.find("TRMLOC")
		if res is not None and len(res) > 0:
			trm = res[0]
		else:
			trm = etree.SubElement(hdr, 'TRMLOC')
		fldlist = os.path.basename(data_file).split('_')
		trm.text = fldlist[0]

		res = hdr.find("MSGID")
		if res is not None and len(res) > 0:
			msgid = res[0]
		else:
			msgid = etree.SubElement(hdr, 'MSGID')
		now = datetime.now()
		msgid.text = now.strftime("%Y%m%d%H%M%S")

		changed = True
	except Exception as err:
		pass

	return changed





def __idoc_num(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	try:
		res = idoc[0].find("IDOCNUM")
		if res is not None and len(res) > 0:
			idocnum = res[0]
		else:
			idocnum = etree.SubElement(idoc[0], 'IDOCNUM')

		idocnum.text = idoc[0].find("EDI_DC40/DOCNUM").text
		changed = True
	except Exception as err:
		pass

	return changed


def __idoc_create_date(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	try:
		node = idoc[0].xpath("E1OIK03[IDDAT='001']")
		res = node[0].find("IDOC_CREATE_DATE")
		if res is not None and len(res) > 0:
			idoc_cdate = res[0]
		else:
			idoc_cdate = etree.SubElement(idoc[0], 'IDOC_CREATE_DATE')

		cdate = node[0].find("DATUM").text.strip()
		cyear = cdate[:4]
		cmon = cdate[4:6]
		cday = cdate[6:]
		ctime = node[0].find("UZEIT").text.strip()
		chour = ctime[:2]
		cmin = ctime[2:4]
		csec = ctime[4:]
		idoc_cdate.text = cday + '.' + cmon + '.' + cyear + chour + ':' + cmin + ':' + csec;
		changed = True
	except Exception as err:
		pass

	return changed


def __nom_tech_key(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	try:
		res = idoc[0].find("NOMTECHKEY")
		if res is not None and len(res) > 0:
			techkey = res[0]
		else:
			techkey = etree.SubElement(idoc[0], 'NOMTECHKEY')

		techkey.text = idoc[0].find("E1OIK02/BELNR").text
		changed = True
	except Exception as err:
		pass

	return changed

def __nom_create_date(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	try:
		node = idoc[0].xpath("E1OIK03[IDDAT='002']")
		res = node[0].find("NOM_CREATE_DATE")
		if res is not None and len(res) > 0:
			nom_cdate = res[0]
		else:
			nom_cdate = etree.SubElement(idoc[0], 'NOM_CREATE_DATE')

		cdate = node[0].find("DATUM").text.strip()
		cyear = cdate[:4]
		cmon = cdate[4:6]
		cday = cdate[6:]
		ctime = node[0].find("UZEIT").text.strip()
		chour = ctime[:2]
		cmin = ctime[2:4]
		csec = ctime[4:]
		nom_cdate.text = cday + '.' + cmon + '.' + cyear + chour + ':' + cmin + ':' + csec;
		changed = True
	except Exception as err:
		pass

	return changed

def __ext_nom_num(xmltree):
	changed = False
	idoc = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC")
	try:
		res = idoc[0].find("EXTNOMNUM")
		if res is not None and len(res) > 0:
			extnom = res[0]
		else:
			extnom = etree.SubElement(idoc[0], 'EXTNOMNUM')

		extnom.text = idoc[0].find("E1OIK12/VALUE").text
		changed = True
	except Exception as err:
		pass

	return changed


def __line_item_loc_type(line_item_node):
	changed = False

	try:
		res = line_item_node.find("LOCTYPE")
		if res is not None and len(res) > 0:
			loc_type = res[0]
		else:
			loc_type = etree.SubElement(line_item_node, 'LOCTYPE')

		loc_type.text = line_item_node.find("_-DS1_-MM_C_Z1OIP01/LOC_TYPE").text
		changed = True
	except Exception as err:
		loc_type.text = '  '
		changed = True

	print('loc_type.text',loc_type.text)
	return changed

	
def __line_item_prod_idx(line_item_node, idx):
	changed = False

	try:
		res = line_item_node.find("PRODDET")
		if res is not None and len(res) > 0:
			proddet = res[0]
		else:
			proddet = etree.SubElement(line_item_node, 'PRODDET')

		res = line_item_node.find("PRODIDX")
		if res is not None and len(res) > 0:
			prodidx = res[0]
		else:
			prodidx = etree.SubElement(proddet, 'PRODIDX')

		if idx <= 10:
			prodidx.text = '0' + str(idx)
		else:
			prodidx.text = str(idx)

		print('prodidx.text',prodidx.text)

		changed = True
	except Exception as err:
		pass

	return changed
	



def __line_item_count(xmltree):
	changed = False
	path = "//_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01"
	res = xmltree.xpath(path)
	nli_count = len(res)
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


def __line_item_schd_date(line_item_node):
	changed = False
	try:
		res = line_item_node.find("SCHEDULEDATE")
		if res is not None:
			schddate = res[0]
		else:
			schddate = etree.SubElement(line_item_node, 'SCHEDULEDATE')

		node = line_item_node.xpath("E1OIP03[IDDAT='009']")
		sdate = node[0].find("DATUM").text.strip()
		syear = sdate[:4]
		smon = sdate[4:6]
		sday = sdate[6:]
		stime = node[0].find("UZEIT").text.strip()
		shour = stime[:2]
		smin = stime[2:4]
		ssec = stime[4:]
		schddate.text = sday + '.' + smon + '.' + syear + shour + ':' + smin + ':' + ssec;
		changed = True
	except Exception as err:
		pass

	return changed

def __line_item_from_to(line_item_node):
	changed = False

	storeloc_map = __load_store_loc_map('./om_msg_parser/store_loc.map')
	conpat_map = __load_conpat_map('./om_msg_parser/conpat.map')

	node = line_item_node.find("E1OIPA1[PARVW='TL']")
	if node is not None and len(node) > 0:
		val = node.find("PARTN").text
		plantcode = val[:val.find('/')].strip()
		storeloc = val[val.find('/')+1:].strip()

		pstyp_node = line_item_node.find("PSTYP")
		if pstyp_node is not None:
			pstyp = pstyp_node.text.strip()
			if pstyp == 'O':
				changed = True

				from_pc = etree.SubElement(line_item_node, 'FROM_PLANTCODE')
				from_pc.text = plantcode
				from_supp = etree.SubElement(line_item_node, 'FROM_SUPPLIER')
				if storeloc in storeloc_map:
					#TODO: Journal: Supplier code %s derived from storage location code %s."
					from_supp.text = storeloc_map[storeloc][1]
				from_store_loc = etree.SubElement(line_item_node, 'FROM_STORE_LOC')
				if storeloc in storeloc_map:
					#TODO: Journal: Storage location code %s mapped to company code %s."
					from_store_loc.text = storeloc_map[storeloc][2]
				from_desc = etree.SubElement(line_item_node, 'FROM_DESC')
				from_desc.text = val
				from_desc2 = etree.SubElement(line_item_node, 'FROM_DESC2')
				from_desc2.text = ''

				# Set TO fields blank
				to_pc = etree.SubElement(line_item_node, 'TO_PLANTCODE')
				to_pc.text = ''
				to_supp = etree.SubElement(line_item_node, 'TO_SUPPLIER')
				to_supp.text = ''
				to_store_loc = etree.SubElement(line_item_node, 'TO_STORE_LOC')
				to_store_loc.text = ''
				to_desc = etree.SubElement(line_item_node, 'TO_DESC')
				to_desc.text = ''
				to_desc2 = etree.SubElement(line_item_node, 'TO_DESC2')
				to_desc2.text = ''

				pstyp_node.text = 'O '

			elif pstyp == 'D':
				changed = True

				# Set FROM fields blank
				from_pc = etree.SubElement(line_item_node, 'FROM_PLANTCODE')
				from_pc.text = ''
				from_supp = etree.SubElement(line_item_node, 'FROM_SUPPLIER')
				from_supp.text = ''
				from_store_loc = etree.SubElement(line_item_node, 'FROM_STORE_LOC')
				from_store_loc.text = ''
				from_desc = etree.SubElement(line_item_node, 'FROM_DESC')
				from_desc.text = ''
				from_desc2 = etree.SubElement(line_item_node, 'FROM_DESC2')
				from_desc2.text = ''

				to_pc = etree.SubElement(line_item_node, 'TO_PLANTCODE')
				to_pc.text = plantcode
				to_supp = etree.SubElement(line_item_node, 'TO_SUPPLIER')
				if storeloc in storeloc_map:
					#TODO: Journal: Supplier code %s derived from storage location code %s."
					to_supp.text = storeloc_map[storeloc][1]
				to_store_loc = etree.SubElement(line_item_node, 'TO_STORE_LOC')
				if storeloc in storeloc_map:
					#TODO: Journal: Storage location code %s mapped to company code %s."
					to_store_loc.text = storeloc_map[storeloc][2]
				to_desc = etree.SubElement(line_item_node, 'TO_DESC')
				to_desc.text = val
				to_desc2 = etree.SubElement(line_item_node, 'TO_DESC2')
				to_desc2.text = ''

				pstyp_node.text = 'D '

			elif pstyp == 'IT':
				changed = True

				# TODO: need to match the number of subelement in SGB message group, drop _DS1_MM_C_Z1OIP01
				loc_type = node.find("_DS1_MM_C_Z1OIP01/LOC_TYPE").text
				print('LOC_TYPE:',loc_type)
				if loc_type == 'O':
					print('transfer-disposal')
				elif loc_type == 'D':
					print('transfer-receipt')

				pstyp_node.text = 'IT'
		else:
			pstyp_node = etree.SubElement(line_item_node, 'PSTYP')
			pstyp_node.text = '  '

		print('pstyp_node.text',pstyp_node.text)

	return changed

def __line_items(xmltree):
	changed = False
	res = xmltree.xpath("/_-DS1_-MM_C_ZOILNOM02/IDOC/E1OIP01")
	for i,node in enumerate(res):
		changed |= __line_item_schd_date(node)
		changed |= __line_item_prod_idx(node, i)
		changed |= __line_item_from_to(node)
		changed |= __line_item_loc_type(node)
	return changed

def __update(xmltree, fieldnm, match_values, qualifier_node, data_node):
	changed = False
	found = False
	res = xmltree.xpath(qualifier_node)
	if res is not None and len(res) == 1:
		if res[0].text in match_values:
			found = True

	res = xmltree.xpath(data_node)
	if res is not None and len(res) == 1:
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
		#print('saved')	



if __name__ == "__main__":

	msg_str = ''
	xmltree = None

	try:
		data_file = sys.argv[1]
		dest_file = sys.argv[2]
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
	changed |= __header(xmltree)
	changed |= __idoc_num(xmltree)
	changed |= __idoc_create_date(xmltree)
	changed |= __nom_tech_key(xmltree)
	changed |= __nom_create_date(xmltree)
	changed |= __ext_nom_num(xmltree)
	changed |= __line_item_count(xmltree)
	changed |= __line_items(xmltree)

	# Save all the changes made in the dom tree back to file
	if changed:
		__save(xmltree, dest_file)
