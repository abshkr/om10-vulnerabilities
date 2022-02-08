import os, sys, logging
from twilio.rest import Client

if len(sys.argv) < 3:
    print("Usage: %s phone_num code\n" % sys.argv[0])
    sys.exit(0)

phone_num = sys.argv[1]

if (phone_num[0] == '0'):
    phone_num = phone_num[1:]

if (phone_num[0] != '+'):
    phone_num = "+61" + phone_num

code = sys.argv[2]

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = 'AC6dd9515bf9d13aa4111b13aa60a73b96'
auth_token = 'f9bbcbdfefc9f52f931441e03a2d648c'
client = Client(account_sid, auth_token)

verification = client.verify \
                     .services('VA12483739431e84536bf5f9854a63daa7') \
                     .verification_checks  \
                     .create(to=phone_num, code=code)

print(verification.status)