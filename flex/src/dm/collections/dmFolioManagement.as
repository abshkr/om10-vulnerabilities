package dm.collections
{
	import dm.models.dmFolio;
	import dm.utils.*;
	
	import mx.collections.ArrayCollection;
	
	public class dmFolioManagement extends dmCollection{
		
		public var dmClass:String = "dmFolioManagement";
		public var dmData:ArrayCollection;
		public var model:dmFolio;
		public var totalCount:Number=0;

		public function dmFolioManagement( params:* = false )
		{
			super(params);
			resultHandler 	= tools.getObjAttribute( params, "resultHandler", resultHandler );
		}
		
		override public function populate( params:* = false ):void
		{
			super.setServiceArgs(params);
			Server.service('dmsFolioService.getFolios', serviceArgs, populateSource);
		}
		
		override protected function populateSource( response : * ):void
		{
			if(response is Object){
				if(response.hasOwnProperty('dmClass')){
					if(response.dmClass == 'dmMesg'){
						//set the count
						totalCount = response.rawData.totalCount;
					}
				}
			}
			
			super.populateSource(response);
		}
	}
}