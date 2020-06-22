import string
from lxml import etree


def save(input, to_file, input_is_dom=True):
	xmlhdr = '<?xml version="1.0" encoding="UTF-8"?>'
	if input_is_dom:
		str = etree.tostring(xmldoc, pretty_print=True).decode()
	else:
		str = input
	data_str = xmlhdr + '\n' + str
	with open(to_file, "w") as ofile:
		ofile.write(data_str)


def create_empty_nodes(node, name_list):
	for nn in name_list:
		etree.SubElement(node, nn)


def retrieve(node, path, defaultval, valueOnly=True):
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


def rename(xmltree, rename_list):
	""" Rename the xml node name as per Shell's requirement. The xml node name they
		wanted violates xml rules. Therefore, cannot be done directly when the node
		was first created in the DOM.
	"""

	str = etree.tostring(xmltree, pretty_print=True).decode()
	for item in rename_list:
		str = string.replace(str, item, rename_list[item])
	return str


def fill(target_tree, source_tree, map_list):
	for item in map_list:
		target_tree.find(item['target']).text = retrieve(source_tree, item['source'], item['default_value'])

def add_and_fill(target_tree, source_tree, map_list):
	for item in map_list:
		str = ''
		for src in item['source']:
			str += retrieve(source_tree, src['field'], src['default_value'])
		target_tree.find(item['target']).text = str

