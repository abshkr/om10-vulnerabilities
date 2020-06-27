from lxml import etree
#import cPickle
import sys, re, traceback, csv, msg_def_defaults
from errors import *
from xmlvalidator import XmlValidator


#1. Read one line at a time
#2. For each line, look for keywords, "main_message_def" or "sub_message_def".
#3. For each keyword found, get the next word, that is the key of the dictionary.
#4. From here, look for char '{'. Discard everything between dictionary key and this char.
#5. Store every string tokenized by char ';' between char '{' and string "};".
#6. For each string, ...

class TreeParser(object):
	"""Provides parsing functionality for tree structure messages. 
	
	- Parse a tree-structured Message Definition from file into dictionary.
	- Parse an tree-structured message from file into a tree-structured Message Definition dictionary.
	"""

	def __init__(self, logr_inst):
		self._logr = logr_inst
		self.__sub_def = {}
		self.__const_def = {}
		self.__std_fld_def = {}
		self.__enum_def = {}
		self.__truth_def = {}
		self.__cntr = 1

		# To be used by parse_data_file() only
		self._msg_str = ""
		self._msg_def_dict = {}
		self._idx = 0
		self._fld_len = 0

	def _process_truth_def_comp_list_item(self, comp_list):
		"""Returns a list of values for the specified truth value definition."""

		#msg = '_process_truth_def_comp_list_item(%s)' % comp_list
		#self._logr.write_debug(msg)
		res = []
		for item in comp_list:
			tmp = re.sub('["]','',item)
			if tmp and not tmp.startswith("//"):
				res += [tmp.strip()]
		return res

	def _process_truth_def_comp(self, comp):
		"""Split the contents in the curly braces of an truth value definition into a list of entries using semicolon."""

		#msg = '_process_truth_def_comp(%s)' % comp
		#self._logr.write_debug(msg)

		res = comp.split(',');	
		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _process_enum_def_comp_list_item(self, comp_list):
		"""Returns a list of values for the specified enum definition."""

		#msg = '_process_enum_def_comp_list_item(%s)' % comp_list
		#self._logr.write_debug(msg)

		res = []
		for item in comp_list:

			# First, get rid of newlines
			if item != '\n':

				tmp = re.sub('[();]','',item)
				tmp2 = tmp.split(',')
				try:
					tmp6 = tmp2[0]
				except IndexError as err:
					# Can't find data segment, must be bad schema
					contxt = 'When parsing schema: Cannot find data segment for enum entry <%s> in schema, %s' % (item,str(err))
					raise Error(contxt)

				try:
					strt_idx = tmp6.find('"')
					end_idx = tmp6.rfind('"')
					if strt_idx == -1 or end_idx == -1:
						# Can't find data segment, must be bad schema
						contxt = 'When parsing schema: Cannot find data segment for enum entry <%s> in schema' % (item)
						raise Error(contxt)
				except IndexError as err:
					# Can't find data segment, must be bad schema
					contxt = 'When parsing schema: Cannot find data segment for enum entry <%s> in schema, %s' % (item,str(err))
					raise Error(contxt)
				tmp3 = tmp6[strt_idx+1:end_idx]

				if tmp3 and not tmp3.startswith("//"):
					try:
						dummy = [itm for itm in res if itm == tmp3]
						if dummy is None or dummy == []:
							# Item do not exists, add it.
							res += [tmp3]
					except (KeyError, IndexError) as err:
						# Item do not exists, add it.
						res += [tmp3]

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _process_enum_def_comp(self, comp):
		"""Split the contents in the curly braces of an enum definition into a list of entries using semicolon."""

		#msg = '_process_enum_def_comp(%s)' % comp
		#self._logr.write_debug(msg)

		res = comp.split(';');	

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res


	def _process_std_fld_def_line(self, std_fld_def_line):
		"""Returns a list of parameters for the specified standard field definition line.

		Result is a list of properties of a field in the following format:
		[type, length, empty_char, empty_string, truncate, error_string, scale_pow10, utc_format, map_to, source, pad_mode]
		"""

		#msg = '_process_std_fld_def_line(%s)' % std_fld_def_line
		#self._logr.write_debug(msg)

		res = ""
		if std_fld_def_line:
			tmp = re.sub('[();,"]','',std_fld_def_line)
			tmp2 = tmp.split()
			#After the substitution and split, a standard field line becomes:
			#std_fld_def EMHK_TEMPERATURE	scale_pow101   empty_char' '   ASCII_S9 		 4  

			# Look for empty_char property
			emp_char = ""
			emp_char_list = [x for x in tmp2 if 'empty_char' in x]
			if emp_char_list:
				# Empty char is specified
				emp_char = re.sub('[empty_char\'"]','',emp_char_list[0])
				if not emp_char:
					# A space char is specified as empty char but has been removed by the regex substitution
					emp_char = ' '
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use space char as empty char for 'IGNORED' fields
				emp_char = ' '
			else:
				# Empty char not specified
				emp_char = ''
	
			# Look for empty_string property
			emp_str = ""
			emp_str_list = [x for x in tmp2 if 'empty_string' in x]
			if emp_str_list:
				# Empty string is specified
				emp_str = re.sub('[empty_string"]','',emp_str_list[0])
				if not emp_str:
					# Space characters are specified as empty string but have been removed by the regex substitution
					emp_str = ""
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null string as empty string for 'IGNORED' fields
				emp_str = ""
			else:
				# Empty char not specified
				emp_str = ""

			# Look for truncate property
			trunc = ""
			trunc_list = [x for x in tmp2 if 'truncate' in x]
			if trunc_list:
				# Truncate is specified
				trunc = re.sub('[truncate\'"]','',trunc_list[0])
				if not trunc:
					# No value specified for truncate, this is not valid
					contxt = 'When parsing message definition file: invalid truncate value' 
					raise Error(contxt)
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null string as truncate for 'IGNORED' fields
				trunc = ""
			else:
				# truncate not specified
				trunc = ""

			# Look for error_string property
			err_str = ""
			err_str_list = [x for x in tmp2 if 'error_string' in x]
			if err_str_list:
				# error_string is specified
				err_str = re.sub('[error_string\'"]','',err_str_list[0])
				if not err_str:
					# Space characters are specified as empty string but have been removed by the regex substitution
					# TODO: Need to keep the same length of spaces
					err_str = ' '
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null string as error_string for 'IGNORED' fields
				err_str = ""
			else:
				# error_string not specified
				err_str = ""

			# Look for scale_pow10 property
			scale_pow = ""
			scale_pow_list = [x for x in tmp2 if 'scale_pow10' in x]
			#print 'tmp2=<',tmp2,'>,scale_pow_list=<',scale_pow_list,'>'

			if scale_pow_list:
				# scale_pow10 is specified
				scale_pow = scale_pow_list[0][scale_pow_list[0].find('scale_pow10')+len('scale_pow10'):]
				#scale_pow = re.sub('[scale_pow10\'"]','',scale_pow_list[0])
				if not scale_pow:
					# No value specified for indice, this is not valid
					contxt = 'When parsing message definition file: no indice specified for scale_pow10, line %s' % std_fld_def_line
					raise Error(contxt)
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null string as scale_pow10 for 'IGNORED' fields
				scale_pow = ""
			else:
				# scale_pow10 not specified
				scale_pow = ""


			# Look for utc_format property
			utc_fmt = ""
			utc_fmt_list = [x for x in tmp2 if 'utc_format' in x]
			if utc_fmt_list:
				# utc_format is specified
				utc_fmt = 'T'
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null char(i.e. False) as utc_format for 'IGNORED' fields
				utc_fmt = ''
			else:
				# utc_format not specified
				utc_fmt = ''

			# Look for map_to property
			map_to = ""
			map_to_list = [x for x in tmp2 if 'map_to' in x]
			#print 'tmp2=<',tmp2,'>,map_to_list=<',map_to_list,'>'

			if map_to_list:
				# map_to is specified
				map_to = map_to_list[0][map_to_list[0].find('map_to')+len('map_to'):]
				if not map_to:
					# No value specified, this is not valid
					contxt = 'When parsing message definition file: no target field specified for map_to, line %s' % std_fld_def_line
					raise Error(contxt)
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null string as map_to for 'IGNORED' fields
				map_to = ""
			else:
				# map_to not specified
				map_to = ""

			# Look for source property
			source = ""
			source_list = [x for x in tmp2 if 'source' in x]
			#print 'tmp2=<',tmp2,'>,source_list=<',source_list,'>'

			if source_list:
				# source is specified
				source = source_list[0][source_list[0].find('source')+len('source'):]
				if not source:
					# No value specified for source, this is not valid
					contxt = 'When parsing message definition file: no indice specified for source, line %s' % std_fld_def_line
					raise Error(contxt)
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use null string as source for 'IGNORED' fields
				source = ""
			else:
				# source not specified
				source = ""

			# Look for pad_mode property, defines whether empty_char should be padded on the left or right.
			pad_mode = ""
			pad_mode_list = [x for x in tmp2 if 'pad_mode' in x]
			#print 'tmp2=<',tmp2,'>,pad_mode_list=<',pad_mode_list,'>'

			if pad_mode_list:
				# pad_mode is specified
				pad_mode = pad_mode_list[0][pad_mode_list[0].find('pad_mode')+len('pad_mode'):]
				if not pad_mode:
					# No value specified for pad_mode
					# If it is alpha-numeric, use "right" as default. Otherwise, use "left" as default.
					fmt = tmp2[-2]
					if fmt == 'ASCII_X':
						pad_mode = 'R'
					else:
						pad_mode = 'L'
			elif tmp2[-2] == 'IGNORED':
				# Special case: Use "right" as pad_mode for 'IGNORED' fields
				pad_mode = 'R' 
			else:
				# pad_mode is not specified
				# If it is alpha-numeric, use "right" as default. Otherwise, use "left" as default.
				fmt = tmp2[-2]
				if fmt == 'ASCII_X':
					pad_mode = 'R'
				else:
					pad_mode = 'L'

			res = [tmp2[-2], tmp2[-1], emp_char, emp_str, trunc, err_str, scale_pow, utc_fmt, map_to, source, pad_mode]

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _process_const_def_line(self, const_def_line):
		"""Returns the value of the constant."""

		#msg = '_process_const_def_line(%s)' % const_def_line
		#self._logr.write_debug(msg)

		res = ""
		if const_def_line:
			tmp = const_def_line[:const_def_line.find(';')]
			#tmp = const_def_line.translate(None, '();')
			tmp = re.sub('[();]','',tmp)
			tmp2 = tmp.split('"')
			res = tmp2[-2]

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _process_sub_def_comp_list_item(self, comp_list):
		"""Splits a list of entries into a list of fields for each list of entries.

		Result is a list of elements where each element is a fixed length string list containing the following fields:
		[element_tag, element_unique_id, max_repeats_value, repeat_count_name, element_desc]
		"""

		#msg = '_process_sub_def_comp_list_item(%s)' % comp_list
		#self._logr.write_debug(msg)

		res = []
		tag = ""
		cntr = 1
		for item in comp_list:
			tmp = item.split()

			# Ignore C style and C++ style comments at the beginning of line
			if tmp and not (tmp[0].startswith("/*") or tmp[0].startswith("//")):

				# Look for element tag
				open_brace_idx = item.find('(')
				if open_brace_idx != -1:
					tag = item[:open_brace_idx].strip()
				else:
					contxt = 'When parsing message definition file: syntax error in <%s>' % item
					raise Error(contxt)

				# Look for Description
				desc = ""
				close_brace_idx = item[open_brace_idx+1:].find(')')
				if close_brace_idx != -1:
					tmp_list = item[open_brace_idx+1:open_brace_idx+1+close_brace_idx].split(',')
					desc = re.sub('["]','',tmp_list[0])
				else:
					contxt = 'When parsing message definition file: syntax error in <%s>' % item
					raise Error(contxt)

				# Look for max_repeats
				max_rep = ""
				max_rep_idx = item.find('max_repeats')
				if max_rep_idx != -1:
					close_brace_idx = item[max_rep_idx:].find(')')
					if close_brace_idx != -1:
						max_rep = item[max_rep_idx+len('max_repeats'):max_rep_idx+close_brace_idx]
						max_rep = re.sub('[()"]','',max_rep)
					else:
						contxt = 'When parsing message definition file: syntax error in <%s>' % item
						raise Error(contxt)
				else:
					max_rep = ""

				# Look for repeat_count
				rep_cnt_idx = item.find('repeat_count')
				if rep_cnt_idx != -1:
					close_brace_idx = item[rep_cnt_idx:].find(')')
					if close_brace_idx != -1:
						rep_cnt_tag = item[rep_cnt_idx+len('repeat_count'):rep_cnt_idx+close_brace_idx]
						rep_cnt_tag = re.sub('[()"]','',rep_cnt_tag)
					else:
						contxt = 'When parsing message definition file: syntax error in <%s>' % item
						raise Error(contxt)
				else:
					rep_cnt_tag = ""

				# TODO: Check for duplicate of sub_def components, create a copy using a copy of the original
				# key plus counter, recursively do this for each sub component which itself is also a
				# duplicate. E.g. original structs SGC_LD_PROD_QTY and SGC_AMB_COR_LD_QUANTITY are used twice
				# in two different sub-structs. For the moment, use different name in msg_def. This is
				# required at the moment because multi-value in the value list (i.e.
				# ['SGC_TEMPERATURE', '', '', '', 'Working Temperature', ['14.5', '14.5']]) means there are
				# two records. However, currently, a same name struct used as component in two different
				# parent structs also result in multi-value in the value list which will cause program
				# logic error.

				# Use the generator expression next(iterator,default) to check
				# if a specific value (in this case, tag) exists as the first
				# element of level-one nested list (i.e. [[a,b],[a1,b1],...])
				idx = next((i for i,sublist in enumerate(res) if tag in sublist),-1)
				#idx = next((j for j in (sublist for i,sublist in enumerate(self.__sub_def)) if tag == j),-1)
				if idx != -1:
					# Found, this means tag is not unique in this level (i.e. sibling elements with
					# same name. Therefore, add counter to make it unique.
					unique_key = '_'+str(cntr)
					res += [[tag+unique_key,unique_key,max_rep,rep_cnt_tag,desc]]
					cntr += 1
				else:
					res += [[tag,'',max_rep,rep_cnt_tag,desc]]

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def _process_sub_def_comp(self, comp):
		"""Split the contents in the curly braces of a main or sub message definition into a list of entries using semicolon."""

		#msg = '_process_sub_def_comp(%s)' % comp
		#self._logr.write_debug(msg)

		ent_no_cl = ""
		res = []

		for ent in comp.split('\n'):
			dmsg = 'ent=<%s>' % ent
			#self._logr.write_debug(dmsg)

			if ent != '':
				ents = ent.strip();
				if not (ents.startswith('/*') and ents.endswith('*/')):
					ent_by_cppc = ents.split('//');
					ent_no_cl += ent_by_cppc[0]
					res += ent_no_cl.split(';')
		dbmsg = 'ent_no_cl=<%s>' % ent_no_cl
		#self._logr.write_debug(dbmsg)
		res = ent_no_cl.split(';');	

		#msg = 'res=<%s>' % res
		#self._logr.write_debug(msg)

		return res

	def parse_msg_def_file(self, msg_def_file):
		"""Parse the specified Message Definition file and return a dictionary representing it."""

		msg = 'parse_msg_def_file(%s)' % msg_def_file
		#self._logr.write_debug(msg)

		try:
			with open(msg_def_file, 'r') as mdf:
				mdf_list = list(mdf)
		except FileNotFoundError as err:
			raise 

		self.__sub_def.clear()
		self.__const_def.clear()
		self.__std_fld_def.clear()
		self.__enum_def.clear()
		self.__truth_def.clear()
		sub_def_key_found = False
		const_def_key_found = False
		std_fld_def_key_found = False
		enum_def_key_found = False
		truth_def_key_found = False
		start_brace_found = False
		end_brace_found = True
		sub_def_comp = ""
		std_fld_def_comp = ""
		enum_def_comp = ""
		truth_def_comp = ""

		for line in mdf_list:
			tokens = line.split()
			if line.startswith("main_message_def") or \
			   line.startswith("sub_message_def"):
				if end_brace_found:
					key = tokens[1]
					sub_def_key_found = True
					end_brace_found = False
					sub_def_comp = ""
				else:
					contxt = 'Key <%s> has no end brace <};>, key discarded' % key
					raise Error(contxt)
					key = tokens[1]
					sub_def_key_found = True
					start_brace_found = False
					end_brace_found = False
					sub_def_comp = ""

			elif line.startswith("std_fld_def"):
				if end_brace_found:
					key = tokens[1]
					std_fld_def_key_found = True

					# std_fld_def has no start brace
					start_brace_found = True

					# std_fld_def need to look for end brace
					end_brace_found = False

					std_fld_def_comp = ""
				else:
					contxt = 'Key <%s> has no end brace <};>, key discarded' % key
					raise Error(contxt)
					key = tokens[1]
					std_fld_def_key_found = True
					start_brace_found = False

					# std_fld_def need to look for end brace
					end_brace_found = False

					std_fld_def_comp = ""

			elif line.startswith("const_def"):
				if end_brace_found:
					key = tokens[1]
					const_def_key_found = True

					# const_def do not need to look for start or end brace
					end_brace_found = True
				else:
					contxt = 'Key <%s> has no end brace <};>, key discarded' % key
					raise Error(contxt)
					key = tokens[1]
					const_def_key_found = True
					start_brace_found = False

					# const_def do not need to look for start or end brace
					end_brace_found = True

			elif line.startswith("enum_def"):
				if end_brace_found:
					key = tokens[1]
					enum_def_key_found = True
					end_brace_found = False
					enum_def_comp = ""
				else:
					contxt = 'Key <%s> has no end brace <};>, key discarded' % key
					raise Error(contxt)
					key = tokens[1]
					#print tokens[0], ',' , key
					enum_def_key_found = True
					start_brace_found = False
					end_brace_found = False
					enum_def_comp = ""

			elif line.startswith("truth_value_def"):
				if end_brace_found:
					key = tokens[1]
					truth_def_key_found = True
					end_brace_found = False
					truth_def_comp = ""
				else:
					contxt = 'Key <%s> has no end brace <};>, key discarded' % key
					raise Error(contxt)
					key = tokens[1]
					truth_def_key_found = True
					start_brace_found = False
					end_brace_found = False
					truth_def_comp = ""

			if sub_def_key_found:
				if not start_brace_found and '{' in line:
					start_brace_found = True
					if line[-1] == '\n' and line[-2] != '{':
						# Start brace not the end of line, store remainder
						sub_def_comp += line[line.find('{')+1:]
				elif start_brace_found:
					# Tokenize by "};", store the string before into sub_def_comp.
					# TODO:If there are string after, parse it as new 
					if "};" in line or "} ;" in line:
						sub_def_comp_list = self._process_sub_def_comp(sub_def_comp)
						sub_def_comp_list_items = self._process_sub_def_comp_list_item(sub_def_comp_list)
						self.__sub_def[key] = sub_def_comp_list_items

						end_brace_found = True
						sub_def_key_found = False
						start_brace_found = False
					else:
						sub_def_comp += line

			if const_def_key_found:
				cd_itm = self._process_const_def_line(line)
				self.__const_def[key] = cd_itm
				const_def_key_found = False

			if std_fld_def_key_found:
				#sfd_itm = self._process_std_fld_def_line(line)
				#self.__std_fld_def[key] = sfd_itm
				#std_fld_def_key_found = False
				# TODO: Check for multi-line entries e.g.
				# std_fld_def EMHK_TEMPERATURE	scale_pow10(1), empty_char(' ')
				#							ASCII_S9,		 4);
				if not start_brace_found and 'std_fld_def' in line:
					start_brace_found = True

				if start_brace_found:
					if ");" in line:
						# Found end of entry
						sfd_itm = self._process_std_fld_def_line(line)
						self.__std_fld_def[key] = sfd_itm
						std_fld_def_key_found = False
						end_brace_found = True
						start_brace_found = False
					else:
						std_fld_def_comp += line

			if enum_def_key_found:
				if not start_brace_found and '{' in line:
					start_brace_found = True
					if line[-1] == '\n' and line[-2] != '{':
						# Start brace not the end of line, store remainder
						enum_def_comp += line[line.find('{')+1:]
				elif start_brace_found:
					# Tokenize by "};", store the string before into enum_def.
					# TODO:If there are string after, parse it as new 
					if "};" in line or "} ;" in line:
						enum_def_comp_list = self._process_enum_def_comp(enum_def_comp)
						enum_def_comp_list_items = self._process_enum_def_comp_list_item(enum_def_comp_list)
						self.__enum_def[key] = enum_def_comp_list_items

						end_brace_found = True
						enum_def_key_found = False
						start_brace_found = False
					else:
						enum_def_comp += line

			if truth_def_key_found:
				if not start_brace_found and '{' in line:
					start_brace_found = True

					#if line[-1] == '\n' and line[-2] == ';' and line[-3] == '}':
					if line[-3:] == "};\n":
						# Start brace and end brace is on the same line
						truth_def_comp = line[line.find('{')+1:line.find('};')]
						truth_def_comp_list = self._process_truth_def_comp(truth_def_comp)
						truth_def_comp_list_items = self._process_truth_def_comp_list_item(truth_def_comp_list)
						self.__truth_def[key] = truth_def_comp_list_items
						end_brace_found = True
						truth_def_key_found = False
						start_brace_found = False
					#elif line[-1] == '\n' and line[-2] != '{':
					elif line[-2:] != "{\n":
						# Start brace not the end of line, store remainder
						truth_def_comp += line[line.find('{')+1:]
					else:
						# WHAT HAPPENED?
						contxt = 'When parsing msg_def: invalid data in %s' % line
						raise Error(contxt)
				elif start_brace_found:
					# Tokenize by "};", store the string before into enum_def.
					# TODO:If there are string after, parse it as new 
					#if "};" in line:
					if line == "};\n":
						# End brace on one line
						truth_def_comp_list = self._process_truth_def_comp(truth_def_comp)
						truth_def_comp_list_items = self._process_truth_def_comp_list_item(truth_def_comp_list)
						self.__truth_def[key] = truth_def_comp_list_items

						end_brace_found = True
						truth_def_key_found = False
						start_brace_found = False
					elif "};" in line:
						truth_def_comp += line[:line.find("};")]
						truth_def_comp_list = self._process_truth_def_comp(truth_def_comp)
						truth_def_comp_list_items = self._process_truth_def_comp_list_item(truth_def_comp_list)
						self.__truth_def[key] = truth_def_comp_list_items

						end_brace_found = True
						truth_def_key_found = False
						start_brace_found = False
					else:
						truth_def_comp += line

		return dict(sub_def=self.__sub_def,const_def=self.__const_def,std_fld_def=self.__std_fld_def,enum_def=self.__enum_def,truth_def=self.__truth_def)

	def __real_value(self, format, val):
		"""Undo the special formatting applied to val and return the result.
		
		- If the field value is positively signed, the positive sign char will be removed.
		- Undo the scaling effect specified by the scale_pow10 property.	
		"""

		#msg = '__real_value(%s,%s)' % (format, val)
		#self._logr.write_debug(msg)

		res = ""

		try:
			type = format[0]
			max_len = int(format[1])
		except IndexError as err:
			contxt = 'When parsing message: incorrect format spec, %s' % str(err)
			raise Error(contxt)

		# Check that data length do not exceed the maximum expected length
		if len(val) > max_len:
			contxt = 'When parsing message: value <%s> is too long, max length is %d chars' % (val,max_len)
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

			if format[6]:
				scale_indice = 0
				try:
					scale_indice = int(format[6])
				except ValueError as err:
					contxt = 'When parsing message: Scale indice <%s> is not numeric, val <%s>, %s' % (format[6], val, str(err))
					raise Error(contxt)

				try:
					# x**y is the shorthand for pow(x,y)
					res = str(float(val)/(10**scale_indice))
				except:
					contxt = 'When parsing message:  Failed to undo format <%s> on <%s>' % (format,val)
					raise Error(contxt)
			else:
				# Check that the value is in fact numeric ...
				try:
					dummy = int(val)
				except ValueError as err:
					# Not an integer
					contxt='When parsing message: val <%s> is not numeric, %s' % (val,str(err))
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

	def __add_default_value(self, path, default_val):
		"""Add the specified default value to the Message Definition dictionary at the specified location(path)."""

		#msg = '_add_default_value(%s,%s)' % (path, default_val)
		#self._logr.write_debug(msg)

		tmp = path.split('.')
		parent = tmp[-2]
		child = tmp[-1]
		idx = next(i for i,v in enumerate(self._msg_def_dict['sub_def'][parent]) if v[0] == child)
		if idx != -1:
			# Record exists, add the specified value to the 6th position of the list

			try:
				# default value exists, update it
				self._msg_def_dict['sub_def'][parent][idx][5] = default_val

			except IndexError as err:
				# default value do not exists, create it
				self._msg_def_dict['sub_def'][parent][idx].append(default_val)

	# Based on LenMRecToOmTreeConverter's
	def __add_value_list(self, path, val):
		"""Add the specified value to the Message Definition dictionary at the specified location(path).
	
		E.g. For SGC_LOAD_ORDER.SGC_MSG_HEADER_2.SGC_MSG_TYPE,
			['SGC_MSG_TYPE', '', '', '', 'Message Type'] --> ['SGC_MSG_TYPE', '', '', '', 'Message Type', ['SHOM03  ']]
		"""

		#msg = '__add_value_list(%s,%s)' % (path, val)
		#self._logr.write_debug(msg)

		tmp = path.split('.')
		parent = tmp[-2]
		child = tmp[-1]
		idx = next(i for i,v in enumerate(self._msg_def_dict['sub_def'][parent]) if v[0] == child)
		if idx != -1:
			# Record exists, add the specified value to the 7th position of the list

			try:
				# value list exists, append to it
				self._msg_def_dict['sub_def'][parent][idx][6].append(val)

			except IndexError as err:
				# value list do not exists, create it
				self._msg_def_dict['sub_def'][parent][idx].append([val])

			#rec = self._msg_def_dict['sub_def'][parent][idx]

	def __apply_padding(self, search_key, spec, value):
		"""Apply the specified spec to the specified value and return the result."""

		final_val = ""
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
				contxt = 'When updating repeat count: %s is not a valid pad mode' % (pad_mode)
				raise Error(contxt)
		elif length == data_len:
			final_val += value
		else:
			contxt = 'When filling msg_def: (%s,%s) too long to fit into %d chars' % (search_key,value,length)
			raise Error(contxt)

		return final_val

	def __get_default_value(self, spec, path):
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
				contxt = 'When filling msg_def: default value %d for %s is too long to fit into %d chars' % (default_val,path,length)
				raise Error(contxt)
		except KeyError as err:
			# Default value is not specified
			default_val = (empty_char * length)

		return default_val


	def __populate2(self, search_key, path, mod, idx, rep_level_list, idx_list):
		"""Helper function that implements the fill functionality.

		- Fill each field in a tree message definition structure using the specified data file.
		- Recursively traverse the msg_def dictionary using 'search_key' as the start point.
		- Accumulate 'search_key' into 'path' using '.' as separator.
		- 'mod' contains the modified bit added to original search_key. It is added
		  to 'path' to offset the removal of it when computing the search_key. This
		  is required to match the value specified in the configuration.
		- 'idx' is the position in data string to read data from.
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

		msg = '__populate2(%s,%s,%s,%d,%s)' % (search_key, path, mod, idx, rep_level_list)
		self._logr.write_debug(msg)

		if path:
			path += '.'
		path += (search_key+mod)

		if idx_list:
			idx_list += '.'
		idx_list += str(idx)

		try:
			for val in self._msg_def_dict['sub_def'][search_key]:


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

				# Determine if the current element has a "repeat_count" property
				has_rep_cnt = (val[3] != '')

				rep_cnt = 0
				added_to_list = False
				if has_rep_cnt:
					tmp = path.split('.')
					try:
						rep_cnt_items = [v for v in self._msg_def_dict['sub_def'][tmp[-1]] if val[3] != '' and v[4] == val[3]]
					except KeyError as err:
						contxt = 'When populating message: Cannot find repeat count item for search key <%s>, %s' % (val[0],str(err))
						raise Error(contxt)
					#dbgmsg = 'rep_cnt_items=<%s>' % (rep_cnt_items)
					#self._logr.write_debug(dbgmsg)

					# Should have only one in the list. Otherwise, throw exception
					rci_cnt = len(rep_cnt_items)
					if rci_cnt > 1:
						contxt = 'When populating message: Should have only one repeat count item for search key <%s>, have <%d>' % (val[0],rci_cnt)
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
					except Exception as err:
						contxt = 'When populating message: Unable to retrieve repeat count for <%s>, %s' % (val[0],str(err))
						raise Error(contxt)

				# Determine if the current element has a "max_repeats" property
				has_max_reps = (val[2] != '')
				max_reps = 0
				if has_max_reps and val[2].isdigit():
					max_reps = int(val[2])

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

				rIdx = 0
				while rIdx < limit:
					# Update the progress of the repeat section
					if has_rep_cnt and rep_level_list:
						rep_level_list[-1][0] = rIdx

					self.__populate2(search_key, path, mod, rIdx, rep_level_list, idx_list)
					rIdx += 1

				# Remove the repeat level once the repeating ceases
				if has_rep_cnt and added_to_list and rep_level_list:
					del rep_level_list[-1]

		except KeyError as err:

			# Must be in either const_def, std_fld_def or enum_def dictionaries
			found = False
			try:
				if not found and self._msg_def_dict['const_def'][search_key]:
					self._fld_len = len(self._msg_def_dict['const_def'][search_key])
					self.__add_default_value(path, str(' ' * self._fld_len))
					#TODO: Check that value is valid
					self.__add_value_list(path, self._retrieve_data(path, idx_list, False))
					self._update_index()
					found = True
			except KeyError as err:
				None

			try:
				if not found and self._msg_def_dict['std_fld_def'][search_key]:
					# Get length, retrieve value from file and add to dict
					to_fld_spec = self._msg_def_dict['std_fld_def'][search_key]
					self._fld_len = int(to_fld_spec[1])
					dflt_val = self.__get_default_value(to_fld_spec, path)
					self.__add_default_value(path, dflt_val)
					# Add the value even if it is empty. It means the field has no data. Not adding it means the field
					# does not exist which is not the same.
					# If the field value is blank, fill it with the default value.
					final_val = self.__apply_padding(search_key, to_fld_spec, self._retrieve_data(path, idx_list, False))
					if final_val is None or final_val.strip() == '':
						final_val = dflt_val
					self.__add_value_list(path, final_val)
					self._update_index()
					found = True
			except KeyError as err:
				None

			try:
				if not found and self._msg_def_dict['enum_def'][search_key]:
					self._fld_len = len(self._msg_def_dict['enum_def'][search_key][0])
					#val = self._msg_def_dict['enum_def'][search_key][0]

					self.__add_default_value(path, str(' ' * self._fld_len))
					#TODO: Check that value is valid
					self.__add_value_list(path, self._retrieve_data(path, idx_list, False))
					self._update_index()
					found = True
			except KeyError as err:
				None

			try:
				if not found and self._msg_def_dict['truth_def'][search_key]:
					self._fld_len = len(self._msg_def_dict['truth_def'][search_key][0])
					self.__add_default_value(path, str(' ' * self._fld_len))
					#TODO: Check that value is valid
					self.__add_value_list(path, self._retrieve_data(path, idx_list, False))
					self._update_index()
					found = True
			except KeyError as err:
				None

			if not found:
				# Cannot find search key at all, must be bad schema
				#contxt = 'When populating message: Cannot find field <%s> in schema, %s' % (search_key,str(err))
				contxt = 'When populating message: Cannot find field <%s> in schema' % (search_key)
				raise Error(contxt)

		return idx


	def _restructure_data(self, data_file):
		"""
		* Convert incoming data structure to a list.
		* Must be overridden.
		"""
		contxt = 'When parsing data: function _restructure_data() must be overridden.'
		raise Error(contxt)

	def _retrieve_data(self, path='', idx_list="", strip=False):
		"""
		* Retrieves data from the data structure in memory that was initially read from file.
		* Must be overridden.
		"""
		contxt = 'When parsing data: function _retrieve_data() must be overridden.'
		raise Error(contxt)

	def _update_index(self):
		"""
		* Update the index that points to the location of the incoming message from where data will be retrieved next.
		* Must be overridden.
		"""
		contxt = 'When parsing data: function _update_index() must be overridden.'
		raise Error(contxt)

	def parse_data_file(self, data_file, msg_def_dict, msg_main):
		"""Parse the specified file data_file using the specified dictionary, msg_def_dict, starting at msg_main.

		- Returns a tuple containing specified dictionary with data attached.
		"""

		#msg = 'parse_data_file(%s,%s,%s)' % (data_file, msg_def_dict, msg_main)
		msg = 'parse_data_file(%s,%s,%s)' % (data_file, 'msg_def_dict', msg_main)
		self._logr.write_debug(msg)

		self._restructure_data(data_file)

		self._msg_def_dict.clear()
		self._msg_def_dict = msg_def_dict
		self.__populate2(msg_main, "", "", 0, [], "")
		return self._msg_def_dict

	def print_dict(self, msg_def_dict):
		"""Print the specified msg_def dictionary into a more human-readable form."""

		msg = '\n[--------------------\n'
		msg += 'msg_def_dict:\n'
		msg += 'sub_def:\n'
		for k,v in msg_def_dict['sub_def'].items():
			msg += '\t%s :\n' % k
			for val in v:
				msg += '\t\t<%s>\n' % val

		msg += '\nconst_def:\n'
		for k,v in msg_def_dict['const_def'].items():
			msg += '\t%s :<%s>\n' % (k,v)

		msg += '\nstd_fld_def:\n'
		for k,v in msg_def_dict['std_fld_def'].items():
			msg += '\t%s :<%s>\n' % (k,v)

		msg += '\nenum_def:\n'
		for k,v in msg_def_dict['enum_def'].items():
			msg += '\t%s :\n' % k
			for val in v:
				msg += '\t\t<%s>\n' % val

		msg += '\ntruth_def:\n'
		for k,v in msg_def_dict['truth_def'].items():
			msg += '\t%s :\n' % k
			for val in v:
				msg += '\t\t<%s>\n' % val
		msg += '\n]--------------------\n'
		self._logr.write_debug(msg)

	def save(self, to_file):
		"""Saves the current Message Definition dictionary to file."""

		msg = 'save(%s)' % to_file
		#self._logr.write_debug(msg)

		#with open(to_file, 'wb') as msgdeff:
		#	cPickle.dump(dict(sub_def=self.__sub_def,const_def=self.__const_def,std_fld_def=self.__std_fld_def,enum_def=self.__enum_def), msgdeff)


class OmMsgParser(TreeParser):
	"""
	* Inherits the tree parsing functionality from base class, TreeParser.
	* Provides parsing functionality for Omega hostcomm messages (length-based, tree).
	  - Parse an Omega Message Definition from file into Python dictionary.
	  - Parse an Omega message from file into an Omega Message Definition dictionary.

	If there are multiple records in the incoming data file, all records except the first one will be ignored.

	Incoming data will not be restructured.
	Retrieval of data will be based on the current index and the field length.
	The current index will be incremented by the current field length.
	"""

	def __init__(self, logr_inst):
		super(OmMsgParser, self).__init__(logr_inst)

	def _restructure_data(self, data_file):
		"""
		Restructuring require the field length which can only be retrieved by traversing the tree schema which is already done in later step.
		So, don't it here. Just read data from file.
		"""

		with open(data_file, 'r') as dataf:
			self._msg_str = dataf.read()

	def _retrieve_data(self, path='', idx_list="", strip=False):
		"""
		In the case of length-based tree message, since there was no restructuring of data, the data will be from the current index point to
		the point that equals the current index plus the field length.
		"""
		res = self._msg_str[self._idx:self._idx+self._fld_len]
		if strip:
			res = res.strip()
		return res

	def _update_index(self):
		"""
		In the case of length-based message, the index should be incremented by the length of current field so that the index points to the location
		of the start of the data of the next field.
		"""
		self._idx += self._fld_len


class DlimSRecParser(TreeParser):
	"""
	* Inherits a few generic functions from base class, TreeParser.
	* Provides parsing functionality for an incoming message (TAB-delimited, single-record) file from host.
	  - Overrides the parsing of message schema file
	  - Overrides the parsing of message data file

	If there are multiple records in the incoming data file, an exception will be raised.

	Incoming data will be restructured based on TAB character into a list.
	Retrieval of data will be based on the current index of the restructured data list.
	The current index will be incremented by 1.

	An incoming message that can be parsed using the above schema file would conform to the following rules:
	a. The contents are ASCII texts.
	b. Each line is a record that contains one or more fields.
	c. Each field is separated by a delimiter, TAB character in this case.
	d. There is only one record in the file.
	e. Each line may end with a CRLF character combination or an EOF character.
	"""

	def __init__(self, logr_inst, delim='\t'):
		#TextFileParser.__init__(self, logr_inst)
		#TreeParser.__init__(self, logr_inst)
		super(DlimSRecParser,self).__init__(logr_inst)
		self.__delim = delim

	def _restructure_data(self, data_file):
		"""Convert incoming data structure (delimited) to a list."""

		with open(data_file, 'r') as dataf:
			#self._msg_str = dataf.read()
			reader = csv.reader(dataf, delimiter=self.__delim)
			data = list(reader)
			num_of_itms = len(data)
			if num_of_itms > 1:
				# Raise exception, can't deal with multiple records yet!
				contxt = 'When parsing incoming message: records in file is %d, max is %d' % (num_of_itms, 1)
				raise Error(contxt)
			#self._logr.write_debug(data[0])
			self._msg_str = data[0]

	def _retrieve_data(self, path='', idx_list="", strip=False):
		"""
		In the case of delimited message, the data will be the current index of the restructured data list.
		"""
		res = self._msg_str[self._idx]
		if strip:
			res = res.strip()
		return res

	def _update_index(self):
		"""
		In the case of delimited message, each piece of data is already clearly marked and stored separately in a list.
		Therefore, travesal of data just require the index to be incremented by 1.
		"""
		self._idx += 1

	def parse_data_file(self, data_file, schema_dict, msg_name):
		"""Parse the specified file data_file using the specified dictionary, schema_dict."""
		return super(DlimSRecParser, self).parse_data_file(data_file, schema_dict, msg_name)

	def print_dict(self, schema_dict):
		super(DlimSRecParser,self).print_dict(schema_dict)



class XmlParser(TreeParser):
	"""
	* Purpose of this class is to convert incoming XML data into Omega hostcomm message (which is ASCII, length-based, tree structure).
	* So, in order to represent the Omega hostcomm message, inherit the tree parsing functionality from base class, TreeParser.
	* Then, override the retrieval methods _retrieve_data() and _update_index() to define how to extract XML data for the field in question.

	Incoming data will be stored in a XML DOM tree.
	Retrieval of data will be based on the XML path defined in the field mapping for the field in question.
	The current index will not be applicable in this case.
	"""

	def __init__(self, logr_inst, fld_map_file, reverse_order):
		super(XmlParser, self).__init__(logr_inst)
		self._fld_map = self._load_field_map(fld_map_file, reverse_order)
		self._xmltree = None


	def _restructure_data(self, data_file):
		"""
		Load the data file into a XML DOM tree.
		"""

		try:
			with open(data_file, 'r') as dataf:
				self._msg_str = dataf.read()
				self._xmltree = etree.parse(data_file).getroot()
				msg = 'xmltree:\n%s' % (etree.tostring(self._xmltree, pretty_print=True).decode())
				self._logr.write_debug(msg)
		except Exception as err:
			raise

	def _retrieve_data(self, path, idx_list, strip=False):
		"""
		In the case of XML data, the field map value defines the path that leads to the XML data node.
		In addition, the idx_list, a dot-delimited index list, indicates the repeatability of the corresponding field.
		"""
		res = ''

		try:
			fields = self._fld_map[path].split('.')
			#print('fields',fields,'idx_list',idx_list)
			idxs = idx_list.split('.')
			xpq = ""

			# TODO: check that len(fields) == len(idxs)
			for i,fld in enumerate(fields):
				xpq += ('/' + fld + '[' + str(int(idxs[i])+1) + ']')
			#print('xpq',xpq)
			qres = self._xmltree.xpath(xpq)
			if qres and len(qres) > 0 and qres[0].text:
				res = qres[0].text
			#print('path',path,'res',res)
			return res

		except KeyError as err:
			pass

		return res

		"""
		# TODO for testing only. change to xpath 
		idx = 0

		res = ''
		curIdx = 0
		cur = self._xmltree

		try:
			flds = self._fld_map[path].split('.')
		except KeyError as err:
			# path is not specified in field map, just return blank.
			return res;

		if cur is not None:
			j = 0
			while j < len(flds):
				if flds[j] == cur.tag:
					if idx > 0:
						match = self._get_nth_match(cur.getparent(), cur, idx)							
						if match is not None:
							cur = match
							if len(cur) > 0:
								cur = list(cur)[0]
								j += 1
							else:
								# found?
								j += 1
						else:
							# Can't find it, maybe wrong mapping path in configuration file?
							return '';
					else:
						if len(cur) > 0:
							cur = list(cur)[0]		# or cur.getchildren()[0]
							j += 1
						else:
							# found?
							j += 1
				else:
					sibling = self._get_next_sibling(cur.getparent(), cur)
					if sibling != None:
						cur = sibling
					else:
						# Can't find it, maybe wrong mapping path in configuration file?
						return '';
			if len(cur) == 0 and cur.text is not None:
				res = cur.text

		if strip:
			res = res.strip()

		print('path',path,'res',res)
		return res
		"""

	def _update_index(self):
		"""
		In the case of XML data, index is not applicable.
		"""
		pass

	def _load_field_map(self, fld_map_file, reverse_order):
		if fld_map_file != None:
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
				print ('fld_map err:',err)
				return {}
		else:
			raise ValueError('Field map is missing')

	# Copied from converter.py
	def _get_next_sibling(self, tree, node):
		found = False
		if tree is not None:
			for child in list(tree):
				if found:
					return child
				if child == node:
					if tree[len(list(tree))-1] == node:
						return None
					else:
						found = True
		else:
			return None

	# Copied from converter.py
	def _get_nth_match(self, tree, node, index):
		# Find the n'th node on tree that follows node and return it if it matches node name 
		found = False
		idx = 0
		if tree is not None:
			for child in list(tree):
				if not found and child == node:
					found = True
				elif found and child == node:
					idx += 1	

				if found and idx == index:
					if child == node:
						return child
					else:
						return None

		return None

	def validate_xml(self, xsd_file, xml_file):
		xv = XmlValidator
		is_valid = xv.do_it(xsd_file, xml_file)
		return is_valid
