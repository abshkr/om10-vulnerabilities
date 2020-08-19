/****************************************
 * $Id: comm_HTML.js,v 1.43 2012/05/28 04:58:21 cw Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

var commText = new Array()
commText["Add"] = ml(t__ADD);
commText["Modify"] = ml(t__MODIFY);
commText["Delete"] = ml(t__DELETE);
commText["Del"] = ml(t__Delete);
commText["Print"] = ml(t__Print);
commText["Reset"] = ml(t__Reset);
commText["Confirm"] = ml(t__Confirm);
commText["lang"] = ml(t__Language);
commText["logoff"] = ml(t__Log_Off);
commText["Exit"] = ml(t__Exit);
commText["Enter"] = ml(t__Enter);
commText["Search"] = ml(t__Search);
commText["View"] = ml(t__VIEW);
commText["Yes"] = ml(t__Yes);
commText["No"] = ml(t__No);
commText["Help"] = ml(t__Help);
commText["About"] = ml(t__About);
commText["Back"] = ml(t__Back);

var commBtnText = new Array()
commBtnText["Add"] = ml(t__Add);
commBtnText["Update"] = ml(t__Update);
commBtnText["Reset"] = ml(t__Reset);
commBtnText["Print"] = ml(t__Print);
commBtnText["Search"] = ml(t__Search);
commBtnText["Yes"] = ml(t__Yes);
commBtnText["No"] = ml(t__No);
commBtnText["View"] = ml(t__View);
commBtnText["gotopg"] = ml(t__Go_To_Page);
commBtnText["Modify"] = ml(t__Update);

var isLangSwitch=false;

function table_begin(tabTyp, tabId, extrStyle){
	tabId = g.cgi_name + "_T"+tabId;

	return "<table" 
		+ " id=\"" + tabId + "\" " 
		+ extrStyle
		+ " class=\"displayinfotable\" cellspacing=\"0\">\n";
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ printHdr] 
[PURPOSE]  -> Returns a string containing the header section
              of the page uses the lang variable to include the
              files from the relevant language directory.
[Parameter]  -> newPage    -> A string to hold the Entire Page HTML
    -> pageTitle -> Title of the Current Page
    -> lang -> Current Js_lang could be en OR cn selects the relevant 
    directory to inlcude js files.
[INVOKE FROM] -> internally from the js page 
[AUTHOR]  -> Abdul SHAKOOR November 17 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/ 
function
printHdr(newPage,pageTitle, lang)
{
	var newPage = "";  // use this to avoid the duplicate of info 

/*	newPage += "<head>\n";
	newPage += "<meta http-equiv=\"content-type\" content=\"text/html; charset=GB2312\">\n";
	newPage += "<title>"+myName+" "+myVersion+" :: "+pageTitle+"</title>\n";
	newPage += "\n";

	newPage += "<link rel=\"stylesheet\" type=\"text/css\" href=\"/"+lang+"/style/site.css\" />\n";
	newPage += "<script src=\"/header_begin.js\" type=\"text/javascript\"><\/script>\n";
	newPage += "<script src=\"/comm.js\"><\/script>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/utility.js\"></SCRIPT>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/popup.js\"></SCRIPT>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/qstring.js\"></SCRIPT>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/convertor.js\"></SCRIPT>\n";
	newPage +="<SCRIPT src=\"/"+lang+"/js/validate.js\"></SCRIPT>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/redirect.js\"></SCRIPT>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
	newPage += "<SCRIPT src=\"/"+lang+"/js/comm_HTML.js\"></SCRIPT>\n";
	newPage += "<script src=\"/header_end.js\" type=\"text/javascript\"><\/script>\n"; */
	return( newPage );
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ getToolBar_HTML] 
[PURPOSE]  -> Returns a string containing the tool bar with 
              print, search and log off logo and page heading.
[Parameter]  -> newPage    -> A string to hold the Entire Page HTML
    -> heading -> Page Heading Always Pass the lower case in English
    -> isPrint -> We do not want to display the print button selectable
                  all the time 
    -> isSearch -> We do not want to display the searh button selectable
                  all the time               
[INVOKE FROM] -> internally from the calling js page 
[AUTHOR]  -> Abdul SHAKOOR November 17 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function
getToolBar_HTML(newPage, heading,isPrint, isSearch)
{
  var newPage = "";  // use this to avoid the duplicate of info 

  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";
  // first row
  newPage +="    <tr>\n";
  newPage += "	<div class=popup WIDTH: 15px id=\"prodSelect\">\n";
  newPage += "	<div class=\"closeimage\">\n";
  newPage += "	<img src=\"../../../images/closedrop.gif\" onclick=\"hideCurrentPopup(); return false;\" border=\"0\">\n"; 
  newPage += "	</div>\n";
  newPage += "	<iframe id=\"iprod\" width=\"150\" height=\"70\" name=\"iprod\" src=\"../../../../flags.html\" scrolling=no></iframe>\n";
  newPage += "	</div>\n";
  // another Div holds the Search Form
  newPage += "	<div class=popup WIDTH: 15px id=\"prodSearch\">\n";
  newPage += "	<div class=\"closeimage\">\n";
  newPage += "	<img src=\"../../../images/closedrop.gif\" onclick=\"hideCurrentPopup(); return false;\" border=\"0\">\n"; 
  newPage += "	</div>\n";
  newPage += "	<iframe id=\"iprod\" width=\"150\" height=\"55\" name=\"isearch\" src=\"../../../../find.html\" scrolling=no></iframe>\n";
  newPage += "	</div>\n";
  newPage +="\n";
  newPage +="            <td height=\"100%\" style=\"BORDER-BOTTOM: #3D5FA3 1px solid; BORDER-TOP: #3D5FA3 1px solid; 	BORDER-RIGHT: #3D5FA3 1px solid; BORDER-LEFT: #3D5FA3 1px solid;\" valign=\"top\">\n";
  newPage +="               <!-- A table to add the header lines -->\n";
  newPage +="                 <table border=\"0\" width=\"100%\" cellspacing=0 cellpadding=0>\n";
  newPage +="                   <tbody>\n";
  
  newPage +="                      <!-- second row where the tool bar is -->\n";
  if(isLangSwitch==true)
 {  
  newPage +="                      <tr>\n";
  newPage +="                       <td width=\"100%\" class=\"headerTd\">\n"; 
  newPage +="                         <table border=\"0\" width=\"100%\" cellspacing=0 cellpadding=0>\n";
  newPage +="                           <tbody> \n";
  newPage +="                             <tr>\n";                    
  newPage +="                               <td width=\"35\" style=\"BORDER-RIGHT: 1px solid #3D5FA3;\">\n";
  if(isPrint==true)
  {
    newPage +="                                 <div id=\"elButtonT\">\n";
    newPage +="                                   <div>\n";
    newPage +="                                     <a href=\"#\" onClick=\"void(printSpecial())\">\n";
    newPage +="                                       <IMG src=\"../../../images/print.gif\" width=\"16\" height=\"16\" alt=\"\" border=\"0\" style=\"vertical-align: middle\">\n";
    newPage +=                          commText["Print"]+" </a>\n";
    newPage +="                          </div>\n";
    newPage +="                        </div>   \n";
  }
  else
  {
    newPage +="                                 <div id=\"elButtonT\">\n";
    newPage +="                                   <div>\n";
    newPage +="                                     <a href=\"javascript:void(0)\" disabled=true onmouseover=\"this.style.cursor='text'\">\n";
    newPage +="                                       <IMG src=\"../../../images/printer_off.gif\" width=\"16\" height=\"16\" alt=\"\" border=\"0\" style=\"vertical-align: middle\">\n";
    newPage +=                          commText["Print"]+" </a>\n";
    newPage +="                          </div>\n";
    newPage +="                        </div>   \n";
  }  
  newPage +="                      </td>\n";
  newPage +="                      <td width=\"35\" style=\"BORDER-RIGHT: 1px solid #3D5FA3;\">\n";
  if(isSearch==true)
  {
    newPage +="                        <div id=\"elButtonT\">\n";
    newPage +="                          <div>\n";
    newPage +="                          <a href=\"#\" onclick=\"return !showPopup_withXandY('prodSearch', event, -14, 14);\">\n";
    newPage +="                          <IMG src=\"../../../images/search.gif\" width=\"16\" height=\"16\" alt=\"\" border=\"0\" style=\"vertical-align: middle\">\n";
    newPage +=                          commText["Search"]+" </a>\n";
    newPage +="                          </div>\n";
    newPage +="                        </div>              \n";
  }
  else
  {
    newPage +="                        <div id=\"elButtonT\">\n";
    newPage +="                          <div>\n";
    newPage +="                          <a href=\"javascript:void(0)\" disabled=true onmouseover=\"this.style.cursor='text'\">\n";
    newPage +="                          <IMG src=\"../../../images/search_off.gif\" width=\"16\" height=\"16\" alt=\"\" border=\"0\" style=\"vertical-align: middle\">\n";
    newPage +=                          commText["Search"]+" </a>\n";
    newPage +="                          </div>\n";
    newPage +="                        </div>              \n";
  }
  newPage +="                      </td>\n";
 
      newPage +="                      <td width=\"35\" style=\"BORDER-RIGHT: 1px solid #3D5FA3;\">\n";
      newPage +="                        <div id=\"elButtonT\">\n";
      newPage +="                          <div>\n";
      newPage +="                          <a href=\"#\" onclick=\"return !showPopup('prodSelect', event);\">\n";
      newPage +="                          <IMG src=\"../../../images/global.gif\" width=\"18\" height=\"18\" alt=\"Select Language\" border=\"0\" style=\"vertical-align: middle\">\n";
      newPage +="                          <IMG src=\"../../../images/arrow.gif\" width=\"7\" height=\"5\" alt=\"Select Language\" border=\"0\" style=\"vertical-align: middle\">\n";
      newPage +=                          commText["lang"]+" </a>\n";
      newPage +="                          </div>\n";
      newPage +="                        </div>              \n";
      newPage +="                      </td>\n";
      
 
  newPage +="                      <td width=\"35\" style=\"BORDER-RIGHT: 1px solid #3D5FA3;\" align=\"left\">\n";
  newPage +="                        <div id=\"elButtonT\">\n";
  newPage +="                          <div>\n";
newPage +=" <a href=\"#\" onClick=\"window.open('/"+js_lang+"/cpyRight.html','mywindow','width=550,height=400,toolbar=no, location=no,directories=no,status=yes,menubar=no,scrollbars=yes,copyhistory=no, resizable=yes')\">\n";

  newPage +="                          <IMG src=\"../../../images/help1.gif\" width=\"16\" height=\"16\" alt=\"\" border=\"0\" style=\"vertical-align: middle\">\n";
  newPage +=                          commText["About"]+" </a>\n";
  newPage +="                          </div>\n";
  newPage +="                        </div>              \n";
  newPage +="                      </td>               \n";
  newPage 
  newPage +="                      <td>\n";
  newPage +="                        &nbsp;\n";
  newPage +="                      </td>                \n";
 
  newPage +="                      <td width=\"35\" style=\"BORDER-LEFT: 1px solid #3D5FA3;\" align=\"left\">\n";
  newPage +="                        <div id=\"elButtonT\">\n";
  newPage +="                          <div>\n";
  newPage +="                          <a href=\"/cgi-bin/en/logout.cgi\" target=\"_parent\">\n";
  newPage +="                          <IMG src=\"../../../images/logoff.gif\" width=\"16\" height=\"16\" alt=\"\" border=\"0\" style=\"vertical-align: middle\">\n";
  newPage +=                          commText["logoff"]+" </a>\n";
  newPage +="                          </div>\n";
  newPage +="                        </div>              \n";
  newPage +="                      </td>               \n";
 
  newPage +="                    </tr>\n";
  newPage +="                  </tbody>\n";
  newPage +="                </table>\n";
  newPage +="              </td>              \n";
  newPage +="            </tr>\n";
  }
  newPage +="            <!-- End of the second row where the tool bar is -->\n";
  
  newPage +="            <tr>\n";
  newPage +="              <td> &nbsp;</td>              \n";
  newPage +="            </tr>\n";
  return( newPage );

}  
/**
    Created by: Michael Synovic
    on: 01/12/2003
    
    This is a Javascript implementation of the Java Hashtable object.
    
    Contructor(s):
     Hashtable()
              Creates a new, empty hashtable
    
    Method(s):
     void clear() 
              Clears this hashtable so that it contains no keys. 
     boolean containsKey(String key) 
              Tests if the specified object is a key in this hashtable. 
     boolean containsValue(Object value) 
              Returns true if this Hashtable maps one or more keys to this value. 
     Object get(String key) 
              Returns the value to which the specified key is mapped in this hashtable. 
     boolean isEmpty() 
              Tests if this hashtable maps no keys to values. 
     Array keys() 
              Returns an array of the keys in this hashtable. 
     void put(String key, Object value) 
              Maps the specified key to the specified value in this hashtable. A NullPointerException is thrown is the key or value is null.
     Object remove(String key) 
              Removes the key (and its corresponding value) from this hashtable. Returns the value of the key that was removed
     int size() 
              Returns the number of keys in this hashtable. 
     String toString() 
              Returns a string representation of this Hashtable object in the form of a set of entries, enclosed in braces and separated by the ASCII characters ", " (comma and space). 
     Array values() 
              Returns a array view of the values contained in this Hashtable. 
            
*/
function Hashtable(){
    this.clear = hashtable_clear;
    this.containsKey = hashtable_containsKey;
    this.containsValue = hashtable_containsValue;
    this.get = hashtable_get;
    this.isEmpty = hashtable_isEmpty;
    this.keys = hashtable_keys;
    this.put = hashtable_put;
    this.remove = hashtable_remove;
    this.size = hashtable_size;
    this.toString = hashtable_toString;
    this.values = hashtable_values;
    this.hashtable = new Array();
}

/*=======Private methods for internal use only========*/

function hashtable_clear(){
    this.hashtable = new Array();
}

function hashtable_containsKey(key){
    var exists = false;
    for (var i in this.hashtable) {
        if (i == key && this.hashtable[i] != null) {
            exists = true;
            break;
        }
    }
    return exists;
}

function hashtable_containsValue(value){
    var contains = false;
    if (value != null) {
        for (var i in this.hashtable) {
            if (this.hashtable[i] == value) {
                contains = true;
                break;
            }
        }
    }
    return contains;
}

function hashtable_get(key){
    return this.hashtable[key];
}

function hashtable_isEmpty(){
    return (parseInt(this.size()) == 0) ? true : false;
}

function hashtable_keys(){
    var keys = new Array();
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null) 
            keys.push(i);
    }
    return keys;
}

function hashtable_put(key, value){
    if (key == null || value == null) {
        throw "NullPointerException {" + key + "},{" + value + "}";
    }else{
        this.hashtable[key] = value;
    }
}

function hashtable_remove(key){
    var rtn = this.hashtable[key];
    this.hashtable[key] = null;
    return rtn;
}

function hashtable_size(){
    var size = 0;
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null) 
            size ++;
    }
    return size;
}

function hashtable_toString(){
    var result = "";
    for (var i in this.hashtable)
    {      
        if (this.hashtable[i] != null) 
            result += "{" + i + "},{" + this.hashtable[i] + "}\n";   
    }
    return result;
}

function hashtable_values(){
    var values = new Array();
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null) 
            values.push(this.hashtable[i]);
    }
    return values;
}

/* A fieldset a box gives heading to
 * the form fiels
 *
 */
function fieldst_HTML(attr)
{
  var fieldst_HTML = "";
  fieldst_HTML += " <tr>\n";
  fieldst_HTML += "   <td align=\"left\">\n";
  //Commented out by Abdul not required by new interface
  //fieldst_HTML +="     <fieldset>\n";
  //fieldst_HTML +="       <legend class=\"infotext\"><strong>"+attr+"</strong></legend>\n";
  fieldst_HTML += " <ul id=\"tabmenu\">\n";
  fieldst_HTML += "<li>" + (attr.toLowerCase())+ "</li>\n";
  fieldst_HTML += "</ul>\n";
  return fieldst_HTML;
}				/* end fieldst_HTML */

function fieldstFoot_HTML()
{
  var fieldst_HTML ="";
    //fieldst_HTML +="     </fieldset>\n";
    fieldst_HTML +="   </td>\n";
    fieldst_HTML +=" </tr>\n";
    return      fieldst_HTML;



}/* end fieldstFoot_HTML */
/* this is the First Message row before
 * displaying any form
 */
function infotextRow_HTML(att, infotext)
{
  var info_HTML ="";
  info_HTML +="								<tr>\n";
  info_HTML +="									<td class=\"infotext\""+att+">\n";
  info_HTML +="										"+infotext+"\n";
  info_HTML +="									</td>\n";
  info_HTML +="								</tr>\n";
  return info_HTML;
		
}/* end infotextRow_HTML */
/* this is the function to
 * display the form submit
 * form
 */
function frmButtRow_HTML(value, isReset)
{
  var buttnHTML ="";
  buttnHTML +="								<tr>\n";
  buttnHTML +="									<td align=\"center\" class=\"infotext\" width=\"100%\">\n";
  buttnHTML +="													<input type=\"submit\" value=\""+value+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  if(isReset==1)
  {
    buttnHTML +="									           &nbsp;\n";
    buttnHTML +="													<input type=\"reset\" value=\"" + ml( t__Reset) + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  }
  
  buttnHTML +="									</td>\n";
  buttnHTML +="								</tr>\n";

  return buttnHTML;
		
}/* end frmButtRow_HTML */
/* this is the Cell to 
 * display a heading/label
 * bluer color labels
 */
function textTd_HTML(att, text)
{
  var tdHTML ="";
  tdHTML +="									<td "+att+">\n";
  tdHTML +="										"+text+"\n";
  tdHTML +="									</td>\n";
  return tdHTML;
  
		
}/* end infotextRow_HTML */

function displayDropList(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;
	for (i=1; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][1]+"</option>\n";
	}

	if(defMsg.length!=0){
		massList += "<option value=\"\"";
		if(matchFound==0)//no matchfound
		{
			massList += "selected";
		}
		massList +=">"+defMsg+"</option>\n";
	}

	massList +="</select>\n";
	return massList;

}
/* function displayDrop_ShowDefSelected responsible for displaying drop down list
 * this is different from displayDropList
 * as this function checks if the jslist is only has 2 values then displays the 
 * default value which is actually the only value in the drop list 
 * display a heading/label
 * bluer color labels
 */
function displayDrop_ShowDefSelected(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;
	for (i=1; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"\"";
		if((list[i][0]==selectedvalue) || (list.length==2))
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][1]+"</option>\n";
	}
	if((defMsg.length!=0) && (list.length>2) ){
		massList += "<option value=\"\"";
		if(matchFound==0)//no matchfound
		{
			massList += "selected";
		}
		massList +=">"+defMsg+"</option>\n";
	}

	massList +="</select>\n";
	return massList;

}


function specialDropList(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i][0]+"\"";
     if(list[i][0]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i][0]+"</option>\n";
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}


function specialDropListColumn(selectedvalue, list, column, defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i][column]+"\"";
     if(list[i][column]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i][column]+"</option>\n";
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}



function twoColumnDropList(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i][2]+"\"";
     if(list[i][2]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i][0]+" - "+ list[i][1]+"</option>\n";
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}

/* Display drop list with value = -99 if wanted nothing to display, 
   to avoid conflict with value = -1 which equal to display all */

function displayDropList99(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;
	for (i=1; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][1]+"</option>\n";
	}

	massList += "<option value=\"-99\"";
	if(matchFound==0)//no matchfound
	{

		massList += "selected";

	}
	massList +=">"+defMsg+"</option>\n";

	massList +="</select>\n";
	return massList;

}



/** 
* btnLocation_HTML prints an HTLM URL and 
* looks like a button
* return void
*/
function btnLocation_HTML(jscript, att)
{
//  var buttnHTML ="";
 // buttnHTML +="			<div class=\"button\"> <a href=\"javascript:"+jscript+"\">"+att+"</a></div> <br>\n";
 // return buttnHTML;

  var buttnHTML ="";
  buttnHTML +="			<a href=\"javascript:"+jscript+"\">"+att+"</a>\n";
  return buttnHTML;


}/* btnLocation_HTML */
/** 
* btnLocation_HTML prints an HTLM URL and 
* looks like a button
* return void
*/
function btnLocation_HTML_nexPreLk(jscript, att)
{
  var buttnHTML ="";
  buttnHTML +="			<a href=\"javascript:"+jscript+"\" class=\"nextLink\">"+att+"</a>\n";
  return buttnHTML;


}/* btnLocation_HTML */
function addPrintBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("void(printSpecial()) ", "Print");
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function statusbarRowHTML (msgtoPrint)
{
  var statusBar_HTML="";
  
  statusBar_HTML +=" <tr>\n";
	statusBar_HTML +="   <td align=\"center\" class=\"infotext\" width=\"100%\">\n";
	statusBar_HTML +="      <span id=\"feedback\" style=\"COLOR: #FF0000;\">"+msgtoPrint+"</span>\n";
	statusBar_HTML +="   </td>\n";
	statusBar_HTML +=" </tr>\n";
	return statusBar_HTML;
  
}/*End statusbarRowHTML */

function displayStatusMsg (msgkey)
{                                     
  var temp_str="";
  if(isArray_keysExist(l_opInf, msgkey))
  {  
    return statusbarRowHTML (l_opInf[msgkey]);
  }
  else
  {  
    return temp_str;
  }
}


function dateURL_HTML(frmField, anchor,dateFormat,msg)
{
	var date = "";


	date += "<a href=\"#\" onClick=\"cal.select("+frmField+",'"+anchor+"','"+dateFormat+"'); return false;\" return false;\" NAME=\""+anchor+"\" ID=\""+anchor+"\">\n";
	date += "<image src=\"/images/cal.gif\" width=\"16\" height=\"16\" border=\"0\"></a>\n";

	date += "<a href=\"#\" onClick=\""+frmField+".value=''; return false;\">\n";
	date += "<image src=\"/images/cancel.png\" width=\"16\" height=\"16\" border=\"0\" NAME=\"cancel_"+anchor+"\" ID=\"cancel_"+anchor+"\"></a>\n";

	return date;


}/* end dateURL_HTML */


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

function makespace(ch, num)
{
	var i;
	var space = "";

	for (i=0; i<num; i++)
	{
		space += ch;
	}

	return space;
}



function dropdownFrZero(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;
	for (i=0; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][1]+"</option>\n";
	}

	if(defMsg.length!=0){
		massList += "<option value=\"\"";
		if(matchFound==0)//no matchfound
		{
			massList += "selected";
		}
		massList +=">"+defMsg+"</option>\n";
	}

	massList +="</select>\n";
	return massList;

}



function displayDropListByMultiConditions( valueSelected, list, messageDefault, indent )
{

	var massList = "";
	var matchFound = 0;
	for ( i=1; i<list.length; i++ )
	{
		massList += makespace("\t", indent) + "<option value=\"" + list[i][0] + "\"";
		if( list[i][0] == valueSelected )
		{
			matchFound = 1;
			massList += "selected";
		}
		massList += ">" + list[i][1] + "</option>\n";
	}

	massList += makespace("\t", indent) + "<option value=\"-1\"";
	massList += ">" + ml(t__Any_ALL) + "</option>\n";

	massList += makespace("\t", indent) + "<option value=\"\"";
	if ( matchFound == 0)
	{
		massList += "selected";
	}
	massList += ">" + messageDefault + "</option>\n";
	
	massList += makespace("\t", indent-1) + "</select>\n";

	return massList;
}



function displayDropListByConditions( valueSelected, list, messageDefault, listOption, indent )
{
	var isAllReq = 'N';
	var isEmptryReq = 'N';
	var isDefReq = 'N';

	switch ( listOption ) 
	{
	case 'A': 
		isAllReq = 'Y'; 
		break;
	case 'E': 
		isEmptryReq = 'Y'; 
		break;
	case 'D': 
		isDefReq = 'Y'; 
		break;
	default: 
		isDefReq = 'Y'; 
		break;
	}
	
	var massList = "";
	var matchFound = 0;
	for ( i=1; i<list.length; i++ )
	{
		massList += makespace("\t", indent) + "<option value=\"" + list[i][0] + "\"";
		if( list[i][0] == valueSelected )
		{
			matchFound = 1;
			massList += "selected";
		}
		massList += ">" + list[i][1] + "</option>\n";
	}

	if ( isAllReq == 'Y' || isEmptryReq == 'Y')
	{
		massList += makespace("\t", indent) + "<option value=\"-1\"";
	}
	if ( isDefReq == 'Y')
	{
		massList += makespace("\t", indent) + "<option value=\"\"";
	}

	if ( matchFound == 0)
	{
		massList += "selected";
	}

	if ( isAllReq == 'Y')
	{
		massList += ">" + ml(t__Any_ALL) + "</option>\n";
	}
	if ( isEmptryReq == 'Y') 
	{
		massList += "></option>\n";
	}
	if ( isDefReq == 'Y')
	{
		massList += ">" + messageDefault + "</option>\n";
	}

	massList += makespace("\t", indent-1) + "</select>\n";

	return massList;
}

function makefield(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width, disabled)
{
	var fieldHTML ="";
	var real_wd = width;

    if (title.length > 60)
        real_wd = (title.length) * 6;
    else
        real_wd = (title.length) * 8;
	
	if (real_wd > width)
	{
		width = real_wd;
	}


	fieldHTML += makespace("\t", indent) + "<td class=\"infotextheading\" width=\"" + width + "\" valign=\"top\">\n";
	if (title == "&nbsp;")
	{
		fieldHTML += makespace("\t", indent+1) + title + "\n";
	}
	else
	{
		fieldHTML += makespace("\t", indent+1) + title + ":\n";
	}
	fieldHTML += makespace("\t", indent) + "</td>\n";

	fieldHTML += makespace("\t", indent) + "<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	fieldHTML += makespace("\t", indent+1) + "<span class=\"mandatory\">" + mandatory + "</span>\n";
	fieldHTML += makespace("\t", indent) + "</td>\n";

	if (type == 0)
	{ // normal text
		fieldHTML += makespace("\t", indent) + "<td class=\"infotext\" valign=\"top\">\n";
		fieldHTML += makespace("\t", indent+1) + value + "\n";
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 1)
	{ // text field
		fieldHTML += makespace("\t", indent) + "<td>\n";
		if (disabled == 1)
			fieldHTML += makespace("\t", indent+1) + "<input type=\"text\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" size=\"" + size + "\" maxLength=\"" + maxlen + "\" " + validator + " msg=\"" + msg + "\" disabled>\n";
		else
			fieldHTML += makespace("\t", indent+1) + "<input type=\"text\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" size=\"" + size + "\" maxLength=\"" + maxlen + "\" " + validator + " msg=\"" + msg + "\">\n";
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 2)
	{ // drop list
		fieldHTML += makespace("\t", indent) + "<td>\n";
        if (disabled == 1)
            fieldHTML += makespace("\t", indent+1) + "<select id=\"" + id + "\" name=\"" + name + "\" class=\"smallselect\" " + validator + " msg=\"" + msg + "\" disabled/> \n";
        else
            fieldHTML += makespace("\t", indent+1) + "<select id=\"" + id + "\" name=\"" + name + "\" class=\"smallselect\" " + validator + " msg=\"" + msg + "\"/> \n";
		fieldHTML += displayDropListByConditions( value, list, msg, 'D', (indent+2) );
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 3)
	{ // hidden field
		fieldHTML += makespace("\t", indent) + "<td class=\"infotext\">\n";
		fieldHTML += makespace("\t", indent+1) + "<input type=\"hidden\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" />" + value + "\n";
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 4)
	{ // date field
		fieldHTML += makespace("\t", indent) + "<td>\n";

		fieldHTML += makespace("\t", indent+1) + "<input type=\"text\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" size=\"" + size + "\" maxLength=\"" + maxlen + "\" " + validator + " msg=\"" + msg + "\" readonly >\n";
		fieldHTML += makespace("\t", indent+1) + list + "\n";
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 201)
	{ // drop list
		fieldHTML += makespace("\t", indent) + "<td>\n";
		fieldHTML += makespace("\t", indent+1) + "<select id=\"" + id + "\" name=\"" + name + "\" class=\"smallselect\" " + validator + " msg=\"" + msg + "\"/> \n";
		fieldHTML += displayDropListByConditions( value, list, msg, 'A', (indent+2) );
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 202)
	{ // drop list
		fieldHTML += makespace("\t", indent) + "<td>\n";
		fieldHTML += makespace("\t", indent+1) + "<select id=\"" + id + "\" name=\"" + name + "\" class=\"smallselect\" " + validator + " msg=\"" + msg + "\"/> \n";
		fieldHTML += displayDropListByConditions( value, list, msg, 'E', (indent+2) );
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	if (type == 203)
	{ // drop list
		fieldHTML += makespace("\t", indent) + "<td>\n";
		fieldHTML += makespace("\t", indent+1) + "<select id=\"" + id + "\" name=\"" + name + "\" class=\"smallselect\" " + validator + " msg=\"" + msg + "\"/> \n";
		fieldHTML += displayDropListByConditions( value, list, msg, 'D', (indent+2) );
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}
	else
	{ // normal text
		fieldHTML += makespace("\t", indent) + "<td class=\"infotext\">\n";
		fieldHTML += makespace("\t", indent+1) + value + ":\n";
		fieldHTML += makespace("\t", indent) + "</td>\n";
	}

	return fieldHTML;
}

// This function serves for making combo box with Ajax techniques
function makeAjaxComboField(title, value, name, id, request, size, maxlen, validator, msg, mandatory, indent, width ) 
{
	var fieldHTML ="";
	var real_wd = width;

	real_wd = (title.length) * 8;
	if (real_wd > width)
	{
		width = real_wd;
	}

	fieldHTML += makespace("\t", indent) + "<td class=\"infotextheading\" width=\"" + width + "\" valign=\"top\">\n";
	if (title == "&nbsp;")
	{
		fieldHTML += makespace("\t", indent+1) + title + "\n";
	}
	else
	{
		fieldHTML += makespace("\t", indent+1) + title + ":\n";
	}
	fieldHTML += makespace("\t", indent) + "</td>\n";

	fieldHTML += makespace("\t", indent) + "<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	fieldHTML += makespace("\t", indent+1) + "<span class=\"mandatory\">" + mandatory + "</span>\n";
	fieldHTML += makespace("\t", indent) + "</td>\n";


	fieldHTML += makespace("\t", indent) + "<td>\n";
	fieldHTML += makespace("\t", indent+1) + "<table class=\"NewActionBaseTable\">\n";
	fieldHTML += makespace("\t", indent+1) + "<tbody>\n";
	fieldHTML += makespace("\t", indent+1) + "<tr>\n";
	fieldHTML += makespace("\t", indent+1) + "<td class=\"popupLinkrow\">\n";
	fieldHTML += makespace("\t", indent+2) + "<input type=\"text\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" style=\"FONT-SIZE:1.00em\" msg=\"" + msg + "\" size=\"" + size + "\" maxLength=\"" + maxlen + "\" " + validator + " / >\n"; 
	fieldHTML += makespace("\t", indent+1) + "</td>\n";
	fieldHTML += makespace("\t", indent+1) + "<td width=\"15\">\n";
	fieldHTML += makespace("\t", indent+2) + "<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"" + request + "\">\n";
	fieldHTML += makespace("\t", indent+1) + "</td>\n";
	fieldHTML += makespace("\t", indent+1) + "</tr>\n";
	fieldHTML += makespace("\t", indent+1) + "</tbody>\n";
	fieldHTML += makespace("\t", indent+1) + "</table>\n";
	fieldHTML += makespace("\t", indent) + "</td>\n";

	return fieldHTML;
}




function checkBox(name, value)
{
        var checkBox = "";

        if(value == 'Yes' || value == 'YES' || value == 'yes' || value == 'Y' || value == 'on')
        {
                checkBox += "<input type=\"checkbox\" name=\""+name+"\" checked>\n";
        }else{
                checkBox += "<input type=\"checkbox\" name=\""+name+"\">\n";
        }

        return checkBox;

}

function obs(data)
{
        return data;
}

function lock_mark(value){
        if (value == 'Y'){
                return "<img src=\"/images/padlock_lock.gif\"  alt=\"Yes\" title=\"Yes\" >\n";
        }
        else {
                return "<img src=\"/images/padlock_unlock.gif\" alt=\"No\" title=\"No\" >\n";
        }
}

function check_mark(value){
        if (value == 'Y'){
                return "<img src=\"/images/check_mark_blue.gif\"  alt=\"Yes\" title=\"Yes\" >\n";
        }
        else {
                return "<img src=\"/images/cross_mark_red.jpg\" alt=\"No\" title=\"No\" >\n";
        }
}


function displayDropList_sp(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;

  for (i=1; i<list.length; i++)
  {
     massList += "<option value=\""+list[i][0]+"\"";
     if(list[i][0]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
     massList +=">"+list[i][0]+"&nbsp;--&nbsp;"+list[i][1]+"</option>\n";
  }

	if(defMsg.length!=0){
		massList += "<option value=\"\"";
		if(matchFound==0)//no matchfound
		{
			massList += "selected";
		}
		massList +=">"+defMsg+"</option>\n";
	}
	massList +="</select>\n";
  return massList;
}


function displayDropList_rpt(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i]+"\"";
     if(list[i]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i]+"</option>\n";
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}

function displayDropList_any_All(selectedvalue, list,defMsg, an_al_typ)
{
  isAllReq = 'N';
	isEmptryReq = 'N';
	isDefReq = 'N';
	switch (an_al_typ) {
	case 'A': isAllReq = 'Y'; break;
	case 'E': isEmptryReq = 'Y'; break;
	case 'D': isDefReq = 'Y'; break;
	default: return 0;
	}
	
	var massList = "";
	var matchFound=0;
	for (i=1; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][1]+"</option>\n";
	}

  if ( isAllReq == 'Y' || isEmptryReq == 'Y') 
		massList += "<option value=\"-1\"";
	if ( isDefReq == 'Y') 
		massList += "<option value=\"\"";

	if ( matchFound==0) massList += "selected";

	if ( isAllReq == 'Y') 
		massList +=">"+ml(t__Any_ALL)+"</option>\n";
	if ( isEmptryReq == 'Y') 
		massList +="></option>\n";
	if ( isDefReq == 'Y') 
		massList +=">"+defMsg+"</option>\n";



	massList +="</select>\n";
	return massList;

}
