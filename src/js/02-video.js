import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector("#vimeo-player");
const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));
player.setCurrentTime(onCurrentTime());

function onTimeUpdate(data) {
	const currentTime = data.seconds;
	localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}
function onCurrentTime() {
	const savedTime = localStorage.getItem('videoplayer-current-time');
	const currentTime = JSON.parse(savedTime);
	return currentTime;
	
}