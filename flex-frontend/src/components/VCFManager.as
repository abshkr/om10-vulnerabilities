package components
{
	public class VCFManager
	{
		public function VCFManager()
		{
		}
		
	
		/**
		 * This function calculates VCF (Volume Correction Factor) for Petroleum Products using Table 54B or 6B
		 * 
		 * @param TABLE		= 54B or 6B
		 * @param DEN		= Density @ 15C or API @ 60F
		 * @param Temp		= Actual Temperature in Degrees C or Degrees F
		 * @return 			VCF value when in range, otherwise 0 
		 * 
		 */		
		public function VCF( TABLE:String, DEN:Number, Temp:Number ):Number
		{
			var vcf:Number=1;
			var API:Number;
			var Delta_T:Number;
			var ALPHA:Number;
			var K0:Number;
			var K1:Number;
			var K2:Number;
			var Mans:int=0;
			
			// Table 54B needs Density @15C and Temperature in C
			if ( TABLE == "54B" )
			{	
				Delta_T = Temp - 15;
				
				if ( DEN > 1075 )
				{
					global.msgWarning( "Density Out of Range, too High, 653-1075 Kg/M3 !" );
					Mans = -1;
				}
				else if ( DEN > 838.9 )
				{
					K0 = 186.9696;					K1 = 0.4862;					K2 = 0;
				}
				else if ( DEN > 787.9 )
				{
					K0 = 594.5418;					K1 = 0; 						K2 = 0;
				}
				else if ( DEN > 770.2 )
				{
					K0 = 2680.3206;					K1 = 0;							K2 = -0.00336312;
				}
				else if ( DEN > 653 )
				{
					K0 = 346.4228;					K1 = 0.4388;					K2 = 0;
				}
				else
				{
					global.msgWarning( "Density Out of Range, too Low, 653-1075 Kg/M3 !" );
					Mans = -2;
				}
			}
			// Table 6B needs API Gravity @60F and Temperature in F
			else if ( TABLE == "6B" )
			{
				Delta_T = Temp - 60;
				API = DEN;
				DEN = (141.5 * 999.012) / (131.5 + API);
				
				if ( API < 0 )
				{
					global.msgWarning( "API Out of Range, too Low, 0-85 !" );
					Mans = -3;
				}
				else if ( API <= 37 )
				{
					K0 = 103.872;					K1 = 0.2701;					K2 = 0;
				}
				else if ( API < 48 )
				{
                	K0 = 330.301;					K1 = 0;							K2 = 0;
				}
				else if ( API <= 52 )
				{
                	K0 = 1489.067;					K1 = 0;							K2 = -0.0018684;
				}
				else if ( API <= 85 )
				{
                	K0 = 192.4571;					K1 = 0.2438;					K2 = 0;
				}
				else
				{
					global.msgWarning( "API Out of Range, too High, 0-85 !" );
					Mans = -4;
				}
			}
			else
			{
				global.msgWarning( "Invalid ASTM Table, Must be 54B or 6B !" );
				Mans = -5;
			}
			
			if ( Mans >= 0 )
			{
				ALPHA = (K0 / Math.pow(DEN,2.0)) + (K1 / DEN) + K2;
				vcf = Math.exp( -ALPHA * Delta_T * (1 + 0.8 * ALPHA * Delta_T) );
			}
			
			return vcf;
		}

    
		/**
		 * This function calculates STD volume for Petroleum Products using Table 54B, it requires Function VCF@54B
		 * @param OBS		= Observed quantity Litres
		 * @param DEN		= Density @ 15C
		 * @param T			= Actual Temperature
		 * @return 			Standard volume
		 * 
		 */
		public function STD_54B(OBS:Number, DEN:Number, T:Number):Number
		{
			var volume:Number;
			var vcf:Number;
			
			vcf = VCF("54B", DEN, T);
			volume = OBS * vcf;

			return volume;
		}
		
		
		/**
		 * This function Mass in Vacuuum
		 * @param STD		= Observed quantity Litres
		 * @param DEN_VAC	= reference density @ 15C in KG/L
		 * @return 			mass in vacuum
		 * 
		 */
		public function Mass_Vac(STD:Number, DEN_VAC:Number):Number
		{
			var mass:Number;
			
			if ( DEN_VAC > 1.5 || DEN_VAC < 0.5 )
			{
				global.msgWarning( "DEN_VAC must be in KG/L" );
				mass = 0;
			}
			else
			{
				mass = STD * (DEN_VAC);
			}
			
			return mass;
		}

		
		/**
		 * This function Mass in AIR (weight)
		 * @param STD		= Observed quantity Litres
		 * @param DEN_VAC	= reference density @ 15C in KG/L
		 * @return 			Mass in AIR (weight)
		 * 
		 */
		public function Mass_Air(STD:Number, DEN_VAC:Number):Number
		{
			var mass:Number;
			var Air_Buoyancy_factor:Number;
			
			Air_Buoyancy_factor = 0.0011;
			if ( DEN_VAC > 1.5 || DEN_VAC < 0.5 )
			{
				global.msgWarning( "DEN_VAC must be in KG/L" );
				mass = 0;
			}
			else
			{
				mass = STD * (DEN_VAC - Air_Buoyancy_factor);
			}
			
			return mass;
		}
		
		
		/**
		 * Convert temperature in Celcius to Farenheit
		 * @param intemp	= temperature in Celcius
		 * @return 			temperature in Farenheit
		 * 
		 */
		public function Temp_C2F(intemp:Number):Number
		{
			var temp:Number;

			temp = (9.0 / 5.0 * intemp) + 32.0;
			
			return temp;
		}
		
		
		/**
		 * Convert temperature in Farenheit to Celcius
		 * @param intemp	temperature in Farenheit
		 * @return 			temperature in Celcius
		 * 
		 */
		public function Temp_F2C(intemp:Number):Number
		{
			var temp:Number;
			
			temp = (intemp - 32.0) * 5.0 / 9.0;
			
			return temp;
		}

		
		/**
		 * Convert Density @ 15C to Density @ Temp C or F
		 * @param Density
		 * @param Temp
		 * @param Temp_type
		 * @return 
		 * 
		 */
		public function Density_Temp(Density:Number, Temp:Number, Temp_type:String):Number
		{
			var new_density:Number;
			
			if ( Temp_type = "" )
			{
				Temp_type = "C";
			}
			
			if ( Temp_type = "C" )
			{
				new_density = Density * VCF("54B", Density, Temp);
			}
			else if ( Temp_type = "F" )
			{
				new_density = Density * VCF("54B", Density, Temp_F2C(Temp) );
			}
			else
			{
				global.msgWarning( "usage: Density_Temp(Density,Temp,[C|F])" );
				new_density = Density;
			}
			
			return new_density;
		}

		
		/**
		 * Convert Density@15C [Kg/M3] to API Gravity@60F
		 * @param Density
		 * @return 
		 * 
		 */
		public function API(Density:Number):Number
		{
			var api:Number;
			
			api = (141.5 / (Density / 999.016)) - 131.5;
			
			return api;
		}

		
		/**
		 * Convert Density@15C [Kg/M3] to Density@60F
		 * @param Density
		 * @return 
		 * 
		 */
		public function Density60F(Density:Number):Number
		{
			var dens60F:Number;
			
			dens60F = Density * VCF( "54B", Density, Temp_F2C(60) );
			
			return dens60F;
		}

		
		/**
		 * Convert API Gravity@60F to Density@60F [Kg/M3]
		 * @param API
		 * @return 
		 * 
		 */
		public function Density(API:Number):Number
		{
			var dens60F:Number;
			
			dens60F = (141.5 / (API + 131.5)) * 999.016;
			
			return dens60F;
		}

		
		/**
		 * Convert API Gravity@60F to Density@15C [Kg/M3]
		 * @param API
		 * @return 
		 * 
		 */
		public function Density15C(API:Number):Number		
		{
			var dens15C:Number;
			var dens60F:Number;
			
			dens60F = Density(API);
			dens15C = dens60F / VCF("54B", dens60F, Temp_F2C(60));
			
			return dens15C;
		}

		
		/**
		 * Convert Density@15C to Density@XC [Kg/M3]
		 * @param Density
		 * @param X			= temperature in Celcius
		 * @return 
		 * 
		 */
		public function DensityXC(Density:Number, X:Number):Number
		{
			var densXC:Number;
			
			densXC = Density * VCF("54B", Density, X);
			
			return densXC;
		}
		
		
		/**
		 * Convert Density@XC to Density@15C [Kg/M3]
		 * @param Density	= desnsity at XC
		 * @param X			= temperature in Celcius
		 * @param Digits	= digits after decimal point
		 * @return 			density at 15 C
		 * 
		 */
		public function Density15CFromXC(Density:Number, X:Number, Digits:int):Number
		{
			var densXC:Number;
			var dens15C:Number;
			var densMax:Number=1075;
			var densMin:Number=653;
			var i:int;
			var len:int;
			var steps:Number;
			
			steps = 1 / Math.pow(10, Digits);
			len = (1075-653+1)*100;
			if ( X > 15 )
			{
				dens15C = Density;
				for( i=0; i<len; i++ )
				{
					dens15C += steps;
					densXC = dens15C * VCF("54B", dens15C, X);
					if ( densXC.toFixed(Digits) == Density.toFixed(Digits) )
					{
						break;
					}
					if ( densXC > Density )
					{
						break;
					}
				}
			}
			else if ( X < 15 )
			{
				dens15C = Density;
				for( i=0; i<len; i++ )
				{
					dens15C -= steps;
					densXC = dens15C * VCF("54B", dens15C, X);
					if ( densXC.toFixed(Digits) == Density.toFixed(Digits) )
					{
						break;
					}
					if ( densXC < Density )
					{
						break;
					}
				}
			}
			else
			{
				dens15C = Density;
			}
			
			return dens15C;
		}

		
		/**
		 * This function calculates Temp for Petroleum Products using Table 54B
		 * @param TABLE   = 54B
		 * @param OBS     = Observed volume
		 * @param STD     = Standard volume
		 * @param DEN     = Density @ 15C
		 * @return 
		 * 
		 */
		public function Temp_from_Vol(TABLE:String, OBS:Number, STD:Number, DEN:Number):Number
		{
			var temp54B:Number = 0;
			var Delta_T1:Number;
			var Delta_T2:Number;
			var ALPHA:Number;
			var K0:Number;
			var K1:Number;
			var K2:Number;
			var vcf:Number;
			var Mans:int=0;
			
			// Table 54B needs Density @15C and Temperature in C
			if ( TABLE == "54B" )
			{	
				if ( DEN > 1075 )
				{
					global.msgWarning( "Density Out of Range, too High, 653-1075 Kg/M3 !" );
					Mans = -1;
				}
				else if ( DEN > 838.9 )
				{
					K0 = 186.9696;					K1 = 0.4862;					K2 = 0;
				}
				else if ( DEN > 787.9 )
				{
					K0 = 594.5418;					K1 = 0; 						K2 = 0;
				}
				else if ( DEN > 770.2 )
				{
					K0 = 2680.3206;					K1 = 0;							K2 = -0.00336312;
				}
				else if ( DEN > 653 )
				{
					K0 = 346.4228;					K1 = 0.4388;					K2 = 0;
				}
				else
				{
					global.msgWarning( "Density Out of Range, too Low, 653-1075 Kg/M3 !" );
					Mans = -2;
				}
			}
			else
			{
				global.msgWarning( "Invalid ASTM Table, Must be 54B !" );
				Mans = -5;
			}
			
			if ( Mans >= 0 )
			{
				var ALPHASQ:Number;
				var LOG_VCF:Number;
				
				ALPHA = (K0 / Math.pow(DEN, 2.0)) + (K1 / DEN) + K2;
				vcf = STD / OBS;
				//vcf = Math.exp( -ALPHA * Delta_T * (1 + 0.8 * ALPHA * Delta_T) );
				
				ALPHASQ = Math.pow(ALPHA, 2.0);
				LOG_VCF = Math.log(vcf);
				Delta_T1 = -ALPHA;
				Delta_T1 = -ALPHA + ((-ALPHASQ) - 4 * (-0.8 * ALPHASQ * LOG_VCF));
				Delta_T1 = -ALPHA + ((-ALPHASQ) - 4 * (-0.8 * ALPHASQ * LOG_VCF)) / (2 * (-0.8 * ALPHASQ));
				
				
				temp54B = Delta_T1;
			}
			
			return temp54B;
		}
		
	}
}