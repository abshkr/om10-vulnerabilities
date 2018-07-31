<!-- //begin script
	
    function call(service, method, params, cbfunc)
	{
        /**
         * notes:
         * - parameters here could be left empty, they are just here to make the code easier to adapt
         * - $.post method here is used because amfPHP JSON plugin expects data as POST. So can't use more obvious getJSON
         * - if you always use the same parameters, you can do without json2.js, by setting for example
         * callData = '{"serviceName":"PizzaService", "methodName":"getPizza","parameters":[]}'
         */
        //alert("testing AMFPHP!!!!!!! ");

        var callData = JSON.stringify({"serviceName": service, "methodName": method, "parameters": params });
        $.post("../amfservices/gateway/amf2/index.php?contentType=application/json", callData, cbfunc);
		
    }
//  end script -->  