<?php
require_once 'dmsService.php';
require_once __DIR__ . '/../dmController.php';
require_once __DIR__ . '/../models/dmFolioSchedule.php';
// not journaled yet//
class dmsFolioSettingsService extends dmsService
{

    public function __construct($params = false)
    {
        $this->SQLTable = "SITE";
        parent::__construct($params);
        $this->ctl = dmController::getController();
    }

    public function saveData($params = false)
    {

        if (!($chk = $this->bind(array("plug" => "dmpSession"))) instanceof dmMesg) {$this->sane = false;
            $this->sanityError = $chk;}

        $sess = $this->PLUG->dmpSession;
        $ucode = $_SESSION['PERCODE'];

        if (isset($params->NEXT_REPORT_TIME) && $params->NEXT_REPORT_TIME) {
            $sql = "SELECT TO_CHAR(PARAM_VALUE, 'yyyy-MM-dd hh24:mi') REPORT_TIME
                FROM CLOSEOUT_DATE_SETTINGS
                WHERE PARAM_KEY = 'NEXT_REPORT_TIME'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }

            if ($chk->data[0]["REPORT_TIME"] != $params->NEXT_REPORT_TIME) {
                $msg = sprintf("User %s changed next report time from %s to %s",
                    $ucode, $chk->data[0]["REPORT_TIME"], $params->NEXT_REPORT_TIME);

                if (!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceof dmMesg) {
                    $chk->opType = "journal msg";
                    return $chk;
                }
                $jnl = $chk->data;
                if (!($chk = $jnl->recordMsg($msg) instanceof dmMesg)) {
                    $chk->opType = "journal msg";
                    return $chk;
                }
            }

            $sql = "UPDATE CLOSEOUT_DATE_SETTINGS SET PARAM_VALUE = to_date('" . $params->NEXT_REPORT_TIME . "',   'yyyy-MM-dd hh24:mi'), LAST_CHG_TIME = sysdate, LAST_CHG_USER = '$ucode' WHERE PARAM_KEY = 'NEXT_REPORT_TIME'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }

        }
        if (isset($params->NEXT_WEEKLY_REPORT_DATE) && $params->NEXT_WEEKLY_REPORT_DATE) {
            $sql = "SELECT TO_CHAR(PARAM_VALUE, 'yyyy-MM-dd hh24:mi') REPORT_TIME
                FROM CLOSEOUT_DATE_SETTINGS
                WHERE PARAM_KEY = 'NEXT_WEEKLY_REPORT_DATE'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }

            if ($chk->data[0]["REPORT_TIME"] != $params->NEXT_WEEKLY_REPORT_DATE) {
                $msg = sprintf("User %s changed next weekly report time from %s to %s",
                    $ucode, $chk->data[0]["REPORT_TIME"], $params->NEXT_WEEKLY_REPORT_DATE);

                if (!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceof dmMesg) {
                    $chk->opType = "journal msg";
                    return $chk;
                }
                $jnl = $chk->data;
                if (!($chk = $jnl->recordMsg($msg) instanceof dmMesg)) {
                    $chk->opType = "journal msg";
                    return $chk;
                }
            }

            $sql = "UPDATE CLOSEOUT_DATE_SETTINGS SET PARAM_VALUE = to_date('" . $params->NEXT_WEEKLY_REPORT_DATE . "',   'yyyy-MM-dd'), LAST_CHG_TIME = sysdate, LAST_CHG_USER = '$ucode' WHERE PARAM_KEY = 'NEXT_WEEKLY_REPORT_DATE'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }

        }
        if (isset($params->NEXT_MONTHLY_REPORT_DATE) && $params->NEXT_MONTHLY_REPORT_DATE) {
            $sql = "SELECT TO_CHAR(PARAM_VALUE, 'yyyy-MM-dd hh24:mi') REPORT_TIME
                FROM CLOSEOUT_DATE_SETTINGS
                WHERE PARAM_KEY = 'NEXT_MONTHLY_REPORT_DATE'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }

            if ($chk->data[0]["REPORT_TIME"] != $params->NEXT_MONTHLY_REPORT_DATE) {
                $msg = sprintf("User %s changed next monthly report time from %s to %s",
                    $ucode, $chk->data[0]["REPORT_TIME"], $params->NEXT_MONTHLY_REPORT_DATE);

                if (!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceof dmMesg) {
                    $chk->opType = "journal msg";
                    return $chk;
                }
                $jnl = $chk->data;
                if (!($chk = $jnl->recordMsg($msg) instanceof dmMesg)) {
                    $chk->opType = "journal msg";
                    return $chk;
                }
            }

            $sql = "UPDATE CLOSEOUT_DATE_SETTINGS SET PARAM_VALUE = to_date('" . $params->NEXT_MONTHLY_REPORT_DATE . "',   'yyyy-MM-dd'), LAST_CHG_TIME = sysdate, LAST_CHG_USER = '$ucode' WHERE PARAM_KEY = 'NEXT_MONTHLY_REPORT_DATE'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }
        }

        if (isset($params->OP_DAY_MNTH_YEAR) && $params->OP_DAY_MNTH_YEAR) {
            $sql = "UPDATE CLOSEOUT_DATE_SETTINGS SET PARAM_VALUE = to_date('" . $params->OP_DAY_MNTH_YEAR . "',   'yyyy-MM-dd'), LAST_CHG_TIME = sysdate, LAST_CHG_USER = '$ucode' WHERE PARAM_KEY = 'OP_DAY_MNTH_YEAR'";
            if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
                return $chk;
            }
        }

        $sql = "UPDATE SITE SET
            SITE_LD_RETNPRD           = '" . $params->SITE_LD_RETNPRD . "',
            SITE_LD_RETN_NEWLDS       = '" . $params->SITE_LD_RETN_NEWLDS . "',
            SITE_EXP_MONTHS           = '" . $params->SITE_EXP_MONTHS . "',
            SITE_LD_RETNPRD_NEW_MOV   = '" . $params->SITE_LD_RETNPRD_NEW_MOV . "',
            SITE_LD_RETNPRD_USED_MOV  = '" . $params->SITE_LD_RETNPRD_USED_MOV . "'";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        return new dmMesg(array("data" => $chk->data));
    }

    public function getSiteRow()
    {
        $sql = "SELECT * FROM SITE";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        return array("data" => $chk->data);
    }

    public function manualCloseoutFreeze($params = false)
    {

        $sql = "SELECT NEXT_MANUAL_FREEZE_DATETIME FROM SITE";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        $result = array("data" => $chk->data);

        $sql = "UPDATE SITE SET NEXT_MANUAL_FREEZE_DATETIME = SYSDATE, NEXT_CLOSEOUT_REQ_USER = '$params->user'";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        // override done in the front end
        /*
        if($params->override != null){
        $payload->WINDOW_NAME      = "ONCE_WINDOW";
        $payload->REPEAT_INTERVAL  = $params->override;
        $payload->START_TIME       = "";
        $payload->END_TIME         = "";
        $payload->STATUS           = "1";
        $payload->DESCRIPTION      = "Manual Closeout Freeze";
        $arg->payload              = $payload;
        $exception = new dmFolioSchedule($arg);
        $exception->create($arg);
        }*/

        if (!($chk = $this->bind(array("plug" => "dmpSession"))) instanceof dmMesg) {$this->sane = false;
            $this->sanityError = $chk;}
        $sess = $this->PLUG->dmpSession;
        $ucode = $_SESSION['PERCODE'];
        $msg = "[" . $ucode . "] triggers to run manual closeout freeze";

        if (!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceof dmMesg) {
            $chk->opType = "journal msg";
            return $chk;
        }
        $jnl = $chk->data;
        if (!($chk = $jnl->recordMsg($msg) instanceof dmMesg)) {
            $chk->opType = "journal msg";
            return $chk;
        }

        return new dmMesg($result);
    }

    public function manualCloseoutClose($params = false)
    {

        // generate report for this date
        //$url = "/cgi-bin/en/rpt_adm/jasper_reports.cgi?sess_id=FzzfZmZuQuUn&output=pdf&company=ANY&report=basesum_e.sql&startdate=2013-05-05 12:11:56&enddate=2013-05-06 12:11:56";
        //get_file_content($url);

        $sql = "SELECT NEXT_MANUAL_CLOSE FROM SITE";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        $sql = "UPDATE CLOSEOUT_TANK SET CLOSE_STD_TOT = 0 
            WHERE CLOSE_STD_TOT IS NULL 
                AND CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }
        $sql = "UPDATE CLOSEOUT_TANK SET CLOSE_MASS_TOT = 0 
            WHERE CLOSE_MASS_TOT IS NULL
                AND CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }
        $sql = "UPDATE CLOSEOUT_METER SET CLOSE_AMB_TOT = 0 
            WHERE CLOSE_AMB_TOT IS NULL
                AND CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }
        $sql = "UPDATE CLOSEOUT_METER SET CLOSE_STD_TOT = 0 
            WHERE CLOSE_STD_TOT IS NULL
                AND CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }
        $sql = "UPDATE CLOSEOUT_METER SET CLOSE_MASS_TOT = 0 
            WHERE CLOSE_MASS_TOT IS NULL
                AND CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        $result = array("data" => $chk->data);
        $sql = "UPDATE SITE SET NEXT_MANUAL_CLOSE = 'Y', NEXT_CLOSEOUT_REQ_USER = '$params->user'";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        if (!($chk = $this->bind(array("plug" => "dmpSession"))) instanceof dmMesg) {$this->sane = false;
            $this->sanityError = $chk;}
        $sess = $this->PLUG->dmpSession;
        $ucode = $_SESSION['PERCODE'];
        $msg = "[" . $ucode . "] triggers to close first frozen folio";

        if (!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceof dmMesg) {
            $chk->opType = "journal msg";
            return $chk;
        }
        $jnl = $chk->data;
        if (!($chk = $jnl->recordMsg($msg) instanceof dmMesg)) {
            $chk->opType = "journal msg";
            return $chk;
        }

        return new dmMesg($result);
    }

    public function canSetAuto($params = false)
    {

        // generate report for this date
        //$url = "/cgi-bin/en/rpt_adm/jasper_reports.cgi?sess_id=FzzfZmZuQuUn&output=pdf&company=ANY&report=basesum_e.sql&startdate=2013-05-05 12:11:56&enddate=2013-05-06 12:11:56";
        //get_file_content($url);

        $sql = "SELECT COUNT(*) as NUM FROM CLOSEOUTS WHERE STATUS = 1";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        $result = array("num" => $chk->data[0]["NUM"]);

        return new dmMesg(array("data" => $result));
    }

    public function loadData($params = false)
    {
        $return = array();
        $sql = "SELECT * FROM CLOSEOUT_DATE_SETTINGS";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        foreach ($chk->data as $record) {

            if ($record["PARAM_VALUE"] == null) {
                $record["PARAM_VALUE"] = "1970-1-1 0:0:0:0";
                $record["LAST_CHG_USER"] = "No one";
                $record["LAST_CHG_TIME"] = "1970-1-1 0:0:0:0";
            }
            $return[$record["PARAM_KEY"]] = $record;
        }
        $sql = " SELECT SITE_LD_RETN_NEWLDS, SITE_LD_RETNPRD, SITE_EXP_MONTHS, NEXT_MANUAL_FREEZE_DATETIME, NEXT_MANUAL_CLOSE, SITE_LD_RETNPRD_NEW_MOV, SITE_LD_RETNPRD_USED_MOV  FROM SITE";
        if (!($chk = $this->ctl->query(array("sql" => $sql))) instanceof dmMesg) {
            return $chk;
        }

        $return["SITE_LD_RETN_NEWLDS"] = $chk->data[0]["SITE_LD_RETN_NEWLDS"];
        $return["SITE_LD_RETNPRD"] = $chk->data[0]["SITE_LD_RETNPRD"];
        $return["SITE_EXP_MONTHS"] = $chk->data[0]["SITE_EXP_MONTHS"];
        $return["NEXT_MANUAL_FREEZE_DATETIME"] = $chk->data[0]["NEXT_MANUAL_FREEZE_DATETIME"];
        $return["NEXT_MANUAL_CLOSE"] = $chk->data[0]["NEXT_MANUAL_CLOSE"];
        $return["SITE_LD_RETNPRD_NEW_MOV"] = $chk->data[0]["SITE_LD_RETNPRD_NEW_MOV"];
        $return["SITE_LD_RETNPRD_USED_MOV"] = $chk->data[0]["SITE_LD_RETNPRD_USED_MOV"];

        return new dmMesg(array("data" => $return));
    }

}
