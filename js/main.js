function onReady(){
	console.log('Hello Chapter 3');

	var clock = new com.tnt.Clock('clock');
	var clock2 = new com.tnt.TextClock('clock2',-300,'ETC');
	var clock2 = new com.tnt.Clock('clock3',300,'X');
        
        //LiveDate.call(clock, 1,2,3);
        LiveDate.apply(clock,[1,2,3]);
}

function LiveDate(a,b,c){
        console.log(this, a,b,c);
}

Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval=function (date){
	//console.log(this.__interval);
	this.__aDates.push(date);

	if(!Date.__interval)
		Date.__interval = setInterval(function(){
                        Date.updateDates();
                        },1000);
};
Date.updateDates= function(){
	//console.log(this.__aDates.length);
	for(var i=0; i<this.__aDates.length;i++)
		this.__aDates[i].updateSeconds();
};


Date.prototype.updateSeconds = function(){
	this.setSeconds(this.getSeconds()+1);
	//console.log(Date.__interval);
}

Date.prototype.autoClock = function(isAuto){
	//clearInterval(this.clockInterval);

	if(isAuto){
		/*var that= this;
		this.clockInterval = setInterval(function(){that.updateSeconds()},1000);*/
		Date.addToInterval(this);
	}
};

var com = com || {};
        com.tnt = com.tnt || {};
        

com.tnt.Clock = function (id,offset,label){
		offset = offset || 0;
		label = label || '';
		var d = new Date();
		var offset = (offset+ d.getTimezoneOffset())*60*1000;
		this.d = new Date(offset+d.getTime());
		this.d.autoClock(true);
		this.id = id;
		this.label= label;
		 

	var that = this;
	setInterval(function(){
		that.updateClock();},1000);
	this.updateClock();
};
com.tnt.Clock.prototype.version = '1.00';
com.tnt.Clock.prototype.updateClock = function(){
			//console.log(this.version);
			var date = this.d;
				//date.updateSeconds();
			var clock = document.getElementById(this.id);
			clock.innerHTML = this.formatDigits(date.getHours()) + ":" + this.formatDigits(date.getMinutes()) +":"+ this.formatDigits(date.getSeconds()) +" "+ this.label ;
		};

com.tnt.Clock.prototype.formatDigits= function(val){
	if(val<10) val = "0" + val;

	return val;
};

com.tnt.TextClock = function(id,offset,label){
        com.tnt.Clock.apply(this, arguments);
};
com.tnt.TextClock.prototype = Object.create(com.tnt.Clock.prototype);
com.tnt.TextClock.prototype.constructor = com.tnt.TextClock;

window.onload = onReady;