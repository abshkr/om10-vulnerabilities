/**************************************************************
 * $Id: utility.js,v 1.21 2008/04/17 07:01:26 abs Exp $
 **************************************************************/

// Copyright © 2000 by Apple Computer, Inc., All Rights Reserved.
//
// You may incorporate this Apple sample code into your own code
// without restriction. This Apple sample code has been provided "AS IS"
// and the responsibility for its operation is yours. You may redistribute
// this code, but you are not permitted to redistribute it as
// "Apple sample code" after having made changes.
//
// ************************
// layer utility routines *
// ************************

function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its id
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
} // getStyleObject

function changeObjectVisibility(objectId, newVisibility) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	styleObject.visibility = newVisibility;
	return true;
    } else {
	// we couldn't find the object, so we can't change its visibility
	return false;
    }
} // changeObjectVisibility

function moveObject(objectId, newXCoordinate, newYCoordinate) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	styleObject.left = newXCoordinate;
	styleObject.top = newYCoordinate;
	return true;
    } else {
	// we couldn't find the object, so we can't very well move it
	return false;
    }
} // moveObject
function getElemRefs(id) {
	var el = (document.getElementById)? document.getElementById(id): (document.all)? document.all[id]: (document.layers)? getLyrRef(id,document): null;
	return el;
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ SetUrlString] 
[PURPOSE]  -> This search any querystring in url.
     Call function AleterUrlString() to do so.
[Parameter]  -> url    -> Url string
    -> SearchContent -> Query String need to search
    -> ReplaceContent -> Replace new value
[INVOKE FROM] -> internally from query resultset function(s)
[AUTHOR]  -> Himadrish May 06 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/ 
function SetUrlString(url, SearchContent, ReplaceContent)
{
  var iStartPos;
  var strSrc;
  //var strFirstPart;
  //var strLastPart;
  //var Length;
  //alert(url);
  //alert(SearchContent);
  //alert(ReplaceContent);
  
  strSrc  = url;
  //iStartPos = url.indexOf(SearchContent);
  iStartPos = url.search(SearchContent);
  if(iStartPos== -1)
  {
   iStartPos = url.search("&");
   if(iStartPos == -1) {
     iStartPos = url.search("?");
     if(iStartPos != -1)
      strSrc=strSrc + "?" + SearchContent + "=" + ReplaceContent;
     else
      strSrc=strSrc + "&" + SearchContent + "=" + ReplaceContent;
   } else {
     strSrc=strSrc + "&" + SearchContent + "=" + ReplaceContent;
   }
  }
  else
  {
   //Call this function to do this task
   strSrc = AlterUrlString(url,SearchContent,ReplaceContent)
   
  }
  return strSrc;
  
}

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ AlterUrlString] 
[PURPOSE]  -> This search any querystring in url
     and if found replace old value by new value.
     
[Parameter]  -> strUrl   -> Url string
    -> Search   -> Query String need to search
    -> NewValue   -> Replace new value
[INVOKE FROM] -> internally from query resultset function(s)
[AUTHOR]  -> Himadrish May 25th 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/ 

function AlterUrlString(strUrl,Search,NewValue)
{
  //Purpose: To restructre url value.
  //find the specified parameter in the whole url
  //if found it call function QueryString_Parse()
  //to replace old value with new value.
  //If not found, return the old url.
 var strParameterSearch = "";
 strParameterSearch = Search + "=";
 var url = strUrl; 

 var url_check = url.search(strParameterSearch)
 if(url_check != -1) 
 {
  //alert("NewValue i got in AlterUrlString"+NewValue);
  var NewUrl = QueryString_Parse(strUrl,Search,NewValue);
  
  return NewUrl;
 } else {
  strUrl +="&"+Search + "="+NewValue;
  
  return strUrl;
 }
}

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ QueryString_Parse] 
[PURPOSE]  -> To parse url, and found search query parameter
     in the url. If found the same, replace its
     old value by new/updated value.
     and if found replace old value by new value.
     To replace it call SearchAndReplace(0 function
     
[Parameter]  -> strUrl   -> Url string
    -> SearchParameter -> Query String need to search
    -> NewValue   -> Updated value
[INVOKE FROM] -> internally from query resultset function(s)
[AUTHOR]  -> Himadrish May 25th 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function QueryString_Parse(strUrl,SearchParameter,NewValue) 
{
   
   //Purpose: To find out seach content exist in url.
   //If found search string, extract it's value, and 
   //replace old value with new value
   //For example, it search LAST_SELECTED_ID in the url.
   //If found, get its initial value 12. It will replace
   // LAST_SELECTED_ID=12 with new value LAST_SELECTED_ID=14
   //And send the restructure url.
    var firstpair  = "";
    var firstpos  = "";
    var strFisrtQuery ="";
    var SearchString ="";
    var ReplaceString ="";
    var retUrl   = "";
    var strDelimeter = "&";
 
 var pairs = strUrl.split(strDelimeter); 

 for(var i=0;i<pairs.length;i++) 
 {
  var pos = pairs[i].indexOf('='); 
  if(pos >= 0) 
  { 
   var argname = pairs[i].substring(0,pos); 
   var value = pairs[i].substring(pos+1);
    //case for first query string
    if(i==0) {
     //again need to split on '?'
     firstpair = argname.split("?");
     firstpos  = argname.indexOf('=');
     strFisrtQuery = firstpair[1];
     if(SearchParameter==strFisrtQuery) {
      SearchString = strFisrtQuery + "=" + value;
      ReplaceString = strFisrtQuery + "=" + NewValue;
      break;
     }
    }
    else { //case rest of the other query string
      if(SearchParameter==argname) {
       SearchString = argname + "=" + value;
       ReplaceString = argname + "=" + NewValue;
       break;
      }
    }
  } 
 }//end for
 
 
 retUrl = SearchAndReplace(strUrl,SearchString,ReplaceString)
 if(retUrl=="")
  return strUrl;
 else
  return retUrl;
}

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ SearchAndReplace] 
[PURPOSE]  -> To find any straing/word in a string, and if found
     replace the string with new string
          
[Parameter]  -> strAll   -> The whole string into which we perform search
    -> strSearch  -> String which we search
    -> strReplace  -> String which we need to replace
[INVOKE FROM] -> internally from query resultset function(s) [QueryString_Parse]
[AUTHOR]  -> Himadrish May 25th 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function SearchAndReplace(strAll,strSearch,strReplace)
{
 //Purpose: To search and replace in a string
 //For example search the LAST_SELECTED_ID=12
 //in a string / url, if found replace it
 //with new value LAST_SELECTED_ID=14
 myOldString = new String(strAll)
 rExp = strSearch
 newString = new String (strReplace)
 var results = myOldString.replace(rExp, newString)
 return results
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ submitDeteleActionForm] 
[PURPOSE]  		-> 	Function responsible for activating form submit.
          
[Parameter]  	-> key_no integer is the key refer to the form user can submit
[AUTHOR]  		-> Abdul Shakoor July 7, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function submitDeteleActionForm(key_no)
{
	eval("document.delete_action_"+key_no+".submit();"); 
	return true;
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ submitDeteleActionForm] 
[PURPOSE]  		-> 	Function responsible for activating form submit.
          
[Parameter]  	-> key_no integer is the key refer to the form user can submit
[AUTHOR]  		-> Abdul Shakoor July 7, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function submitYourActionForm(myObj, key_no)
{
  //check what value was selected.
  var myselectedvalue = myObj.options[myObj.selectedIndex].value;
  if(myselectedvalue=="4")
  {
    if(confirm('Are you sure you want to delete?'))
	  {
	     return submitDeteleActionForm(key_no);
	  }
	  return false;
  }
  else if(myselectedvalue!="")
  {
    eval("document.select_action_"+key_no+".submit();"); 
    return true;
  }
	
	return false;


}


function openGate(msg,frmobj)
{
	var myfrmOb = this;
	if(confirm(msg))
	  {
	     myfrmOb.submit();
	     return true;
	  }
	  return false;
		
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
[DESCRIPTION]  -> FOLLOWING PART OF THE CODE IS USED FOR THE PRINT 
		    BUTTON ON ANY OF THE WEB PAGES

[AUTHOR]  -> Abdul Shakoor July 28 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/ 
var gAutoPrint = true; // Tells whether to automatically call the print function

function printSpecial()
{
  if (document.getElementById != null)
  {
    var html = '<HTML>\n<HEAD>\n';
	html += "<LINK href=\"/cn/style/site.css\" type=text/css rel=stylesheet>\n";
    html += '\n</HEAD>\n<BODY>\n';
  
        var printReadyElem = document.getElementById("printReady");
        if (printReadyElem == null)
        {
                printReadyElem = document.getElementById("content");
        }

    if (printReadyElem != null)
    {
    
      html +="<div class=\"content\">\n";
      html +="\n";
      html +="\n";
      html +="<table border=\"0\" width=\"100%\">\n";
      html +="<tbody>\n";
      html += "<tr> \n";
      html += "<td>\n ";
      html += printReadyElem.innerHTML;
      html += "</td>\n ";
      html += "</tr> \n";
      html +="</tbody>\n";
      html +="</table>\n";
      html +="</div>\n";
    }
    else
    {
      alert("Could not find the printReady function");
      return;
    }
    
    html += '\n</BODY>\n</HTML>';
    
    var printWin = window.open("","printSpecial");
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
    if (gAutoPrint)
    {
      printWin.print();
    }
    
    }
    else
    {
      alert("The print ready feature is only available if you are using an browser,Please update your browswer.");
    }
}


function dec2bin(nub) {
   var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;
   if (nub.length == 0) alert("Input is Blank");
   for (i = 0; i < nub.length && blnResult == true; i++)
      {
      strChar = nub.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
	if (blnResult != false) 
	{
		var i;
		var j;
		var result="";
		var ib;
		while (nub != 1)
			{
				j = nub % 2;
				i = (nub - j) / 2
				nub = i;
				ib = j.toString();
				result = ib + result;
			}
		result = "1" + result;
		return result;
	}
	return "Numbers Only"
}
function bin2dec(init) {
var power = init.length;
var output = 0;
for (i=0;i<=power;i++)
	{if(init.charAt(i) == 0)
	 {var preout = 0;}
	else
	 {var xty = power - i - 1;
	  var preout = Math.pow(2, xty);
	 }
	var output = output+preout; 
	}
return output;
}
function selectall(total, objId){
//"total" is the number of check box in the form, it is dynamically generated from db

for (i=0; i<total+1; i++){
eval ("document.myForm."+objId+"["+i+"].checked = document.getElementById('"+objId+"').checked;")}
}
function isArray_keysExist(inputArr, key)
{
    for (var i in inputArr) 
    {
	 if ((inputArr[i] != null) && (i==key))
	 {
		return true;
	 }
            
    }
    return false;
}
function check_ifReqPrint(inputArr, currOp)
{
	return true;
}
function check_ifReqSearch(inputArr, currOp)
{
	return true;
}

var g_opInf = new Array()

g_opInf[26]  = ml(t__Successfully_Updated_);              
g_opInf[27]  = ml(t__Successfully_Inserted_A_New_Record_);
g_opInf[28]  = ml(t__Successfully_Deleted_);              
g_opInf[36]  = ml(t__Update_Failed_);                     
g_opInf[37]  = ml(t__Insert_New_Record_Failed_);          
g_opInf[38]  = ml(t__Delete_Failed_);                     
g_opInf[136] = ml(t__Update_Failed____Database_Error);   
g_opInf[137] = ml(t__Insert_Failed____Database_Error);   
g_opInf[138] = ml(t__Delete_Failed____Database_Error);   

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
[DESCRIPTION]  -> FOLLOWING PART OF THE CODE IS USED FOR THE PRINT
                    BUTTON ON ANY OF THE WEB PAGES with a TITLE in it.

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/

function printSpecialWithTitle(txt_hd)
{



if (document.getElementById != null)
   {
     var html = '<HTML>\n<HEAD>\n';

     if (document.getElementsByTagName != null)
        {
           var headTags = document.getElementsByTagName("head");
           if (headTags.length > 0)
           html += headTags[0].innerHTML;
        }

     html += '\n</HEAD>\n<BODY>\n';

     var printReadyElem = document.getElementById("printReady");

     if (printReadyElem != null)
        {

           html +="<div class=\"content\">\n";
           html +="\n";
           html +="\n";
           html +="<table border=\"0\" width=\"100%\">\n";
           html +="<tbody>\n";

           html +="    <tr>\n";
           html +="            <td align=\"center\">\n";
           html +="                    <h5>"+txt_hd+"</h5>\n";
           html +="            </td>\n";
           html +="    </tr>\n";

           html += "   <tr> \n";
           html += "        <td>\n ";

           /* If having '<select>' then ... */
           if ( printReadyElem.innerHTML.match(/select/) )
           {
                     html += replaceTagChars(printReadyElem.innerHTML);

           } else {
                     html += printReadyElem.innerHTML;
           }

           html += "        </td>\n ";
           html += "   </tr> \n";

           html +="</tbody>\n";
           html +="</table>\n";
           html +="</div>\n";
        }
        else
        {
           alert("Could not find the printReady function");
           return;
        }

        html += '\n</BODY>\n</HTML>';

        var printWin = window.open("","printSpecialWithTitle");
        printWin.document.open();
        printWin.document.write(html);
        printWin.document.close();

        if (gAutoPrint)
        printWin.print();

   }
   else
   {
   alert("The print ready feature is only available if you are using an browser, please update your browser.");
   }
}



function replaceTagChars(entry) {

   temp = "" + entry;       // temporary holder

   if ( detectBrowser() == "Mozilla"
        || detectBrowser() == "Netscape Navigator"
        || detectBrowser() == "Firefox" )
   {
        out  = "<select";      // start of searching tag
        out2 = "</select>";    // end of searching tag
   } else {
        out  = "<SELECT";      // start of searching tag
        out2 = "</SELECT>";    // end of searching tag
   }


   while (temp.indexOf(out2)>-1) {
          pos = temp.indexOf(out);
          pos2 = temp.indexOf(out2);
          temp = " " + temp.substring(0, pos) + " " + temp.substring(pos2+out2.length, temp.length);
    }

   return temp;
}


function detectBrowser() {
    var detect = navigator.userAgent.toLowerCase();
    var OS,browser,version,total,thestring;

    if (checkIt('konqueror'))
    {
            browser = "Konqueror";
            OS = "Linux";
    }
    else if (checkIt('safari')) browser = "Safari"
    else if (checkIt('omniweb')) browser = "OmniWeb"
    else if (checkIt('opera')) browser = "Opera"
    else if (checkIt('webtv')) browser = "WebTV";
    else if (checkIt('icab')) browser = "iCab"
    else if (checkIt('msie')) browser = "Internet Explorer"
    else if (checkIt('mozilla')) browser = "Mozilla"
    else if (checkIt('firefox')) browser = "Firefox"
    else if (!checkIt('compatible'))
    {
            browser = "Netscape Navigator"
            version = detect.charAt(8);
    }
    else browser = "An unknown browser";

    if (!version) version = detect.charAt(place + thestring.length);

    if (!OS) {
            if (checkIt('linux')) OS = "Linux";
        else if (checkIt('x11')) OS = "Unix";
        else if (checkIt('mac')) OS = "Mac"
        else if (checkIt('win')) OS = "Windows"
        else if (checkIt('os/2')) OS = "OS/2"
            else OS = "an unknown operating system";
    }


    function checkIt(string)
    {
           place = detect.indexOf(string) + 1;
           thestring = string;
           return place;
    }


//    alert("You are using "+browser+" running on "+ OS);
    return browser;
}

/******************************************************
 * To remove leading or trailing white spaces.
 * It is very usefull for comparing two diff values.
 *****************************************************/

function trim(str)
{
   return str.replace(/^\s+|\s+$/g,'');
}
function str_trim(str, chars) {
    return str_ltrim(str_rtrim(str, chars), chars);
}

function str_ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function str_rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

/******************************************************
 * To load cgi-bin into javascript function
 *****************************************************/

function loadHtml(url,req_str) {
	var req = false;
	if(window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch(e) {
			req = false;
		}
	} else if(window.ActiveXObject) {
		try {
			req = new ActiveXObject('Msxml2.XMLHTTP');
		} catch(e) {
			try {
				req = new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e) {
				req = false;
			}
		}
	}
	if(req) {
		//req.onreadystatechange = processReqChange;
		req.open('POST', url, false);
		req.send(req_str);
	}
	return req.responseText;
}
/******************************************************
 * To load cgi-bin into javascript function
 *****************************************************/

function loadXml(url,req_str) {
        var req = false;
        if(window.XMLHttpRequest) {
                try {
                        req = new XMLHttpRequest();
                } catch(e) {
                        req = false;
                }
        } else if(window.ActiveXObject) {
                try {
                        req = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                        try {
                                req = new ActiveXObject('Microsoft.XMLHTTP');
                        } catch(e) {
                                req = false;
                        }
                }
        }
        if(req) {
                //req.onreadystatechange = processReqChange;
                req.open('POST', url, false);
                req.send(req_str);
        }
        return req.responseXML;
}

function dropdownSelect(elemt, select){
        for(var i=0; i< elemt.options.length ; i++)
        {
                if(elemt.options[i].value == select)
                {
                        elemt.options[i].selected = true;
                        return i;
                }
        }
        return -1;
}

function dropdownDisplay(elemt, arr, defaultVal, defaultText){
        var j=0;
        if(defaultVal.length!=0 || defaultText.length!=0){
                elemt.options[0] = new Option(defaultText);
                elemt.options[0].value = defaultVal;
                j=1;
        }
        for(var i=j; i+1-j< arr.length ; i++)
        {
                elemt.options[i] = new Option(arr[i+1-j][1]);
                elemt.options[i].value = arr[i+1-j][0];
        }
}


function subAjax(oForm){
        var req="";
        for(var i=0; i<oForm.length; i++){
                if(oForm.elements[i].name.length != ""){
                        req +=oForm.elements[i].name+"="+oForm.elements[i].value+"&";
                }
        }
        return req;
}

