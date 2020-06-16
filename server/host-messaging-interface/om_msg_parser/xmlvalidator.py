from lxml import etree

class XmlValidator(object):

	def __init__(self):
		pass

	def do_it(xsd_file, xml_file):
		# Validate the specified xml file (xml_file) against the specified schema file (xsd_file)
		# Returns true if successful, otherwise, returns false.
		try:
			validator = etree.XMLSchema(file=xsd_file)
			xml_tree = etree.parse(xml_file)
			is_valid = validator.validate(xml_tree)
			return is_valid
		except Exception as err:
			raise
			return
