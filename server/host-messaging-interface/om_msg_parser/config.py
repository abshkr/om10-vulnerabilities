# Defines the disable flag, directory where log file is created and stored, the debug level and backup count
# Valid values for debug level is DEBUG, INFO, WARNING, ERROR or CRITICAL. DEBUG represent the lowest/finest amount of detail and
# CRITICAL represent the highest/least level of detail. Debug level will default to 'ERROR' if the specified value is invalid.
# Default backup count is one month's worth of data (31 days, one file per day, rollover at midnight) if the specified value is not numeric.
log_disable = 0
log_path = "./log/pomsg.log"
log_debug_level = "DEBUG"
log_backup_count = 5


