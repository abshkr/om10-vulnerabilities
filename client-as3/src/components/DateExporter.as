package components
{
	import mx.collections.ArrayCollection;
	
	import spark.components.TitleWindow;
	
	public class DateExporter extends TitleWindow
	{
		private var callback:Function;
		private var dataArr:ArrayCollection = new ArrayCollection();
		
		public function DateExporter(func:Function,data:ArrayCollection)
		{
			super();
			callback = func;
			dataArr.source = data.source;
			getcolumns();
			
		}
		
		private function getcolumns():void
		{
			// TODO Auto Generated method stub
			
		}
	}
}