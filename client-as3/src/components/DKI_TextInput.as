package components
{
	import skins.DKI_TextInput_Skin;
	
	import spark.components.TextInput;
	
	public class DKI_TextInput extends TextInput
	{
		
		public function DKI_TextInput()
		{
			super();
			setStyle("skinClass",skins.DKI_TextInput_Skin);
		}
		
	}
}