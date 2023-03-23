import React from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function Watch() {
	const location = useLocation();
	let idIndex = location.pathname.indexOf('/', 9);
	let videoId = location.pathname.substring(idIndex).substring(1);

	//const { videoId } = useParams();

	const opts = {
		height: 0.995 * window.innerHeight,
		width: window.innerWidth,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			hl: 'en',
			modestbranding: 1,
			rel: 0,
			iv_load_policy: 3,
			loop: 1,
		},
	};

	const onPlayerReady = (event) => {
		event.target.mute();
	};

	const onPlayerEnd = (event) => {
		event.target.playVideo();
	};

	return (
		<YouTube
			videoId={videoId}
			opts={opts}
			onReady={onPlayerReady}
			onEnd={onPlayerEnd}
			id="watch"
		/>
	);
}
