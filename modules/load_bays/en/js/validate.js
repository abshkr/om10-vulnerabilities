/****************************************
 *
 * $Id: validate.js,v 1.39 2011/10/05 04:55:00 cw Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

 var t__Submit_Failed = ["Submit Failed!:\t\t\t\t","提交失败!:\t\t\t\t"];

 var t__Error_Too_Long = ["Inputted string is too long, Please correctly ","所输入字符串过长，请纠正！"];
 var t__Error_Invalid_Num_Bytes = ["Invalid number of bytes ","字节数目错误！"];

 Validator = {
	CodeType: /^[A-Za-z0-9]+$/,
	Require : /^[^'"#\\&%+]+$/,
	Undanger: /^[^'"#\\&%+]*$/,
	Unsafestr : /^[^'"#\\&+]+$/,	//allow per cent symbol
	Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
	Mobile : /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IdCard : "this.IsIdCard(value)",
	Currency : /^\d+(\.\d+)?$/,
	Number : /(\d+)?(\.\d+)?$/,
	Zip : /^[1-9]\d{5}$/,
	QQ : /^[1-9]\d{4,8}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	PositiveDouble : /^\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	String : /^([A-Za-z0-9]+[ \t\v\n\r\f]*)+$/,
	BayCode : /^BAY +\d+$/,
	Chinese :  /^[\u0391-\uFFE5]+$/,
	Username : /^[a-z]\w{3,}$/i,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Filter : "this.DoFilter(value, getAttribute('accept'))",
	Limit : "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
	LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
	Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
	Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
	Range : "getAttribute('min') <= (Math.floor(value)) && (Math.ceil(value)) <= getAttribute('max') && this.Exec(value, '(\d+)?(\.\d+)?$')&& this.Exec(value, '[^#\\&%+]+')",
	RangeValue : "getAttribute('min') <= (Math.floor(value)) && (Math.ceil(value)) <= getAttribute('max') && this.Exec(value, '(\d+)?(\.\d+)?$')&& this.Exec(value, '[^#\\&%+]+')",
	//RangeValue : "document.getElementsByName(getAttribute('min'))[0].value <= (Math.ceil(value)|0) && (Math.ceil(value)|0) <= document.getElementsByName(getAttribute('max'))[0].value",
	Compare : "this.compare((value|0),getAttribute('operator'),getAttribute('to'))",
	CompareValue : "this.compare((value|0),getAttribute('operator'),document.getElementsByName(getAttribute('to'))[0].value)",
	CompareDateTime : "this.compare(this.toDateTime(value, document.getElementsByName(getAttribute('and'))[0].value),getAttribute('operator'),this.toDateTime(document.getElementsByName(getAttribute('to'))[0].value, document.getElementsByName(getAttribute('toand'))[0].value))",
	CompareDate : "this.compare(this.toDate(value),getAttribute('operator'),this.toDate(document.getElementsByName(getAttribute('to'))[0].value))",
	CompareRange : "this.compare((value|0),getAttribute('operator'),document.getElementsByName(getAttribute('to'))[0].value) && (getAttribute('min') <= (value|0) && (value|0) <= getAttribute('max')) ",
	PositiveInt : "(value|0) > 0 && trim(value).length>0 && this.Exec(value, '[^#\\&%+]?$') && (value*1)!=NaN && (Math.ceil(value)==value)",
    PositiveIntGteZero : "value >= 0 && trim(value).length>0 && (value*1)!=NaN && (Math.ceil(value)==value)",  
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
	ErrorItem : [document.forms[0]],
	ErrorMessage : [ml(t__Submit_Failed)], 
	RangeInt : "(value|0) > 0 && trim(value).length>0 && (value*1)!=NaN && (Math.ceil(value)==value)",
	RangeDouble: "(trim(value).length>0) && (Math.floor( (value - getAttribute('min')) * getAttribute('ndec') ) >= 0) && (Math.ceil( (value - getAttribute('max')) * getAttribute('ndec') ) <= 0) && this.Exec(value, '(\d+)?(\.\d+)?$')&& this.Exec(value, '[^#\\&%+]+') ",
	Validate : function(theForm, mode){
		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = obj;
		for(var i=0;i<count;i++){
			with(obj.elements[i])
			{
                                if (obj.elements[i].disabled) continue;
				var _dataType = getAttribute("dataType");
				var _maxlength = getAttribute("maxlength");
				var _maxlength_Cap = getAttribute("maxLength");
				
				
				
				if(typeof(_maxlength) != "object" && _maxlength!="0" && _maxlength!="" && _maxlength>0 && _maxlength!=2147483647 )
				{
					//alert(_maxlength_Cap +" AND I want to validate Bytes for "+obj.elements[i].name+" my data type is "+typeof(_maxlength_Cap));
					if(blen(value)>_maxlength)
					{
						//this.AddError(i, "Invalid number of bytes "+getAttribute("msg"));
						this.AddError(i, ml(t__Error_Too_Long)+getAttribute("msg"));
					}

				}
				else if(typeof(_maxlength_Cap) != "object" && _maxlength_Cap!="0" && _maxlength_Cap!="" && _maxlength_Cap>0 && _maxlength_Cap!=2147483647 )
				{
					//alert(_maxlength_Cap +" AND I want to validate Bytes for "+obj.elements[i].name+" my data type is "+typeof(_maxlength_Cap));
					if(blen(value)>_maxlength)
					{
						this.AddError(i, ml(t__Error_Invalid_Num_Bytes)+getAttribute("msg"));
					}

				}

				
				
				
				
				if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined")  continue;
				this.ClearState(obj.elements[i]);
				if(getAttribute("require") == "false" && value == "") continue;
				switch(_dataType)
				{
					case "IdCard" :
					case "Date" :
					case "Repeat" :
					case "Range" :
					case "RangeValue" :
					case "RangeDouble" :					
					case "Compare" :
					case "CompareValue" :
					case "CompareRange" :
					case "CompareDate" :
					case "CompareDateTime" :
					case "PositiveInt" : 
                    case "PositiveIntGteZero" :
					case "Custom" :
					case "Group" : 
					case "Limit" :
					case "LimitB" :
					case "SafeString" :
					case "Filter" :
						if(!eval(this[_dataType]))	
						{
							this.AddError(i, getAttribute("msg"));
						}
						break;
                  case "RangeInt" :
                        if ( !isInteger(value)  )        
                           {
                              this.AddError(i, getAttribute("msg"));
			   } 
			   else 
			   {
                              if (!eval(this["Range"])) 
		              {
                                  this.AddError(i, getAttribute("msg"));
                              }
                           }
                        break;
                  case "Require" :
			has7dc = /['"#\\&%+]/;
			isEmpty = /^$/;
			spaceOnly = /^\s+$/;
			if( has7dc.test(value) || isEmpty.test(value) || spaceOnly.test(value))
			{
				this.AddError(i, getAttribute("msg"));
			}
                        break;
					default :
						if(!this[_dataType].test(value))
						{
							this.AddError(i, getAttribute("msg"));
						}
						break;
                                     
				}
			
			}
		}
		if(this.ErrorMessage.length > 1){
			mode = mode || 1;
			var errCount = this.ErrorItem.length;
			switch(mode){
			case 2 :
				for(var i=1;i<errCount;i++)
					this.ErrorItem[i].style.color = "red";
			case 1 :
				alert(this.ErrorMessage.join("\n"));
				this.ErrorItem[1].focus();
				break;
			case 3 :
				for(var i=1;i<errCount;i++){
				try{
					var span = document.createElement("SPAN");
					span.id = "__ErrorMessagePanel";
					span.style.color = "red";
					this.ErrorItem[i].parentNode.appendChild(span);
					span.innerHTML = this.ErrorMessage[i].replace(/\d+:/,"*");
					}
					catch(e){alert(e.description);}
				}
				this.ErrorItem[1].focus();
				break;
			default :
				alert(this.ErrorMessage.join("\n"));
				break;
			}
			return false;
		}
		return true;
	},
	limit : function(len,min, max)
	{
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function(str)
	{
		return str.replace(/[^\x00-\xff]/g,"**").length;
	},
	ClearState : function(elem){
		with(elem){
			if(style.color == "red")
				style.color = "";
			var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
			if(lastNode.id == "__ErrorMessagePanel")
				parentNode.removeChild(lastNode);
		}
	},
	AddError : function(index, str){
		this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
	},
	Exec : function(op, reg){
		return new RegExp(reg,"g").test(op);
	},
	compare : function(op1,operator,op2)
	{
		switch (operator) 
		{
			case "NotEqual":
				return (op1 != op2);
			case "GreaterThan":
				return (op1 > op2);
			case "GreaterThanEqual":
				return (op1 >= op2);
			case "GreaterThanORzero":
                                return (op1 > op2 || op1 == 0);
			case "LessThan":
				return (op1 < op2);
			case "LessThanEqual":
				return (op1 <= op2);
			default:
				return (op1 == op2);            
		}
	},
	MustChecked : function(name, min, max)
	{
		var groups = document.getElementsByName(name);
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
			if(groups[i].checked) hasChecked++;
		return min <= hasChecked && hasChecked <= max;
	},
	DoFilter : function(input, filter)
	{
return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(input);
	},
	IsIdCard : function(number)
	{
		var date, Ai;
		var verify = "10x98765432";
		var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var area = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
		var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
		if(re == null) return false;
		if(re[1] >= area.length || area[re[1]] == "") return false;
		if(re[2].length == 12)
		{
			Ai = number.substr(0, 17);
			date = [re[9], re[10], re[11]].join("-");
		}
		else
		{
			Ai = number.substr(0, 6) + "19" + number.substr(6);
			date = ["19" + re[4], re[5], re[6]].join("-");
		}
		if(!this.IsDate(date, "ymd")) return false;
		var sum = 0;
		for(var i = 0;i<=16;i++)
		{
			sum += Ai.charAt(i) * Wi[i];
		}
		Ai +=  verify.charAt(sum%11);
		return (number.length ==15 || number.length == 18 && number == Ai);
	},
	IsDate : function(op, formatString)
	{
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch(formatString)
		{
			case "ymd" :
				m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
				if(m == null ) return false;
				day = m[6];
				month = m[5]*1;
				year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
				break;
			case "dmy" :
				m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
				if(m == null ) return false;
				day = m[1];
				month = m[3]*1;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
				break;
			default :
				break;
		}
		if(!parseInt(month)) return false;
		month = month==0 ?12:month;
		var date = new Date(year, month-1, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
		function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
	},
	toDateTime: function(op1, op2)
	{
		if(op1.length < op2.length)
		{
			var tmp = op2;
			op2 = op1;
			op1 = tmp;
		}
		
		var year = op1.substring(0,4);
		//var mmm = op1.substring(5,7);
		var month = op1.substring(5,7);
		var day = op1.substring(8,10);
		var hour = op2. substring (0,2);
		var second = op2.substring(3,5);
		//alert(year +" AND "+month +" AND "+day +" AND "+ hour+" AND "+second);	
		return new Date(year, month, day, hour, second);
		
	},
	toDate: function(op)
	{
		var year = op.substring(0,4);
		//var mmm = op.substring(5,7);
		var month = op.substring(5,7);
		var day = op.substring(8,10);
		
		return new Date(year, month, day);
	}
 }


function isInteger(s)
{   var i;
    if(trim(s)==""|| isNaN(parseInt(s, 10)))
    {
        return false;
    }
    // All characters are numbers.
    return true;
}
function blen(v_str)
{
	//var v1 = encodeURI(v_str);
	//var m = v1.length;
	//var len = m - (v1.split('%').length)*2 + 2;
	//return len;
	return v_str.replace(/[^\x00-\xff]/g,"**").length;
}
function isANumber(v_str)
{
	
}
