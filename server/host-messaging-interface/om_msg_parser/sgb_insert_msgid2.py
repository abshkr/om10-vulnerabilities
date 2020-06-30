#!/usr/bin/python
# WARNING: This script should only be used for SGB_MSG_HEADER_1

import sys



if __name__ == "__main__":

	try:
		data_file = sys.argv[1]
		dest_file = sys.argv[2]
	except Exception as err:
		raise


	with open(data_file, "r") as dfile:
		# only works for single-byte encoding (ASCII) or binary file
		# for variable width encoding, need to decode it first

		# Add message id field (36 bytes)
		first_part = dfile.read(48)
		dfile.seek(48)
		second_part = dfile.read()
		msg_id_part = ' ' * 36

		with open(dest_file, "w") as ofile:
			ofile.write(first_part + msg_id_part + second_part)		
