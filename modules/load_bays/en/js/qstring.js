var queryStrings = (function(){
    var list = {};
    var keyList = [];
    var global = this;
    var unsc = (global.decodeURIComponent)?'decodeURIComponent':
                                           'unescape';
    var nameSafe = [' ',''];
    function addItem(name, value){
        nameSafe[1] = name;
        var sName = nameSafe.join('');
        if(list[sName]){
            list[sName][list[sName].length] = value;
        }else{
            list[sName] = [value];
            keyList[keyList.length] = name;
        }
    }
    if(typeof location != 'undefined'){
        var nvp,ofSet, temp = location.search||location.href||'';
        if((ofSet = temp.indexOf('?')) > -1){
            temp = temp.split("#")[0];
            temp = temp.substring((ofSet+1), temp.length);
            var workAr = temp.split('&');
            for(var c = workAr.length;c--;){
                nvp = workAr[c].split('=');
/*
                if(nvp.length > 1){
                    addItem(global[unsc](nvp[0]),global[unsc](nvp[1]));
                }else if(nvp.length == 1){
                    addItem(global[unsc](nvp[0]), true);
                }
*/
                if(nvp.length > 1){
                    addItem( (nvp[0]), (nvp[1]) );
                }else if(nvp.length == 1){
                    addItem( (nvp[0]), true);
                }
 
           }
        }
    }
    return ({
        getCountFor:function(name){
            nameSafe[1] = name;
            var sName = nameSafe.join('');
            return ((list[sName] && list[sName].length)|0);
        },
        getValueFor:function(name, index){
            nameSafe[1] = name;
            var sName = nameSafe.join('');
            if(list[sName]){
                return list[sName][(index|0)];
            } //else return undefined (by default)
        },
        getNames:function(){
            return keyList;
        }
    });

})(); 
function produceQString ()
{
	var tempString ="";
	var NamesList = [];
	NamesList = queryStrings.getNames();
	for(var i =0; i<NamesList.length; i++)
	{
		if(i>0)
		{
			tempString +="&"+NamesList[i]+"="+queryStrings.getValueFor(NamesList[i]);
		}
		else if(i==0)
		{
			tempString += NamesList[i]+"="+queryStrings.getValueFor(NamesList[i]);
		}
		
		
	}
	return tempString;
}
