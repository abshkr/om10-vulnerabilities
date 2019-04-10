package assets
{
	import flash.display.Bitmap;
	
	import mx.core.BitmapAsset;

	public class Assets
	{
		[Embed(source='/assets/equipmentIcons/rigid.png')]	private static var _rigid:Class;	public static var RIGID:BitmapAsset 		= new _rigid;
		[Embed(source='/assets/equipmentIcons/trailer.png')]	private static var _trailer:Class;	public static var TRAILER:BitmapAsset 		= new _trailer;
		[Embed(source='/assets/equipmentIcons/pm.png')]		private static var _pm:Class;		public static var PRIME_MOVER:BitmapAsset 	= new _pm;
		[Embed(source='/assets/equipmentIcons/fb.png')]		private static var _fb:Class;		public static var FLATBED:BitmapAsset 		= new _fb;
		[Embed(source='/assets/equipmentIcons/ship.png')]		private static var _ship:Class;		public static var SHIP:BitmapAsset 		= new _ship;
		[Embed(source='/assets/equipmentIcons/rail_tank.png')]		private static var _railtank:Class;		public static var RAILTANK:BitmapAsset 		= new _railtank;
		
		
		
		
		public function Assets()
		{
			
		}
	}
}