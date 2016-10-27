var http = require("http");
var jsonfile=require("jsonfile");
var fs = require("fs");
var dispatcher = require('httpdispatcher');
function requestHandleServer(req, res){
	       console.log("we have request, lets process this");
	 try {
          console.log(req.url);
    // disptach route
          dispatcher.dispatch(req, res);
         } catch (err) {
         console.log(err);
  }
  
   
	
}
dispatcher.onGet("/bookdata", function(req, res) {
		var array=req.url.split('?');
		var main=""+array[1];
		var ar= main.split('&');
		
	    var ol=""+ar;
		var arr=[];
		for (i = 0; i < ar.length; i++) { 
                  var m= ar[i].split('=');
				  
				  arr.push(m[1]);
            }
		
		var data ={"isbn":arr[0],"book_title":arr[1],"book_price":arr[2],"book_auhor":arr[3],"available_on":arr[4]};     
		var o = JSON.stringify(data);
        fs.writeFileSync("./bookData.json",o);
	    
		res.end("Hello World, Enddasdasdas");
	   
});
http.createServer(requestHandleServer).listen(8888);
console.log('server is started');