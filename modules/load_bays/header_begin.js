/****************************************
 * $Id: header_begin.js,v 1.72 2012/06/14 08:09:02 abs Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

var DROPDOWN_INIT_SIZE = 100;
var DROPDOWN_INCRS_SIZE = 50;

function id(elemNm){
        return document.getElementById(elemNm);
}
function trim(s) {
  while (s.substring(0,1) == ' ') {
    s = s.substring(1,s.length);
  }
  while (s.substring(s.length-1,s.length) == ' ') {
    s = s.substring(0,s.length-1);
  }
  return s;
}

function cookieGet( name ) {

        var start = document.cookie.indexOf( name + "=" );

        var len = start + name.length + 1;

        if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
                return null;
        }

        if ( start == -1 ) return null;
        var end = document.cookie.indexOf( ";", len );
        if ( end == -1 ) end = document.cookie.length;

        return unescape( document.cookie.substring( len, end ) );
}


function langSwitch(eng_page, chn_page){
        var language = cookieGet("language");
        var redirectTo = (language == "cn")?chn_page: eng_page;

        if (window.location.pathname != redirectTo )
                window.location.replace(redirectTo);
        return language;
}


function ml(t_ml){
        if ("cn" == js_lang){
                return t_ml[1];
        }
        else {
                return t_ml[0];
        }
}

var t__ADD        = ["ADD"       , "新增"];
var t__About      = ["About"     , "版权"];
var t__Add        = t__ADD;
var t__Back       = ["Back"      , "返回"];
var t__Confirm    = ["Confirm"   , "确认"];
var t__DELETE     = ["DELETE"    , "删除"];
var t__Delete     = t__DELETE;
var t__Enter      = ["Enter"     , "输入"];
var t__Exit       = ["Exit"      , "退出"];
var t__Go_To_Page = ["Go To Page", "转到"];
var t__Total_Pages = ["Total Pages", "总页数"];
var t__Help       = ["Help"      , "帮助"];
var t__Language   = ["Language"  , "语言"];
var t__Log_Off    = ["Log Off"   , "退出"];
var t__MODIFY     = ["MODIFY"    , "修改"];
var t__No         = ["No"        , "否"];
var t__Print      = ["Print"     , "打印"];
var t__Reset      = ["Reset"     , "重置"];
var t__Search     = ["Search"    , "查找"];
var t__Update     = t__MODIFY;
var t__VIEW       = ["VIEW"      , "查看"];
var t__View       = t__VIEW;
var t__Yes        = ["Yes"       , "是"];
var t__Any_ALL      = ["Any/All"     , "全部"];
var t__Valid_Pg_Num  = ["Enter Valid Page Number", "请输入正确的页码"];

var t__vendorName = ["Sinopec", "中国石油化工股份有限公司"];

var t__Successfully_Updated_               = ["Successfully Updated!"              , "成功修改!"];
var t__Successfully_Inserted_A_New_Record_ = ["Successfully Inserted A New Record!", "成功新增!"];
var t__Successfully_Deleted_               = ["Successfully Deleted!"              , "成功删除!"];
var t__Update_Failed_                      = ["Update Failed!"                     , "修改失败!"];
var t__Insert_New_Record_Failed_           = ["Insert New Record Failed!"          , "新增失败!"];
var t__Delete_Failed_                      = ["Delete Failed!"                     , "删除失败!"];
var t__Update_Failed____Database_Error     = ["Update Failed :: Database Error"    , "修改失败!"];
var t__Insert_Failed____Database_Error     = ["Insert Failed :: Database Error"    , "新增失败!"];
var t__Delete_Failed____Database_Error     = ["Delete Failed :: Database Error"    , "删除失败!"];

var js_lang = cookieGet("language");

var myName ="Omega-5000" ;
var myVersion ="Omega-9-02-01-04"; 
var vendorName = ml(t__vendorName);
if(typeof(g) !='object')
{
var g = {RowsPerPage:10,
	cgi_name: ""
};
}
g.RowsPerPage=10;
{
	cgiNmRE = new RegExp("/([^/]+?)\.cgi");
	path = window.location.pathname.toString();
	if(path.match( cgiNmRE)){
			g.cgi_name = path.match( cgiNmRE)[1];
	}
}

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ nextPage_longStr] 
[PURPOSE]  		-> 	Responsible for displaying the HTML for the next page
                  links and use the btnLocation_HTML and btnLocation_HTML_nexPreLk
                  functions to display the URL and use the 
                  justChaneMyLocation javascript function to carry the variables
                  to the next page
          
[Parameter]  	-> totalPages integer Total number of pages for this display
              -> curPg integer current page number user is looking at
              -> curPgVarName string is variable like pg we have in all the scripts
                 All the variable for the calling page can be passed using the
                 Key, Valu combination e.g "tankTerm",tankTerm
[AUTHOR]  		-> Abdul Shakoor (DKI) July 05, 2006
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/

function nextPage_longStr(totalPages, curPg, curPgVarName)
{
  var items_per_page = g.RowsPerPage;
  //alert("totalPages in start"+totalPages);
  // At this stage Only Know Number of Pages
  // so get the number of items
  var num_items = (totalPages*items_per_page);
  // A Block Of Pages So User Can Jump Between the Pages
  // on the Page it should look like this
  //  [ 31-40  41-50  51-60]
  var block_size = 10;
  
  //  Current Page Number as passed by the nextPage function call
  var page_number = curPg;
  
  // do some mathemetical stuff
  // in order to get the current page number and
  // page items right
  var num_pages = Math.max(1, Math.ceil(num_items/items_per_page));
	var page_number = Math.min(page_number, num_pages);
	var num_blocks = Math.ceil(num_pages/block_size);
	var block_number = Math.floor(((page_number-1)/block_size));
	
	//alert("num_pages in after Math.max"+num_pages);
	// start putting HTML string in the 
  // nextPgHTML variable
	var nextPgHTML = "";
	
	//we strip the Arguments Apart to make the Query String
	//and to make the hidden variables
	if(arguments.length>4)
	{
	   var counter =0;
	   var my_args= new Array()
    for (var i = 3; i <arguments.length; i++) 
    {
      //alert(origArgs[i]);               
      my_args[counter]=arguments[i];
      counter++;
    }
  }
	
  //Only want to display the Form IF there are more than 1 pages
	// Bug Zilla BugId 1490 an enhancement demanded by Sao
  if(num_pages>1 && (typeof num_pages != 'undefined'))
  {
  	nextPgHTML += "</td>\n ";
  	nextPgHTML += "</tr> \n";
  	//Adding a new form So Jump to the Page will be easier
  	//nextPgHTML += "<tr> \n";
  	//nextPgHTML += "<td align=\"center\">\n ";
  	nextPgHTML += "<form name=\"gotoPage\" method =\"get\" id=\"gotoPage\" action=\"\" onsubmit=\"return submitmyform(this)\">\n";
  	//nextPgHTML +="<table width=\"100%\">\n";
    //nextPgHTML +=infotextRow_HTML(" width=\"100%\ align=\"center\" ","Total Pages :"+num_pages); 
    nextPgHTML +="<tr>\n";
    nextPgHTML +=" <td align=\"center\" class=\"infotext\" width=\"100%\">\n";
    nextPgHTML +="<span style=\"font-weight: bold;\">"+ml(t__Total_Pages)+" :</span><span style=\"font-weight: bold;COLOR: #FF0000;\">"+num_pages+"</span>\n"; 
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +=" <input type=\"text\" name=\""+curPgVarName+"\"  id=\""+curPgVarName+"\" maxLength=\"6\" style=\"FONT-SIZE:1.00em;\" size=\"6\" dataType=\"RangeValue\" min=\"1\" max=\""+num_pages+"\" msg=\""+ml(t__Valid_Pg_Num)+"\"> \n";
    nextPgHTML +="	  &nbsp;\n";
    //All the Hidden Variables I need will be produced by the Parser.
    //alert(arguments.length);
    nextPgHTML += VarParser.ArgsToParse(my_args);
  	
  	// End of all the hidden variables
    nextPgHTML +="<input type=\"submit\" value=\""+ml(t__Go_To_Page)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
    nextPgHTML +="&nbsp;\n";
    nextPgHTML +="<input type=\"reset\" value=\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  
    nextPgHTML +="			</td>\n";
    nextPgHTML +="		</tr>\n";
    //nextPgHTML +="</table>\n";
    nextPgHTML += "</form>\n";
  }
	//End of the Row where the Jump to the page form goes
	VarParser.isForm = 1; // means I want to build Query Sting for all variables
	var my_args_Qstring = "";
	my_args_Qstring = VarParser.ArgsToParse(my_args);
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  	// display the previous page link and a link to the
  	// first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  	{
    	//$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    	nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('?" + curPgVarName + "=" + (1) + my_args_Qstring+"'); ", "&lt;&lt;");
		  foobar = page_number - 1;
		
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('?" + curPgVarName + "=" + (foobar) + my_args_Qstring+"'); ", "<b>&lt;<\/b>");
		
	} 
  else 
  {
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  
  	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
 	  // display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
  	// Abdul Dont need to print the Blocks
  	// Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks
  	if (block_number > 0) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    	{
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('?" + curPgVarName + "=" + (foobar1) + my_args_Qstring+"'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/

  	// Time to create the links to the 10 pages
  	// link to the pages look like this
 	 // <<  <  1 2  3  4  5  6  7  8  9  10 
  	// var block_number = (((page_number-1)/block_size)); 
  	//alert("block_number" +block_number);
  	foobar1 = block_number*block_size + 1;
	foobar2 = Math.min((block_number+1)*block_size, num_pages);
	foobar2++;
	//alert(foobar1);
	//alert(foobar2);
	for (var i=foobar1; i<page_number; i++) 
  	{
    //alert("I am in for loop "+i);		
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('?" + curPgVarName + "=" + (i) + my_args_Qstring+"'); ", i);
	}
	
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	
	for (var i=page_number+1; i<foobar2; i++) 
  	{
    	//alert("I am in for for foobar2 loop "+i);	
    	nextPgHTML += btnLocation_HTML("justChaneMyLocation('?" + curPgVarName + "=" + (i) + my_args_Qstring+"'); ", i);
	}
	
	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
  	// display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
    // Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks	
	if (block_number+1 < num_blocks) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=block_number+1; i<num_blocks; i++) 
    	{
      
			foobar1 = i*block_size + 1;	// page number to be linked
			foobar2 = Math.min((i+1)*block_size, num_pages);
			var tempTxt = foobar1;
			
			if (foobar2 > foobar1) {
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('?" + curPgVarName + "=" + (foobar1) + my_args_Qstring+"'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/
 	 // if the page number is not equal to total num of pages
 	 // that means we can dispay the link to the next page
  	// and the last pge
  	// link looks like this > >>
	if (!(page_number == num_pages)) 
  	{
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('?" + curPgVarName + "=" + (foobar) + my_args_Qstring+"'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('?" + curPgVarName + "=" + (num_pages) + my_args_Qstring+"'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
  
  
	

	return nextPgHTML;
}
//Variable Parser Object used by the nextPage_longStr
VarParser = {
              isForm :0,
              qString :"",
              QStringParser : function(origArgs) // there is always key followed by value
              {
                this.qString = "";
                for (var i = 0; i <origArgs.length; i++) 
                {
                    if(i%2==0)//means this is the Key
                    {
                      this.qString += "&"+encodeURI(origArgs[i])+"=";
                    }
                    else //means this is the Value
                    {
                      this.qString += origArgs[i];
                    }
                }
                return this.qString;
              },
              FormParser : function(origArgs){
                    for (var i = 0; i <origArgs.length; i++) 
                    {
                      if(i%2==0)//means this is the Key
                      {
                        this.qString += "<input type=\"hidden\" name=\""+origArgs[i]+"\"";
                      }
                      else //means this is the Value
                      {
                        this.qString += " value=\""+encodeURI(origArgs[i])+"\"\/>\n";
                      }
                    }
                //alert(this.qString);    
                return this.qString;
              
              },
              ArgsToParse : function(origArgs)
              { //if mode 0 query string, else form
		if(isArray(origArgs) )
		{
                if(this.isForm==0)
                {
                  return this.FormParser(origArgs);
                }
                else
                {
                  return this.QStringParser(origArgs);
                }
		}
		else
{
	return this.qString;
}
                
              }
            };




function rpad(text, size){
	for (var i = size - text.length; i > 0; i--){
		text =  text + ',';
	}
	return text;
}

function tag( tag_name){
	return document.getElementsByTagName( tag_name);
}
function isArray(a) {
    return isObject(a) && a.constructor == Array;
}

function isBoolean(a) {
    return typeof a == 'boolean';
}

function isEmpty(o) {
    var i, v;
    if (isObject(o)) {
        for (i in o) {
            v = o[i];
            if (isUndefined(v) && isFunction(v)) {
                return false;
            }
        }
    }
    return true;
}
function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}

function isString(a) {
    return typeof a == 'string';
}

function isUndefined(a) {
    return typeof a == 'undefined';
} 
