from lxml import etree
import msg_def_defaults, time, csv
from errors import *

class TextToOmTreeConverter(object):
	"""
	- A base class that converts incoming message data dictionary into an Omega message (length-delimited,tree).
	- Extraction method for specific data dictionary format will be determined by functions added/overridden in derived classes.
	- Fill an Omega Message Definition tree structure with the passed-in data.
	- A somewhat generic class that do simple one-to-one field mapping.
	- Generate an Omega Message based on the populated Omega Message Definition tree structure.
	- Uses the values specified in file "msg_def_defaults.py" as default value, if specified.
	"""

	_in_data = {}
	_msg_def = {}
	_msg_main = ""
	_lookuplist = {}
	_logr = None

	# Use by "get value for path" and "set value for path" function to minimise passing of same arguments recursively.
	_dict = {}
	_path_itm_list = []
	_append = False

	# Intended to be used only for printing message in human readable format
	_hdr_fld_nm = "Field Name"
	#_hdr_fld_desc = "Description"
	_hdr_fld_desc = "Field"
	_hdr_fld_typ = "Type"
	_hdr_fld_len = "Size"
	_hdr_fld_val = "Value"
	_hdr_fld_nm_width = 45 
	_hdr_fld_desc_width = 35
	_hdr_fld_typ_width = 25
	_hdr_fld_len_width = 6
	_hdr_fld_val_width = 40
	_hdr_fld_sep = "-" * (_hdr_fld_nm_width + _hdr_fld_desc_width + _hdr_fld_typ_width + _hdr_fld_len_width + _hdr_fld_val_width)
	#_hdr_fld_sep = "-" * (_hdr_fld_desc_width + _hdr_fld_typ_width + _hdr_fld_len_width + _hdr_fld_val_width)


	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst):
		self._logr = logr_inst
		self._in_data.clear()
		self._in_data = in_data_dict
		self._msg_def.clear()
		self._msg_def = msg_def_dict
		self._msg_main = msg_main
		self._lookuplist.clear()
		self._lookuplist = self._build_lookup_list()

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst, fld_map_file, reverse_order):
		self._logr = logr_inst
		self._in_data.clear()
		self._in_data = in_data_dict
		self._msg_def.clear()
		self._msg_def = msg_def_dict
		self._msg_main = msg_main
		self._lookuplist.clear()
		self._lookuplist = self._build_lookup_list()
		self._fld_map = self._load_field_map(fld_map_file, reverse_order)
		self._xmltree = None

	def _load_field_map(self, fld_map_file, reverse_order):
		if fld_map_file is not None:
			try:
				with open(fld_map_file, 'r') as dataf:
					rdr = csv.reader(filter(lambda row: row[0]!='#' and row[0]!='\n', dataf))
					if reverse_order:
						key_fld_idx = 1
						val_idx = 0
					else:
						key_fld_idx = 0
						val_idx = 1
					return dict((row[key_fld_idx],row[val_idx]) for row in rdr)
			except Exception as err:
				print (err)
				return {}
		else:
			return {}

	def _decode(self, rep_level_list):
		"""Return the index at which data is located by decoding the repeat level index and repeat level count."""

		#dbgmsg = '_decode(%s)' % (rep_level_list)
		#self._logr.write_debug(dbgmsg)

		res = 0
		cnt = len(rep_level_list)
		offset = 0

		if cnt == 1:
			res = rep_level_list[0][0]
		elif cnt > 1:
			second_last_item = rep_level_list[-2]
			last_item = rep_level_list[-1]

			# repeat level index of second last level list item
			offset = second_last_item[0]

			# Calculate the sum of all repeat count items from beginning up to offset value.
			# Then, add current repeat level to it.
			# This is the location of the result i.e. the field value.
			idx = 0
			offset_sum = 0
			while idx < offset:
				offset_sum += int(last_item[1][idx])
				idx += 1
			res = offset_sum + last_item[0]

		return res

	def _fld_meta_data(self, search_key, fld_modfr):
		"""Returns a tuple of type and length, for the specified field search key"""

		dbgmsg = '_fld_meta_data(%s,%s)' % (search_key,fld_modfr)
		#self._logr.write_debug(dbgmsg)

		found = False
		type = ''
		length = 0
		if fld_modfr != '':
			search_key = search_key[0:search_key.find(fld_modfr)]
		try:
			if not found and self._msg_def['const_def'][search_key]:
				fld_spec = self._msg_def['const_def'][search_key]
				type = "CONST"
				dbgmsg = 'fld_spec=(%s)' % (fld_spec)
				#self._logr.write_debug(dbgmsg)
				length = len(fld_spec)
				found = True
		except KeyError as err:
			None

		try:
			if not found and self._msg_def['std_fld_def'][search_key]:
				fld_spec = self._msg_def['std_fld_def'][search_key]
				type = fld_spec[0]
				length = int(fld_spec[1])
				found = True
		except KeyError as err:
			None

		try:
			if not found and self._msg_def['enum_def'][search_key]:
				fld_spec = self._msg_def['enum_def'][search_key]
				type = "ENUM"
				length = len(fld_spec[0])
				found = True
		except KeyError as err:
			None

		try:
			if not found and self._msg_def['truth_def'][search_key]:
				fld_spec = self._msg_def['truth_def'][search_key]
				type = "BOOL"
				length = len(fld_spec[0])
				found = True
		except KeyError as err:
			None

		return (type, length)


	def _get_next_sibling(self, tree, node):
		found = False
		for child in list(tree):
			if found:
				return child
			if child.tag == node.tag:
				if tree[len(list(tree))-1].tag == node.tag:
					return None
				else:
					found = True

	def _get_nth_match(self, tree, node, index):
		# Find the n'th node on tree that follows node (by index) and return it if it matches node name 
		found = False
		idx = 0
		for child in list(tree):
			if not found and child.tag == node.tag:
				found = True
			elif found and child.tag == node.tag:
				idx += 1	

			if found and idx == index:
				if child.tag == node.tag:
					return child
				else:
					return None

		return None

	def _next_child(self, current_node):
		# Shortest way:
		# cur = list(cur)[0], or
		# cur.getchildren()[0]

		if current_node is not None:
			child_list = list(current_node)		# or current_node.getchildren()
			if len(child_list) > 0:
				return child_list[0]

		return None


	def _update_xml_dom(self, spath, val, val_idx):

		"""[
		  current is null
		 	create a xml node, point root to it, point current to it
		 	set new node marker to true
		  current is not null
		 	if current is root
		 		if current field is same as current node
		 			point to first child of current node
		 		else
		 			create child xml node using current field
		 			point current to this new xml node
		 			set new node marker to true
		 	else
		 		if current field is same as current node
					if is repeating (idx > 0)
		 				if current field is second last
		 					find the n'th node and has same name (must be continguous)
		 					if found
								if current node is leaf node
									if current node was just created:
										create child xml node using current field
										if current field is last field and value is not blank and value is not whitespace
											update node value
										point current to this new xml node
										set new node marker to true
									else
										create sibling xml node using current field
										point current to this new xml node
										set new node marker to true
								else
									point to first child of current node
							else
		 						create sibling xml node using current field
								point current to this new xml node
								set new node marker to true
		 				else if current field is last
		 					create sibling xml node using current field
		 					point current to this new xml node
		 					set new node marker to true
		 				else
		 					point to first child of current node
		 			else
		 				point to first child of current node
		 		else
		 			if current node has next sibling
		 				point current to next sibling
		 				stay at current field
		 			else
		 				if current node is leaf node
		 					if current node was just created:
		 						create child xml node using current field
		 						if current field is last field and value is not blank and value is not whitespace
		 							update node value
		 						point current to this new xml node
		 						set new node marker to true
		 					else:
		 						create sibling xml node using current field
		 						if current field is last field and value is not blank and value is not whitespace
		 							update node value
		 						point current to this new xml node
		 						set new node marker to true
		 				else
		 					create sibling xml node using current field
		 					if current field is last field and value is not blank and value is not whitespace
		 						update node value
		 					point current to this new xml node
		 					set new node marker to true
		]"""

		dmsg = 'spath:%s,val:%s,val_idx:%d' % (spath, val, val_idx)
		self._logr.write_debug(dmsg)

		cur = self._xmltree
		flds = spath.split('.')
		j = 0
		while j < len(flds):
			if cur is None:
				cur = etree.Element(flds[j])
				self._xmltree = cur
				new = True
				j += 1
			else:
				if cur == self._xmltree:
					if flds[j] == cur.tag:
						cur = list(cur)[0]
						#cur = self._next_child(cur)
						new = False
						j += 1
					else:
						cur = etree.SubElement(cur, flds[j])
						new = True
						j += 1
				else:
					if flds[j] == cur.tag:
						if val_idx > 0:
							if j == len(flds) - 2:
								match = self._get_nth_match(cur.getparent(), cur, val_idx)							
								if match is not None:
									cur = match
									if len(cur) == 0:
										if new:
											cur = etree.SubElement(cur, flds[j])
											if j == len(flds) - 1 and len(val) != 0 and len(val.strip()) != 0:
												cur.text = val.strip()
											new = True
											j += 1
										else:
											cur = etree.SubElement(cur.getparent(), flds[j])
											if j == len(flds) - 1 and len(val) != 0 and len(val.strip()) != 0:
												cur.text = val.strip()
											new = True
											j += 1
									else:
										cur = list(cur)[0]
										#cur = self._next_child(cur)
										new = False
										j += 1
								else:
									cur = etree.SubElement(cur.getparent(), flds[j])
									new = True
									j += 1
							elif j == len(flds) - 1:
								cur = etree.SubElement(cur.getparent(), flds[j])
								if j == len(flds) - 1 and len(val) != 0 and len(val[v].strip()) != 0:
									cur.text = val.strip()
								new = True
								j += 1
							else:
								cur = list(cur)[0]
								#cur = self._next_child(cur)
								new = False
								j += 1
						else:
							cur = list(cur)[0]
							#cur = self._next_child(cur)
							new = False
							j += 1
					else:
						sibling = self._get_next_sibling(cur.getparent(), cur)
						if sibling != None:
							cur = sibling
							new = False
						else:
							#TODO: check if this is correct for determining leaf node
							#dbgmsg = 'cur:%s,len:%d' % (cur.tag, len(cur))
							#self._logr.write_debug(dbgmsg)

							if len(cur) == 0:
								if new:
									cur = etree.SubElement(cur, flds[j])
									if j == len(flds) - 1 and len(val) != 0 and len(val.strip()) != 0:
										cur.text = val.strip()
									new = True
									j += 1
								else:
									cur = etree.SubElement(cur.getparent(), flds[j])
									if j == len(flds) - 1 and len(val) != 0 and len(val.strip()) != 0:
										cur.text = val.strip()
									new = True
									j += 1
							else:
								cur = etree.SubElement(cur.getparent(), flds[j])
								if j == len(flds) - 1 and len(val) != 0 and len(val.strip()) != 0:
									cur.text = val.strip()
								new = True
								j += 1




	def __write_msg_now(self, search_key, idx, value_list, default_val, fld_delim, rep_level_list, msg,
						content_format, fld_desc, fld_modfr, indent_level, path, max_repeats):
		"""
		-	Recursively traverse msg_def structure/dictionary and return the Omega msg.
		-	'rep_level_list' is a list of repeat-level objects. Each repeat-level object is nested inside
			the one before. Each repeat-level object is a list of two items, item 1 is the current repeat
			level index, item 2 is a list of repeat count values where each value is the repeat count of
			the current sub-component for the parent object. This is required for handling nested repeating
			components e.g. a load detail comprised of multiple loaded compartments where each compartment
			is comprised of multiple base products.

			The base products of each compartment will be stored in a list. In this case of two loaded compartments, compartment 1
			has two base products and compartment 2 has three base products, the list will be
			[BP1, BP2, BP3, BP4, BP5].
			The tree level information is lost in this storage structure. Therefore, some method is needed to decode this. The
			repeat-level list is the solution to this decoding problem. In this scenario, the repeat-level list will be:

			E.g. [[1, ['02']], [0, ['02', '03']]]
				   ^    ^       ^    ^     ^
				   |    |       |    |     |-- number of base products in compartment 2
				   |    |       |    |-------- number of base products in compartment 1
				   |    |       |------------- repeat-level index (zero-based), currently at base products in compartment 1
				   |    |--------------------- number of compartments in load detail
				   |-------------------------- repeat-level index (zero-based), currently at compartment 2
			Graphically, it looks like the following:
			LOAD_DETAIL
				^
				|---- Cmpt1
				|		^
				|		|---- BP1		[[0, ['02']], [0, ['02', '03']]]
				|		|---- BP2		[[0, ['02']], [1, ['02', '03']]]
				|
				|---- Cmpt2
						^
						|---- BP3		[[1, ['02']], [0, ['02', '03']]]
						|---- BP4		[[1, ['02']], [1, ['02', '03']]]

			Note that sub-components not within a repeating section will have an empty repeat-level list. As the tree is traversed,
			the repeat-level list will grow or shrink to indicate this condition.
		"""

		# TODO: Doesn't work for elements with the same tag e.g. SGC_COMPANY_CODE_1, SGC_COMPANY_CODE_2

		#dbgmsg = '__write_msg_now(%s,%d,%s,%s,%s,%s)' % (search_key, idx, value_list, default_val, fld_delim, rep_level_list)
		dbgmsg = '__write_msg_now(%s,%d,%s,%s)' % (search_key, idx, value_list, rep_level_list)
		self._logr.write_debug(dbgmsg)

		if path:
			path += '.'
		path += (search_key+fld_modfr)

		try:

			if content_format == 1:
				indent_space = (' ' * indent_level)
				msg += str('\n')
				#msg += (indent_space + search_key).ljust(self._hdr_fld_nm_width, ' ')
				#msg += fld_desc.ljust(self._hdr_fld_desc_width, ' ')
				msg += (indent_space + fld_desc).ljust(self._hdr_fld_desc_width, ' ')

			elif content_format == 2:
				msg += '{'
				msg += '"field_name":'
				msg += '"'
				msg += search_key
				msg += '"'
				msg += ','
				msg += '"description":'
				msg += '"'
				msg += fld_desc
				msg += '"'

				try:
					test = self._msg_def['sub_def'][search_key]
					msg += ','
					msg += '"fields":['
				except KeyError as err:
					pass

			elif content_format == 3:
				try:
					elemnm = self._fld_map[search_key]
				except KeyError as err:
					elemnm = search_key
				msg += '<'
				msg += elemnm
				msg += '>'

			elif content_format == 4:
				try:
					elemnm = self._fld_map[search_key]
				except KeyError as err:
					elemnm = search_key
				msg += '<xs:element name="'
				msg += elemnm
				msg += '"'

				if max_repeats > 0:
					msg += (' maxOccurs="' + str(max_repeats) + '"')

				msg += '>'
				msg += '\n'

			try:
				#for val in self._msg_def['sub_def'][search_key]:
				items = self._msg_def['sub_def'][search_key]

				if len(items) > 0:
					if content_format == 4:
						msg += '<xs:complexType>'
						msg += '<xs:sequence>'
						msg += '\n'

				cnt = 0
				for val in items:

					# Determine if the current element has a "repeat_count" property,
					# and if so, retrieve the repeat count value and update the repeat level list
					has_rep_cnt = (val[3] != '')
					rep_cnt = 0
					added_to_list = False
					if has_rep_cnt:
						try:
							rep_cnt_items = [v for v in self._msg_def['sub_def'][search_key] if v[4] == val[3]]
						except KeyError as err:
							contxt = 'When creating message: Cannot find repeat count item for search key <%s>, %s' % (val[0],repr(err))
						#dbgmsg = 'val=<%s>, rep_cnt_items=<%s>, rep_level_list=<%s>' % (val[0], rep_cnt_items, rep_level_list)
						#self._logr.write_debug(dbgmsg)

						# Should have only one in the list. Otherwise, throw exception
						rci_cnt = len(rep_cnt_items)
						if rci_cnt > 1:
							contxt = 'When creating message: Should have only one repeat count item for search key <%s>, have <%d>' % (val[0],rci_cnt)
							raise Error(contxt)
						rci = rep_cnt_items[0]

						# Use current repeat level index (which represents the current iteration of the parent) to find the correct
						# repeat count value.
						if rep_level_list:
							rc_idx = rep_level_list[-1][0]
						else:
							rc_idx = 0
						try:
							rep_cnt = int(rci[6][rc_idx].strip())
							rep_level_list.append([idx,rci[6]])
							added_to_list = True
						except IndexError as err:
							# No data
							rep_cnt = 0
						except Exception as err:
							contxt = 'When creating message: Unable to retrieve repeat count for search key <%s>, %s' % (val[0],repr(err))
							raise Error(contxt)

					# Determine if the current element has a "max_repeats" property
					has_max_reps = (val[2] != '')
					max_reps = 0
					if has_max_reps and val[2].isdigit():
						max_reps = int(val[2])

						if not has_rep_cnt:
							# WARNING: Only do the following if there is no repeat count. Otherwise, the Load Detail Message will not be
							# parsed correctly.
							#
							# Use current repeat level index (which represents the current iteration of the parent) to find the correct
							# repeat count value.
							if rep_level_list:
								rc_idx = rep_level_list[-1][0]
							else:
								rc_idx = 0
							try:
								rep_level_list.append([idx,max_reps])
								added_to_list = True
							except IndexError as err:
								# No data
								pass
							except Exception as err:
								contxt = 'When creating message: Unable to retrieve max repeat for search key <%s>, %s' % (val[0],repr(err))
								raise Error(contxt)


					# repeat_count property takes precedence over max_repeats property.
					# If repeat_count is defined, repeat this element that many times.
					# Otherwise if max_repeats is defined, repeat this element that many times.
					# Else, traverse this element once.
					limit = 0
					if has_rep_cnt:
						limit = rep_cnt
					elif has_max_reps:
						limit = max_reps
					else:
						limit = 1

					try:
						val_list = val[6]
					except IndexError as err:
						val_list = []

					try:
						fld_desc = val[4]
					except IndexError as err:
						fld_desc = ""

					try:
						fld_modfr = val[1]
					except IndexError as err:
						fld_modfr = ""

					try:
						dflt_val = val[5]
						dbgmsg = 'Z:dflt_val=(%s)' % (dflt_val)
						#self._logr.write_debug(dbgmsg)

					except IndexError as err:
						dflt_val = ""

					rIdx = 0
					while rIdx < limit:
						# Traverse to next search key

						# Update the progress of the repeat section
						if (has_rep_cnt or has_max_reps) and rep_level_list:
							rep_level_list[-1][0] = rIdx

						if content_format == 2 and cnt != 0:
							msg += ','

						msg = self.__write_msg_now(val[0], rIdx, val_list, dflt_val, fld_delim, rep_level_list, msg,
													content_format, fld_desc, fld_modfr, indent_level+1, path, max_reps)

						rIdx += 1

					# Remove the repeat level once the repeating ceases
					if (has_rep_cnt or has_max_reps) and added_to_list and rep_level_list:
						del rep_level_list[-1]

					cnt += 1

				if content_format == 2:
					msg += ']'
					msg += '}'

				elif content_format == 3:
					try:
						elemnm = self._fld_map[search_key]
					except KeyError as err:
						elemnm = search_key
					msg += '</'
					msg += elemnm
					msg += '>'

				elif content_format == 4:
					if len(items) > 0:
						msg += '</xs:sequence>'
						msg += '</xs:complexType>'
						msg += '\n'

					msg += '</xs:element>'
					msg += '\n'
	
			except KeyError as err:
				# Reached the leave of the tree, write the value
				final_val = ''
				try:
					didx = self._decode(rep_level_list)
					final_val = str(value_list[didx])
					dbgmsg = 'A:final_val=(%s), value_list=(%s)' % (final_val, value_list)
					#self._logr.write_debug(dbgmsg)
				except IndexError as err:
					# This field has no specified value, use default value
					didx = 0
					final_val = str(default_val)
					dbgmsg = 'B:final_val=(%s), value_list=(%s)' % (final_val, value_list)
					#self._logr.write_debug(dbgmsg)

				if content_format == 1:
					(typ, fldlen) = self._fld_meta_data(search_key, fld_modfr)
					dbgmsg = '(typ,fldlen)=(%s,%d)' % (typ,fldlen)
					#self._logr.write_debug(dbgmsg)
					indent_space = (' ' * indent_level)
					msg += typ.ljust(self._hdr_fld_typ_width, ' ')
					msg += str(fldlen).ljust(self._hdr_fld_len_width, ' ')

					# NOTE: Don't use '<' as the start of field value marker because it has
					# special meaning to browser. e.g. if the field value start with L, the
					# resulting text "<L..." cause the rest of the value string to be ignored.
					# Therefore, flip it around ... field value marker is now between > and <.
					msg += str('>')
					msg += final_val
					msg += str('<')

				elif content_format == 2:
					(typ, fldlen) = self._fld_meta_data(search_key, fld_modfr)
					msg += ','
					msg += '"type":'
					msg += '"'
					msg += typ
					msg += '"'
					msg += ','
					msg += '"size":'
					msg += str(fldlen)
					msg += ','
					msg += '"value":'
					msg += '"'
					msg += final_val
					msg += '"'
					msg += '}'

				elif content_format == 3:
					#self._update_xml_dom(self._fld_map[path], final_val, didx)
					try:
						elemnm = self._fld_map[search_key]
					except KeyError as err:
						elemnm = search_key
					msg += final_val.strip()
					msg += '</'
					msg += elemnm
					msg += '>'

				elif content_format == 4:
					(typ, fldlen) = self._fld_meta_data(search_key, fld_modfr)
					dmsg = '(search_key,typ,fldlen)=(%s,%s,%d)' % (search_key,typ,fldlen)
					self._logr.write_debug(dmsg)
					if typ == 'CONST':
						msg += '<xs:simpleType><xs:restriction base="xs:string"/></xs:simpleType>'
					elif typ == 'ENUM':
						#msg += '<xs:simpleType><xs:restriction base="xs:string"/></xs:simpleType>'
						msg += '<xs:simpleType><xs:restriction base="xs:string">'
						msg += '<xs:enumeration value=""/>'	# do this to allow blank value
						for enum in self._msg_def['enum_def'][search_key]:
							msg += '<xs:enumeration value="' + enum.strip() + '"/>'
						msg += '</xs:restriction></xs:simpleType>'
					elif typ == 'BOOL':
						#msg += '<xs:simpleType><xs:restriction base="xs:string"/></xs:simpleType>'
						msg += '<xs:simpleType><xs:restriction base="xs:string">'
						msg += '<xs:enumeration value=""/>'	# do this to allow blank value
						for enum in self._msg_def['truth_def'][search_key]:
							msg += '<xs:enumeration value="' + enum.strip() + '"/>'
						msg += '</xs:restriction></xs:simpleType>'
					elif typ == 'ASCII_DDdMMdCCYYHHcMMcSS':
						msg += '<xs:simpleType><xs:restriction base="xs:string"><xs:maxLength value="' + str(fldlen) + '"/></xs:restriction></xs:simpleType>'
					elif typ == 'ASCII_9':
						msg += '<xs:simpleType><xs:restriction base="xs:integer"><xs:maxInclusive value="' + ('9' * fldlen) + '"/></xs:restriction></xs:simpleType>'
					elif typ == 'ASCII_X' or typ == 'IGNORED':
						msg += '<xs:simpleType><xs:restriction base="xs:string"><xs:maxLength value="' + str(fldlen) + '"/><xs:whiteSpace value="preserve"/></xs:restriction></xs:simpleType>'
					elif typ == 'ASCII_S9d9':
						msg += '<xs:simpleType><xs:restriction base="xs:decimal"><xs:minInclusive value="-' + ('9' * (fldlen-3)) + '.9"/><xs:maxInclusive value="' + ('9' * (fldlen-3)) + '.9"/></xs:restriction></xs:simpleType>'
					elif typ == 'ASCII_S9':
						msg += '<xs:simpleType><xs:restriction base="xs:integer"><xs:minInclusive value="-' + ('9' * (fldlen-1)) + '"/><xs:maxInclusive value="' + ('9' * (fldlen-1)) + '"/></xs:restriction></xs:simpleType>'
					elif typ == 'ASCII_9d9999':
						msg += '<xs:simpleType><xs:restriction base="xs:decimal"><xs:maxInclusive value="' + ('9' * (fldlen-5)) + '.9999"/></xs:restriction></xs:simpleType>'


					msg += '</xs:element>'
					msg += '\n'

				else:
					msg += final_val
					msg += fld_delim

		except Exception as err:
			# Error occurred, continue so that the message can be printed to show where the error is.
			pass

		return msg


	def write_msg(self, fld_delimiter='', content_format=0):
		"""
			Generate an Omega messsage based on the populated Omega Message Definition structure.
			content format:
			0 = string
			1 = human readable
			2 = json
			3 = xml
		"""

		#msg = 'write_msg()'
		#self._logr.write_debug(msg)

		msg_str = ""

		hdr = ""
		if content_format == 1:
			hdr += self._hdr_fld_sep
			hdr += '\n'
			#hdr += self._hdr_fld_nm.ljust(self._hdr_fld_nm_width, ' ')
			hdr += self._hdr_fld_desc.ljust(self._hdr_fld_desc_width, ' ')
			hdr += self._hdr_fld_typ.ljust(self._hdr_fld_typ_width, ' ')
			hdr += self._hdr_fld_len.ljust(self._hdr_fld_len_width, ' ')
			hdr += self._hdr_fld_val.ljust(self._hdr_fld_val_width, ' ')
			hdr += '\n'
			hdr += self._hdr_fld_sep
			msg_str = hdr

		msg_str = self.__write_msg_now(self._msg_main, 0, [], "", fld_delimiter, [], msg_str, content_format, "", "", 0, "", 0)

		if content_format == 1:
			msg_str += str('\n')
			msg_str += self._hdr_fld_sep

		elif content_format == 3:
			# In python3, there is distinction between string and binary, therefore, decode() must be used.
			#msg_str += etree.tostring(self._xmltree, pretty_print=True).decode()
			# WARNING: fromstring() do not like <?xml...?>. Add it afterward
			xmlhdr = '<?xml version="1.0" encoding="UTF-8"?>'
			dom = etree.fromstring(msg_str)
			msg_str = xmlhdr + '\n' + etree.tostring(dom, pretty_print=True).decode()

		elif content_format == 4:
			# WARNING: fromstring() do not like <?xml...?>. Add it afterward
			xmlhdr = '<?xml version="1.0" encoding="UTF-8"?>'
			schmhdr = '<xs:schema xmlns="http://DKI.Omega.Schema.' + self._msg_main + '" xmlns:xs="http://www.w3.org/2001/XMLSchema">'
			schmend = '</xs:schema>'
			final_str = xmlhdr + '\n' + schmhdr + '\n' + msg_str + '\n' + schmend
			dom = etree.fromstring(final_str)
			msg_str = etree.tostring(dom, pretty_print=True).decode()

		#msg = 'msg_str=<%s>' % msg_str
		#self._logr.write_debug(msg)

		return msg_str

	def _update_repeat_count(self, search_key, rep_level_list, override=False):
		"""Update the "repeat_count" field of the specified search_key."""

		#msg = '_update_repeat_count(%s,%s,%s)' % (search_key, rep_level_list, override)
		#self._logr.write_debug(msg)

		# Find all sub elements of search_key that has "repeat_count" property
		list = [[v[0],v[3]] for i,v in enumerate(self._msg_def['sub_def'][search_key]) if v[3] != '']

		for item in list:

			# Calculate the number of times this element is repeated
			max_len = 0
			try:
				max_len = max([len(v[6]) for i,v in enumerate(self._msg_def['sub_def'][item[0]]) if len(v) >= 7 and v[6] != ''])
			except ValueError as err:
				# ValueError: max() arg is an empty sequence
				None

			# Find the sub element of search_key that this item relates to
			upd_items = [v for v in self._msg_def['sub_def'][search_key] if v[4] == item[1]]
			for itm in upd_items:

				itm_spec = self._msg_def['std_fld_def'][itm[0]]
				fld_length = int(itm_spec[1])
				empty_char = itm_spec[2]
				pad_mode = itm_spec[10]

				# If the list is empty, add the value. Otherwise, decode the index and check that the existence
				# of the data at the decoded index. Only add the value if the decoded data do not exist.
				# This gives user two options: 1) Directly map the field; 2) Let the program calculate it
				try:
					value_list = itm[6]
				except IndexError as err:
					# value list do not exist, create it.

					# Compute final value
					final_val = self._apply_padding(itm[0], itm_spec, str(max_len))
					itm.append([final_val])
				else:
					dIdx = self._decode(rep_level_list)
					try:
						value = itm[6][dIdx]

						# Find the difference of value list max len and sum of item before repeat count list
						try:
							rp_sum = sum([int(v) for i,v in enumerate(itm[6]) if i < dIdx])
						except Exception as err:
							contxt = 'When filling message: unable to update repeat count for search key %s, %s' % (search_key,repr(err))
							raise Error(contxt)
						diff = max_len - rp_sum
					
						# Compute final value
						final_val = self._apply_padding(itm[0], itm_spec, str(diff))

						if override:
							itm[6][dIdx] = final_val
					except IndexError as err:
						# Item do not exist, create it.
						itm[6].append(final_val)

	def _has_repeat_count(self, search_key):
		"""Returns True if the components of the specified search key has a "repeat_count" property."""

		#msg = '_has_repeat_count(%s)' % search_key
		#self._logr.write_debug(msg)

		has_rep_cnt = False
		#if next(i for i,v in enumerate(self._msg_def[search_key]) if v[3]) != -1:
		try:
			var = [i for i,v in enumerate(self._msg_def['sub_def'][search_key]) if v[3] != '']
		except Exception as err:
			# Search key do not exists
			var = []

		if len(var) > 0:
			has_rep_cnt = True

		#msg = 'has_rep_cnt=<%d>' % has_rep_cnt
		#self._logr.write_debug(msg)

		return has_rep_cnt

	def _add_default_value(self, path, default_val, add_to_this_dict=None):
		"""Add the specified default value to the Omega Message Definition structure.
		   If it exists, update it.
		"""

		#msg = '_add_default_value(%s,%s)' % (path, default_val)
		#self._logr.write_debug(msg)

		if add_to_this_dict != None:
			dict = add_to_this_dict
		else:
			dict = self._msg_def

		tmp = path.split('.')
		parent = tmp[-2]
		child = tmp[-1]
		idx = next(i for i,v in enumerate(dict['sub_def'][parent]) if v[0] == child)
		if idx != -1:
			# Record exists, add the specified value to the 6th position of the list

			try:
				# default value exists, update it
				dict['sub_def'][parent][idx][5] = default_val

			except IndexError as err:
				# default value do not exists, create it
				dict['sub_def'][parent][idx].append(default_val)
		

	def _add_value_list(self, path, val, add_to_this_dict=None):
		"""Add the specified value list to the Omega Message Definition structure.
	
		E.g. For SGC_LOAD_ORDER.SGC_MSG_HEADER_2.SGC_MSG_TYPE,
			['SGC_MSG_TYPE', '', '', '', 'Message Type', '        '] --> ['SGC_MSG_TYPE', '', '', '', 'Message Type', '        ', ['SHOM03  ']]
		"""

		#msg = '_add_value_list(%s,%s)' % (path, val)
		#self._logr.write_debug(msg)

		if add_to_this_dict != None:
			dict = add_to_this_dict
		else:
			dict = self._msg_def

		tmp = path.split('.')
		parent = tmp[-2]
		child = tmp[-1]
		idx = next(i for i,v in enumerate(dict['sub_def'][parent]) if v[0] == child)
		if idx != -1:
			# Record exists, add the specified value to the 7th position of the list

			try:
				# value list exists, append to it
				dict['sub_def'][parent][idx][6].append(val)

			except IndexError as err:
				# value list do not exists, create it
				dict['sub_def'][parent][idx].append([val])

	def _update_value_list(self, path, dIdx, val, update_this_dict=None):
		"""Update the value list at the specified index in the Omega Message Definition structure.
		   If the list do not exist, add it.
	
		E.g. For SGC_LOAD_ORDER.SGC_MSG_HEADER_2.SGC_MSG_TYPE,
			['SGC_MSG_TYPE', '', '', '', 'Message Type', '        ',  ['SHOM03  ']] --> ['SGC_MSG_TYPE', '', '', '', 'Message Type', '        ', ['ABCDEF  ']]
		"""

		#msg = '_update_value_list(%s,%s,%s)' % (path, idx, val)
		#self._logr.write_debug(msg)

		if update_this_dict != None:
			dict = update_this_dict
		else:
			dict = self._msg_def

		tmp = path.split('.')
		parent = tmp[-2]
		child = tmp[-1]
		idx = next(i for i,v in enumerate(dict['sub_def'][parent]) if v[0] == child)
		if idx != -1:
			# Record exists, add the specified value to the 7th position of the list

			try:
				# value list exists, update data at specified index
				if dict['sub_def'][parent][idx][6]:
					try:
						dict['sub_def'][parent][idx][6][dIdx] = val
					except IndexError as err:
						self._msg_def['sub_def'][parent][idx][6].append(val)

			except IndexError as err:
				# value list do not exists, create it
				dict['sub_def'][parent][idx].append([val])

	def _apply_padding(self, search_key, spec, value):
		"""Apply the specified spec to the specified value and return the result."""

		final_val = ""

		if spec != [] and spec != '' and value != [] and value != '':	

			length = int(spec[1])
			empty_char = spec[2]

			data_len = len(str(value))
			padding = (empty_char * (length-data_len))
			pad_mode = spec[10]
			if length > data_len:
				if pad_mode == 'L':
					# prepend the empty char
					final_val += padding
					final_val += value
				elif pad_mode == 'R':
					# Otherwise, append the empty char
					final_val += value
					final_val += padding
				else:
					# Invalid mode
					contxt = 'When applying padding: %s is not a valid pad mode' % (pad_mode)
					raise Error(contxt)
			elif length == data_len:
				final_val += value
			else:
				contxt = 'When filling msg_def: (%s,%s) too long to fit into %d chars' % (search_key,value,length)
				raise Error(contxt)
		else:
			final_val = value

		return final_val

	def _str_to_struct_tm(self, date_str, date_str_fmt):
		"""Converts a date string to struct tm"""

		stm = ""
		if date_str_fmt == 'ASCII_CCYYMMDDHHMM':
			stm = time.strptime(date_str, "%Y%m%d%H%M")
		elif date_str_fmt == 'ASCII_CCYYMMDD':
			stm = time.strptime(date_str, "%Y%m%d")
		elif date_str_fmt == 'ASCII_DDMMMYYHHcMM':
			stm = time.strptime(date_str, "%d%b%y%H:%M")
		elif date_str_fmt == 'ASCII_DDMMMYY':
			stm = time.strptime(date_str, "%d%b%y")
		elif date_str_fmt == 'ASCII_DDdMMdCCYYHHcMMcSS':
			stm = time.strptime(date_str, "%d.%m.%Y%H:%M:%S")
		elif date_str_fmt == 'ASCII_DDdMMdCCYY':
			stm = time.strptime(date_str, "%d.%m.%Y")
		elif date_str_fmt == 'ASCII_DDMMYY':
			stm = time.strptime(date_str, "%d%m%y")
		elif date_str_fmt == 'ASCII_YYMMDD':
			stm = time.strptime(date_str, "%y%m%d")
		elif date_str_fmt == 'ASCII_HHMM':
			stm = time.strptime(date_str, "%H%M")
		elif date_str_fmt == 'ASCII_HHMMSS':
			stm = time.strptime(date_str, "%H%M%S")
		elif date_str_fmt == 'ASCII_CCYYMMDDHHcMM':
			stm = time.strptime(date_str, "%Y%m%d%H:%M")
		elif date_str_fmt == 'ASCII_CCYYsMMsDD':
			stm = time.strptime(date_str, "%Y/%m/%d")
		else:
			contxt = 'When converting date string to struct tm: %d is not a valid format' % (date_str_fmt)
			raise Error(contxt)

		return stm

	def _reformat(self, from_fld_spec, to_fld_spec, data):
		"""
		* Converts the specified data from one format to another.
		* Result is a string representation.
		* Returns original value if it is null or empty.
		"""

		try:
			from_format = from_fld_spec[0]
		except IndexError as err:
			from_format = ""

		try:
			to_format = to_fld_spec[0]
		except IndexError as err:
			to_format = ""

		#if data != None and data != "" and from_format != to_format:
		if data != None and data != "":

			try:
				to_scale_pow = to_fld_spec[6]
			except IndexError as err:
				to_scale_pow = ""

			if to_format == 'ASCII_X':
				value = self.__real_value(from_fld_spec, data)
				if to_scale_pow:
					value = str(int(float(value) * (10**int(to_scale_pow))))
				return value
				#return str(value)
			elif to_format == 'ASCII_9':
				value = self.__real_value(from_fld_spec, data)
				if to_scale_pow:
					value = str(int(float(value) * (10**int(to_scale_pow))))
				return value
				#return str(int(value))
			elif to_format == 'ASCII_S9':
				value = self.__real_value(from_fld_spec, data)
				if to_scale_pow:
					value = str(int(float(value) * (10**int(to_scale_pow))))
				if float(value) > 0:
					value = '+' + value
				return value
			elif to_format == 'ASCII_9S':
				value = self.__real_value(from_fld_spec, data)
				if to_scale_pow:
					value = str(int(float(value) * (10**int(to_scale_pow))))
				return value
			elif to_format == 'ASCII_9d9':
				if to_scale_pow:
					contxt = 'When reformatting data: scale power is not applicable to format <%s>' % (to_format)
					raise Error(contxt)

				value = self.__real_value(from_fld_spec, data)
				idx = value.find('.')
				if idx == -1:
					# No decimal point
					value += ('.0')
				else:
					# Found the decimal point
					# NOTE: In python, the [X:Y] syntax means starts from index X, and retrieve Y number of items.
					# Y is NOT the index, it is the count.
					dec_part = value[idx+1:]
					value = value[:idx+1] + dec_part.ljust(1, '0')
				return  value
			elif to_format == 'ASCII_S9d9':
				if to_scale_pow:
					contxt = 'When reformatting data: scale power is not applicable to format <%s>' % (to_format)
					raise Error(contxt)

				value = self.__real_value(from_fld_spec, data)
				if float(value) > 0:
					value = '+' + value
				idx = value.find('.')
				if idx == -1:
					# No decimal point
					value += ('.0')
				else:
					# Found the decimal point
					# NOTE: In python, the [X:Y] syntax means starts from index X, and retrieve Y number of items.
					# Y is NOT the index, it is a count.
					dec_part = value[idx+1:]
					value = value[:idx+1] + dec_part.ljust(1, '0')
				return  value
			elif to_format == 'ASCII_9d9999':
				if to_scale_pow:
					contxt = 'When reformatting data: scale power is not applicable to format <%s>' % (to_format)
					raise Error(contxt)

				value = self.__real_value(from_fld_spec, data)
				idx = value.find('.')
				if idx == -1:
					# No decimal point
					value += ('.0000')
				else:
					# Found the decimal point
					# NOTE: In python, the [X:Y] syntax means starts from index X, and retrieve Y number of items.
					# Y is NOT the index, it is the count.
					dec_part = value[idx+1:]
					value = value[:idx+1] + dec_part.ljust(4, '0')
				return  value
			elif to_format == 'ASCII_S9d9999':
				if to_scale_pow:
					contxt = 'When reformatting data: scale power is not applicable to format <%s>' % (to_format)
					raise Error(contxt)

				value = self.__real_value(from_fld_spec, data)
				if float(value) > 0:
					value = '+' + value
				idx = value.find('.')
				if idx == -1:
					# No decimal point
					value += ('.0000')
				else:
					# Found the decimal point
					# NOTE: In python, the [X:Y] syntax means starts from index X, and retrieve Y number of items.
					# Y is NOT the index, it is the count.
					dec_part = value[idx+1:]
					value = value[:idx+1] + dec_part.ljust(4, '0')
				return value
			elif to_format == 'ASCII_CCYYMMDDHHMM' \
				or to_format == 'ASCII_CCYYMMDD' \
				or to_format == 'ASCII_DDMMMYYHHcMM' \
				or to_format == 'ASCII_DDMMMYY' \
				or to_format == 'ASCII_DDdMMdCCYYHHcMMcSS' \
				or to_format == 'ASCII_DDdMMdCCYY' \
				or to_format == 'ASCII_DDMMYY' \
				or to_format == 'ASCII_YYMMDD' \
				or to_format == 'ASCII_HHMM' \
				or to_format == 'ASCII_HHMMSS' \
				or to_format == 'ASCII_CCYYMMDDHHcMM' \
				or to_format == 'ASCII_CCYYsMMsDD' \
				or to_format == 'ASCII_HHcMMcSS':

				if from_format == 'ASCII_CCYYMMDDHHMM' \
					or from_format == 'ASCII_CCYYMMDD' \
					or from_format == 'ASCII_DDMMMYYHHcMM' \
					or from_format == 'ASCII_DDMMMYY' \
					or from_format == 'ASCII_DDdMMdCCYYHHcMMcSS' \
					or from_format == 'ASCII_DDdMMdCCYY' \
					or from_format == 'ASCII_DDMMYY' \
					or from_format == 'ASCII_YYMMDD' \
					or from_format == 'ASCII_HHMM' \
					or from_format == 'ASCII_HHMMSS' \
					or from_format == 'ASCII_CCYYMMDDHHcMM' \
					or from_format == 'ASCII_CCYYsMMsDD' \
					or from_format == 'ASCII_HHcMMcSS':
						stm = self._str_to_struct_tm(data, from_format)
				elif from_format == 'TIME_STRUCT_TM':
					stm = data
				else:
					# Unknown source format
					contxt = 'When reformatting data: source format <%s> is not valid' % (from_format)
					raise Error(contxt)

				year = str(stm[0]).zfill(4)
				year_short = str(stm[0])[-2:].zfill(2)
				month = str(stm[1]).zfill(2)
				day = str(stm[2]).zfill(2)
				hour = str(stm[3]).zfill(2)
				minute = str(stm[4]).zfill(2)
				second = str(stm[5]).zfill(2)
				if to_format == 'ASCII_CCYYMMDDHHMM':
					return (year + month + day + hour + minute)
				elif to_format == 'ASCII_CCYYMMDD':
					return (year + month + day)
				elif to_format == 'ASCII_DDMMMYYHHcMM':
					return (day + month + year_short + hour + ":" + minute)
				elif to_format == 'ASCII_DDMMMYY':
					# mktime doesn't like it if stm contains only valid values for HHMMSS,
					# so only do this inside here.
					month_nm = time.strftime("%b", time.gmtime(time.mktime(stm)))
					return (day + month_nm + year_short)
				elif to_format == 'ASCII_YYMMDD':
					return (year_short + month + day)
				elif to_format == 'ASCII_HHMM':
					return (hour + minute)
				elif to_format == 'ASCII_HHMMSS':
					return (hour + minute + second)
				elif to_format == 'ASCII_CCYYMMDDHHcMM':
					return (year + month + day + hour + ":" + minute)
				elif to_format == 'ASCII_CCYYsMMsDD':
					return (year + "/" + month + "/" + day)
				elif to_format == 'ASCII_HHcMMcSS':
					return (hour + ":" + minute + ":" + second)
				else:
					# Unknown target format
					contxt = 'When reformatting data: target format %s is not valid' % (to_format)
					raise Error(contxt)
			else:
				# TODO: Check other types...
				contxt = 'When reformatting data: target format %s is not implemented' % (to_format)
				raise Error(contxt)
		else:
			return data

	def __retrieve_path_val(self, idx, spec, val):
		"""
		* Recursively traverse the dictionary following the specified path.
		* Returns the spec and value of the specified path if the path exists, otherwise, returns a tuple of two empty lists.
		"""

		if idx == len(self._path_itm_list)-1:
			# Reached end of path
			return (spec,val)
		else:
			try:
				cur_path_itm = self._path_itm_list[idx]
			except IndexError as err:
				cur_path_itm = ""

			try:
				nxt_path_itm = self._path_itm_list[idx+1]
			except IndexError as err:
				nxt_path_itm = ""

			cur_path_itm_sub_list = self._dict['sub_def'][cur_path_itm]
			found = False
			try:
				for itm in cur_path_itm_sub_list:
					if nxt_path_itm != "" and itm[0] == nxt_path_itm:
						# Found the item, retrieves its spec and value
						found = True
						try:
							fld_spec = self._dict['std_fld_def'][itm[0]]
						except KeyError as err:
							# No spec
							fld_spec = []
						try:
							dat = itm[6]
						except IndexError as err:
							# No data
							dat = []
						break
			except IndexError as err:
				# No data
				dat = []

			if found: 
				return self.__retrieve_path_val(idx+1, fld_spec, dat)
			else:
				# The specified path do not exist in the dictionary, just return nothing
				return ([],[])

	def __update_path_val(self, idx, val):
		"""
		* Recursively traverse the dictionary following the specified path.
		* Updates the path value if the path exists, otherwise, raise exception.
		"""

		if idx == len(self._path_itm_list)-2:
			# Reached last two elements of the specified path in dictionary, update value list to specified value
			cur_path_itm = self._path_itm_list[idx]
			nxt_path_itm = self._path_itm_list[idx+1]

			fld_idx = 0
			try:
				for rec in self._dict['sub_def'][cur_path_itm]:
					if rec[0] == nxt_path_itm:
						# Found it, update its value

						# Get spec
						found = False
						if not found:
							try:
								fld_spec = self._dict['std_fld_def'][rec[0]]
								found = True
							except KeyError as err:
								# No spec in std_fld_def for this item
								None
						if not found:
							try:
								val_list = self._dict['enum_def'][rec[0]]
								fld_spec = ['ASCII_X',len(val_list[0]),' ',' ','','','','','','','R']
								found = True
							except KeyError as err:
								# No spec in enum_def for this item
								None
						if not found:
							try:
								val = self._dict['const_def'][rec[0]]
								fld_spec = ['ASCII_X',len(val),' ',' ','','','','','','','R']
								found = True
							except KeyError as err:
								# No spec in const_def for this item
								None
						if not found:
							try:
								val = self._dict['truth_def'][rec[0]]
								fld_spec = ['ASCII_X',len(val),' ',' ','','','','','','','R']
								found = True
							except KeyError as err:
								# No spec in truth_def for this item
								None
						if not found:
							# Haven't found any spec
							fld_spec = []

						if type(val) in [list,tuple]:
							try:
								if self._append:
									rec[6].append(val)
								else:
									# Replace the value list
									rec[6] = val
							except IndexError as err:
								# The value list do not exists, add it
								rec.append(val)
						else:
							# Only apply padding to single item variable
							final_val = self._apply_padding(rec[0], fld_spec, val)
							try:
								if self._append:
									rec[6].append(final_val)
								else:
									# Replace the value list
									rec[6] = [final_val]
							except IndexError as err:
								# The value list do not exists, add it
								rec.append([final_val])
						break

			except Error as err:
				contxt = 'When updating path value: failed to find path <%s> in dictionary, %s' % (self._path_itm_list, err.desc_only())
				raise Error(contxt)
			except Exception as err:
				contxt = 'When updating path value: failed to find path <%s> in dictionary, %s' % (self._path_itm_list, repr(err))
				raise Error(contxt)
		else:
			try:
				cur_path_itm = self._path_itm_list[idx]

				try:
					dummy = self._dict['sub_def'][cur_path_itm]
					self.__update_path_val(idx+1, val)
				except KeyError as err:
					# Current path element do not exist in dictionary
					contxt = 'When updating path value: Path <%s> do not exists in dictionary' % (path_itm_list)
					raise Error(contxt)
			except IndexError as err:
				# Unable to access path element list
				contxt = 'When updating path value: Unable to retrieve item at index <%d> in path <%s>' % (idx, path_itm_list)
				raise Error(contxt)

	def _get_val_for_path(self, path, dict_to_traverse):
		"""Returns the spec and value of the specified dot-delimited path in the specified dictionary."""
		self._dict = dict_to_traverse
		self._path_itm_list = path.split('.')
		res = self.__retrieve_path_val(0, [], [])
		return res

	def _set_val_for_path(self, path, dict_to_traverse, val, append=False):
		"""Set the specified value in the specified dictionary for the specified dot-delimited path."""
		self._dict = dict_to_traverse
		self._path_itm_list = path.split('.')
		self._append = append
		self.__update_path_val(0, val)

	def _build_lookup_list(self):
		"""Skeleton function to be overridden"""
		contxt = 'When filling message: function _build_lookup_list() must be overridden.'
		raise Error(contxt)

	def _get_nth_value(self, search_key, lookuplist, idx):
		"""Skeleton function to be overridden"""
		contxt = 'When filling message: function _get_nth_value() must be overridden.'
		raise Error(contxt)

	def _format_is_ok(self, format, value):
		"""
		* Returns true if the specified value is not None or empty and conforms to the specified format.
		* Otherwise, throws exception.
		"""

		res = True

		if value != None and value != "" and not value.isspace():

			if format == 'ASCII_9' \
				or format == 'ASCII_S9' \
				or format == 'ASCII_9S' \
				or format == 'ASCII_S9d9' \
				or format == 'ASCII_9d9999':

				if format == 'ASCII_9':
					val = value
				elif format == 'ASCII_S9':
					if value[0] != '-' and value[0] != '+':
						contxt = 'When checking data vs format: data <%s> do not conform to format <%s>' % (value,format)
						raise Error(contxt)
					else:
						val = value
				elif format == 'ASCII_9S':
					if value[-1] != '-' and value[-1] != '+':
						contxt = 'When checking data vs format: data <%s> do not conform to format <%s>' % (value,format)
						raise Error(contxt)
					else:
						val = value[:-2]
				elif format == 'ASCII_S9d9':
					# Remove the one decimal place by multiplying by 10
					val = value * 10
				elif format == 'ASCII_9d9999':
					# Remove the four decimal places by multiplying by 10000
					val = value * 10000
				else:
					# Unknown format, raise exception
					contxt = 'When checking data vs format: format <%s> is invalid' % format
					raise Error(contxt)

				# Check that the value is in fact numeric ...
				try:
					dummy = int(val)
				except ValueError as err:
					# Not an integer
					contxt = 'When checking data vs format: val <%s> do not conform to format <%s>' % (val,format)
					raise Error(contxt)
			elif format == 'ASCII_X':
				res = True
			elif format == 'ASCII_CCYYMMDDHHMM' \
				or format == 'ASCII_CCYYMMDD' \
				or format == 'ASCII_DDMMMYYHHcMM' \
				or format == 'ASCII_DDMMMYY' \
				or format == 'ASCII_DDdMMdCCYYHHcMMcSS' \
				or format == 'ASCII_DDdMMdCCYY' \
				or format == 'ASCII_DDMMYY' \
				or format == 'ASCII_YYMMDD' \
				or format == 'ASCII_HHMM' \
				or format == 'ASCII_HHMMSS' \
				or format == 'ASCII_CCYYMMDDHHcMM':
					try:
						stm = self._str_to_struct_tm(value, format)
					except Exception as err:
						# Conversion failed
						contxt = 'When checking data vs format: failed to convert data <%s> to format <%s>' % (value,format)
						raise Error(contxt)
			else:
				# TODO: Check other types...
				contxt = 'When checking data vs format: format <%s> is not implemented' % (format)
				raise Error(contxt)
		return res

	def __real_value(self, field_spec, val):
		"""Undo the special formatting applied to val and return the result as a string.
		
		- If the field value is positively signed, the positive sign char will be removed.
		  This gives calling function the option to choose whether to positive sign in
		  the data based on the format it wants.
		- Undo the scaling effect specified by the scale_pow10 property.	
		"""

		#msg = '__real_value(%s,%s)' % (field_spec, val)
		#self._logr.write_debug(msg)

		res = ""

		try:
			type = field_spec[0]
			max_len = int(field_spec[1])
		except IndexError as err:
			contxt = 'When calculating real value: incorrect format spec, %s' % repr(err)
			raise Error(contxt)

		# Check that data length do not exceed the maximum expected length
		if len(val) > max_len:
			contxt = 'When calculating real value: value <%s> is too long, max length is %d chars' % (val,max_len)
			raise Error(contxt)

		if  type == 'ASCII_9' or \
			type == 'ASCII_S9' or \
			type == 'ASCII_9S' or \
			type == 'ASCII_S9d9' or \
			type == 'ASCII_9d9999':

			if type == 'ASCII_9S':
				# This type is numeric character with trailing sign
				last_char = val[-1:]
				if last_char == '-':
					# Move negative sign to front
					val = last_char + val[:-1]
				elif last_char == '+':
					# Drop positive sign 
					val = val[:-1]

			if val == None or val == '':
				#msg = 'res=<%s>' % res
				#self._logr.write_debug(msg)
				return res
			if val.isspace():
				#msg = 'res=<%s>' % res
				#self._logr.write_debug(msg)
				return res

			if field_spec[6]:
				scale_indice = 0
				try:
					scale_indice = int(field_spec[6])
				except ValueError as err:
					contxt = 'When calculating real value: Scale indice <%s> is not numeric, val <%s>, %s' % (field_spec[6], val, repr(err))
					raise Error(contxt)

				try:
					# x**y is the shorthand for pow(x,y)
					res = str(float(val)/(10**scale_indice))
				except:
					contxt = 'When calculating real value:  Failed to undo format <%s> on <%s>' % (type,val)
					raise Error(contxt)
			else:
				# Check that the value is in fact numeric ...
				try:
					dummy = int(val)
				except ValueError as err:
					# Not an integer
					contxt='When calculating real value: val <%s> is not numeric, %s' % (val,repr(err))
					raise Error(contxt)

				# ... return string representation though.
				res = val
		else:
			# If the field is not numeric, strip away white spaces only if it has non-whitespace char.
			# Blindly stripping away white spaces will remove "genuine" data i.e. a particular field
			# may be empty in one iteration but not in the next. E.g. a compartment has three base
			# products 201, 102, 03, where 102 is the additive whose injector code is 010101. So, the
			# injector code for 201 and 03 would be whitespace in the incoming message, indicating
			# there is such a field but is empty. The injector list would be ['      ','010101','      '].
			# Blindly stripping away white spaces will result in the injector list ['010101'] which is
			# not the same.
			if val.strip() != '':
				res = val.strip()
			else:
				res = val

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)
		return res

	def _get_alt_repeat_count(self):
		"""Retrieve repeat count from alternative source. To be overridden."""
		contxt = 'When filling message def: function _get_alt_repeat_count() must be overridden.'
		raise Error(contxt)

	def _get_default_value(self, spec, path):
		"""Return the default value formatted according to specified spec."""

		default_val = ""
		length = int(spec[1])
		empty_char = spec[2]

		# If default value for this msg_def field is specified in msg_def_defaults.py, use it.
		# Otherwise, construct a default value using empty char of this field in msg_def.
		try:
			# Default value is specified
			default_val = msg_def_defaults.msgdef_defaults[path]
			if length > len(default_val):
				default_val += (empty_char * (length-len(default_val)))
			elif length == len(default_val):
				# No need to do anything
				None
			else:
				contxt = 'When filling msg_def: default value %d is too long to fit into %d chars' % (default_val,length)
				raise Error(contxt)
		except KeyError as err:
			# Default value is not specified
			default_val = (empty_char * length)

		return default_val

	def _get_alt_repeat_count(self):
		"""Alternative method for retrieving repeat count."""
		return 0

	def __fill_now(self, search_key, path, mod, idx, rep_level_list):
		"""Helper function that implements the fill functionality.

		- Fill each field in a Message Definiation structure using the specified data file.
		- Recursively traverse the msg_def dictionary using 'search_key' as the start point.
		- Accumulate 'search_key' into 'path' using '.' as separator.
		- 'mod' contains the modified bit added to original search_key. It is added
		  to 'path' to offset the removal of it when computing the search_key. This
		  is required to match the value specified in the configuration.
		- 'rep_level_list' is a list of repeat-level objects. Each repeat-level object is nested inside
		   the one before. Each repeat-level object is a list of two items, item 1 is the current repeat
		   level index, item 2 is a list of repeat count values where each value is the repeat count of
		   the current sub-component for the parent object. This is required for handling nested repeating
		   components e.g. a load detail comprised of multiple loaded compartments where each compartment
		   is comprised of multiple base products.
		   E.g. [[1, ['02']], [0, ['02', '03']]]
				  ^    ^       ^    ^     ^
				  |    |       |    |     |-- number of base products in compartment 2
				  |    |       |    |-------- number of base products in compartment 1
				  |    |       |------------- repeat-level index (zero-based), currently at base products in compartment 1
				  |    |--------------------- number of compartments in load detail
				  |-------------------------- repeat-level index (zero-based), currently at compartment 2
		"""

		#dbgmsg = '__fill_now(%s,%s,%s,%d,%s)' % (search_key, path, mod, idx, rep_level_list)
		#self._logr.write_debug(dbgmsg)

		if path:
			path += '.'
		path += (search_key+mod)

		try:
			cur_search_key = search_key
			has_rep_cnt = self._has_repeat_count(search_key)

			for cntr,val in enumerate(self._msg_def['sub_def'][search_key]):

				# Calculate next search key and determine if original search key has been modified
				unique_key = val[1]
				if unique_key:
					# original search key has been appended with unique_key ("_X...X" where X...X is an integer)
					# Get rid of it here.
					uk_idx = val[0].find(unique_key)
					search_key = val[0][:uk_idx]
					mod = unique_key
				else:
					search_key = val[0]
					mod = ""

				# Determine if the current element has a "repeat_count" property,
				# and if so, retrieve the repeat count value and update the repeat level list
				has_rep_cnt1 = (val[3] != '')
				rep_cnt = 0
				added_to_list = False
				if has_rep_cnt1:
					try:
						rep_cnt_items = [itm for itm in self._msg_def['sub_def'][cur_search_key] if itm[4] == val[3]]
					except KeyError as err:
						contxt = 'When filling message def: Cannot find repeat count item for search key <%s>, %s' % (val[0],repr(err))
						raise Error(contxt)
					#dbgmsg = 'val=<%s>, rep_cnt_items=<%s>, rep_level_list=<%s>' % (val[0], rep_cnt_items, rep_level_list)
					#self._logr.write_debug(dbgmsg)

					# Should have only one in the list. Otherwise, throw exception
					rci_cnt = len(rep_cnt_items)
					if rci_cnt > 1:
						contxt = 'When creating message: Should have only one repeat count item for search key <%s>, have <%d>' % (val[0],rci_cnt)
						raise Error(contxt)
					rci = rep_cnt_items[0]

					# Use current repeat level index (which represents the current iteration of the parent) to find the correct
					# repeat count value.
					if rep_level_list:
						rc_idx = rep_level_list[-1][0]
					else:
						rc_idx = 0
					try:
						rep_cnt = int(rci[6][rc_idx].strip())
						rep_level_list.append([idx,rci[6]])
						added_to_list = True
					except IndexError as err:
						# No data
						#rep_cnt = 0
						rep_cnt = self._get_alt_repeat_count()
						dbgmsg = 'after _get_alt_repeat_count():rep_cnt=<%d>' % rep_cnt
						#self._logr.write_debug(dbgmsg)
					except Exception as err:
						contxt = 'When creating message: Unable to retrieve repeat count for <%s>, %s' % (val[0],repr(err))
						raise Error(contxt)
	
				# Determine if the current element has a "max_repeats" property
				has_max_reps = (val[2] != '')
				max_reps = 0
				if has_max_reps and val[2].isdigit():
					max_reps = int(val[2])
					dbgmsg = 'val[0]=<%s>,max_reps=<%d>' % (val[0], max_reps)
					#self._logr.write_debug(dbgmsg)

					# Use current repeat level index (which represents the current iteration of the parent) to find the correct
					# repeat count value.
					if rep_level_list:
						rc_idx = rep_level_list[-1][0]
					else:
						rc_idx = 0
					try:
						rep_level_list.append([idx,max_reps])
						added_to_list = True
					except IndexError as err:
						# No data
						pass
					except Exception as err:
						contxt = 'When creating message: Unable to retrieve max repeat for search key <%s>, %s' % (val[0],repr(err))
						raise Error(contxt)


				# repeat_count property takes precedence over max_repeats property.
				# If repeat_count is defined, repeat this element that many times.
				# Otherwise if max_repeats is defined, repeat this element that many times.
				# Else, traverse this element once.
				limit = 0
				if has_rep_cnt1:
					limit = rep_cnt
				elif has_max_reps:
					limit = max_reps
				else:
					limit = 1

				rIdx = 0
				while rIdx < limit:
					# Traverse to next search key

					# Update the progress of the repeat section
					if has_rep_cnt1 and rep_level_list:
						rep_level_list[-1][0] = rIdx

					self.__fill_now(search_key, path, mod, rIdx, rep_level_list)
					rIdx += 1

				# Remove the repeat level once the repeating ceases
				if (has_rep_cnt1 or has_max_reps) and added_to_list and rep_level_list:
					del rep_level_list[-1]

			# If item has "repeat_count" in schema, update count using length of value list
			if has_rep_cnt:
				self._update_repeat_count(cur_search_key, rep_level_list)

		except KeyError as err:

			# Calculate data index
			dIdx = self._decode(rep_level_list)

			# Must be in either const_def, std_fld_def or enum_def dictionaries
			found = False
			try:
				if not found and self._msg_def['const_def'][search_key]:
					final_val = self._msg_def['const_def'][search_key]
					# Use the const value as default value.
					# DO NOT add to value list. Doing so will cause "repeating sections"
					# to occur "max_repeats" number of times.
					self._add_default_value(path, final_val)
					self._add_value_list(path, final_val)
					found = True
			except KeyError as err:
				None

			try:
				if not found and self._msg_def['std_fld_def'][search_key]:
					(from_fld_spec, value) = self._get_nth_value(path, self._lookuplist, dIdx)

					try:
						from_fmt = from_fld_spec[0]
					except IndexError as err:
						from_fmt = ""
					try:
						from_scale_pow = from_fld_spec[6]
					except IndexError as err:
						from_scale_pow = ""

					# Check that data-to-be-mapped matches the target format
					to_fld_spec = self._msg_def['std_fld_def'][search_key]
					to_format = to_fld_spec[0]
					length = int(to_fld_spec[1])
					empty_char = to_fld_spec[2]

					try:
						value = self._reformat(from_fld_spec, to_fld_spec, value)
					except Exception as err:
						contxt='When filling msg_def: field <%s> value <%s> cannot be converted from format <%s> to format <%s>, %s' % (search_key,value,from_fmt, to_format, err)
						raise Error(contxt)

					default_val = self._get_default_value(to_fld_spec, path)
					dbgmsg = 'default_val=<%s>' % (default_val)
					#self._logr.write_debug(dbgmsg)


					self._add_default_value(path, default_val)

					final_val = self._apply_padding(search_key, to_fld_spec, value)
					if final_val:
						self._add_value_list(path, final_val)
					else:
						self._add_value_list(path, default_val)
					found = True
			except KeyError as err:
				None

			try:
				if not found and self._msg_def['enum_def'][search_key]:
					try:
						(from_fld_spec, value) = self._get_nth_value(path, self._lookuplist, dIdx)
					except Error:
						value = None
					final_val = ""
					length = len(self._msg_def['enum_def'][search_key][0])
					default_val = ' ' * length
					self._add_default_value(path, default_val)
					if value:
						# TODO: Check that value exists in msg_def;
						# for now, let Omega handle the error if value is invalid
						final_val += value
						# TODO: calculate length based on the value it finds, not just the first one
						if length > len(value):
							final_val += ' ' * (length - len(value))
						found = True
						self._add_value_list(path, final_val)
					else:
						# Can't find the value, use spaces
						final_val += ' ' * length
			except KeyError as err:
				None

	def fill(self):
		"""Returns an Omega Message Definition dictionary populated using the parameters specified in the constructor."""

		dbgmsg = 'fill()'
		#self._logr.write_debug(dbgmsg)

		self.__fill_now(self._msg_main, "", "", 0, [])
		return self._msg_def

	def save(to_file):
		"""Saves the current Omega Message Definition dictionary to file."""

		msg = 'save(%s)' % to_file
		#self._logr.write_debug(msg)

		with open(to_file, 'w') as msgdeff:
			cPickle.dump(self._msg_def)


class LenMRecToOmTreeConverter(TextToOmTreeConverter):
	"""
	* Inherits the functionality provided by base class, TextToOmTreeConverter (mainly the conversion to Omega message).
	* Overrides/adds functions to extract data from a Python dictionary representing a length-based, multi-record message
	* Converts a text message dictionary (length-delimited,multi-record) to an Omega message (length-delimited,tree).
	* The format of the text message dictionary was already created by the corresponding parser, LenMRecParser.
	* The functions to override are:
	   - build lookup list
	   - get nth value
	"""

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst):
		TextToOmTreeConverter.__init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst)

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst, fld_map_file=None, reverse_order=False):
		TextToOmTreeConverter.__init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst, fld_map_file, reverse_order)

	def _build_lookup_list(self):
		"""Build a version of data file which contain only entries that has Omega fields defined."""

		msg = '_build_lookup_list()'
		#self._logr.write_debug(msg)

		res = []
		for k,v in self._in_data.items():
			for val in v:
				for vl in val:
					try:
						if vl[2] and vl[3]:
							res += [vl]
					except IndexError as err:
						# No Omega field specified, just ignore.
						None

		msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _get_nth_value(self, search_key, lookuplist, idx):
		"""Returns value of the item at index idx that matches the specified search_key."""

		#msg = '_get_nth_value(%s,%s,%d)' % (search_key, lookuplist, idx)
		#self._logr.write_debug(msg)

		res = ""
		vals = [i[1] for i in lookuplist if i[3] == search_key]
		if vals:
			try:
				res += vals[idx]
			except IndexError as err:
				# Can't find search_key at idx
				contxt = 'When filling Omega Message Definition dictionary with data: %s' % repr(err)
				raise Error(contxt)
		else:
			# no data
			None

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res


class DlimSRecToOmTreeConverter(TextToOmTreeConverter):
	"""
	* Inherits the functionality provided by base class, TextToOmTreeConverter (mainly the conversion to Omega message).
	* Overrides/adds functions to extract data from a Python dictionary representing a TAB-delimietd, single-record message
	* Converts a text message dictionary (TAB-delimited,single-record) to an Omega message (length-delimited,tree). Delimiter character
	  is configurable at class-scope. By default, it will be a TAB character.
	* The format of the text message dictionary was already created by the corresponding parser, DlimSRecParser.
	* The functions to override are:
	   - build lookup list
	   - get nth value
	"""

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst, delim='\t'):
		super(DlimSRecToOmTreeConverter,self).__init__(in_data_dict, msg_def_dict, msg_main, logr_inst)
		self.__delim = delim

	def _build_lookup_list(self):
		"""Build a version of data file which contain only entries that has Omega fields defined."""

		msg = '_build_lookup_list()'
		#self._logr.write_debug(msg)

		res = []
		for k,v in self._in_data['std_fld_def'].items():
			try:
				if v[8]:
					mapto_list = v[8].split('|')
					v[8] = mapto_list
					res += [(k,v)]
			except IndexError as err:
				# No Omega field specified, just ignore.
				None

		msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _get_nth_value(self, search_key, lookuplist, idx, from_dict=None):
		"""
		* Returns value of the item at index idx that matches the specified search_key.
		* If the search key has no value at index idx, returns None.
		"""

		#msg = '_get_nth_value(%s,%s,%d)' % (search_key, lookuplist, idx)
		#msg = '_get_nth_value(%s,%s,%d)' % (search_key, 'lookuplist', idx)
		#self._logr.write_debug(msg)

		if from_dict != None:
			dict = from_dict
		else:
			dict = self._in_data

		res = ""
		fld_spec = ""

		# Find the field name that has the specified search key
		fld_nm_list=[]
		try:
			#fld_nm_list = [tuple[0] for tuple in lookuplist if tuple[1][8] == search_key]
			#fld_nm_list = [tuple[0] for mapto in tuple[1][8] for tuple in lookuplist if mapto == search_key]
			for tuple in lookuplist:
				for mapto in tuple[1][8]:
					if mapto == search_key:
						fld_nm_list.append(tuple[0])	
		except (KeyError, IndexError) as err:
			# lookuplist do not have search key, shouldn't happen
			contxt = 'When retrieving data using lookup list: %s' % repr(err)
			raise Error(contxt)

		if fld_nm_list != []:
			# Find this field in the sub_def dictionary in order to locate the value
			val = None
			found = False
			try:
				for k,v in dict['sub_def'].items():
					for fld in v:
						if fld[0] == fld_nm_list[0]:
							val = fld[6]
							found = True
							break
					if found:
						break
			except (KeyError, IndexError) as err:
				# No data, just return empty
				val = None

			if val != None:
				try:
					res = val[idx].strip()
					#res = val[idx]
				except Exception as err:
					# Can't find any data at idx
					res = ""
				else:
					# Get spec
					try:
						fld_spec = dict['std_fld_def'][fld_nm_list[0]]
						format = fld_spec[0]
					except Exception as err:
						contxt='When retrieving search key value: Unable to retrieve field <%s> format spec, %s' % (fld_nm_list[0],repr(err))
						raise Error(contxt)

					try:
						self._format_is_ok(format, res)
					except Error as err:
						#contxt='When filling msg_def: field <%s> value <%s> do not conform to format <%s>' % (fld_nm_list[0],res,format)
						contxt='Field <%s>: %s' % (fld_nm_list[0],err.desc_only())
						raise Error(contxt)
					except Exception as err:
						raise err

		#msg = 'fld_spec=<%s>,res=<%s>' % (fld_spec,res)
		#self._logr.write_debug(msg)

		return (fld_spec,res)

class OmTreeToTextConverter(object):
	"""
	* A base class that provides function to extract data from an Omega message dictionary.
	* Conversion from an Omega message dictionary to specific text message format will be determined by the functions added/overridden in derived classes.
	* Functions to be added here are:
	  - init
	  - get omega field value
	  - max field data len (to be overridden)
	  - fill (to be overridden)
	  - write message (to be overridden)
	"""

	_host_msg_def = {}
	_om_msg_def = {}
	_msg_main = ""
	_lookuplist = {}
	_logr = None

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst):
		self._host_msg_def.clear()
		self._host_msg_def = in_data_dict
		self._om_msg_def.clear()
		self._om_msg_def = msg_def_dict
		self._om_msg_main = msg_main
		self._lookuplist.clear()
		#self._lookuplist = self._build_lookup_list()
		self._logr = logr_inst

	def _max_fld_data_len(self, rec_hdr):
		"""
		* Returns the maximum length of the value list of the fields in the specified record header.
		* Skeleton function to be overridden.
		"""
		contxt = 'When converting message: function _max_fld_data_len() must be overridden.'
		raise Error(contxt)

	def fill(self):
		"""
		- Returns a text message schema dictionary populated using the parameters specified in the constructor.
		- Skeleton function to be overridden.
		"""
		contxt = 'When filling message: function fill() must be overridden.'
		raise Error(contxt)

	def write_msg(self):
		"""
		- Returns a text message schema dictionary populated using the parameters specified in the constructor.
		- Skeleton function to be overridden.
		"""
		contxt = 'When creating message: function write_msg() must be overridden.'
		raise Error(contxt)

	def delete(self):
		# Skeleton function to be overridden.
		contxt = 'When deleting data: function delete() must be overridden.'
		raise Error(contxt)

	def get_om_fld_value(self, om_fld):
		""" Returns a list of values for the specified omega field (dot-separated)."""

		# TODO: Should traverse the paths in search_key, not just the last two.
		part_list = om_fld.split('.')	
		parent = part_list[-2]
		child = part_list[-1]

		return [fld[5] for fld in self._om_msg_def['sub_def'][parent] if fld[0] == child][0]


class OmTreeToLenMRecConverter(OmTreeToTextConverter):
	"""
	* Inherits the functionality provided by base class, OmTreeToTextConverter (mainly the Omega message data extraction method).
	* Converts an Omega message dictionary (length-delimited, tree) to a text message dictionary (length-delimited,multi-record).
	* A somewhat generic class that do simple one-to-one field mapping.
	* The format of the text message dictionary was already created by the corresponding parser, LenMRecParser.
	* Fill a text message schema dictionary with the passed-in data.
	* Generate a text message based on the populated text message schema dictionary.
	* Functions to override are:
	  - max field data len
	  - fill
	  - write message
	"""

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst):
		super(OmTreeToLenMRecConverter, self).__init__(in_data_dict, msg_def_dict, msg_main, logr_inst)

	def _max_fld_data_len(self, rec_hdr):
		"""Returns the maximum length of the value list of the fields in the specified record header."""

		#msg = '__max_fld_data_len(%s)' % rec_hdr
		#self._logr.write_debug(msg)

		max_len = 0
		try:
			max_len = max([len(rec_fld[4]) for rec_fld in self._host_msg_def[rec_hdr] if len(rec_fld) == 5])
		except ValueError as err:
			# Empty list, therefore, length is zero
			max_len = 0

		#msg = 'max_len=<%d>' % max_len
		#self._logr.write_debug(msg)

		return max_len

	def fill(self):
		"""
		* Returns a text message schema dictionary populated using the parameters specified in the constructor.
		* Method:
		  1. Traverse the target schema dictionary in the order specified in the sequence sub-dictionary, "seq".
		  2. For each field of the header, remove the mapping method and omega field, then retrieve the value
			 and add it to the end of the schema dictionary.	
		"""
	
		msg = 'fill()'
		#self._logr.write_debug(msg)
	
		for rec_hdr in self._host_msg_def['seq']:
			for i,rec_fld in enumerate(self._host_msg_def[rec_hdr]):
				try:
					if len(rec_fld) == 6 and rec_fld[5] != '':

						try:
							value_list = get_om_fld_value(rec_fld[5])

							# Remove the last two components (mapping type, Omega field) of the field, and add the value list
							del self._host_msg_def[rec_hdr][i][-1]
							del self._host_msg_def[rec_hdr][i][-1]

							try:
								self._host_msg_def[rec_hdr][i].append(value_list)
							except IndexError as err:
								# This field has no data at the specified index, do nothing
								None
						except KeyError as err:
							# This field has no data at the specified index, do nothing
							None
						except IndexError as err:
							# This field has no data at the specified index, do nothing
							None
					else:
						# No mapping defined, do nothing
						None
				except IndexError as err:
					# This field has no mapping defined, ignore it.
					None
		return self._host_msg_def

	def write_msg(self):
		"""Returns a text message based on the populated text message schema dictionary."""

		#dbgmsg = 'write_msg()'
		#self._logr.write_debug(dbgmsg)

		msg_str = ""
		for rec_hdr in self._host_msg_def['seq']:
			num_of_rec = self._max_fld_data_len(rec_hdr)
			cnt = 0
			while cnt < num_of_rec:
				for i,rec_fld in enumerate(self._host_msg_def[rec_hdr]):
					try:
						#if len(rec_fld) == 5 and len(rec_fld[4]) > 0 and rec_fld[4] != '':
						if len(rec_fld) == 5 and len(rec_fld[4]) > cnt and rec_fld[4] != '':
							try:
								val_len = len(rec_fld[4][cnt])
								fld_len = int(rec_fld[1])
								if val_len < fld_len:
									# Value length is shorter than field length, pad it with space chars.
									msg_str += (rec_fld[4][cnt] + str(' ' * (fld_len - val_len)))
								elif val_len == fld_len:
									# Value length equals field length, just add it.
									msg_str += rec_fld[4][cnt]
								else:
									# Value is too big for field, raise exception
									print ('ERROR: Value <%s> is long for field length <%d>' % (rec_fld[4][cnt], fld_len))
									sys.exit(1)
							except IndexError as err:
								# Shouldn't happen at all
								contxt = 'When writing Omega message: invalid data in %s, %s' % (rec_fld,repr(err))
								raise Error(contxt)
						else:
							# No data, use space char
							msg_str += str(' ' * int(rec_fld[1]))
					except IndexError as err:
						# No data, use space char
						msg_str += str(' ' * int(rec_fld[1]))

				# TODO: Shouldn't add newline for last record
				msg_str += '\n'
				cnt += 1

		#dbgmsg = 'msg_str=<%s>' % msg_str
		#self._logr.write_debug(dbgmsg)

		return msg_str



class OmTreeToDlimSRecConverter(DlimSRecToOmTreeConverter):
	"""
	* This class is suppose to convert an Omega tree message dictionary to the host message dictionary (TAB delimited, single-record).
	* Since the host message is also structured as a tree, the conversion is essentially from tree (Omega) to tree (Host). There is
	  already a class that does that i.e. DlimSRecToOmTreeConverter.
	"""

	def __init__(self, in_data_dict, msg_def_dict, msg_main, logr_inst, delim='\t'):
		super(OmTreeToDlimSRecConverter,self).__init__(in_data_dict, msg_def_dict, msg_main, logr_inst)
		self.__delim = delim


