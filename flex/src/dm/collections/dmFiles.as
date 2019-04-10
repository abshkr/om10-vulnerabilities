package dm.collections
{
	import dm.models.dmFile;
	
	public class dmFiles extends dmCollection{
	
		
		public var dmClass:String = "dmFiles";
		public var model:dmFile;
		
		public function dmFiles( params:* = false)
		{
			super(params);
		}
		
	}
	
}