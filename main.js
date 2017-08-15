let mainUrl = "https://api.darksky.net/forecast/68935f00e465841749834818130472c1/37.8267,-122.4233?callback=getWeather",
	months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
	day = ['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday'];

createScript(mainUrl);

function createScript(url) {

	let script = document.createElement("script");

	script.src = url;

	document.body.appendChild(script);
}

function getWeather(par) {

	changeTemp(par.daily.data.slice(0, 4));
	timeZone(par.timezone);
	fourDays(par.daily.data.slice(0, 4));
	listener(par.daily.data.slice(0, 4));
	changeCel(par.daily.data.slice(0, 4));
	
}

function changeTemp(arr) {

	console.log(arr);

// First Day

 	let corData = new Date(arr[0].time * 1000),
 		dateForm = `${day[corData.getDay()]}, ${months[corData.getMonth()]} ${corData.getDate()}`,
 		image = arr[0].icon,
 		tempCel = makeCel(arr[0].apparentTemperatureMax);


	$(".main-data").text(dateForm);
	$(".timezone img").attr("src", `img/${image}.png`);
	$(".main-day-temperature p:first-child").text(tempCel);


	$(".dew-point p").text(arr[0].dewPoint.toFixed(1));
	$(".humidity p ").text(arr[0].humidity.toFixed(1));
	$(".pressure p").text(arr[0].pressure.toFixed(1));
	
}

function listener(arr) {

$(".one-day").on("click", function() {

	changeTemp([arr[0]]);

});

$(".two-day").on("click", function() {

	changeTemp([arr[1]]);

});

$(".three-day").on("click", function() {

	changeTemp([arr[2]]);

});

$(".four-day").on("click", function() {

	changeTemp([arr[3]]);

});

}

function timeZone(par) {

	let timeZon = par.replace(/([A-z]{1,})\//g, "");

	$(".main-city").text(timeZon.replace("_", " "));
}


function makeCel(temp) {

	let tr = $(".far img:last-child").hasClass('activ');

	if(tr === false) return temp.toFixed(0);


	if(tr === true) return ((temp - 32) / 1.8).toFixed(0);
}

function fourDays(arr) {

	let corDataOne = new Date(arr[0].time * 1000),
		corDataTwo = new Date(arr[1].time * 1000),
		corDataThree = new Date(arr[2].time * 1000),
		corDataFour = new Date(arr[3].time * 1000);

	nextDays(".one-day", day[corDataOne.getDay()], arr[0].icon, arr[0].apparentTemperatureMax);
	nextDays(".two-day", day[corDataTwo.getDay()], arr[1].icon, arr[1].apparentTemperatureMax);
	nextDays(".three-day", day[corDataThree.getDay()], arr[2].icon, arr[2].apparentTemperatureMax);
	nextDays(".four-day", day[corDataFour.getDay()], arr[3].icon, arr[3].apparentTemperatureMax);

}

function nextDays(tag, day, imge, temp) {

	//console.log(tag, day, imge, temp);

	$(tag + " > div > p").text(day);
	$(tag + " > div > img").attr("src", `img/${imge}.png`);
	$(tag + " > div > div > p:first-child").text(makeCel(temp));

}

function changeCel(par) {

$(".far img:first-child").on("click", function() {

	if ( $(this).hasClass('activ') ) {
		$(this).removeClass('activ');
		$('.far img:last-child').addClass('activ');
		fourDays(par);
		changeTemp(par);
		$(".celsiy").css("display","block");

	};

});

$(".far img:last-child").on("click", function() {

	if ( $(this).hasClass('activ') ) {
		$(this).removeClass('activ');
		$('.far img:first-child').addClass('activ');
		fourDays(par);
		changeTemp(par);
		$(".celsiy").css("display","none");
	};

});


}

