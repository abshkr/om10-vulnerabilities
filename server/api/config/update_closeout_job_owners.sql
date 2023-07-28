/*
To move the closeout scheduled jobs from report profile to report configuration, 
the column JOB_OWNER will be used to store report company code instead of user code.
The company "ANY" will be used to populate this column in existing job records
*/

UPDATE REPORT_CLOSEOUT_JOB SET JOB_OWNER='ANY';

COMMIT;

