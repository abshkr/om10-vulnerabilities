package controllers
{
	import flash.events.Event;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	
	import mx.utils.ObjectUtil;
	
	public class MessageInterpreter
	{
		public function MessageInterpreter(){}
		
		private static var _message:String 		= "";
		private static var _result:String 		= "";
		private static var _callback:Function 	= null;
		private static function readNext(i:int):String{
			var x:String = _message.substr(0,i);
			_message = _message.substr(i);
			return x;
		}
		
		public static function XMLProcess(xml:XML):String{
			var html:String = "";
			// common things
			
			
			
			
			
			
			if(xml.toString().indexOf("ZOILNOM02")>-1){
				
				html+="<u><b>Incoming Nomination Details</b></u>"+"<br>";
				html+="  "+"<br>";
				html+= "<b>Document Number</b>[DOCNUM]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.DOCNUM +"</font>"+ "<br>";
				html+= "<b>Recv Port</b>   [RCVPOR]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPOR +"</font>"+ "<br>";
				html+= "<b>Recv Part Type </b>  [RCVPRT]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRT +"</font>"+ "<br>";
				html+= "<b>Recv Part Number</b> [RCVPRN]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRN +"</font>"+ "<br>";
				html+= "<b>Sender Port </b>     [SNDPOR]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPOR +"</font>"+ "<br>";
				html+= "<b>Sender Part Type</b> [SNDPRT]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRT +"</font>"+ "<br>";
				html+= "<b>Sender Part No</b>   [SNDPRN]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRN +"</font>"+ "<br>";
				html+= "<b>Serial Key</b>       [SERIAL]:<font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SERIAL +"</font>"+ "<br>";
				html+= "<b>Nom Creation Date</b>  [DATUM ]:<font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIK03.(IDDAT == "002").DATUM+"</font>"+ "<br>";
				html+= "<b>Nom Creation Time</b>  [UZEIT ]:<font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIK03.(IDDAT == "002").UZEIT+"</font>"+ "<br>";
				html+="  "+"<br>";	
				if (xml.IDOC.E1OIK21.(QUALF == "001")){
					html+= "<b>Qty Received in TS </b>[MENGE,QUALF=001]:<font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIK21.(QUALF == "001").MENGE+"</font>"+ "<br>";
					html+= "<b>Unit of Measure </b>[MENEE,QUALF=001]:<font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIK21.(QUALF == "001").MENEE+"</font>"+ "<br>";
				}
				html+="  "+"<br>";	
				if (xml.IDOC.E1OIK21.(QUALF == "002")){
					html+= "<b>Qty Delived from TS </b>[MENGE,QUALF=002]:<font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIK21.(QUALF == "002").MENGE+"</font>"+ "<br>";
					html+= "<b>Unit of Measure </b>[MENEE,QUALF=002]:<font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIK21.(QUALF == "002").MENEE+"</font>"+ "<br>";
				}
				html+="  "+"<br>";	
				html+= "<b>Nom Tech Key </b>[BELNR, QUALF=001]:<font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIK02.(QUALF == "001").BELNR+"</font>"+ "<br>";
				html+= "<b>Nom Creation Date </b>[DATUM]:<font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIK02.(QUALF == "001").DATUM+"</font>"+ "<br>";
				html+= "<b>Nom Creation Time </b>[UZEIT]:<font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIK02.(QUALF == "001").UZEIT+"</font>"+ "<br>";
				html+= "<b>Ext Nom Number </b>[VALUE, QUALF=008]:<font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIK12.(QUALF == "008").VALUE+"</font>"+ "<br>";
				
				html+="  "+"<br>";
				html+="LINE ITEMS  :<font color=\"#FF0000\">"+ xml.IDOC.E1OIP01.length()+"</font>"+"<br>";
				html+="  "+"<br>";
				var E1OIP01Len:Number = xml.IDOC.E1OIP01.length();
				
				for (var i:int = 0; i < E1OIP01Len; i++) 
				{
					html+="<b>Nom Key Item </b>[POSEX]:<font color=\"#FF0000\">"		+xml.IDOC.E1OIP01[i].POSEX+"</font>"+ "<br>";
					html+="<b>Item Action Code</b>[ACTION]:<font color=\"#FF0000\">"	+xml.IDOC.E1OIP01[i].ACTION+"</font>"+ "<br>";
					html+="<b>Item Category </b>[PSTYP]:<font color=\"#FF0000\">"	+xml.IDOC.E1OIP01[i].PSTYP+"</font>"+ "<br>";
					html+="<b>Item Category Type </b>[LOC_TYPE]:<font color=\"#FF0000\">"	+xml.IDOC.E1OIP01[i]["_-DS1_-MM_C_Z1OIP01"].LOC_TYPE+"</font>"+ "<br>";
					html+="<b>Demand Material </b>[IDTNR QUALF=4]:<font color=\"#FF0000\">"			+xml.IDOC.E1OIP01[i].E1OIP19.(QUALF == "004").IDTNR+"</font>"+ "<br>";
					html+="<b>Schedule Material </b>[IDTNR QUALF=7]:<font color=\"#FF0000\">"			+xml.IDOC.E1OIP01[i].E1OIP19.(QUALF == "007").IDTNR+"</font>"+ "<br>";
					
					html+="<b>Quantity </b>[MENGE]:<font color=\"#FF0000\">"					+xml.IDOC.E1OIP01[i].E1OIP21.(QUALF == "011").MENGE+"</font>"+ "<br>";
					html+="<b>Unit of Measure </b>[MENEE]:<font color=\"#FF0000\">"			+xml.IDOC.E1OIP01[i].E1OIP21.(QUALF == "011").MENEE+"</font>"+ "<br>";
					
					html+="<b>Schedule Date </b>[DATUM]:<font color=\"#FF0000\">"				+xml.IDOC.E1OIP01[i].E1OIP03.(IDDAT == "009").DATUM+ "</font>"+"<br>";
					html+="<b>Schedule Time </b>[UZEIT]:<font color=\"#FF0000\">"				+xml.IDOC.E1OIP01[i].E1OIP03.(IDDAT == "009").UZEIT+ "</font>"+"<br>";
					
					html+="<b>Send/Recv Plant Code </b>[VALUE , QUALF=005]:<font color=\"#FF0000\">"+xml.IDOC.E1OIP01[i].E1OIP12.(QUALF == "005").VALUE+"</font>"+ "<br>";
					
					html+="<b>Supplier Number </b>[PARTN , PARVW=TL]:<font color=\"#FF0000\">"			+xml.IDOC.E1OIP01[i].E1OIPA1.(PARVW == "TL").PARTN+"</font>"+ "<br>";
					
					html+="<b>Contact Partner </b>[CONPAT]:<font color=\"#FF0000\">"			+xml.IDOC.E1OIP01[i].E1OIP12["_-DS1_-MM_C_Z1EOIP12"].CONPAT+"</font>"+ "<br>";
					html+="<b>Contact Partner Desc </b>[CONPAT_TEXT]:<font color=\"#FF0000\">"+xml.IDOC.E1OIP01[i].E1OIP12["_-DS1_-MM_C_Z1EOIP12"].CONPAT_TEXT+"</font>"+ "<br>";
					
					
					html+="  "+"<br>";
					
					
					
				}
				
			}else if (xml.toString().indexOf("OILLPD02")>-1){
				
				html+="<u><b>Product Inventory Upload Details</b></u>"+"<br>";
				html+="  "+"<br>";
				html+= "<b>Receiver Port:</b><font color=\"#FF0000\"> " 				+ xml.IDOC.EDI_DC40.RCVPOR +"</font>"+ "<br>";
				html+= "<b>Receiver Partner Type :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRT +"</font>"+ "<br>";
				html+= "<b>Receiver Partner Number :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRN +"</font>"+ "<br>";
				html+= "<b>Sender Port :</b><font color=\"#FF0000\"> " 					+ xml.IDOC.EDI_DC40.SNDPOR +"</font>"+ "<br>";
				html+= "<b>Sender Partner Type:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.EDI_DC40.SNDPRT +"</font>"+ "<br>";
				html+= "<b>Sender Partner Number:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRN +"</font>"+ "<br>";
				html+= "<b>Serialization Key:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.EDI_DC40.SERIAL +"</font>"+ "<br>";
				html+= "<b>Serialization Key:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.EDI_DC40.REFINT +"</font>"+ "<br>";
				html+= "<b>Message Group Ref     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFGRP+"</font>"+ "<br>";
				html+= "<b>Message Reference     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFMES+"</font>"+ "<br>";
				html+= "<b>Archive Key           :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.ARCKEY+"</font>"+ "<br>";
				html+="  "+"<br>";
				html+= "<b>Load ID:</b><font color=\"#FF0000\"> " 						+ xml.IDOC.E1OILIH.LIDNO+"</font>"+ "<br>";
				html+= "<b>Physical Stock Guage Date:</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OILIH.LOADDATE+"</font>"+ "<br>";
				html+= "<b>Physical Stock Guage Time:</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OILIH.LOADTIME+"</font>"+ "<br>";
				html+= "<b>SAP Storage Location:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.E1OILIH.E1WVINH.LGORT+"</font>"+ "<br>";
				html+= "<b>Count Data Stock Guage Date:</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OILIH.E1WVINH.DDATE+"</font>"+ "<br>";
				html+= "<b>Count Data Stock Guage Time :</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OILIH.E1WVINH.DTIME+"</font>"+ "<br>";
				html+= "<b>Plant Code :</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.FILIALE+"</font>"+ "<br>";
				html+="  "+"<br>";
				var E1WVINILen:Number = xml.IDOC.E1OILIH.E1WVINH.E1WVINI.length();
				html+="  "+"<br>";
				html+="LINE ITEMS  :<font color=\"#FF0000\">"+ E1WVINILen +"</font>"+"<br>";
				html+="  "+"<br>";
				for (var i:int = 0; i < E1WVINILen; i++) 
				
				{
				html+="  "+"<br>";		
				html+= "<b>Item Number:</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].ZEILI+"</font>"+ "<br>";
				html+= "<b>Material Code:</b><font color=\"#FF0000\"> " 				+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].ARTNR+"</font>"+ "<br>";
				html+= "<b>Stock Type:</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].BSTAR+"</font>"+ "<br>";
				html+= "<b>Ambient Quantity:</b><font color=\"#FF0000\"> " 				+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].ERFMG+"</font>"+ "<br>";
				html+= "<b>UOM of Ambient Quantity:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].ERFME+"</font>"+ "<br>";
				html+= "<b>Zero Count:</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].XNULL+"</font>"+ "<br>";
				html+= "<b>Posting Date:</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].GIDAT+"</font>"+ "<br>";
				html+= "<b>Posting Time:</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].PDC_TIME+"</font>"+ "<br>";
				html+= "<b>Transaction Code:</b><font color=\"#FF0000\"> " 				+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i]["_-DS1_-HM_C_OILM001"].TCODE+"</font>"+ "<br>";
				html+= "<b>Posted By:</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i]["_-DS1_-HM_C_OILM001"].USNAM+"</font>"+ "<br>";
				html+= "<b>Plant Code :</b><font color=\"#FF0000\"> " 					+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i]["_-DS1_-HM_C_OILM001"].PBLNR+"</font>"+ "<br>";
				html+= "<b>Terminal MaterialCode:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i]["_-DS1_-HM_C_OILM001"].BISMT+"</font>"+ "<br>";
				html+= "<b>Comments:</b><font color=\"#FF0000\"> " 						+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i]["_-DS1_-HM_C_OILM001"].SGTXT+"</font>"+ "<br>";
				html+= "<b>Alternate Qty:</b><font color=\"#FF0000\"> " 				+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].E1OILT2.ADQNT1+"</font>"+ "<br>";
				html+= "<b>UOM of Alternate Qty:</b><font color=\"#FF0000\"> " 				+ xml.IDOC.E1OILIH.E1WVINH.E1WVINI[i].E1OILT2.ADUOM1+"</font>"+ "<br>";
				html+="  "+"<br>";
				trace("should be called Multiple Times.");
				}
				
				
			}
				
			else if (xml.toString().indexOf("OILTKT02")>-1){
				
				html+="<u><b>Ticket Details</b></u>"+"<br>";
				html+="  "+"<br>";
				html+= "<b>Receiver Port         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPOR +"</font>"+ "<br>";
				html+= "<b>Receiver Partner Type :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRT +"</font>"+ "<br>";
				html+= "<b>Receiver Partner No   :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRN +"</font>"+ "<br>";
				html+= "<b>Sender Port           :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPOR +"</font>"+ "<br>";
				html+= "<b>Sender Partner Type   :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRT +"</font>"+ "<br>";
				html+= "<b>Sender Partner Number :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRN +"</font>"+ "<br>";
				html+= "<b>Interchange File Ref  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFINT+"</font>"+ "<br>";
				html+= "<b>Message Group Ref     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFGRP+"</font>"+ "<br>";
				html+= "<b>Message Reference     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFMES+"</font>"+ "<br>";
				html+= "<b>Archive Key           :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.ARCKEY+"</font>"+ "<br>";
				html+="  "+"<br>";
				html+= "<b>Ticket Number          :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.TICKETNR+"</font>"+ "<br>";
				html+= "<b>Ticket Version         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.TICKET_VERSION+"</font>"+ "<br>";
				html+= "<b>Ticket Purpose		  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.TICKET_PURPOSE+"</font>"+ "<br>";
				html+= "<b>Ticket Item Number     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.ITEM+"</font>"+ "<br>";
				html+= "<b>Nomination Key         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.NOMTK+"</font>"+ "<br>";
				html+= "<b>Nomination Key Item    :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.NOMIT+"</font>"+ "<br>";
				html+="  "+"<br>";
				html+= "<b>Ambient Quantity		  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.MENGE+"</font>"+ "<br>";
				html+= "<b>UOM of Ambient Quantity:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.MEINS+"</font>"+ "<br>";
				html+= "<b>Posting Date & Time	  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.POSTING+"</font>"+ "<br>";
				html+= "<b>Rev Load End Date & Time -1	  :</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.TIME_ST_LOAD_END+"</font>"+ "<br>";
				html+= "<b>Rev Load End Date & Time	-2 :</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.TIME_ST_LED_OT+"</font>"+ "<br>";
				html+= "<b>Truck/Vessel/Barge/Rail No:</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I["_-DS1_-TSW_C_GEXTDEL"].OIC_PTRIP+"</font>"+ "<br>";
				html+= "<b>External BOL Number:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I["_-DS1_-TSW_C_GEXTDEL"].OID_EXTBOL+"</font>"+ "<br>";

				html+="  "+"<br>";
				
				var categoryList:XMLList = xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O2
				
				for each(var category:XML in categoryList)
				{	
			
					html+= "<b>Unit of Measurement:</b><font color=\"#FF0000\"> " 			+ category.MSEHI+"</font>"+ "<br>";
					html+= "<b>Additional Quantity:</b><font color=\"#FF0000\"> " 			+ category.ADQNT+"</font>"+ "<br>";
					html+= "<b>QCI Manual Entry:</b><font color=\"#FF0000\"> " 				+ category.MANEN+"</font>"+ "<br>";
					html+="  "+"<br>";
				}
				
				html+="  "+"<br>";
				
	
				html+= "<b>QCI Manual Indicator:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.QCI_MAN_IND+"</font>"+ "<br>";
				html+= "<b>Density at Standard 15 C:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.BDICH+"</font>"+ "<br>";
				html+= "<b>UOM of Density at 15:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.BDICHEH+"</font>"+ "<br>";
				html+= "<b>Measured Density at 15</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.TDICH+"</font>"+ "<br>";
				html+= "<b>UOM of Measured Density at 15 :</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.TDICHEH+"</font>"+ "<br>";
				html+= "<b>Ambient Temprature:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.MTTMP+"</font>"+ "<br>";
				html+= "<b>UOM of Ambient Temprature:</b><font color=\"#FF0000\"> " 	+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.MTTEH+"</font>"+ "<br>";
				html+= "<b>Test Temprature Value:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.TSTMP+"</font>"+ "<br>";
				html+= "<b>Test Temprature UOM:</b><font color=\"#FF0000\"> " 			+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.TSTEH+"</font>"+ "<br>";
				html+= "<b>Air Buoyancy Indicator:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OIJTKTH_I.E1OIJTKTI_I.E1OIJTKTI_O1_1.ABIND+"</font>"+ "<br>";
				
				
				
				
			}
			else if (xml.toString().indexOf("ZOILMDD2")>-1){
				
				html+="<u><b>Special Movement Details</b></u>"+"<br>";
				html+="  "+"<br>";
				html+= "<b>Receiver Port         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPOR +"</font>"+ "<br>";
				html+= "<b>Receiver Partner Type :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRT +"</font>"+ "<br>";
				html+= "<b>Receiver Partner No   :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.RCVPRN +"</font>"+ "<br>";
				html+= "<b>Sender Port           :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPOR +"</font>"+ "<br>";
				html+= "<b>Sender Partner Type   :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRT +"</font>"+ "<br>";
				html+= "<b>Sender Partner Number :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.SNDPRN +"</font>"+ "<br>";
				html+= "<b>Interchange File Ref  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFINT+"</font>"+ "<br>";
				html+= "<b>Message Group Ref     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFGRP+"</font>"+ "<br>";
				html+= "<b>Message Reference     :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.REFMES+"</font>"+ "<br>";
				html+= "<b>Archive Key           :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.EDI_DC40.ARCKEY+"</font>"+ "<br>";
				html+="  "+"<br>";
				html+= "<b>Load ID 		         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.LIDNO+"</font>"+ "<br>";
				html+= "<b>Movement Date         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.LOADDATE+"</font>"+ "<br>";
				html+= "<b>Movement Time         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.LOADTIME+"</font>"+ "<br>";
				html+= "<b>Movement Type         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.BWART+"</font>"+ "<br>";
				html+= "<b>Plant Code	         :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.WERKS+"</font>"+ "<br>";
				html+= "<b>SAP Storage Location  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.LGORT+"</font>"+ "<br>";
				html+= "<b>Batch				 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.CHARG+"</font>"+ "<br>";
				html+= "<b>Standard Temprature	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.TSTMP+"</font>"+ "<br>";
				html+= "<b>UOM of Standard Temp	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.TSTEH+"</font>"+ "<br>";
				html+= "<b>Density at 15"+"°"+"C :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.TDICH+"</font>"+ "<br>";
				html+= "<b>Ambient Temprature	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.MTTMP+"</font>"+ "<br>";
				html+= "<b>UOM of Ambient Temp	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.MTTEH+"</font>"+ "<br>";
				html+= "<b>SAP Material Code 	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.MATNR+"</font>"+ "<br>";
				html+= "<b>Ambient Qty			 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.TRQNT+"</font>"+ "<br>";
				html+= "<b>UOM of Ambient Qty	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.TRUOM+"</font>"+ "<br>";
				html+= "<b>To Material Code		 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.UMMAT+"</font>"+ "<br>";
				html+= "<b>To Plant Code		 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.UMWRK+"</font>"+ "<br>";
				html+= "<b>To Storage Location	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.UMLGO+"</font>"+ "<br>";
				html+= "<b>Receiving Batch 		 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.UMCHA+"</font>"+ "<br>";
				html+= "<b>Movement Number		 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.SGTXT+"</font>"+ "<br>";
				html+= "<b>Air Bouyancy Indicator:</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.ABIND+"</font>"+ "<br>";
				html+= "<b>Transaction Code		 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM["_-DS1_-HM_C_OILM001"].TCODE+"</font>"+ "<br>";
				html+= "<b>Posted By			 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM["_-DS1_-HM_C_OILM001"].USNAM+"</font>"+ "<br>";
				html+= "<b>Terminal Code		 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM["_-DS1_-HM_C_OILM001"].PBLNR+"</font>"+ "<br>";
				html+= "<b>Comments				 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM["_-DS1_-HM_C_OILM001"].SGTXT+"</font>"+ "<br>";
				html+= "<b>Reason Code			 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM["_-DS1_-HM_C_OILM001"].GRUND+"</font>"+ "<br>";
				html+= "<b>Alternate Quantity	 :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.E1OILT2.ADQNT1+"</font>"+ "<br>";
				html+= "<b>UOM of Alternate Qty  :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.E1OILT2.ADUOM1+"</font>"+ "<br>";
				html+= "<b>Quantity Manual Entry :</b><font color=\"#FF0000\"> " 		+ xml.IDOC.E1OILGM.E1OILT2.MANEN1+"</font>"+ "<br>";
				
			}
			else{
				return "false";
			}
			
			
			return html;
		}
		private static function _process(rules:Array, length:Number = 1, indent:String = ""):void{
			for (var j:int = 0; j < length; j++) {if(_result!="")_result+="<br>";
				for (var i:int = 0; i < rules.length; i++) {
					var value:String = readNext(rules[i].itemLength);
					if(rules[i].itemName!="Filler")_result+=(_result==""?"":"<br>")+indent+"<b>"+rules[i].itemName + ": </b><font color=\"#FF0000\">" + value + "</font>";
					if(rules[i].hasOwnProperty("rules"))_process(rules[i].rules,Number(value),indent+"    ");
				}
			}if(_result!="")_result+="<br>";
		}
		public static function process(message:String, callback:Function):void{
			_message = message;
			_callback = callback;
			var ur:URLLoader = new URLLoader();
			ur.addEventListener(Event.COMPLETE,function(o:Object):void{
				var rules:Object = new Object();
				var rawRule:Array = ur.data.split("\r\n");
				var curRule:String = "";
				for (var i:int = 0; i < rawRule.length; i++){
					var line:String = rawRule[i];
					if(line.charAt(0)=='#')continue;
					if(line.charAt(0)=='>'){
						if(line.substr(1).indexOf('|')==-1){
							rules[line.substr(1)] 			= new Object();
							rules[line.substr(1)]["rules"] 	= new Array();
							curRule = line.substr(1);
						}else{
							rules[line.substr(1).split("|")[0]] 			= new Object();
							rules[line.substr(1).split("|")[0]]["ID"] 		= line.substr(1).split("|")[1];
							rules[line.substr(1).split("|")[0]]["rules"] 	= new Array();
							curRule = line.substr(1).split("|")[0]
						}
					}else{
						var itemLength:int  = Number(line.split(":")[0]);
						var itemName:String = line.split(":")[1];
						if(itemName==null)continue;
						if(itemName.indexOf(">")!=-1){
							var rulesName:String = itemName.split(">")[1];
							itemName = itemName.split(">")[0];
							rules[curRule]["rules"].push({itemLength:itemLength ,itemName:itemName, rules:rules[rulesName]["rules"]});
						}else{
							rules[curRule]["rules"].push({itemLength:itemLength ,itemName:itemName});
						}		
					}
				}
				_result = "";
				var found:Boolean = false;
				for each(var o:Object in rules){
					if(o.hasOwnProperty("ID")){
						if(_message.indexOf(o["ID"])==0){
							_process(o["rules"]);
							callback(_result);
							found = true;
							trace("should only be called once.");
							return;
						}
					}
				}
				trace("should only be called once.");
				if(!found)callback("false");return;
			});
			ur.load(new URLRequest("assets/MsgSetConfig.dat"));
		}
	}
}