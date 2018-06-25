
package dm.models
{
	import dm.utils.tools;
	
	public dynamic class dmMessagingIn extends dmModel
	{		
		public function dmMessagingIn( params : * = false )
		{
			super(params);
			this.dmClass = 'dmMessagingIn';
		}
		
		public function resubmitMessage( params : * = false, callback:Function = null ):void
		{
			Server.invoke(this, 'reprocess', false, function(o):void{
				if(callback)callback(o);
				reprocess_hdl(o);
			});
		}
		
		public function reprocess_hdl( response : * = false ):void
		{
			tools.pr(response);
		}
		
		[Bindable] public function get invalid():Boolean{
			return  payload.OM_VALID==0;
		}
		public function set invalid(a:Boolean):void{
			payload.OM_VALID = a?0:1;
		}
	}	
}