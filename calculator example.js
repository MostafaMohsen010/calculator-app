
//var button_stream =[NaN,NaN,NaN];
//var i = -1;
var operation_req = null;
var stream_so_far= [];
var result = NaN;
var calc_stack=[];
//var number = 0;
//var done =false;
var firstArg=NaN;
var secondArg=NaN;
var stop_stream_2=false;
var stream_count = 0;
var count_check=0; //counts no of clicks for comparing it with stream_count
var operation_count=0;
var on_screen = '';

var make1stclac=false;
var make2ndclac=false;
var needAnumber = false;     //calculate btn should be disbled if true

function get_stream(i){											//[working fine] but with some bugs
	count_check++;
	if(i=='$')                 //main problem in function get_stream in second arg calc
	{

		 	secondArg=merge_no(stream_so_far);
			//button_stream[2]=stream_so_far;
			//stream_so_far=[];
			//stream_count = 0;
			//count_check=0;
			//secondArg=merge_no(button_stream[2])
			make_calc();
		
	}

if (typeof(i)=="number"&&needAnumber==false){
	


	//button_stream[0] = /*number;//stream_extract(i,stream_count,number);*/document.getElementsByName("num-btn")[i].value*1;
	 stream_extract(i);
}
	if(make1stclac)
	{
		   if(operation_count==1){ firstArg=merge_no(stream_so_far);}
			//button_stream[0]=stream_so_far;
			//firstArg=merge_no(button_stream[0]);
			else{firstArg=calc_stack.slice(-1)*1;}
		
	}
if ((typeof(i)!="number"&&(i!='$'))&&needAnumber==false) {	
	operation_req = document.getElementsByName("op-btn")[op_range(i)].value;
	make1stclac=true;
	//make2ndclac=true;
	needAnumber=true;
	operation_count++;
	stream_count = 0;
	count_check=0;
	

}
if (typeof(i)=="number"&&needAnumber==true)
	{ stream_so_far=[];
		make1stclac=false;
		stream_extract(i);
	//button_stream[2] = /*number;//stream_extract(i,stream_count,number);*/document.getElementsByName("num-btn")[i].value*1;
    needAnumber = false;

}
    
}function merge_no(arr1){						//[working fine] another algorithm may be used using reduce() built-in function
  var arr2=0;
for (var i = arr1.length - 1; i >= 0; i--) {
	arr2+=arr1[arr1.length - 1-i]*Math.pow(10,i);
  //console.log("index =",arr1.length - 1-i,"power =",i);
}
  return arr2;
}

function stream_view(i){
	if(i=='cll'){on_screen=on_screen.slice(0,-1);}
	else {on_screen =on_screen+i.toString();}

}
 function stream_extract(i){								//[working fine]
	
	 // test =isNaN(i);
	
		// if(isNaN(i))/*||stream_count==5)*/{stream_so_far[stream_count]="$"; return 0;} //when this occures you 
		// stream_so_far[stream_count] = document.getElementsByName("num-btn")[i].value;//should concatinate the whole number
		// stream_count++;
		stream_so_far[stream_count]=document.getElementsByName("num-btn")[i].value*1;
		stream_count++;
}
function clear_stream(){									//[working fine] needs some check due to issue
	stream_so_far=[];
	calc_stack=[];
	operation_req=null;
	result=0;
	operation_count=0;
	on_screen = '';
}
function clear_last_elem(){									//[working fine]
	stream_so_far.pop();
	if(!needAnumber){operation_req=null;}

}

function stack(){											//[working fine] but may need duplicate removal at stack
	if('+'){
		calc_stack.push(result);
	}
	if('-'){
		calc_stack.shift();
	}

}
function op_range(i)  //should be [0,5] in form {-,*,+,/,^,%}
{
  if (typeof(i)!="number")
  {
  	switch(i){
  		case '-':return 0;
  		case '*':return 1;
  		case '+':return 2;
  		case '/':return 3;
  		case '^':return 4;
  		case '%':return 5;
  	}
  }
}

//}
function alert1()
{
	  alert("result = "+result);
}
function make_calc(){										//[working fine]
	
	switch(operation_req)
	{
		case '+':result = firstArg+secondArg;break;
  		case '-':result = firstArg-secondArg;break;
  		case '*':result = firstArg*secondArg;break;
  		case '/':result = firstArg/secondArg;break;
  		case '^':result = Math.pow(firstArg,secondArg);break;
  		case '%':result = firstArg%secondArg;break;
  		default: result = "try again";

	}
	calc_stack.push(result);
	return result;
	
	document.getElementById("result").innerHTML=result;


}