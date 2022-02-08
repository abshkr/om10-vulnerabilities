import os, sys, logging
from twilio.rest import Client
# import logging

# logger = logging.getLogger('sms_sending')
# logger.setLevel(logging.DEBUG)

# ch = logging.StreamHandler()
# ch.setLevel(logging.DEBUG)
# formatter = logging.Formatter('%(asctime)s|%(levelname)s|%(filename)s:%(lineno)d|%(message)s', '%Y-%m-%d %H:%M:%S')
# ch.setFormatter(formatter)
# logger.addHandler(ch)

if len(sys.argv) < 2:
    print("Usage: %s phone_num\n" % sys.argv[0])
    sys.exit(0)

phone_num = sys.argv[1]

if (phone_num[0] == '0'):
    phone_num = phone_num[1:]

if (phone_num[0] != '+'):
    phone_num = "+61" + phone_num

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = 'AC6dd9515bf9d13aa4111b13aa60a73b96'
auth_token = 'f9bbcbdfefc9f52f931441e03a2d648c'
client = Client(account_sid, auth_token)

verification = client.verify \
                     .services('VA12483739431e84536bf5f9854a63daa7') \
                     .verifications \
                     .create(to=phone_num, channel='sms')

print(verification.status)
