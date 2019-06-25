package components
{
	import events.ColorSelectEvent;
	
	import flash.display.BitmapData;
	import flash.events.MouseEvent;
	
	import mx.containers.Canvas;
	import mx.controls.Image;
	import mx.core.UIComponent;
	
	[Event(name="colorSelected", type="events.ColorSelectEvent")]
	public class ColorSwatchSpectrum extends Canvas
	{
		private var Spect:Image;
		private var Picker:UIComponent = new UIComponent();		
		private var Width:Number = 205;
		private var Height:Number = 135;
		
		[Embed (source="/assets/spectrum.png" )]
		public static const Spectrum:Class;
		
		public function ColorSwatchSpectrum(ssize:Number=-1)
		{
			super();
			width = Width;
			height = Height;
			Spect = new Image();
			Spect.source = Spectrum;
			Spect.width= Width;
			Spect.height= Height;
			Picker.addChild(Spect);

			addChild(Picker);
			Picker.addEventListener(MouseEvent.MOUSE_DOWN, onDown, false,0,true);
		}
		
		private function onDown(e:MouseEvent):void{
			var tmpDta:BitmapData = new BitmapData(Width, Height);
			tmpDta.draw(Picker);
			var selectedColor:uint = tmpDta.getPixel(Spect.mouseX, Spect.mouseY);
			dispatchEvent(new ColorSelectEvent(ColorSelectEvent.COLOR_SELECTED,true,false,selectedColor));
		}
	}
}