import logging, logging.handlers, sys, exceptions, traceback, inspect, os, errno
from errors import *

class Logger(object):
	"""A simple class for event logging.

	- Creates a new log file for each day at midnight
	- By default, one month's worth (31 days) of files are kept. For unlimited capping, set backup_count to zero.
	- Available configuration parameters:
		a. Disable
		b. Location of log file
		c. Debug level
		d. backup count
	- One drawback: If directory containing the log file or the log file itself is removed while an instance of this
	  class is running, logging will no longer work as expected i.e. no logging.
	"""

	def __init__(self, disable, filename, debug_level, backupcount):

		filenm = os.path.basename(filename)
		filepath = filename[:filename.find(filenm)]
		if not os.path.isdir(filepath):
			# Only attempt to create directory if it does not exist
			try:
				os.makedirs(filepath)
			except OSError as exc: # Python >2.5
				if exc.errno == errno.EEXIST and os.path.isdir(filepath):
					pass
				else:
					print 'Can\'t create ',filepath
					raise

		try:
			self.__logger = logging.getLogger('LOGGER')
			self.__disable = disable
			self.__dbglvl = debug_level

			if debug_level == 'DEBUG':
				self.__logger.setLevel(logging.DEBUG)
			elif debug_level == 'INFO':
				self.__logger.setLevel(logging.INFO)
			elif debug_level == 'WARNING':
				self.__logger.setLevel(logging.WARNING)
			elif debug_level == 'ERROR':
				self.__logger.setLevel(logging.ERROR)
			elif debug_level == 'CRITICAL':
				self.__logger.setLevel(logging.CRITICAL)
			else:
				# Default to ERROR
				print 'Defaulting debug_level to ERROR'
				self.__logger.setLevel(logging.ERROR)

			# Define message format
			#self.__formatter = logging.Formatter('%(asctime)s: (%(filename)s,%(lineno)d) [%(levelname)s]: %(message)s')
			self.__formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')

			# If non-numeric is passed in, use default value instead
			self.__backupcount = backupcount
			if type(backupcount) is not int:
				print 'Defaulting backupcount to 31'
				self.__backupcount = 31

			# Define file size and file count management method
			# i.e. one file per day, rollover at midnight, number of files kept is capped at
			# a default value of 31. If capping is not desired, set backupcount to 0.
			#self.__hndlr = logging.handlers.TimedRotatingFileHandler(filename, 'S', 600, self.__backupcount)
			self.__hndlr = logging.handlers.TimedRotatingFileHandler(filename, 'midnight', 1, self.__backupcount)
			self.__hndlr.setFormatter(self.__formatter)

			self.__logger.addHandler(self.__hndlr)

		except Exception as err:
			print 'init err: %s' % err
			contxt = 'During instantiation: Unable to create logger, %s' % err
			raise Error(contxt)

	def __pre_format(self, msg):
		# Extract some useful data i.e. file name, line number, function name, lines and index to be used for logging.

		#(filenm, linenum, funcname) = self.__logger.findCaller()

		# Index 1 gives the parent, Index 2 gives the grandparent
		(frame, filenm, linenum, funcname, lines, index) = inspect.getouterframes(inspect.currentframe())[2]
		return '(%s,%d): %s' % (os.path.basename(filenm), linenum, msg)

	def write_debug(self, msg):
		if not self.__disable:
			self.__logger.debug(self.__pre_format(msg))

	def write_info(self, msg):
		if not self.__disable:
			self.__logger.info(self.__pre_format(msg))

	def write_warning(self, msg):
		if not self.__disable:
			self.__logger.warning(self.__pre_format(msg))

	def write_error(self, msg):
		if not self.__disable:
			self.__logger.info(self.__pre_format(msg))

	def write_critical(self, msg):
		if not self.__disable:
			self.__logger.critical(self.__pre_format(msg))

