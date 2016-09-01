function onReady(){
	console.log('Page Loaded');

	var clock = new com.tnt.Clock('clock');
	var clock2 = new com.tnt.TextClock('clock2',-300,'ETC');
	var clock2 = new com.tnt.AlarmClock('clock3',300,'X',20,7);

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
}


Date.prototype.updateSeconds = function(){
	this.setSeconds(this.getSeconds()+1);
	//console.log(Date.__interval);
};

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
			clock.innerHTML = this.formatOutput(date.getHours(),date.getMinutes(),date.getSeconds(),this.label) ;
		};

com.tnt.Clock.prototype.formatOutput = function(h,m,s,label){

	return this.formatDigits(h) + ":" + this.formatDigits(m) +":"+ this.formatDigits(s) +" "+ label;
};


com.tnt.Clock.prototype.formatDigits= function(val){
	if(val<10) val = "0" + val;

	return val;
};

com.tnt.TextClock = function(id,offset,label){
	com.tnt.Clock.apply(this,arguments);
	console.log(this.version);
};
com.tnt.TextClock.prototype = createObject(com.tnt.Clock.prototype,com.tnt.TextClock);
//com.tnt.TextClock.prototype.constructor = com.tnt.TextClock;
//com.tnt.TextClock.prototype.version = '1.01';
com.tnt.TextClock.prototype.formatOutput = function(h,m,s,label){

	return this.formatDigits(h) + " Hour " + this.formatDigits(m) +" Minutes "+ this.formatDigits(s) +" Seconds "+ label;
};

com.tnt.AlarmClock = function(id,offset,label,almH,almM){
	com.tnt.TextClock.apply(this,arguments);
	this.almH = almH;
	this.almM = almM;
	console.log(this.version);
};
com.tnt.AlarmClock.prototype = createObject(com.tnt.TextClock.prototype,com.tnt.AlarmClock);

com.tnt.AlarmClock.prototype.formatOutput= function(h,m,s,label){
	var output;
	if(h==this.almH && m==this.almM){
		output= 'ALARM WAKE UP';
		var snd = new Audio('../art/beep.mp3');
			snd.play();
	}else
		output= this.formatDigits(h) + " Hour " + this.formatDigits(m) +" Minutes "+ this.formatDigits(s) +" Seconds "+ label;

	return output;
};

function createObject(proto,cons){
	function c(){}
	c.prototype = proto;
	c.prototype.constructor = cons;
	return new c();
}

window.onload = onReady;