package dm.models
{	
	import components.FolioReports;
	
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;

	public dynamic class dmFolio extends dmModel
	{
		
		import dm.collections.dmCloseoutTanks;
		import dm.collections.dmCloseoutMeters;
		import dm.collections.dmFiles;
		
		[Bindable] public var closeoutTanks:dmCloseoutTanks;
		[Bindable] public var closeoutMeters:dmCloseoutMeters;
		[Bindable] public var folioReports:dmFiles;
		
		public function dmFolio( params : * = false )
		{
			super(params);
			dmClass = 'dmFolio';	
			closeoutTanks = new dmCloseoutTanks({autopopulate : false});
			closeoutMeters = new dmCloseoutMeters({autopopulate : false});
			folioReports = new dmFiles({autopopulate : false});		
		}
		
		public function attachMeters( params : * = false ):void
		{
			Server.invoke(this, 'getMeters', false, attachMeterData);
		}
		
		public function attachMeterData( response : * = false ):void
		{
			closeoutMeters.source = response.data.collection;
		}
		
		public function getMeters(params : * = false):dmCloseoutMeters
		{
			return closeoutMeters;
		}
		
		public function attachTanks( params : * = false , callback:Function = null):void
		{
			Server.invoke(this, 'getTank', false, function(o:Object):void{
				attachTankData(o);
				if(callback!=null)callback();
			});
		}
		
		public function attachTankData( response : * = false ):void
		{
			closeoutTanks.source = response.data.collection;
		}
		
		public function getTanks(params : * = false):dmCloseoutTanks
		{
			return closeoutTanks;
		}

		public function attachFolioReports(params: * = false):void
		{
			Server.invoke(this, 'getFolioReports', false, this.attachFolioReportsData);
		}
		
		public function attachFolioReportsData( response : * = false ):void
		{
			if (response.data == null)
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.RPT_ADD_FAIL'));
			else		
			 folioReports.source = response.data.collection;
		}
		
		public function generateFolioReports( params : * = false ):void
		{
			global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.RPT_ADD_REQ'));
			Server.invoke(this, 'generateFolioReports', false, generateFolioReports_complete);
		}
		
		public function generateFolioReports_complete( response : * = false ):void
		{
			global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.RPT_ADD_SUCC'));
			this.attachFolioReports();
		}
	}
}