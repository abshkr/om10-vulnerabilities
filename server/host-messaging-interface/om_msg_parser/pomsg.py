#!/usr/bin/python

#this is available only from Python3.4 onwards
#from pathlib import Path

from lxml import etree
import os, sys, time, csv
from datetime import datetime
from logger import *
import signal
from optparse import OptionParser
from errors import *
from tree_parser import OmMsgParser, XmlParser
from converter import LenMRecToOmTreeConverter

def __get_cmd_line_arguments():
	"""Get command line arguments."""
	#TODO: Replace OptionParser with argparse
	#cmd_arg_parser = argparse.ArgumentParser(description='Shell Leo Silver hostcomm outgoing process')
	#cmd_arg_parser.add_argument('-c', dest='config_file', help='read configuration from config_file', metavar='FILE')
	#cmd_arg_parser.add_argument('-d', dest='debug_file', help='write debug info to debug_file', metavar='FILE')
	#args = cmd_arg_parser.parse_args()
	#print 'cmd_args=<',args,'>'
	#return args

	cmd_arg_parser = OptionParser(description='Omega message parser')
	#cmd_arg_parser.add_option('-c', dest='config_file', help='read configuration from config_file', metavar='FILE')
	cmd_arg_parser.add_option('-s', dest='schema_file', help='file that contains the schema of the message; if not specified, default (bai_obp_rtc.md2) is used.', metavar='FILE')
	cmd_arg_parser.add_option('-d', dest='data_file', help='file that contains the message', metavar='FILE')
	cmd_arg_parser.add_option('-n', dest='message_name', help='the start message name; if not specified, automatically retrieve from message.')
	cmd_arg_parser.add_option('-m', dest='content_format', help='0=string,1=human-readable,2=json,3=xml')
	cmd_arg_parser.add_option('-f', dest='field_map', help='map data points from input format to output format')
	cmd_arg_parser.add_option('-o', dest='output_file', help='file that contains the result')
	options,args = cmd_arg_parser.parse_args()
	#print 'cmd_args=<',options,args,'>'
	#for opt in options.__dict__.items():
	#	print 'opt:',opt
	return options,args

def sig_handler(signum, frame):
	__clean_up()
	msg = 'Received signal <%d>, process pomsg aborted.' % signum
	#logr.write_warning(msg)
	sys.exit(1)

def set_up_signals_handling():
	# Set up system signals handling
	signal.signal(signal.SIGTSTP, sig_handler)
	signal.signal(signal.SIGINT, sig_handler)
	signal.signal(signal.SIGHUP, sig_handler)
	signal.signal(signal.SIGTERM, sig_handler)



def __get_config():
	"""Retrieve configuration from config file, out_config.py, and return a module containing the info."""
	out_config = {}

	# Load default config file, config.py located in current directory
	try:
		import config
	except ImportError as err:
		#print 'ERROR: unable to load default config file', 'config.py'
		#sys.exit(1)
		contxt = 'Unable to load default config file %s: %s' % ('config.py', repr(err))
		raise Error(contxt)
	return config

def __get_message_name_from_message(data_file):
	# Assumption: An Omega message must begin with a message header of fixed list of fields of fixed lengths.
	# Read the "message type" field from the messaage, should be from byte 48 to 66 (zero-based).

	if data_file is None:
		contxt = 'Unable to retrieve message name from empty file'
		raise Error(contxt)	
	else:
		with open(data_file, 'rb') as dfile:
			firstbytes = dfile.read(66);
	
	msg_nm = firstbytes[48:].strip()
	if msg_nm is '' or msg_nm is None:
		contxt = 'File <%s> do not contain any valid message name' % data_file
		raise Error(contxt)	

	return msg_nm


def __check_opt(options):
	content_format = int(options.content_format);

	if options.schema_file is None:
		print 'pomsg.py aborted, schema_file must be specified.'
		sys.exit(1)

	if content_format != 4 and options.data_file is None:
		print ("pomsg.py aborted, data_file must be specified.")
		sys.exit(1)

	if options.message_name is None:
		print 'pomsg.py aborted, message_name must be specified.'
		sys.exit(1)

	if options.output_file is None:
		print ("pomsg.py aborted, output_file must be specified.")
		sys.exit(1)


	if content_format == 3 and options.field_map is None:
		print ("ERROR: field map \(option -f\) must be specified when using option '-m 3'")
		exit()


def __parse_method():
	try:

		"""
		These code will only work in python3.4 onwards

		suffix_list = Path(options.data_file).suffixes
		if len(suffix_list) == 0:
			# Try to parse it as a text message file.
			# TODO: maybe use other method to detect this
			parse_method = 1
		else:
			if len(suffix_list) == 1:
				file_extn = suffixes[0]
			else:
				file_extn = suffixes[-1]
	
			if file_extn == '.dat':
				parse_method = 1
			elif file_extn == '.xml':
				parse_method = 2
			else:
				raise ValueError('Unknown file extension, don\'t know how to parse this file.', file_extn)

		if parse_method == 1:
			if int(options.content_format) != 4:
				in_data_dict = om_msg_parser.parse_data_file(options.data_file, om_md_dict, msg_name)
		elif parse_method == 2:
			print 'TODO: parse as xml'
		else:
			raise ValueError('Unknown parse method, don\'t know how to parse this file.', parse_method)
		"""

		if options.data_file is not None:
			(filenm, file_extn) = os.path.splitext(options.data_file)
			if file_extn == '.dat':
				parse_method = 1
			elif file_extn == '.xml':
				parse_method = 2
			else:
				raise ValueError('Unknown file extension, don\'t know how to parse this file.', file_extn)
		else:
			if int(options.content_format) == 4:
				parse_method = 4
	except Exception as err:
		print (err)
		sys.exit(1)

	return parse_method


def __schema_file(options):
	#DEFAULT_SCHEMA_FILE = "bai_obp_rtc.md2"
	DEFAULT_SCHEMA_FILE = "msg_def4";

	# Use default schema file if it is not provided.
	if options.schema_file is None:
		schema_file = DEFAULT_SCHEMA_FILE
	else:
		schema_file = options.schema_file

	return schema_file


def __msg_name(options):
	# Get message name from data file if it is not provided.
	if options.message_name is None:
		msg_name = __get_message_name_from_message(options.data_file)
	else:
		msg_name = options.message_name
	return msg_name

def __save_result(options, result):
	with open(options.output_file, "w") as ofile:
		content_format = int(options.content_format);
#		if content_format == 1:
#			gmsg = "Generated by: "
#			for itm in sys.argv:
#				gmsg += itm
#				gmsg += ' '
#			gmsg += '\n\n'
#			ofile.write(gmsg)
		ofile.write(result)


if __name__ == "__main__":

	set_up_signals_handling()

	(options,args) = __get_cmd_line_arguments()

	__check_opt(options)

	# Read configuration
	config = __get_config()

	# Create logger instance
	logr = Logger(config.log_disable, config.log_path, config.log_debug_level, config.log_backup_count)

	parse_method = __parse_method()

	schema_file = __schema_file(options)

	msg_name = __msg_name(options)

	in_data_dict = None
	if parse_method == 1:
		om_msg_parser = OmMsgParser(logr)
		om_md_dict = om_msg_parser.parse_msg_def_file(schema_file)
		in_data_dict = om_msg_parser.parse_data_file(options.data_file, om_md_dict, msg_name)
		om_msg_parser.print_dict(om_md_dict)
	elif parse_method == 2:
		xml_parser = XmlParser(logr, options.field_map, True)
		om_md_dict = xml_parser.parse_msg_def_file(schema_file)
		xml_parser.print_dict(om_md_dict)
		in_data_dict = xml_parser.parse_data_file(options.data_file, om_md_dict, msg_name)
		xml_parser.print_dict(in_data_dict)
	elif parse_method == 3:
		# reserved for json
		pass
	elif parse_method == 4:
		om_msg_parser = OmMsgParser(logr)
		om_md_dict = om_msg_parser.parse_msg_def_file(schema_file)
		#in_data_dict = om_md_dict
		in_data_dict = om_msg_parser.parse_data_file(options.data_file, om_md_dict, msg_name)
		om_msg_parser.print_dict(om_md_dict)

	cvtr = LenMRecToOmTreeConverter(in_data_dict, om_md_dict, msg_name, logr, options.field_map)

	msg_str = cvtr.write_msg('', int(options.content_format))

	__save_result(options, msg_str)

