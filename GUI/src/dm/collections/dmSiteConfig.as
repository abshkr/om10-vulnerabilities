package dm.collections
{
	import dm.models.dmSiteConfiguration;
	
	public class dmSiteConfig extends dmCollection
	{	
		public var dmClass:String = "dmSiteConfig";
		public var model:dmSiteConfiguration;
		
		public function dmSiteConfig( params:* = false )
		{
			super(params);
		}
	}
}