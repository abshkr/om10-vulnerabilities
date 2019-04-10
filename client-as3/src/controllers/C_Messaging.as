package controllers
{
	import dm.DM;
	import components.DKI_AlertBox;
	import components.JournalToCsv;
	import components.TextViewPanel;
	
	import dm.collections.dmMessagingHost;
	import dm.collections.dmMessagingOmega;
	import dm.models.dmHostInMsgs;
	import dm.models.dmMessagingIn;
	import dm.models.dmMessagingOut;
	
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.net.FileReference;
	
	import mx.collections.ArrayCollection;
	import mx.controls.Alert;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.CollectionEvent;
	import mx.formatters.DateFormatter;
	import mx.managers.PopUpManager;
	import mx.utils.ObjectUtil;
	
	import renderers.HostInMsgRender;
	
	import spark.components.gridClasses.GridColumn;
	import spark.events.IndexChangeEvent;
	import spark.formatters.DateTimeFormatter;
	
	import views.v_Messaging;
	
	public class C_Messaging
	{
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		[Bindable] public var hostMsgs:dmMessagingHost;
		[Bindable] public var omegaMsgs:dmMessagingOmega;
		[Bindable] public var startRange:Date = new Date();
		[Bindable] public var endRange:Date = new Date();
		[Bindable] public var hostMsgTypes:ArrayCollection = new ArrayCollection();
		[Bindable] public var omegaMsgTypes:ArrayCollection = new ArrayCollection();
		[Bindable] public var hostmsgvalid:ArrayCollection = new ArrayCollection();
		[Bindable] public var hostplantcode:ArrayCollection = new ArrayCollection();
		[Bindable] public var hostomegastatus:ArrayCollection = new ArrayCollection();
		[Bindable] public var fileReturned:ArrayCollection = new ArrayCollection();
		[Bindable] public var totalInrecords:ArrayCollection = new ArrayCollection();
		[Bindable] public var simulationButtons:ArrayCollection = new ArrayCollection(); 
		
		[Bindable] public static var DTIM_START_FLT:Date				=  new Date();
		[Bindable] public static var DTIM_END_FLT:Date					=  new Date();
		
		private var _view:v_Messaging;
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		private var viewer:TextViewPanel = new TextViewPanel();
		private var alertDiag:DKI_AlertBox = new DKI_AlertBox();
		
		
		
		
		public function C_Messaging()
		{
			
			dateConvert.dateTimePattern="yyyy-MM-dd HH:mm:ss";
			//Changed to 1 day only
			startRange.date = startRange.date-1;
			var sDate:String = dateConvert.format(startRange);
			var eDate:String = dateConvert.format(endRange);
			
			hostMsgs = new dmMessagingHost({
				order:{
					field:'REC_ID',
					order:'DESC'
				},
				
				range:{
					field:'OM_RECV_DTIME',
					range:{
						start:sDate,
						end:eDate
					}
				}				
			});
			
			omegaMsgs = new dmMessagingOmega({
				order:
				{
					field:'REC_ID',
					order:'DESC'
				},
				
				range:
				{
					field:'OM_PROCS_DTIME',
					range:{
						start:sDate,
						end:eDate
					}
				}			
			});
			//hostMsgs.getHostTypes();
			//hostMsgs.getOmegaTypes();
			//hostMsgs.getPlantCodes();
			//hostMsgs.getHostOmegaStatus();
			//hostMsgTypes = hostMsgs.hostMsgs;
			//omegaMsgTypes = hostMsgs.omegaMsgs;
			//hostplantcode = hostMsgs.plantCodes;
			//hostomegastatus = hostMsgs.omegaStatus;
			//hostMsgs.totalInrecords();
			refreshFilterHost();
		}
		
		
		[Bindable] public var disableBtn:Boolean=false;
		
		[Bindable]
		public function get view():v_Messaging
		{
			return _view;
		}
		public function get viewout():v_Messaging
		{
			return _view;
		}
		public function set view(value:v_Messaging):void
		{
			DTIM_START_FLT			  =  new Date();
			DTIM_START_FLT.date-=1;
			DTIM_START_FLT.hours        = 0;
			DTIM_START_FLT.minutes      = 0;
			DTIM_START_FLT.seconds      = 0;
			DTIM_START_FLT.milliseconds = 0;
			DTIM_END_FLT			  =  new Date();
			DTIM_END_FLT.date++;
			DTIM_END_FLT.hours        = 0;
			DTIM_END_FLT.minutes      = 0;
			DTIM_END_FLT.seconds      = 0;
			DTIM_END_FLT.milliseconds = 0;
			DTIM_END_FLT.milliseconds--;
			_view = value;
			view.addEventListener('showMessageOut',onShowMessageOut);
			view.addEventListener('showMessageIn',onShowMessageIn);
			//Changed this filter
			//view.addEventListener(CollectionEvent.COLLECTION_CHANGE, function():void{refreshHost();refreshOmega();});
			view.addEventListener('refreshIgnore', function():void{
				
				refreshHost();
				
				//onHostDateChange();
			});
			
		}
		
		
		
		private function onShowMessageIn(event:Event):void
		{
			var fp:String = view.dg1.selectedItem.payload.HST_FILE_TYPE;
			viewer.caption=view.dg1.selectedItem.payload.HST_FILE_TYPE;
			hostMsgs.getFile(fp , hostMsgFileReturn)
		}
		
		private function onShowMessageOut(event:Event):void
		{
			var fp:String = view.dg2.selectedItem.payload.HST_FILE_TYPE;
			viewer.caption=view.dg2.selectedItem.payload.HST_FILE_TYPE;
			omegaMsgs.getomegaFile(fp , OmegaMsgFileReturn)
			
			trace (" This is Message Out "+view.dg2.selectedIndex );
		}
		
		private function hostMsgFileReturn(value:*): void
		{
			if (value.data == null )
				global.msgFail('No File Found')
			else 
			{
				PopUpManager.addPopUp(viewer,FlexGlobals.topLevelApplication.main,false);
				PopUpManager.centerPopUp(viewer);
				viewer.content=value.data;
			}
		}
		
		private function OmegaMsgFileReturn(value:*): void
		{
			if (value.data == null )
				global.msgFail('No File Found')
			else 
			{
				PopUpManager.addPopUp(viewer,FlexGlobals.topLevelApplication.main,false);
				PopUpManager.centerPopUp(viewer);
				viewer.content=value.data;
				/*var tmp:XML = XML(viewer.content);
				viewer.content = tmp.toString();*/
			}
		}
		
		
		public function sortNumeric(obj1:Object, obj2:Object, gdc:GridColumn):Number{
			if(Number(obj1.payload.REC_ID) == Number(obj2.payload.REC_ID)) return 0;
			if(Number(obj1.payload.REC_ID) <  Number(obj2.payload.REC_ID)) return -1;
			return 1;
		}
		
		
		private function trimLeading0sFromString() : void
		{
			var numericString:String = "00076925";
			numericString = parseFloat ( numericString ).toString();
			trace ( numericString ); // 76925
		}
		
		
		
		/*else
		{
		var filter:Object = new Object();
		if (view.dd1.selectedIndex != -1){
		filter[(hostMsgTypes[view.dd1.selectedIndex].HST_MSG_TYPE as String)] =
		{
		'fields': ["HST_MSG_TYPE"],
		'equality': 'like'
		}
		}
		if (view.ddplant.selectedIndex != -1){
		filter[(hostMsgs.plantCodes[view.ddplant.selectedIndex] as String)] =
		{
		'fields': ["HST_PLANT_CODE"],
		'equality': 'like'
		}
		}
		if (view.ddstatus.selectedIndex != -1){
		filter[(hostMsgs.omegaStatus[view.ddstatus.selectedIndex] as String)] =
		{
		'fields': ["OM_STATUS"],
		'equality': 'like'
		}
		}
		hostMsgs.populate({
		order:{
		field:'REC_ID',
		order:'DESC'
		},
		
		range:
		{
		field:'OM_RECV_DTIME',
		range:
		{
		start:sDate,
		end:eDate
		}
		},
		filter : filter
		});
		}*/
		
		
	
		
		public function onOmegaDateChange(data:Object = null): void
		{
			var sDateOmega:String = dateConvert.format(view.sd2.sDate);
			var eDateOmega:String = dateConvert.format(view.sd2.eDate);
			if (view.ddTypeOutgoing.selectedIndex == -1 && view.ddplant1.selectedIndex == -1 )
			{
				omegaMsgs.populate({
					order:{
						field:'REC_ID',
						order:'DESC'
					},
					range:{
						field:'OM_PROCS_DTIME',
						range:
						{
							start:sDateOmega,
							end:eDateOmega
						}
					}				
				});
			}/*
			else
			{
			omegaMsgs.populate({
			range:
			{
			field:'OM_PROCS_DTIME',
			range:
			{
			start:dateConvert.format(view.sd2.selectedDate),
			end:dateConvert.format(view.ed2.selectedDate)
			},
			order:{
			field:'REC_ID',
			order:'DESC'
			}
			},
			filter : 
			{
			(omegaMsgTypes[view.ddTypeOutgoing.selectedIndex].OM_MSG_TYPE as String):
			{
			'fields': ["OM_MSG_TYPE"],
			'equality': 'like'
			}
			
			}
			
			});
			}*/
		}
		
		public function dateTrim(item:Object, col:GridColumn):String			
		{
			var tmpStr:String = col.dataField.substr(8,col.dataField.length);
			if (item.payload[tmpStr]==null)return"";
			return (item.payload[tmpStr] as String).substr(0,19);
		}
		
		
		
		
		
		public function resubmitMsg(): void
		{
			
			alertDiag.callBack=function confirmresubmit():void{
				hostMsgs[view.dg1.selectedIndex].resubmitMessage(false , function(o:Object):void{
					global.msgSuccess('Message Resubmitted for Processing');
					refreshHost();
				});
				
			};
			alertDiag.msg= "Are you sure you want to resubmit this message?"; //mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_DELETE_PERSONAL');
			PopUpManager.addPopUp(alertDiag,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(alertDiag);
		}
		
		public function filterHostMsgs(event:IndexChangeEvent): void
		{
			onHostDateChange();
		}
		
		
		
		public function filterOmegaMsgs(event:IndexChangeEvent): void
		{
			onOmegaDateChange();
		}
		
		//Added filters to Incoming Messaging Screen
		public function filterHost(obj:Object):Boolean{
			if(view.searchId){
				if((String(obj.HST_MSG_ID).toLowerCase().indexOf(view.searchId.text.toLowerCase())==-1)&&
					(String(obj.HST_MSG_ID2).toLowerCase().indexOf(view.searchId.text.toLowerCase())==-1)&&
					(String(obj.ACK_RECID).toLowerCase().indexOf(view.searchId.text.toLowerCase())==-1))return false;
				if(view.statusCBV.selected && (obj.OM_VALID == '0'))return false;			
				if(view.statusCB.selected  && (obj.OM_VALID == '1'))return false;
				if(view.IgnoredCB.selected && (obj.IGNORE_FLAG == '0')) return false;
				if(!view.IgnoredCB.selected && (obj.IGNORE_FLAG == '1')) return false;
				if(view.ddTypeIncoming.selectedIndex>=0)if(view.ddTypeIncoming.selectedItem != obj.HST_MSG_TYPE) return false;
				if(view.ddplant.selectedIndex>=0)if(view.ddplant.selectedItem != obj.HST_PLANT_CODE) return false;
				if(view.ddstatus.selectedIndex>=0)if(view.ddstatus.selectedItem != obj.OM_STATUS) return false;
			}
			return true;
		}
		//Added filter for Omega Message Types in Outgoing Messaging Screen
		public function filterOmega(obj:Object):Boolean{
			if(view.searchId2){
				if((String(obj.OM_MSGS_ID).toLowerCase().indexOf(view.searchId2.text.toLowerCase())==-1)&&
					(String(obj.NOM_TECH_KEY).toLowerCase().indexOf(view.searchId2.text.toLowerCase())==-1)&&
					(String(obj.EXT_BOL_NO).toLowerCase().indexOf(view.searchId2.text.toLowerCase())==-1)&&
					(String(obj.REC_ID).toLowerCase().indexOf(view.searchId2.text.toLowerCase())==-1)&&
					(String(obj.OM_IN_RECID).toLowerCase().indexOf(view.searchId2.text.toLowerCase())==-1))return false;
				if(view.ddTypeOutgoing.selectedIndex>=0)if(view.ddTypeOutgoing.selectedItem != obj.OM_MSG_TYPE) return false;
				if(view.ddplant1.selectedIndex>=0)if(view.ddplant1.selectedItem != obj.HST_COMP_CODE) return false;
				
			}return true;
		}
		
		
		
		
		public function refreshFilterOmega():void{
			omegaMsgs.filterFunction = filterOmega;
			omegaMsgs.refresh();
		}
		
		public function refreshFilterHost():void
		{
			hostMsgs.filterFunction = filterHost;
			hostMsgs.refresh();
		}
		
		
		//changed the disable resubmit function to call allow valid messages which are not ignored to be resubmitted
		public function disablereSubmit()
		{
			disableBtn = view.dg1.selectedItem.payload.OM_VALID == 1 &&  view.dg1.selectedItem.payload.IGNORE_FLAG == 0   &&  view.dg1.selectedItem.payload.OM_STATUS == 'Failed';;
			
		 }
		
		
		// OUTGOING MESSAGES FILTER
		public function refreshOmega(resetFilter:Boolean = false): void
		{
			view.sd2.getInitFilter();
			if (resetFilter){
				if(view.searchId2 != null) view.searchId2.text='';
				if (view.ddTypeOutgoing != null) view.ddTypeOutgoing.selectedIndex = -1;
				if (view.ddplant1 != null ) view.ddplant1.selectedIndex = -1;
				
			}
			var sDate:String = dateConvert.format(view.sd2.sDate);
			var eDate:String = dateConvert.format(view.sd2.eDate);
			omegaMsgs = new dmMessagingOmega({
				order:
				{
					field:'REC_ID',
					order:'DESC'
				},
				
				range:
				{
					field:'OM_PROCS_DTIME',
					range:{
						start:sDate,
						end:eDate
					}
				}				
			});
			
			//refreshFilterOmega();
			//onOmegaDateChange();
		}
		
		// INCOMING MESSAGES FILTER
		public function refreshHost(resetFilter:Boolean = false): void
		{
		
			if(resetFilter)
			{
				view.sd.getInitFilter();
				if(view.searchId != null)view.searchId.text='';
				if (view.statusCB != null) view.statusCB.selected = false;
				if (view.statusCBV != null) view.statusCBV.selected = false;
				if (view.IgnoredCB != null ) view.IgnoredCB.selected = false;
				if (view.ddTypeIncoming != null) view.ddTypeIncoming.selectedIndex = -1;
				if (view.ddplant != null) view.ddplant.selectedIndex = -1;
				if (view.ddstatus != null) view.ddstatus.selectedIndex =-1;
			}
			var sDate:String = dateConvert.format(view.sd.sDate);
			var eDate:String = dateConvert.format(view.sd.eDate);
			hostMsgs = new dmMessagingHost({
				order:
				{
					field:'REC_ID',
					order:'DESC'
				},
				range:
				{
					field:'OM_RECV_DTIME',
					range:{
						start:sDate,
						end:eDate
					}
				
					
				}				
			});
			
			refreshFilterHost();
			//onHostDateChange();
		}
		
		public function onHostDateChange(data:Object = null): void
		{
			var sDate:String = dateConvert.format(view.sd.sDate);
			var eDate:String = dateConvert.format(view.sd.eDate);		
			if (view.ddTypeIncoming.selectedIndex == -1 && view.ddplant.selectedIndex == -1 && view.ddstatus.selectedIndex == -1)
				
			{
				
				hostMsgs.populate({
					order:{
						field:'REC_ID',
						order:'DESC'
					},
					range:{
						field:'OM_RECV_DTIME',
						range:
						{
							start:sDate,
							end:eDate
						}
					}				
				});
			}
			/* Enter Here */
		}
		
		public function btnExportHost_clickHandler(event: MouseEvent ):void
		{
			var f:FileReference = new FileReference();
			var myFileString:String = 'RecordID,MessageID1,MessageID2,Type,Site ID,Plant,Received Date,Valid,Ignore,Status,File Name,Time Last Modified,Last Modified By ID,Description';
			for each (var msg:dmMessagingIn in  hostMsgs){
				if(myFileString!="")myFileString+="\n";
				myFileString += '"'+msg.REC_ID+'",';
				myFileString += '"'+msg.HST_MSG_ID+'",';
				myFileString += '"'+msg.HST_MSG_ID2+'",';
				myFileString += '"'+msg.HST_MSG_TYPE+'",';
				myFileString += '"'+msg.HST_SITE_CODE+'",';
				myFileString += '"'+msg.HST_PLANT_CODE+'",';
				myFileString += '"'+msg.OM_RECV_DTIME+'",';
				myFileString += '"'+msg.OM_VALID+'",';
				myFileString += '"'+msg.IGNORE_FLAG+'",';
				myFileString += '"'+msg.OM_STATUS+'",';
				myFileString += '"'+msg.HST_FILE_TYPE+'",';
				myFileString += '"'+msg.LAST_CHG_TIME+'",';
				myFileString += '"'+msg.LAST_MOD_BYID+'",';
				myFileString += '"'+msg.DESCRIPTION+'",';
			}
			var CurrentDF:DateFormatter = new DateFormatter();
			var CurrentDateTime:Date = new Date();
			CurrentDF.formatString = "DDMMYYYY_LNNSSA";
			var myDate:String = CurrentDF.format(CurrentDateTime);
			trace(myFileString);
			if (myFileString != "")
				f.save(myFileString,'Incoming_Messages_'+myDate+'.csv');
			else
				global.msgWarning("No Data Selected for Export");
		}
		
		
		public function btnExportOmega_clickHandler(event: MouseEvent ):void
		{
			var f1:FileReference = new FileReference();
			var myFileString1:String = 'RecordID,MessageID1,Type,Supplier,Processed,Sent';
			for each (var msg:dmMessagingOut in  omegaMsgs){
				if(myFileString1!="")myFileString1+="\n";
				myFileString1 += '"'+msg.REC_ID+'",';
				myFileString1 += '"'+msg.OM_MSGS_ID+'",';
				myFileString1 += '"'+msg.OM_MSG_TYPE+'",';
				myFileString1 += '"'+msg.HST_COMP_CODE+'",';
				myFileString1 += '"'+msg.OM_PROCS_DTIME+'",';
				myFileString1 += '"'+msg.FILE_SENT_DTIME+'",';		
			}
			var CurrentDF:DateFormatter = new DateFormatter();
			var CurrentDateTime:Date = new Date();
			CurrentDF.formatString = "DDMMYYYY_LNNSSA";
			var myDate:String = CurrentDF.format(CurrentDateTime);
			trace(myFileString1);
			if (myFileString1 != "")
				f1.save(myFileString1,'Outgoing_Messages_'+myDate+'.csv'); 
			else
				global.msgWarning("No Data Selected for Export");
		}
		
		
		/*public function reloadData(data:Object = null):void{
		view.pbmessaging.mode='manual';
		view.pbmessaging.setProgress(0,100);
		view.pbmessaging.mode='polled';
		DM.HostMessaging.reload();
		trace("?>>>> here");
		
		}*/
	}
}