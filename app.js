let hasRain = true;
const playImage = '.\\svg\\play.svg';
const pauseImage = '.\\svg\\pause.svg';
let playTime = 300;
let timePosition = 0;

// clicking play button
$('.playbutton').click(function() {

	// change pause button to play button
	if ($('.playbutton').attr('src') == pauseImage)
	{
		$('.playbutton').attr('src', playImage);
		$('.background-music').get(0).pause();
		$('.background-video').get(0).pause();
	}
	// change play button to pause button
	else
	{
		$('.playbutton').attr('src', pauseImage);
		$('.background-music').get(0).play();
		$('.background-video').get(0).play();
		$('.background-video').attr('loop', 'loop');
	}
});

const circleLength = $('.movingCircle circle').get(0).getTotalLength();
$('.movingCircle circle').get(0).style.strokeDasharray = circleLength;
//$('.movingCircle circle').get(0).style.strokeDashoffset = circleLength;

// when the music starts playing
$('.background-music').get(0).ontimeupdate = function()
{
	// time display
	let currentTime = $('.background-music').get(0).currentTime;
	timePosition = currentTime;
	let elapsedTime = playTime - currentTime;
	let seconds = Math.floor(elapsedTime % 60);
	let minutes = Math.floor(elapsedTime / 60);
	let singleDigit = Math.floor(seconds / 10);

	// add to the front when seconds is in single digit
	if (singleDigit == 0)
	{
		$('.play-pause h1').text(`${minutes}:0${seconds}`);
	}
	else
	{
		$('.play-pause h1').text(`${minutes}:${seconds}`);
	}

	// animate circle moving along with elapsed time
	
	$('.movingCircle circle').get(0).style.strokeDasharray = circleLength - (currentTime / playTime) * circleLength;
	//console.log((currentTime / playTime) * circleLength);
	console.log(`Circle Length: ${circleLength} Length: ${circleLength - (currentTime / playTime) * circleLength}`);

	// when the time expires, reset
	if (elapsedTime < 0)
	{
		reset();
	}
};

// clicking sun button
$('.weather-pick button:nth-child(2)').click(function() {
	$('.background-video').attr('src', '.\\video\\beach.mp4');
	$('.background-music').attr('src', '.\\sounds\\beach.mp3');
	if ($('.playbutton').attr('src') == pauseImage)
	{
		$('.background-video').get(0).play();
		$('.background-music').get(0).play();
		$('.background-music').get(0).currentTime = timePosition;
	}
	hasRain = false;
});

// clicking rainy button
$('.weather-pick button:nth-child(1)').click(function() {
	$('.background-video').attr('src', '.\\video\\rain.mp4');
	$('.background-music').attr('src', '.\\sounds\\rain.mp3');
	if ($('.playbutton').attr('src') == pauseImage)
	{
		$('.background-video').get(0).play();
		$('.background-music').get(0).play();
		$('.background-music').get(0).currentTime = timePosition;
	}
	hasRain = true;
});

// clicking 2 minutes
$('.time-pick button:nth-child(1)').click(function() {
	//$('.play-pause h1').text("2:001");
	playTime = 120;
	reset();
});

// clicking 5 minutes
$('.time-pick button:nth-child(2)').click(function() {
	//$('.play-pause h1').text("777");
	playTime = 300;
	reset();
});

// clicking 10 minutes
$('.time-pick button:nth-child(3)').click(function() {
	//$('.play-pause h1').text("10:00");
	playTime = 600
	reset();
});

var reset = function()
{
	$('.background-music').get(0).pause();
	$('.background-music').get(0).currentTime = 0;
	$('.background-video').get(0).pause();
	$('.background-video').get(0).currentTime = 0;
	$('.playbutton').attr('src', playImage);
};