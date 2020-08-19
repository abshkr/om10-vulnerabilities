function setOptions(anArray, chosen, comp, supplier) {
var cmpyType = anArray;
var secondbox = document.glblFrm.cmpy;
var thirdbox = document.glblFrm.supp;

secondbox.options.length = 0;
thirdbox.options.length = 0;


if (chosen == "" || chosen == "-1") {
  secondbox.options[secondbox.options.length] = new Option('Select a type',' ');
  thirdbox.options[thirdbox.options.length] = new Option('Select a type',' ');

}
else
{

  thirdbox.options[thirdbox.options.length] = new Option('Select a supplier','');
}

if (chosen == 1)
{
//     thirdbox.options[thirdbox.options.length] = new Option('Base Allocation','BaSePrOd');
}


for (var i = 0; i < cmpyType.length; i++)
{
     var item = cmpyType[i];
     
     if (chosen == item[0])
     {
     	secondbox.options[secondbox.options.length] = new Option(item[2],item[1]);     
     	if(comp == item[1])
     	{
     	  	//secondbox.options[secondbox.options.length].selected = "selected";
     	}
     }
     
     if (chosen != "1" && chosen != "-1" && item[0] == "1")
     {
     	thirdbox.options[thirdbox.options.length] = new Option(item[2],item[1]);     
     }
}


}


function setInputOptions(anArray, chosen, comp, supplier) {
var cmpyType = anArray;
var secondbox = document.frm_userinput.cmpy;
var thirdbox = document.frm_userinput.supp;

secondbox.options.length = 0;
thirdbox.options.length = 0;


if (chosen == "" || chosen == "-1") {
  secondbox.options[secondbox.options.length] = new Option('Select a type',' ');
  thirdbox.options[thirdbox.options.length] = new Option('Select a type',' ');

}
else
{

  thirdbox.options[thirdbox.options.length] = new Option('Select a supplier','');
}

if (chosen == 1)
{
//     thirdbox.options[thirdbox.options.length] = new Option('Base Allocation','BaSePrOd');
}


for (var i = 0; i < cmpyType.length; i++)
{
     var item = cmpyType[i];
     
     if (chosen == item[0])
     {
     	secondbox.options[secondbox.options.length] = new Option(item[2],item[1]);     
     	if(comp == item[1])
     	{
     	  	//secondbox.options[secondbox.options.length].selected = "selected";
     	}
     }
     
     if (chosen != "1" && chosen != "-1" && item[0] == "1")
     {
     	thirdbox.options[thirdbox.options.length] = new Option(item[2],item[1]);     
     }
}


}