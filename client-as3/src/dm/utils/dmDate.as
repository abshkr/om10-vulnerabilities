package dm.utils
{
	import mx.formatters.DateFormatter;

	public class dmDate extends DateFormatter{

		
		public function dmDate(){ 
		
			super();
			formatString = 'YYYY-MM-DD HH:NN:SS';
		}
		
		public static function toDate( s : String ):Date{
		
			return parseDateString(s);
			
		}
		
		public static function toString( d : Date):String{
			
			
			return "unimplemented";
			
		}
		
	}
	
}