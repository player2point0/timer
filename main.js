$(function(){

	var mins = 25;
	var secs = 01;
	var coverTotal = (mins * 60) + secs;
	var id;


	start();

	//start and stop timer
	$("#mins, #secs").on("focus",stop);
	$("#mins, #secs").on("focusout",start);
	//prevents newline
	$("#mins, #secs").on("keydown",function(e){
		if(event.keyCode == 13)
		{
			event.preventDefault();
		}
	});
	//input events
	$("#mins").on("input",function(){
		mins = Number($("#mins").text());
		coverTotal = (mins * 60) + secs;

	});
	$("#secs").on("input",function(){
		secs = Number($("#secs").text());

		if(secs > 59) secs = 59;
	});


	function tick()
	{
		//reduce time
		secs--;
		if(secs<0)
		{
			secs = 59;
			mins--;
		}
		//update display time
		updateTime();
		//update cover
		updateCover();
		//check if time up
		if(mins <= 0 && secs <= 0)
		{
			stop();
      		var audio = new Audio("Sound.mp3");
			audio.play();
		}

	}

	function updateTime()
	{
		$("#mins").text(padZero(mins));
		$("#secs").text(padZero(secs));
	}

	function stop()
	{
		clearInterval(id);
	}

	function start()
	{
		tick();
		id = setInterval(tick,1000);
	}

	function padZero(input)
	{
		var digits = 2;
		var zeros = "";
		var output = String(input);
		var n = digits - output.length;

		for(var i = 0;i<n;i++)
		{
			zeros+="0";
		}

		return zeros + output;
	}

	function updateCover()
	{
		var start = $("#cover").height();
		var currentTime = (mins * 60) + secs;
		var end = 100 * (coverTotal - currentTime)/coverTotal;
		if(end > 100)
		{
			per = 100;
			console.log("this is needed")
		}

		//ADD LERP ANIMATION HERE//


		$("#cover").height(String(end)+"%");
	}

});
