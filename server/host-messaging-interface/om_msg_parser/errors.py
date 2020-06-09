import sys, exceptions, traceback, inspect, os
from datetime import datetime

class ErrorTrace(Exception):
	# Should store information regarding Who, What, When, Where, Why

	def __init__(self, trace=None, context=None):
		if trace:
			self.trace = trace
		else:
			self.trace = traceback.format_exc()
			#exc_type, exc_value, exc_traceback = sys.exc_info()
			#self.trace = traceback.format_exception(exc_type, exc_value, exc_traceback)

		if context:
			self.context = context
		else:
			self.context = None

		self.when = datetime.now()

	def __str__(self):
		#return repr(self.trace)
		return self.trace

class Error(Exception):
	# A generic class for storing error information.
	# Should store information regarding Who, What, When, Where, Why.

	def __init__(self, context=None):
		#self.filename, self.linenum = inspect.getframeinfo(inspect.currentframe())[:2]
		#self.funcname = inspect.stack()[1][3]
		self.stack = inspect.stack()[1]
		self.filename = self.stack[1]
		self.linenum = self.stack[2]
		self.funcname = self.stack[3]
		self.when = datetime.now()

		if context:
			self.context = context
		else:
			self.context = None

	def __str__(self):
		"""Defines the printable information of the error."""

		# TODO: Add process name?
		#res = 'File %s, line %s: %s' % (os.path.basename(self.filename), self.linenum, self.context)
		res = '\t(%s:%s:%s):[ERROR] %s' % (self.when, os.path.basename(self.filename), self.linenum, self.context)
		return res

	def desc_only(self):
		"""Returns only error description"""
		return self.context

class HaulierHasNoTankerError(Error):
	"""A class that is identical to Error class with only a name difference.

	- Used for identifying a specific error i.e. the specified haulier (carrier company code in Omega terms) does
	  not have any valid tanker associated with it.
	"""

	def __init__(self, context=None):
		#super(HaulierHasNoTankerError, self).__init__(context)
		Error.__init__(self, context)

