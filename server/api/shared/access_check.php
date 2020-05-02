<?php

include_once 'log.php';

class AccessCheck
{
    private $conn;

    // constructor with $db as database connection
    public function __construct($db, $commit_mode = OCI_NO_AUTO_COMMIT)
    {
        $this->conn = $db;
        $this->commit_mode = $commit_mode;
    }

    //This is only for some special settings. 
    //For example, class: FolioSetting, method: freeze_closeout, object_id:90, priv: 
    private $CLASS_METHOD_OBJ_PRIV = array(
        "FolioSetting" => array(
            "freeze_closeout" => array(90, 2),      //C_FREEZEFOLIO
            "freeze_closeout" => array(89, 2)       //C_CLOSEFOLIO
        ),
        "Personnel" => array(
            "update_password" => array(82, 2),      //C_SETPASSWORD1
        ),
    );

    private $CLASS_OBJECT = array(
        // "Area" => "1",     //M_AREA
        // "Area" => "2",     //M_AREA
        // "Area" => "3",     //M_AREA
        // "Area" => "4",     //M_AREA
        // "Area" => "5",     //M_AREA
        // "Area" => "6",     //M_AREA
        // "Area" => "7",     //M_AREA
        // "Area" => "8",     //M_AREA
        // "Area" => "9",     //M_AREA
        "Schedule" => "10",         //M_LOADSCHEDULES
        "Transaction" => "11",      //M_TRANSACTIONLIST
        // "Area" => "12",     //M_AREA
        "EquipmentType" => "13",     //M_EQUIPMENT
        "Equipment" => "14",     //M_EQUIPMENTLIST
        "Tanker" => "15",     //M_TANKERS
        // "Area" => "16",     //M_AREA
        // "Area" => "17",     //M_AREA
        // "Area" => "28",     //M_AREA
        // "Area" => "19",     //M_AREA
        // "Area" => "20",     //M_AREA
        "LoadBay" => "21",     //M_LOADBAYS
        "FlowProfile" => "21",     //M_LOADBAYS
        "ArmAdditive" => "21",     //M_LOADBAYS
        "Company" => "22",     //M_COMPANIES
        "Product" => "23",     //M_PRODUCTS
        "BaseProduct" => "24",     //M_BASEPRODUCTS
        "Product" => "25",     //M_DRAWERPRODUCTS
        "Tank" => "26",     //HTML_TANKCONFIGURATION
        "Allocation" => "27",     //M_ALLOCATIONS
        "Hazchem" => "28",     //M_HAZCHEM
        "LoadMeter" => "29",     //M_LOADMETERS
        "OMJournal" => "30",     //M_JOURNALREPORT
        // "Area" => "31",     //M_AREA
        "ReportProfile" => "32",     //M_JASPERREPORTS
        "OndemandReport" => "33",     //M_ONSITEREPORT
        // "Area" => "34",     //M_AREA
        // "Area" => "35",     //M_AREA
        "ReportConfig" => "36",     //M_REPOCONFIGURATION
        "ReportProfile" => "37",     //M_REPOPROFILE
        // "Area" => "38",     //M_AREA
        // "Area" => "39",     //M_AREA
        // "Area" => "40",     //M_AREA
        "IDAssignment" => "41",     //M_IDENTIFICATIONASSIGNMENT
        "Personnel" => "42",     //M_PERSONNEL
        // "Area" => "43",     //M_AREA
        "Role" => "44",     //M_ROLEACCESS
        // "Area" => "45",     //M_AREA
        "ExpiryDateType" => "46",     //M_EXPIRYDATES
        "Area" => "47",     //M_AREA
        "Device" => "48",     //M_SITEACCESSDEVICES
        "KeyReader" => "49",     //M_KEYREADERDEVICES
        "GatePermission" => "50",     //M_GATEPERMISSION
        "Gate" => "51",     //M_GATECONTROL
        "TimeCode" => "52",     //M_TIMECODES
        "Customer" => "53",     //M_CUSTOMERS
        "OpenOrder" => "54",     //M_ORDERLISTING
        // "Area" => "55",     //M_AREA
        "Address" => "56",     //M_ADDRESSES
        "CustomerCategory" => "57",     //M_CUSTOMERCATEGORIES
        "DelvLocation" => "58",     //M_DELIVERYLOCATIONS
        "DUMMY" => "59",     //M_PRICEOFFSETS
        "DUMMY" => "61",     //M_CUSTOMERPRICING
        "DUMMY" => "62",     //M_ORDERPRODUCTPRICING
        "Metering" => "63",     //M_METERING
        "SiteBal" => "64",     //M_SITEBALANCE
        "AddTankInvess" => "65",     //M_TANKINVENTORY
        "ProdInv" => "66",     //M_PRODUCTINVENTORY
        "TankStatus" => "67",     //M_TANKSTATUS
        "ProdMovement" => "68",     //M_PRODUCTMOVEMENT
        "InvRequest" => "69",     //M_INVENTORYREQUEST
        "TankGroup" => "70",     //M_TANKGROUPS
        "MeterDevice" => "71",     //M_METERINGDEVICES
        "LogicalPrinter" => "72",     //M_LOGICALPRINTERS
        "PhysicalPrinter" => "73",     //M_PHYSICALPRINTERS
        "DUMMY" => "74",     //W_BPSEARCH
        "DUMMY" => "75",     //W_BPDETAILS
        "DUMMY" => "76",     //W_BPOWNERSHIP
        "SiteConfig" => "77",     //M_SITECONFIG
        "Site" => "77",     //M_SITECONFIG
        "Terminal" => "77",     //M_SITECONFIG
        "DUMMY" => "78",     //C_SCHEDPRODUCT
        "DUMMY" => "79",     //MENU_STOCKRECON
        "Folio" => "80",     //HTML_FOLIOMANAGEMENT
        "FolioTank" => "80",     //HTML_FOLIOMANAGEMENT
        "FolioMeter" => "80",     //HTML_FOLIOMANAGEMENT
        "FolioSchedule" => "81",     //M_FOLIOSCHEDULING
        "Movement" => "82",     //M_NOMINATION
        "CompanyBay" => "83",     //M_BAYMOVEMENT
        "IncomingMsg" => "84",     //M_GSAPMESSAGING
        "OutogingMsg" => "84",     //M_GSAPMESSAGING
        "MovementReason" => "85",     //M_MOVEMENTREASON
        "ManualTrans" => "86",     //M_MANUALTRANSACTIONS
        "SpecialMovement" => "88",     //M_SPECIALMOVEMENTS
        "DUMMY" => "91",     //M_SFTRANSACTIONLIST
        "Partner" => "93",     //M_PARTNERS
        "Partnership" => "94",     //M_PARTNERSHIP
        "AuditData" => "95",     //M_AUDITREPORT
        "DUMMY" => "96",     //MENU_OPERATIONS
        "DUMMY" => "97",     //M_BAYVIEW
        "DUMMY" => "98",     //M_TANKVIEW
        "ProductAsset" => "100",     //M_PRODUCTASSETS
    );

    private function method_to_priv($class, $method)
    {
        if ($method == "Read") {
            return 1;
        } else if ($method == "Update") {
            return 2;
        } else if ($method == "Create") {
            return 3;
        } else if ($method == "Delete") {
            return 4;
        } 

        return 1;
    }

    public function check($class, $method, $user_code)
    {
        if (!PRIVILEGE_CHECK) {
            return true;
        }
        
        write_log(sprintf("%s::%s() START. class:%s, method:%s, user_code:%s", 
            __CLASS__, __FUNCTION__, $class, $method, $user_code),
            __FILE__, __LINE__);

        if ($user_code == null) {
            return true;
        }

        if (isset($this->CLASS_METHOD_OBJ_PRIV[$class][$method])) {
            $obj = $this->CLASS_METHOD_OBJ_PRIV[$class][$method][0];
            $priv = $this->CLASS_METHOD_OBJ_PRIV[$class][$method][1];
            // write_log($obj, __FILE__, __LINE__);
            // write_log($priv, __FILE__, __LINE__);
        } else {
            if (!array_key_exists($class, $this->CLASS_OBJECT)) {
                write_log(sprintf("class %s not defined in privilege check", $class), 
                    __FILE__, __LINE__, LogLevel::ERROR);
                return true;
            }
    
            $obj = $this->CLASS_OBJECT[$class];
            $priv = 1;
            if ($method == "Read") {
                $priv = 1;
            } else if ($method == "Update") {
                $priv = 2;
            } else if ($method == "Create") {
                $priv = 3;
            } else if ($method == "Delete") {
                $priv = 4;
            }
            // write_log($obj, __FILE__, __LINE__);
            // write_log($priv, __FILE__, __LINE__);
        }

        $query = "SELECT COUNT(*) CN 
            FROM URBAC_ROLE_DOMAINS_PRIVILEGES, URBAC_USER_ROLES, URBAC_USERS
            WHERE URBAC_USERS.USER_ID = URBAC_USER_ROLES.USER_ID AND URBAC_USERS.USER_CODE = :user_code
                AND URBAC_ROLE_DOMAINS_PRIVILEGES.ROLE_ID = URBAC_USER_ROLES.ROLE_ID
                AND OBJECT_ID = :obj_id 
                AND PRIVILEGE_ID = :priv";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':user_code', $user_code);
        oci_bind_by_name($stmt, ':obj_id', $obj);
        oci_bind_by_name($stmt, ':priv', $priv);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            return true;
        }

        return false;
    }
}