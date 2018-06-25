package dm.utils
{
	import com.adobe.fiber.runtime.lib.StringFunc;
	import mx.collections.ArrayCollection;
	import mx.collections.ArrayList;
	import mx.states.State;
	import mx.utils.ObjectUtil;
	
	public class tools
	{
		public function tools()
		{
		}
		
		public static function pr(obj:* = false, level:int = 0, output:String = ""):* {
			
			var tabs:String = "";
			for(var i:int = 0; i < level; i++) tabs += "\t";
			
			for(var child:* in obj) {
				output += tabs +"["+ child +"] => "+ obj[child];
				
				var childOutput:String = pr(obj[child], level+1);
				if(childOutput != '') output += ' {\n'+ childOutput + tabs +'}';
				
				output += "\n";
			}
			
			if(level == 0) trace(output);
			else return output;
		}
		
		public static function getObjAttribute( params:*, code:String, value:* ):*
		{
			var attr:*;
			
			// keep the original value first
			attr = value;
			//trace ("***>>>>>>>>>"+code+":<<<<<<<***", value );
			
			// then check if the attribute has been passed by params
			if ( (params != null) && (params != false) && (params is Object) )
			{
				if( params.hasOwnProperty( code ) )
				{
					attr = params[code];
					//trace ("***>>>>>>>>>code:<<<<<<<***", params[code] );
				}
			}
			
			return attr;
		}
		
		public static function getItemObjectFromCode(code:String, list:ArrayCollection, field:String):Object
		{
			for each(var o:Object in list)
			{
				if(o[field] == code)
				{
					return o;
				}
			}
			
			return null;
		}
		
		public static function getItemIndexFromCode(code:String, list:ArrayCollection, field:String):int
		{
			if ( list == null )
			{
				return -1;
			}
			
			var i:int;
			
			for (i=0; i<list.length; i++)
			{
				if ( (list.getItemAt(i) as Object)[field] == code )
				{
					return i;
				}
			}
			
			return -1;
		}
		
		/**
		 * get the quotient from the division of integers
		 *
		 *
		 * @param dividend 		uint, the number that is divided by.
		 * @param divisor 		uint, the number that devides.
		 *
		 * @return 				uint, quotient.
		 *
		 * @see 				Navigator
		 */
		public static function getDivisionQuotient (dividend:uint, divisor:uint):uint
		{
			var quotient:uint;
			
			if ( dividend > 0 && divisor!=0 )
			{
				quotient = dividend/divisor;
				if ( (dividend%divisor) > 0 )
				{
					quotient += 1;
				}
			}
			else
			{
				quotient = 0;
			}
			
			return quotient;
		}
		
		public static function makeArrayList(start:int, arr:Array, size:int):Array
		{
			var arrList:ArrayList = new ArrayList();
			var i:int;
			var rowLength:int;
			
			rowLength = arr.length;
			
			if ( start < 0 )
			{
				start = 0;
			}
			
			if ( start+rowLength >= size )
			{
				//start = size - 1;
				start = size - rowLength;
			}
			
			if ( rowLength < size )
			{
				//arrList.addItem(null);
				for (i=0; i<start; i++)
				{
					arrList.addItem(null);
				}
				
				for (i=0; i<rowLength; i++)
				{
					arrList.addItem( arr[i] );
				}
				
				for (i=0; i<(size-rowLength-(start)); i++)
				{
					arrList.addItem(null);
				}
			}
			else
			{
				for (i=0; i<rowLength; i++)
				{
					arrList.addItem( arr[i] );
				}
			}
			
			return arrList.source;
		}
		
		public static function updateArrayList(start:int, arr:Array, size:int, src:Array):Array
		{
			var i:int;
			var rowLength:int;
			
			src.length = size;
			
			rowLength = arr.length;
			
			if ( start < 0 )
			{
				start = 0;
			}
			
			if ( start+rowLength >= size )
			{
				//start = size - 1;
				start = size - rowLength;
			}
			
			if ( rowLength < size )
			{
				for (i=0; i<rowLength; i++)
				{
					src[start+i] = arr[i];
				}
			}
			else
			{
				for (i=0; i<rowLength; i++)
				{
					src[i] = arr[i];
				}
			}
			
			return src;
		}
		
		public static function isValueNumeric( val:String ):Boolean
		{
			if ( !isNaN(Number(val)) ) 
			{
				return true;
			}
			
			return false;
		}
		
		public static function isValueInteger( val:String ):Boolean
		{
			if ( !isNaN(Number(val)) ) 
			{
				if ( Math.floor(Number(val)) == Math.ceil(Number(val)) ) 
				{
					return true;
				}
			}
			
			return false;
		}		
		
		public static function isStateExisted(code:String, list:Array):Boolean
		{
			for each(var o:State in list)
			{
				if(o.name == code)
				{
					return true;
				}
			}
			
			return false;
		}
		
		
		public static function increaseString( value:String ):String
		{
			var inc_string:String;
			var i:int;
			var len:int;
			var inc:int;
			var bit:int;
			
			inc_string = "";
			inc = 1;
			len = value.length;
			
			for ( i=len-1; i>=0; i-- )
			{
				if ( value.charAt( i ) == "-" )
				{
					inc_string = "-" + inc_string;
					inc = 0;
					continue;
				}
				
				bit = int( value.charAt( i ) );
				if ( inc == 1 )
				{
					bit += 1;
				}
				if ( bit >= 10 )
				{
					inc_string = "0" + inc_string;
					inc = 1;
				}
				else
				{
					inc_string = String(bit) + inc_string;
					inc = 0;
				}
			}
			
			return inc_string;
		}
		
		public static function decreaseString( value:String ):String
		{
			var dec_string:String;
			var i:int;
			var len:int;
			var dec:int;
			var bit:int;
			
			dec_string = "";
			dec = 1;
			len = value.length;
			
			for ( i=len-1; i>=0; i-- )
			{
				if ( value.charAt( i ) == "-" )
				{
					dec_string = "-" + dec_string;
					dec = 0;
					continue;
				}
				
				bit = int( value.charAt( i ) );
				if ( dec == 1 )
				{
					if ( bit == 0 )
					{
						bit = 9;
						dec = 1
					}
					else
					{
						bit -= 1;
						dec = 0;
					}
				}
				dec_string = String(bit) + dec_string;
			}
			
			return dec_string;
		}
		
		public static function mathRound( value:String, fractionDigits:uint=0 ):String
		{
			var power:Number;
			var rnd_string:String="";
			var rnd_number:Number;
			var pos:int;
			var pairs:Array;
			
			if ( fractionDigits <= 0 )
			{
				rnd_number = Math.round( Number(value) );
				rnd_string = String( rnd_number );
			}
			else
			{
				power = Math.pow( 10, fractionDigits );
				rnd_number = Math.round( Number(value) * power );
				rnd_string = String( rnd_number / power );
				
				pos = rnd_string.indexOf(".");
				//trace("...................................................mathRound", rnd_string, pos );
				if ( pos < 0 )
				{
					rnd_string = rnd_string.concat( "." , StringFunc.repeatString( "0", fractionDigits ) );
				}
				else
				{
					//trace("...................................................mathRound", rnd_string, fractionDigits, (rnd_string.length-1-pos), StringFunc.repeatString( "0", (fractionDigits-(rnd_string.length-1-pos)) ) );
					if ( (rnd_string.length-1-pos) < fractionDigits )
					{
						rnd_string = rnd_string.concat( StringFunc.repeatString( "0", (fractionDigits-(rnd_string.length-1-pos)) ) );
					}
				}
			}
			
			return rnd_string;
			
		}
		
		public static function roundString( value:String, fractionDigits:uint=0 ):String
		{
			var rnd_string:String="";
			var pairs:Array;
			var int_string:String;
			var dec_string:String;
			var i:int;
			var sign:int;
			
			if ( value.length < 17 )
			{
				//rnd_string = Number(value).toFixed(fractionDigits);
				//rnd_string = String(Math.round( Number(value) * Math.pow(10,fractionDigits) ) / Math.pow(10,fractionDigits));
				rnd_string = mathRound( value, fractionDigits );
				
				return rnd_string;
			}
			
			if ( value.indexOf( "-" ) < 0 )
			{
				sign = 1;
			}
			else
			{
				sign = -1;
			}
			
			pairs = value.split( "." );
			if ( pairs.length == 0 )
			{
				int_string = "0";
				dec_string = "";
				for (i=0; i<fractionDigits; i++)
				{
					dec_string += "0";
				}
				if ( dec_string.length > 0 )
				{
					rnd_string = int_string + "." + dec_string;
				}
				else
				{
					rnd_string = int_string;
				}
				
				return rnd_string;
			}
			
			if ( pairs.length == 1 )
			{
				int_string = pairs[0];
				dec_string = "";
				for (i=0; i<fractionDigits; i++)
				{
					dec_string += "0";
				}
				if ( dec_string.length > 0 )
				{
					rnd_string = int_string + "." + dec_string;
				}
				else
				{
					rnd_string = int_string;
				}
				
				return rnd_string;
			}
			
			if ( pairs.length > 1 )
			{
				int_string = pairs[0];
				dec_string = pairs[1];
				
				var dec_buffer:String;
				var dec_round:String;
				dec_buffer = "0."+dec_string;
				if ( sign == -1 )
				{
					dec_buffer = "-" + dec_buffer;
				}
				
				//dec_round = Number( dec_buffer ).toFixed( fractionDigits );
				//dec_round = String(Math.round( Number(dec_buffer) * Math.pow(10,fractionDigits) ) / Math.pow(10,fractionDigits));
				dec_round = mathRound( dec_buffer, fractionDigits );
				
				if ( dec_round.indexOf( "-" ) >= 0 )
				{
					dec_round = dec_round.substr( 1 );
				}
				
				if ( int( dec_round ) == 0 )
				{
					if ( dec_round.length > 2 )
					{
						rnd_string = int_string + dec_round.substr( 1 );
					}
					else
					{
						rnd_string = int_string;
					}
				}
				else
				{
					rnd_string = increaseString( int_string );
					/*					
					if ( sign == -1 )
					{
					rnd_string = decreaseString( int_string );
					}
					else
					{
					rnd_string = increaseString( int_string );
					}
					*/					
				}
				
				
				return rnd_string;
			}
			
			return rnd_string;
			
		}
		
		/**
		 * Copy arraycollection from src to dest.
		 *  
		 */
		public static function acCopy(src:ArrayCollection, dest:ArrayCollection):void
		{
			if (dest == null || src == null)
				return;
			
			var index:int = 0;
			var length:int = src.length;
			
			if (dest != null)
			{
				dest.removeAll();
			}
			
			for(index; index < length; index++){
				dest.addItem(ObjectUtil.copy(src[index]));
			} 
			
			return;
		}
	}
	
}