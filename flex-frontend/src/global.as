package 
{
	
	import Crypto2.MD5;
	import Crypto2.SHA256;
	
	import br.com.rectius.library.notificator.NotificatorManager;
	import br.com.rectius.library.notificator.NotificatorMode;
	
	import com.hurlant.crypto.Crypto;
	import com.hurlant.crypto.symmetric.BlowFishKey;
	import com.hurlant.crypto.symmetric.ICipher;
	import com.hurlant.crypto.symmetric.IPad;
	import com.hurlant.crypto.symmetric.PKCS5;
	import com.hurlant.util.Hex;
	
	import components.DKI_DateRange;
	import components.DKI_DateTime;
	import components.FlexiTimer;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.globalization.DateTimeFormatter;
	import flash.globalization.LocaleID;
	import flash.net.NetConnection;
	import flash.net.ObjectEncoding;
	import flash.net.Responder;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;
	import flash.utils.describeType;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedClassName;
	
	import mx.collections.ArrayCollection;
	import mx.collections.ArrayList;
	import mx.collections.XMLListCollection;
	import mx.controls.DateField;
	import mx.core.ClassFactory;
	import mx.core.FlexGlobals;
	import mx.messaging.ChannelSet;
	import mx.messaging.channels.SecureAMFChannel;
	import mx.rpc.CallResponder;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;
	import mx.rpc.remoting.RemoteObject;
	import mx.utils.Base64Decoder;
	import mx.utils.ObjectUtil;
	
	import renderers.DateRenderer;
	import renderers.DateTimeRenderer;
	
	import spark.components.DataGrid;
	import spark.components.gridClasses.GridColumn;
	import spark.formatters.DateTimeFormatter;
	
	public class global extends EventDispatcher
	{
		//=================================================================================================		
		// url & language navigation
		//=================================================================================================
		public static var CGIUrl:String = "";
		[Bindable] public static var Build:String = "";
		[Bindable] public static var BuildMain:String = "";
		public static var Version:String = "";
		public static var Client:String = "";
		
		[Bindable] public static var LOGIN_OBJECT:Object;
		[Bindbale] public static var OMLITE:Boolean = CONFIG::OMLITE;
		
		[Bindable] public static var mcp2p:Boolean=false;
		[Bindable] public static var mcp2pServer:String="rtmfp://10.2.20.53:1935";
		[Bindable] public static var mcp2pGroupID:String="MOBHK";
		
		[Bindable] public static var canArchive:Boolean=false;
		[Bindable] public static var canRepost:Boolean=false;
		[Bindable] public static var canReverseMovement:Boolean=false;
		[Bindable] public static var isLoadCancel:Boolean=false;
		[Bindable] public static var isContainer:Boolean=true;
		
		[Bindable] public static var siteSealSourceExternal:Boolean=false;
		[Bindable] public static var siteUseSeal:Boolean=false;
		[Bindable] public static var siteCanResetDriver:Boolean=false;
		[Bindable] public static var siteUseWeighbridge:Boolean=false;
		
		[Bindable] public static var specialUpdate:Boolean=false;
		[Bindable] public static var scUpdate:Boolean=false;
		[Bindable] public static var scView:Boolean=false;
		[Bindable] public static var serverTime:String="";
		[Bindable] public static var serverDateTime:Date;
		[Bindable] public static var reportsGateway:String="/amfservices/report_gateway.php";
		[Bindable] public static var journalGateway:String="/amfservices/journal_gateway.php";
		[Bindable] public static var mainGatewayURL:String="/amfservices/gateway/amf2/index.php";
		
		
		public static var dbCharacterSet:String="";
		public static var LanguageCode:String="ENG";
		public static var LanguageId:int =125;
		[Bindable] public static var LangImage:String="assets/language/m_english.png";
		public static var sessionID:String;
		[Bindable] public static var user:String;
		
		[Bindable] public static var wg_tankers:int;
		[Bindable] public static var wg_personnel:int;
		[Bindable] public static var wg_tankers_active:int;
		[Bindable] public static var wg_personnel_active:int;
		[Bindable] public static var wg_activeid:ArrayCollection 		= new ArrayCollection;
		[Bindable] public static var wg_current_folio:ArrayCollection 	= new ArrayCollection;
		[Bindable] public static var wg_tanker_movement:ArrayCollection = new ArrayCollection;
		[Bindable] public static var wg_max_trans_id:ArrayCollection 	= new ArrayCollection;
		[Bindable] public static var wg_max_tags_flag:Boolean = false;
		[Bindable] public static var wg_max_tags:int = -1;
		
		[Bindable] public static var username:String;
		[Bindable] public static var hasAccess:Boolean=false;
		[Bindable] public static var flashing:Boolean=true;
		public static var userpass:String;
		[Bindable] public static var userdept:String;
		[Bindable] public static var isManager:Boolean = false;
		[Bindable] public static var siteName:String = '';
		[Bindable] public static var siteCode:String = '';
		
		[Bindable] public static var exp1:String='Driver License';
		[Bindable] public static var exp2:String='Dangerous Goods License';
		[Bindable] public static var exp3:String='AIP Passport';
		[Bindable] public static var exp4:String='';
		[Bindable] public static var exp5:String='';
		[Bindable] public static var exp6:String='';
		[Bindable] public static var exp7:String='';
		[Bindable] public static var exp8:String='';
		[Bindable] public static var exp9:String='';
		
		[Bindable] public static var limitToServerDateTime:Boolean = false;
		[Bindable] public static var journalSort:String="N";
		
		public static var company:String = '';
		public static var manager:String='F';
		[Bindable] public static var hasExpiry:Boolean=false;
		public static var expiryTime:Number = 0;
		public static var gDefaultTimeString:String="";
		
		[Bindable] public static var gSafefillLabel:String="";
		[Bindable] public static var gCapacityLabel:String="";
		
		
		public static var srchText:String="";
		public static var firstItem:int=0;
		public static var srchArr:ArrayCollection = new ArrayCollection();
		
		public static var autoLogin:Boolean = false;
		
		public static var journalliveFeed:ArrayCollection = new ArrayCollection();
		public static var journalSearch:ArrayCollection = new ArrayCollection();
		public static var journalDrilldown:ArrayCollection = new ArrayCollection();
		
		
		public static var app:Object;
		//=================================================================================================		
		// user interface configuration values
		//=================================================================================================		
		
		[Bindable] static public var hiColor:uint = 0xD2D3D5;
		[Bindable] static public var loColor:uint = 0x0056A5;
		[Bindable] static public var gapSize:int = 20;
		
		[Bindable] static public var pw:int;
		[Bindable] static public var ph:int;
		
		[Bindable] static public var passStr:String="*requires alpha or numeric characters";
		[Bindable] static public var setComboBoxNoSelection:Boolean=true;
		
		//=================================================================================================		
		// embedded graphic assets for menu's buttons and dragdrop operations
		//=================================================================================================		
		
		[Bindable] public static var iconList:ArrayCollection = new ArrayCollection();
		[Bindable] public static var menuArray:ArrayCollection = new ArrayCollection();
		public static var indexPos:int = 0;
		static public var sortingBySingleColumn:Boolean = true;
		
		//=================================================================================================		
		// enumeration types used for filtering etc......
		//=================================================================================================	
		
		// Company types
		static public const SITE_MANAGER_CMPY:int=1;
		static public const SUPPLIER_COMPANY:int=2;
		static public const CARRIER_COMPANY:int=4;
		static public const CUSTOMER_COMPANY:int=8;
		static public const DRAWER_COMPANY:int=16;
		static public const ISSUER_COMPANY:int=32;
		static public const EMPLOYER_COMPANY:int=64;
		static public const HOST_COMPANY:int=128;
		static public const CO_INVALID_TYPE:int=999;
		
		// Allocation Types
		static public const ALLOC_SUPPLIER:int=0;
		static public const ALLOC_CARRIER:int=1;
		static public const ALLOC_CUSTOMER:int=2;
		static public const ALLOC_DRAWER:int=3;
		
		static public const PERIOD_DAILY:int=1;
		static public const PERIOD_WEEKLY:int=2;
		static public const PERIOD_FORTNIGHTLY:int=3;
		static public const PERIOD_MONTHLY:int=4;
		
		static public const MEASURE_Lamb:int=5;
		static public const MEASURE_Lcor:int=11;
		static public const MEASURE_KG:int=17;
		
		static public const MSG_TIMEOUT:int=4000;
		
		static public const INDICATOR_MANDATORY:String = "*";
		
		
		//site config data
		[Bindable] static public var minPassLength:int = 2;
		[Bindable] static public var maxPassLength:int = 40;
		static public var passComplexity:int=6;
		static public var autoLockout:int = 3;
		static public var timeOut:int = 1;
		
		
		
		//=================================================================================================		
		// Globl Lookup arrays
		//=================================================================================================	
		[Bindable] static public var companyArr:ArrayCollection = new ArrayCollection();
		[Bindable] static public var OwnerArr:ArrayCollection = new ArrayCollection();
		[Bindable] static public var measuresArr:ArrayCollection=new ArrayCollection([
			{id:5,desc:'l(amb)'},
			{id:11,desc:'l(cor)'},
			{id:17,desc:'kg'}
		]);
		
		
		
		
		//=================================================================================================		
		// Enumerated types
		//=================================================================================================	
		
		[Bindable] static public var loadUnits: ArrayCollection = new ArrayCollection();
		[Bindable] static public var prodUnits: ArrayCollection = new ArrayCollection();
		[Bindable] static public var contactLineTypes: ArrayCollection = new ArrayCollection();
		[Bindable] static public var ruleTypes: ArrayCollection = new ArrayCollection();
		[Bindable] static public var authTypes: ArrayCollection = new ArrayCollection();
		[Bindable] static public var eqptTypes: ArrayCollection = new ArrayCollection();
		[Bindable] static public var gCompanyTypes: ArrayCollection = new ArrayCollection();
		[Bindable] static public var gDrawerProducts: ArrayCollection = new ArrayCollection();
		
		[Bindable] static public var companyTypes:ArrayCollection = new ArrayCollection([
			{ ID:0, Name:"All"},
			{ ID:SUPPLIER_COMPANY, Name:"Supplier"},
			{ ID:CARRIER_COMPANY, Name:"Carrier"},
			{ ID:CUSTOMER_COMPANY, Name:"Customer"},
			{ ID:DRAWER_COMPANY, Name:"Drawer"},
			{ ID:ISSUER_COMPANY, Name:"Issuer"},
			{ ID:EMPLOYER_COMPANY, Name:"Employer"},
			{ ID:HOST_COMPANY, Name:"Host"},
			{ ID:SITE_MANAGER_CMPY, Name:"Site Manager"}]);
		
		[Bindable] static public var allocTypes:ArrayCollection = new ArrayCollection([
			{ ID:-1, Name:"All"},
			{ ID:ALLOC_SUPPLIER, Name:"Supplier"},
			{ ID:ALLOC_CARRIER, Name:"Carrier"},
			{ ID:ALLOC_CUSTOMER, Name:"Customer"},
			{ ID:ALLOC_DRAWER, Name:"Drawer"},
		]);
		
		[Bindable] static public var periodTypes:ArrayCollection = new ArrayCollection([
			{ID:PERIOD_DAILY, TYPE:"Daily"},
			{ID:PERIOD_WEEKLY, TYPE:"Weekly"},
			{ID:PERIOD_FORTNIGHTLY, TYPE:"Fortnightly"},
			{ID:PERIOD_MONTHLY, TYPE:"Monthly"}
		]);
		
		[Bindable] static public var periodLock:ArrayCollection = new ArrayCollection([
			{ID:0, TYPE:"Reset"},
			{ID:1, TYPE:"Check"},
			{ID:2, TYPE:"Free"},
			{ID:3, TYPE:"Lock"},
			{ID:4, TYPE:"Period"}
		]);
		
		//=================================================================================================		
		// id's for main view and sub view navigation
		// events use these values in order to navigate between views
		//=================================================================================================	
		
		static public var CharsetType: String= "gb2312";
		[Bindable] static public var companyAssets:String = "assets/default.swf";
		[Bindable] static public var Navigator:ArrayCollection= new ArrayCollection();
		[Bindable] static public var Languages:ArrayCollection= new ArrayCollection();
		
		public static function includedInOMLite(module:String):Boolean{
			switch(module){
				case "M_LOADSCHEDULES":
				case "M_EQUIPMENT":
				case "M_EQUIPMENTLIST":
				case "M_TANKERS":
				case "M_TRANSACTIONLIST":
				case "M_LOADBAYS":
				case "M_COMPANIES":
				case "M_BASEPRODUCTS":
				case "M_DRAWERPRODUCTS":
				case "M_TANKCONFIGURATION":
				case "M_HAZCHEM":
				case "M_LOADMETERS":
				case "M_JOURNALREPORT":
				case "M_REPOPROFILE":
				case "M_JASPERREPORTS":
				case "M_REPOCONFIGURATION":
				case "M_FOLIOMANAGEMENT":
				case "M_FOLIOSCHEDULING":		// added for omega lite
				case "M_IDENTIFICATIONASSIGNMENT":
				case "M_PERSONNEL":
				case "M_ROLEACCESS":
				case "M_SITECONFIG":
				case "M_EXPIRYDATES":
				case "M_AREA":
				case "M_TIMECODES":
				case "M_METERING":
				case "M_TANKINVENTORY":
				case "M_PRODUCTINVENTORY":
				case "M_TANKSTATUS":
				case "M_MANUALTRANSACTIONS":
				case "MENU_HOME":
				case "MENU_SCHEDULE":
				case "MENU_GANTRY":
				case "MENU_REPORTS":
				case "MENU_ACCESS":
				case "MENU_STOCK":
				case "MENU_STOCKRECON":
					return true;
			}return false;
		}
		
		
		public static function getIcon(value:String):int
		{
			var ret:int = -1;
			for (var j:int = 0; j < iconList.length;j++)
			{
				if (iconList[j].ICON == value)
				{
					ret=j;
					break;
				}
			}
			return ret;
		}
		
		static private var urlLoader:URLLoader = new URLLoader();
		static private var _callback:Function;
		
		public static function getConfig(value:Function): void
		{
			_callback = value;
			urlLoader.addEventListener(Event.COMPLETE,onFetchXML);
			urlLoader.load(new URLRequest("config/menu.xml"));
		}
		
		public static function getCompanyName(value:String): String
		{
			var res:String="null";
			for (var i:int=0; i < companyArr.length;i++)
			{
				if (companyArr[i].cmpy_code == value)
				{
					res = companyArr[i].cmpy_name;
					i = companyArr.length;
				}
			}
			return res;
		}
		
		protected static function onFetchXML(event:Event):void
		{
			//var lngCode:String ="GB2312";
			//var xmlStr:String = (urlLoader.data as ByteArray).readMultiByte(urlLoader.data.length, "zh_CN");
			//var xmlStr:String = urlLoader.data;
			var tmp:XML = new XML(urlLoader.data);
			CGIUrl = tmp.CONFIG.@VALUE;
			urlLoader.removeEventListener(Event.COMPLETE,onFetchXML);
			if (_callback != null) _callback(tmp);
		}
		
		public static function testObjects(): void{
			trace("pause to view objects in this module");
		}
		
		
		
		public static function msgFail(msg:String): void
		{
			NotificatorManager.show(msg, NotificatorMode.FAILURE, MSG_TIMEOUT);
		}
		
		public static function msgSuccess(msg:String): void
		{
			NotificatorManager.show(msg, NotificatorMode.SUCCESS, MSG_TIMEOUT);
		}
		
		public static function msgWarning(msg:String): void
		{
			NotificatorManager.show(msg, NotificatorMode.WARNING, MSG_TIMEOUT);
		}
		
		//=================================================================================================		
		// Functions for building where and or clauses for SQL
		//=================================================================================================
		public static function genQueryString(arr:ArrayCollection):String
		{
			var i:int = 0;
			var query:String = "";
			var obj:Object = new Object();
			var tempString:String = "";
			var firstOr:Boolean = true;
			//for(var j:int = 0; j < arr.length ++j)
			for(i = 0; i < arr.length; ++i)
			{
				obj = new Object();
				obj = arr.getItemAt(i);
				var tmp:int = i-1;
				if(obj.selectType == "AND")
				{
					if(arr.length == 1)
						return " WHERE " + obj.fieldName + "='" + obj.value + "'";
					else if(i > 0)
						tempString += " AND " + obj.fieldName + "='" + obj.value + "'";
					else
						tempString += obj.fieldName + "='" + obj.value + "'";
				}	
				else
				{
					if(obj.value == null)
						query += " " + obj.selectType + " " + obj.fieldName + " IS NULL";
					else
					{
						if(i==0 || firstOr)
						{
							//query += " " + obj.fieldName + " LIKE UPPER ('%"+ obj.value + "%') OR " + obj.fieldName + " LIKE LOWER ('%"+ obj.value + "%')";
							query += " UPPER(" + obj.fieldName + ") LIKE UPPER ('%"+ obj.value + "%') ";
						}
						else
						{
							query += " " + obj.selectType + " UPPER(" + obj.fieldName + ") LIKE UPPER ('%"+ obj.value + "%') ";
						}
						firstOr=false;
					}
				}
			}
			if(tempString != "")
			{
				if(query != "")
					query = " WHERE " + tempString + " AND (" + query + ")"
				else
					query = " WHERE " + tempString;
				return query;
			}
			if(query == "")
				return query
			else
				return " WHERE " + query
		}
		
		public static function passObject(obj:Object): String
		{
			var classInfo:XML = describeType(obj);
			
			var v_type:String;
			
			var whereStr:String='';
			var tmpStr:String;
			
			for each (var v:XML in classInfo..accessor) 
			{
				if (v.@type == "String" || v.@type=="int")
				{
					
					if (obj[v.@name])
					{
						if (v.@type == "String")
							tmpStr=v.@name+"='"+obj[v.@name]+"'" 
						else 
							tmpStr=v.@name+"="+obj[v.@name];
						if  (whereStr.length > 5) whereStr += " AND ";	
						whereStr += tmpStr;
					}
				}
			}
			return whereStr;
			
		}
		
		
		public static function getLocaleDate(item:Object, col:GridColumn):String
		{
			var date:Date = new Date();
			var fn:String = '';
			if (item[col.dataField] != null)
			{
				fn = item[col.dataField];
				date = DateField.stringToDate(fn,"YYYY-MM-DD");			
				fn = app.timeFormatter.format(date)+ fn.substr(10,9);
			}
			return fn;
		}
		
		public static function getDateString(item:Date,hasTime:Boolean=true):String
		{
			var fn:String = '';
			var df:spark.formatters.DateTimeFormatter = new spark.formatters.DateTimeFormatter();
			df.dateStyle="short";
			if (hasTime)
				df.timeStyle="short" else df.timeStyle="none";
			df.setStyle("locale", LocaleID.DEFAULT);
			return df.format(item);
		}
		
		//=================================================================================================		
		// Alert box management
		//=================================================================================================
		
		[Bindable] public static var messageList:ArrayCollection = new ArrayCollection();
		[Bindable] public static var messageLimit:int=5;
		
		[Bindable] public static var resultMessage:String;
		
		//=================================================================================================		
		// Colors
		//=================================================================================================		
		[Bindable] public static var color1_normal:uint = 0x346B9B;
		[Bindable] public static var color1_over:uint = 0xFFFFFF;
		[Bindable] public static var color1_down:uint = 0x004B93;
		
		[Bindable] public static var color2_normal:uint = 0xEEEEEE;
		[Bindable] public static var color2_over:uint = 0xFFFFFF;
		[Bindable] public static var color2_down:uint = 0xFFFFFF;
		
		
		//=================================================================================================		
		// Error Messages
		//=================================================================================================
		
		[Bindable] public static var UpdateError:String = "Update failed.";
		[Bindable] public static var CreateError:String = "Creation failed.";
		[Bindable] public static var DeleteError:String = "Delete failed.";
		[Bindable] public static var DeleteDependenciesError:String = "Delete Failed: Dependent Child Records exists.";//"Can't delete item it has dependencies";
		[Bindable] public static var RetrieveError:String = "Cannot retrieve items.";
		[Bindable] public static var TypesError:String = "Cannot retrieve types list.";
		[Bindable] public static var ExistingTripNumber:String = "This trip number already exists.";
		[Bindable] public static var DisasterError:String ="Something went really wrong, contact Administrator";
		
		
		//=================================================================================================		
		// Success Messages
		//=================================================================================================
		
		[Bindable] public static var UpdateSuccess:String = "Update successful.";
		[Bindable] public static var CreateSuccess:String = "Creation successful.";		
		[Bindable] public static var DeleteSuccess:String = "Delete successful.";
		
		//=================================================================================================		
		// Success Messages
		//=================================================================================================
		[Bindable] public static var ico_create:String = "assets/icons/create.png";
		
		//=================================================================================================		
		// Company Success Messages
		//=================================================================================================
		[Bindable] public static var cmpmsg00:String = "Company Code to long";
		[Bindable] public static var cmpmsg01:String = "Company Name to long";
		[Bindable] public static var cmpmsg02:String = "No Company Code entered";
		
		
		
		public static var gTimer:FlexiTimer = new FlexiTimer(15,4,false);
		
		
		public static function anonsense(u:String,p:String):String{
			var m:String = MD5.hash(u);
			trace("ORIG", m);
			m = m.substr(m.length/2,m.length) + m.substr(0,m.length/2);
			trace("TRIPED", m);
			m = SHA256.hash(m);
			trace("HASHED", m);
			var keyData:ByteArray  = Hex.toArray(m); 
			var passData:ByteArray = Hex.toArray(Hex.fromString(p));
			var pad:IPad = new PKCS5;
			var cip:ICipher = Crypto.getCipher("blowfish-ecb",keyData,new PKCS5);
			pad.setBlockSize(cip.getBlockSize());
			cip.encrypt(passData);
			return Hex.fromArray(passData);			
		}
		public static function nonsense(u:String,p:String):String{
			var ui:int = (u.length%5);
			var pi:int = (p.length%5);
			var m:String = MD5.hash(u).substr(pi,pi+5);
			var c:String = MD5.hash(p).substr(ui,ui+5);
			var s:String = m+p+c;
			return SHA256.hash(s);
		}
		public static function pwdComplexity(p:String,r:String):int{
			if(p!=r) return 4;
			if(p.length < minPassLength) return 3;
			if(p.length > maxPassLength) return 3;
			
			var a:Boolean = p.match(/[a-z]/g).length>0;
			var A:Boolean = p.match(/[A-Z]/g).length>0;
			var n:Boolean = p.match(/[0-9]/g).length>0;
			var P:Boolean = p.match(/[^a-zA-Z0-9]/g).length>0;
			
			switch(passComplexity){
				// can have alphanumeric
				case 6: return (a||A||n||P)?0:1;
				// must have lowercase uppercase and number
				case 7: return (a && A && n)?0:1;
				// must have lowercase uppercase number and punctuation
				case 15: return (a && A && n && P)?0:1;
			}
			return 0;
		}
		
		public static function get gatewayURL():String{
			
			var uri:String = FlexGlobals.topLevelApplication.url;
			if(uri == null) return "/amfservices/gateway/amf2/index.php";
			var uria:Array = uri.split("//");
			return uria[0]+"//"+(uria[1].split("/")[0])+"/amfservices/gateway/amf2/index.php";
		}
		
		public static var AppServicesConfig:Object = { gatewayURL : gatewayURL, gatewayProtocol : 'AMF' };
		
		public static function sortNumeric(obj1:Object, obj2:Object, gdc:GridColumn):Number
		{
			return ObjectUtil.numericCompare(Number(obj1[gdc.dataField]),Number(obj2[gdc.dataField]));
		}
		
		public static function sortDate(obj1:Object, obj2:Object, gdc:GridColumn):int 
		{
			return ObjectUtil.stringCompare(obj1[gdc.dataField], obj2[gdc.dataField]);
		}
		
		public static function showRounded(item:Object, column:GridColumn):String
		{
			var pos:int = (item[column.dataField] as String).indexOf('.');
			return (item[column.dataField] as String).substr(0,pos+2);
		}
		
		[Bindable] public static var MIN_TEMPERATURE:Number = -18;
		[Bindable] public static var MAX_TEMPERATURE:Number = 150;
		[Bindable] public static var MIN_DENSITY:Number = 0;
		[Bindable] public static var MAX_DENSITY:Number = 2000;
		[Bindable] public static var MAX_NUMBER_DIGITS:int = 9;
		
		[Bindable] public static var siteConfigSettings:ArrayCollection;
		public static function getValueFromSiteConfigSettings( key:String ):String
		{
			var value:String = "";
			for (var i:int=0; i < siteConfigSettings.length; i++)
			{
				var obj:Object = siteConfigSettings.getItemAt(i);
				if ( obj.config_key == key )
				{
					value = obj.config_value;
					break;
				}
			}
			
			return value;
		}
		
		public static function setValueIntoSiteConfigSettings( key:String, value:String ):Boolean
		{
			var found:Boolean = false;
			for (var i:int=0; i < siteConfigSettings.length; i++)
			{
				var obj:Object = siteConfigSettings.getItemAt(i);
				if ( obj.config_key == key )
				{
					obj.config_value = value;
					found = true;
					break;
				}
			}
			
			return found;
		}
		
		public static function resetDateRangeComponent( key:String, field:DKI_DateRange ):void
		{
			if ( field == null )
			{
				return;
			}
			
			var beforeToday:String="";
			var afterToday:String=""
			var value:String = getValueFromSiteConfigSettings( key );
			
			if ( value == "" )
			{
				value = "1~~0";
			}
			
			var ranges:Array = value.split( "~~" );
			
			if ( ranges.length == 0 )
			{
				beforeToday = "-1";
				afterToday = "-1";
			}
			else if ( ranges.length == 1 )
			{
				beforeToday = ranges[0];
				afterToday = "0";
			}
			else
			{
				beforeToday = ranges[0];
				afterToday = ranges[1];
			}
			
			if ( beforeToday == "-1" && afterToday == "-1" )
			{
				field.dateText.text = "";
			}
			else
			{
				if ( beforeToday == "-1" )
				{
					beforeToday = "0";
				}
				if ( afterToday == "-1" )
				{
					afterToday = "0";
				}
				
				field.defaultDays = Number( beforeToday );
				field.getInitFilter( Number( afterToday ) );
			}
		}
		
		
		public static var gateway:NetConnection;
		public static function updateAlarmList():void{
			if(gateway == null){
				var gateway:NetConnection = new NetConnection();
				gateway.objectEncoding = ObjectEncoding.AMF3;
				gateway.connect(gatewayURL);
			}
			gateway.call("LiveJournal.getAlarmFeed",new Responder(updateAlarmResponder),LanguageCode);
		}
		public static function updateAlarmResponder(o:Object):void{
			if(o){if(o.data){
				for (var i:int = 0; i < o.data.length; i++) {
					o.data[i].MESSAGE = (o.data[i].MESSAGE as String).split("|").join("");
					global.messageList.addItem(o.data[i]);
				}
			}}
		}
		
		
		public static function amfRequest(classFunction:String, successCallback:Function, failureCallback:Function, ...parrams):void{
			var nc:NetConnection = new NetConnection();
			nc.objectEncoding = ObjectEncoding.AMF3;
			nc.connect(gatewayURL);
			var args:Array = new Array();
			args.push(classFunction);
			args.push(new Responder(successCallback,failureCallback));
			args = args.concat(parrams)
			nc.call.apply(nc,args);
		}
		
		private static var cs:ChannelSet;
		private static var sac:SecureAMFChannel;
		
		public static function get channelSet():ChannelSet{
			if(!cs){
				cs = new ChannelSet();
				sac = new SecureAMFChannel("sac","gateway.php");
				cs.addChannel(sac);
			}
			return cs;
		}
		
		
		
		public static function adjustGridColumnSequence( settings:String, grid:DataGrid ):void
		{
			var class_generator:Class;
			var factory_generator:ClassFactory;
			var new_columns:Array = new Array();
			var cln_settings:Array = settings.split("|");
			var objDateRenderer:DateRenderer;
			var objDateTimeRenderer:DateTimeRenderer;
			
			var i:int;
			for (i=0; i<cln_settings.length; i++)
			{
				var pairs:Array = String(cln_settings[i]).split(",");
				if ( pairs.length < 2 )
				{
					continue;
				}
				
				var j:int;
				for (j=0; j < grid.columns.length; j++)
				{
					var cln:GridColumn = grid.columns.getItemAt(j) as GridColumn;
					if ( cln.dataField == pairs[1] )
					{
						if ( pairs[0] == "1" )
						{
							cln.visible = true;
						}
						else
						{
							cln.visible = false;
						}
						
						// is there renderer?
						if ( pairs.length > 2 )
						{
							
							class_generator = getDefinitionByName("renderers::"+pairs[2]) as Class;
							factory_generator = new ClassFactory( class_generator );
							cln.itemRenderer = factory_generator;
							/*
							if ( pairs[2] == '0' )
							{
								if ( pairs[0] == "1" )
								{
									cln.visible = true;
								}
								else
								{
									cln.visible = false;
								}
							}
							*/
						}
						new_columns[i] = cln;
						break;
					}
				}
			}
			
			grid.columns = new ArrayList( new_columns );
			grid.invalidateDisplayList();
		}
		
		
		public static function adjustFormButtonSettings(settings:String, form:*):void
		{
			var cln_settings:Array = settings.split("|");
			
			var i:int;
			for (i=0; i<cln_settings.length; i++)
			{
				if ( cln_settings[i] == "" )
				{
					continue;
				}
				var pairs:Array = String(cln_settings[i]).split(",");
				var code:String = String(pairs[0]);
				
				if ( form.hasOwnProperty(code) == true && form[code] != null)
				{
					if ( int(pairs[1]) > 0 )
					{
						form[code].visible = true;
						form[code].includeInLayout = true;
					}
					else
					{
						form[code].visible = false;
						form[code].includeInLayout = false;
						
						// if the field is invisible, then it is not required
						var code2:String = code;
						if ( code.indexOf("fld__") >= 0 )
						{
							code2 = code.substr(5);
						}
						if ( form.hasOwnProperty(code2) == true && form[code2] != null)
						{
							if ( form[code2].hasOwnProperty( 'required' ) )
							{
								form[code2].required = false;
							}
						}
					}
				}
				
			}
		}
		
		public static function adjustFormFieldSettings(settings:String, form:*):void
		{
			var cln_settings:Array = settings.split("|");
			
			var i:int;
			for (i=0; i<cln_settings.length; i++)
			{
				if ( cln_settings[i] == "" )
				{
					continue;
				}
				var pairs:Array = String(cln_settings[i]).split(",");
				var code:String = String(pairs[0]);
				/*
				if ( (form.hasOwnProperty(code) == true) && (form[code] is DKI_ValidatorInput) )
				{
				(form[code] as DKI_ValidatorInput).validationType = String( pairs[1]);
				(form[code] as DKI_ValidatorInput).maxChars = int( pairs[2] );
				}
				*/
				if ( form.hasOwnProperty(code) == true )
				{
					if (form[code] is DKI_DateTime)
					{
						if ( pairs.length>=3 )
						{
							if ( int( pairs[2]) == 0 )
							{
								form[code].timeEnabled = false;
							}
							else
							{
								form[code].timeEnabled = true;
							}
						}
						if ( pairs.length>=4 )
						{
							if ( int( pairs[3]) == 0 )
							{
								form[code].enableNull = false;
							}
							else
							{
								form[code].enableNull = true;
							}
						}
						continue;
					}
					if ( pairs.length>=2 && form[code].hasOwnProperty( 'validationType' ) == true )
					{
						form[code].validationType = String( pairs[1]);
					}
					if ( pairs.length>=3 && form[code].hasOwnProperty( 'maxChars' ) == true )
					{
						form[code].maxChars = int( pairs[2] );
					}
					// if flages are defined, apply them
					if ( pairs.length>=4 )
					{
						var int_flag:int = int( pairs[3] );
						if ( form[code].hasOwnProperty( 'visible' ) == true )
						{
							form[code].visible = int_flag>0?true:false;
						}
						if ( form[code].hasOwnProperty( 'includeInLayout' ) == true )
						{
							form[code].includeInLayout = int_flag>0?true:false;
						}
						if ( int_flag == 0 )
						{
							// if the field is invisible, then it is not required
							var code2:String = code;
							if ( code.indexOf("fld__") >= 0 )
							{
								code2 = code.substr(5);
							}
							if ( form.hasOwnProperty(code2) == true && form[code2] != null)
							{
								if ( form[code2].hasOwnProperty( 'required' ) )
								{
									form[code2].required = false;
								}
							}
						}
					}
				}
			}
		}
		
		public static function adjustFormGridSettings(settings:String):ArrayCollection
		{
			var gridSettings:ArrayCollection = new ArrayCollection();
			var cln_settings:Array = settings.split("|");
			
			var i:int;
			for (i=0; i<cln_settings.length; i++)
			{
				if ( cln_settings[i] == "" )
				{
					continue;
				}
				var pairs:Array = String(cln_settings[i]).split(",");
				var code:String = String(pairs[0]);
				
				if ( code.indexOf( '#' ) < 0 )
				{
					continue;
				}
				
				var codes:Array = code.split('#');
				var parents:Array = String(codes[2]).split(':');
				
				var obj:Object = new Object();
				
				obj['grid'] = String(codes[0]);
				obj['column'] = String(codes[1]);
				if ( parents.length >= 2 )
				{
					obj['parent_column']=String(parents[0]);
					obj['parent_value']=String(parents[1]);
				}
				else
				{
					obj['parent_column']=String(codes[2]);
					obj['parent_value']="";
				}
				
				if ( pairs.length>=2 )
				{
					obj['validation'] = String( pairs[1] );
				}
				else
				{
					obj['validation'] = 'document';
				}
				if ( pairs.length>=3 )
				{
					obj['length'] = int( pairs[2] );
				}
				else
				{
					obj['length'] = -1;
				}
				if ( pairs.length>=4 )
				{
					obj['flags'] = int( pairs[3] );
				}
				else
				{
					obj['flags'] = 0;
				}
				
				gridSettings.addItem( obj );
			}
			
			return gridSettings;
		}
		
		
		public static function convertDateTimeToIsoString(dt:Date, time_flag:Boolean=false, time_default:String=""):String
		{
			var isoConvert:spark.formatters.DateTimeFormatter = new spark.formatters.DateTimeFormatter();
			var isoConvertLong:spark.formatters.DateTimeFormatter = new spark.formatters.DateTimeFormatter();
			var dtString:String="";
			
			isoConvert.dateTimePattern="yyyy-MM-dd";
			isoConvertLong.dateTimePattern="yyyy-MM-dd HH:mm:ss";

			if ( time_flag == true )
			{
				// time part is enabled
				dtString = isoConvertLong.format( dt );
			}
			else
			{
				dtString = isoConvert.format( dt );
				if ( time_default.length > 0 )
				{
					dtString += " " + time_default;
				}
			}
			
			return dtString;
		}
		
		
		public static function getCurrentLanguageContent( txt:String, lang:String ):String
		{
			//ENG:Expiry Dates for Tankers,CHN:油槽车有效期类别
			var ret:String = "";
			
			ret = txt;
			var items:Array = txt.split( "---" );
			for each ( var obj:Object in items )
			{
				var arr:Array = String(obj).split( "::" );
				if ( arr.length >= 2 )
				{
					if ( arr[0] == lang )
					{
						ret = arr[1];
						break;
					}
				}
			}
			
			return ret;
		}
		
		public static function getTextByteLength(txt:String):int
		{
			var byteLength:int=0;
			var bytes:ByteArray = new ByteArray();
			
			if ( txt == null ) return 0;
			
			var encode:String="utf-8";
			if ( dbCharacterSet.indexOf('AL32UTF8') == -1 )
			{
				encode = "gb2312";
			}
			else
			{
				encode = "utf-8";
			}
			
			bytes.clear();
			
			bytes.writeMultiByte(txt, encode);
			byteLength = bytes.length;
			
			return byteLength;
		}
		
		public static function uncompressText(txt:String, algorithm:String="zlib"):String
		{
			/*var encode:String="utf-8";
			if ( dbCharacterSet.indexOf('AL32UTF8') == -1 )
			{
				encode = "gb2312";
			}
			else
			{
				encode = "utf-8";
			}*/
			
			//trace( "...............uncompressText............", algorithm, txt.length, '['+txt+']');
			
			var base64:Base64Decoder = new Base64Decoder();
			base64.decode( txt );
			var byteArr:ByteArray = base64.toByteArray();
			
			//trace( "...............uncompressText............", algorithm, byteArr.length, byteArr.position);
			
			byteArr.position = 0;
			byteArr.uncompress(algorithm);
			var newTxt:String=byteArr.toString();

			//trace( "...............uncompressText............", algorithm, newTxt.length, '['+newTxt+']');
			
			return newTxt;
		}
		
		public static function getQuantitySourceForCalculation(QTY_AMB_TIME:Date, QTY_COR_TIME:Date, QTY_MASS_TIME:Date
															   , QTY_AMB:String, QTY_COR:String, MASS_AMB:String
															   , QTY_AMB_REAL:String, QTY_COR_REAL:String, MASS_AMB_REAL:String ):Object
		{
			var type:String     = "LT";
			var qty:Number      = Number(QTY_AMB_REAL);
			
			if ( Number(QTY_AMB) != 0 && Number(QTY_COR) != 0 && Number(MASS_AMB) != 0 ) {
				if ( QTY_AMB_TIME.time >= QTY_COR_TIME.time && QTY_AMB_TIME.time >= QTY_MASS_TIME.time ) {
					type  = "LT";
					qty   = Number(QTY_AMB_REAL);
				}
				if ( QTY_COR_TIME.time >= QTY_AMB_TIME.time && QTY_COR_TIME.time >= QTY_MASS_TIME.time ) {
					type  = "L15";
					qty   = Number(QTY_COR_REAL);
				}
				if ( QTY_MASS_TIME.time >= QTY_AMB_TIME.time && QTY_MASS_TIME.time >= QTY_COR_TIME.time ) {
					type  = "KG";
					qty   = Number(MASS_AMB_REAL);
				}
			}
			if ( Number(QTY_AMB) != 0 && Number(QTY_COR) != 0 && Number(MASS_AMB) == 0 ) {
				if ( QTY_AMB_TIME.time >= QTY_COR_TIME.time ) {
					type  = "LT";
					qty   = Number(QTY_AMB_REAL);
				}
				else {
					type  = "L15";
					qty   = Number(QTY_COR_REAL);
				}
			}
			if ( Number(QTY_AMB) != 0 && Number(QTY_COR) == 0 && Number(MASS_AMB) != 0 ) {
				if ( QTY_AMB_TIME.time >= QTY_MASS_TIME.time ) {
					type  = "LT";
					qty   = Number(QTY_AMB_REAL);
				}
				else {
					type  = "KG";
					qty   = Number(MASS_AMB_REAL);
				}
			}
			if ( Number(QTY_AMB) == 0 && Number(QTY_COR) != 0 && Number(MASS_AMB) != 0 ) {
				if ( QTY_COR_TIME.time >= QTY_AMB_TIME.time && QTY_COR_TIME.time >= QTY_MASS_TIME.time ) {
					type  = "L15";
					qty   = Number(QTY_COR_REAL);
				}
				if ( QTY_MASS_TIME.time >= QTY_AMB_TIME.time && QTY_MASS_TIME.time >= QTY_COR_TIME.time ) {
					type  = "KG";
					qty   = Number(MASS_AMB_REAL);
				}
			}
			if ( Number(QTY_AMB) != 0 && Number(QTY_COR) == 0 && Number(MASS_AMB) == 0 ) {
				type  = "LT";
				qty   = Number(QTY_AMB_REAL);
			}
			if ( Number(QTY_AMB) == 0 && Number(QTY_COR) != 0 && Number(MASS_AMB) == 0 ) {
				type  = "L15";
				qty   = Number(QTY_COR_REAL);
			}
			if ( Number(QTY_AMB) == 0 && Number(QTY_COR) == 0 && Number(MASS_AMB) != 0 ) {
				type  = "KG";
				qty   = Number(MASS_AMB_REAL);
			}
			
			var obj:Object = {type:type, qty:qty};
			
			return obj;
		}
	}	
}