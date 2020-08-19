/*function nextPage_long(totalPages, curPg, curPgName, curPgVarName, qstring)
{
	return "test";
}*/

function nextPage_long(totalPages, curPg, curPgName, curPgVarName, qstring)
{
   	// At this stage Only Know Number of Pages
  	// so get the number of items
  	var items_per_page = 10;
  	
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
	
	// start putting HTML string in the 
  	// nextPgHTML variable
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	
	
	// if the page number is not 1 that means user is not on page 
  	// display the previous page link and a link to the
  	// first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  	{
    	nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) +qstring +"'); ", "&lt;&lt;");
		foobar = page_number - 1;
		
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + qstring +"'); ", "<b>&lt;<\/b>");
		
	} else 
  	{
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  
  	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
 	 // display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
  	if (block_number > 0) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    	{
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + qstring +"'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}

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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + qstring +"'); ", i);
	}
	
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	
	for (var i=page_number+1; i<foobar2; i++) 
  	{
    	//alert("I am in for for foobar2 loop "+i);	
    	nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + qstring +"'); ", i);
	}
	
	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
  	// display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]	
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + qstring +"'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}
 	 // if the page number is not equal to total num of pages
 	 // that means we can dispay the link to the next page
  	// and the last pge
  	// link looks like this > >>
	if (!(page_number == num_pages)) 
  	{
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + qstring +"'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + qstring +"'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
	

	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}
