function changeMyParentLocation (filetoGo)
{
	var temp ="";
	temp = filetoGo +"?"+produceQString();
	parent.location.href = temp;



}

function parentConfirmation(filetoGo, msg)
{
	if(confirm(msg))
	{
	    changeMyParentLocation (filetoGo);
	}
	
}

function parentConfirmationPlusQuery(filetoGo, query, msg)
{
	if(confirm(msg))
	{
	    changeMyParentLocationPlusQuery(filetoGo, query);
	}
	

}

function justChaneMyLocation(filetoGo)
{
	var temp ="";
	temp = filetoGo;
	document.location.href = temp;



}


function changeMyLocation (filetoGo)
{
	var temp ="";
	temp = filetoGo +"?"+produceQString();
	document.location.href = temp;



}

function changeMyLocationPlusQuery (filetoGo, query)
{
	var temp ="";

	if(produceQString() == "")
		temp = filetoGo +"?" + query;
	else
		temp = filetoGo +"?"+ produceQString() + "&" + query;

	document.location.href = temp;

}

function changeMyParentLocationPlusQuery (filetoGo, query)
{
	var temp ="";

	if(produceQString() == "")
		temp = filetoGo +"?" + query;
	else
		temp = filetoGo +"?"+ produceQString() + "&" + query;

	parent.location.href = temp;

}

function myConfirmation(filetoGo, query, msg)
{
	if(confirm(msg))
	{
	    changeMyLocationPlusQuery(filetoGo, query);
	}
	else
	{
		window.location.reload(true);
	}

}

function locationPlusQuery (filetoGo, query)
{
	document.location.href = filetoGo + "?" + query;

}

function redirectURL(filetoGo)
{
	document.location.href=filetoGo+location.search
	
}

function redirectURLPlusQuery(filetoGo, query)
{
	var temp;
	if(location.search="?")
		temp=location.search+query;
	else
		temp=location.search+"&"+query;
	document.location.href=filetoGo+temp;
	
}
function gotoResultPage(filetoGo, varName, pageNum )
{
  var temp="";
  var curl="";
  if(produceQString() == "")
  {
    temp = filetoGo +"?" + varName+"="+pageNum;
  }
	else
	{ 
	   
      curl = produceQString();
      curl = AlterUrlString("?" +curl,varName,pageNum) 
	    temp = filetoGo+curl;
	
	  
  }
	document.location.href = temp;
}
