package components
{
	import mx.resources.ResourceManager;
	
	import skins.ButtonSkin;
	
	import spark.components.Button;
	
	public class DKI_Button extends Button 
	{
		private var _type:String;
		private var _label:String='';
		private var _noLabel:Boolean=true;
		
		public function DKI_Button(){
			super();
			setStyle("skinClass",skins.ButtonSkin);
			setStyle("icon", glyph.button_default);
		}
		

		[Bindable] public function get noLabel():Boolean
		{
			return _noLabel;
		}

		public function set noLabel(value:Boolean):void
		{
			_noLabel = value;
		}

		[Inspectable(category="Other", enumeration="back,cancel,clear,create,delete,default,edit,export,filteron,filteroff,forward,pause,print,report,save,update,ok,tag,refresh,close,lock,unlock")]

		public function get type():String
		{
			return _type;
		}
		
		public function set type(value:String):void
		{
			if(value != null)
			{
				_type = value;
				setStyle('icon', glyph["button_"+_type]);		
				_label='global.btn.'+value;
				if (noLabel==false)
				label=mx.resources.ResourceManager.getInstance().getString('default',_label);
				
			}
		}
	}
}