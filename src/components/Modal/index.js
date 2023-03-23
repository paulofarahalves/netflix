import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tmdb from '../../helpers/Tmdb';
import './style.css';
import YouTube from 'react-youtube';
import ModalContext from '../../contexts/ModalContext';
import VideoContext from '../../contexts/VideoContext';

const Modal = () => {
	const { openModal, setOpenModal } = useContext(ModalContext);
	const { video, setVideo } = useContext(VideoContext);
	const [videoInfo, setVideoInfo] = useState({});
	const [movieInfo, setMovieInfo] = useState({});
	const [movieCredits, setMovieCredits] = useState({});

	useEffect(() => {
		const loadVideoInfo = async () => {
			let videoInformation = await Tmdb.getVideoInfo(
				video.id,
				video.type
			);
			setVideoInfo(videoInformation);
		};
		const loadMovieInfo = async () => {
			let movieInformation = await Tmdb.getMovieInfo(
				video.id,
				video.type
			);
			setMovieInfo(movieInformation);
		};
		const loadMovieCredits = async () => {
			let credits = await Tmdb.getMovieCredits(video.id, video.type);
			setMovieCredits(credits);
		};
		loadVideoInfo();
		loadMovieInfo();
		loadMovieCredits();
	}, []);

	let trailer = [];
	let videoId = 'none';

	if (videoInfo && videoInfo.results?.length > 0) {
		trailer = videoInfo.results.filter((item) =>
			item.name.includes('Trailer')
		);

		if (trailer.length > 0) {
			videoId = trailer[0].key;
		} else {
			videoId = videoInfo.results[0].key;
		}
	}

	const opts = {
		height: '450px',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 0,
			disablekb: 0,
			fs: 0,
			hl: 'en',
			modestbranding: 1,
			playsinline: 1,
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

	let videoDate = new Date(
		video.first_air_date ? video.first_air_date : video.release_date
	);

	let description = video.overview;
	if (description.length > 250) {
		description = description.substring(0, 250) + '...';
	}

	let cast = [];
	for (let i in movieCredits.cast) {
		cast.push(movieCredits.cast[i].name);
	}

	if (cast.length > 5) {
		let auxCast = [];
		for (let i = 0; i < 6; i++) {
			auxCast.push(cast[i]);
		}

		cast = [...auxCast];
	}

	let genres = [];
	for (let i in movieInfo.genres) {
		genres.push(movieInfo.genres[i].name);
	}

	if (openModal) {
		return (
			<div>
				<div id="background">
					<div id="modal">
						<button
							id="close"
							onClick={() => {
								setOpenModal(false);
								setVideo({});
							}}
						>
							x
						</button>
						<div className="videoBackground"></div>

						<YouTube
							videoId={videoId}
							opts={opts}
							onReady={onPlayerReady}
							onEnd={onPlayerEnd}
							id="video"
						/>

						<div className="videoTitle">
							{video.original_title
								? video.original_title
								: video.original_name}
						</div>

						<Link
							to={`/netflix/watch/${videoId}`}
							className="playButton"
						>
							▶ Watch
						</Link>

						<div className="videoInfo">
							<div className="leftSide">
								<div className="leftSide--top">
									<span>{videoDate.getFullYear()}</span>
									<span>
										{video.type === 'movie'
											? ''
											: movieInfo.number_of_seasons +
											  (movieInfo.number_of_seasons > 1
													? ' Seasons'
													: ' Season')}
									</span>
									<span class="player-feature-badge">HD</span>
									<div class="spatial-audio spatial-audio-icon-pt spatial-audio-icon-pt-br">
										<svg
											width="53"
											height="16"
											viewBox="0 0 53 16"
											fill="none"
										>
											<g opacity="0.9">
												<path
													d="M0 8C0 9.87632 0.645949 11.6018 1.7276 12.9661L2.46553 12.3819C1.51113 11.178 0.941177 9.65557 0.941177 8C0.941177 6.42141 1.45936 4.96384 2.33491 3.78813L1.57956 3.22654C0.587274 4.55902 0 6.21093 0 8Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M16 8C16 6.21093 15.4127 4.55902 14.4204 3.22654L13.6651 3.78813C14.5406 4.96384 15.0588 6.42141 15.0588 8C15.0588 9.65557 14.4889 11.178 13.5345 12.3819L14.2724 12.9661C15.3541 11.6018 16 9.87632 16 8Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M8 0C9.83269 0 11.5214 0.616258 12.8703 1.65286L12.2974 2.39958C11.1072 1.48493 9.61708 0.941177 8 0.941177C6.38293 0.941177 4.89285 1.48493 3.70265 2.39957L3.12967 1.65285C4.47857 0.616256 6.16732 0 8 0Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M8 2.19608C9.3296 2.19608 10.5548 2.64317 11.5334 3.39521L10.9604 4.14193C10.1405 3.51184 9.11399 3.13726 8 3.13726C6.88602 3.13726 5.85952 3.51184 5.0396 4.14193L4.46662 3.39521C5.44523 2.64317 6.67041 2.19608 8 2.19608Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M3.34204 4.5369L4.09738 5.09849C3.49423 5.90843 3.13726 6.91253 3.13726 8C3.13726 9.14051 3.52989 10.1893 4.18737 11.0186L3.44944 11.6029C2.66471 10.613 2.19608 9.36125 2.19608 8C2.19608 6.70205 2.62214 5.5036 3.34204 4.5369Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M12.8627 8C12.8627 9.14051 12.4701 10.1893 11.8126 11.0186L12.5506 11.6029C13.3353 10.613 13.8039 9.36125 13.8039 8C13.8039 6.70205 13.3779 5.5036 12.658 4.5369L11.9026 5.09849C12.5058 5.90843 12.8627 6.91253 12.8627 8Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M10.3529 8C10.3529 9.29949 9.29949 10.3529 8 10.3529C6.70051 10.3529 5.64706 9.29949 5.64706 8C5.64706 6.70051 6.70051 5.64706 8 5.64706C9.29949 5.64706 10.3529 6.70051 10.3529 8Z"
													fill="#BCBCBC"
												></path>
												<path
													d="M2.87389 14.1422C3.75688 12.4329 5.53805 11.2941 7.5516 11.2941H8.4484C10.462 11.2941 12.2431 12.4329 13.1261 14.1422C11.7379 15.302 9.95045 16 8 16C6.04955 16 4.26212 15.302 2.87389 14.1422Z"
													fill="#BCBCBC"
												></path>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M22.0651 6.68048L21.4896 5.23073H19.1583L18.5901 6.68048H18L20.0471 1.61002H20.6227L22.6771 6.68048H22.0651ZM21.2856 4.71349L20.324 2.28025L19.3623 4.71349H21.2856ZM20.5644 1.06363H20.018L20.6518 0H21.2565L20.5644 1.06363ZM25.8289 5.18702V2.96505H26.368V6.68048H25.8435V6.14866C25.7221 6.34779 25.5642 6.50321 25.3699 6.61491C25.1757 6.72176 24.9596 6.77519 24.7216 6.77519C24.3039 6.77519 23.9712 6.63677 23.7235 6.35993C23.4807 6.07824 23.3592 5.70913 23.3592 5.25259V2.96505H23.8983V5.18702C23.8983 5.51728 23.9833 5.78198 24.1533 5.9811C24.3233 6.17537 24.5516 6.27251 24.8381 6.27251C25.1101 6.27251 25.3432 6.1778 25.5375 5.98839C25.7318 5.79898 25.8289 5.53185 25.8289 5.18702ZM28.0757 6.52749C28.3234 6.69262 28.6124 6.77519 28.9426 6.77519C29.2292 6.77519 29.4793 6.70962 29.693 6.57849C29.9116 6.4425 30.0888 6.25794 30.2248 6.02482V6.68048H30.7493V1.39875H30.2102V3.59886C30.0743 3.37059 29.897 3.19332 29.6784 3.06705C29.4647 2.93591 29.2195 2.87035 28.9426 2.87035C28.6124 2.87035 28.3234 2.95291 28.0757 3.11804C27.828 3.28317 27.6337 3.51387 27.4929 3.81013C27.352 4.10154 27.2816 4.43908 27.2816 4.82277C27.2816 5.20645 27.352 5.54642 27.4929 5.84269C27.6337 6.13409 27.828 6.36236 28.0757 6.52749ZM29.6493 6.09038C29.4696 6.2118 29.2607 6.27251 29.0228 6.27251C28.7896 6.27251 28.5832 6.2118 28.4035 6.09038C28.2238 5.96896 28.083 5.79898 27.981 5.58042C27.879 5.36187 27.828 5.10932 27.828 4.82277C27.828 4.53622 27.879 4.28367 27.981 4.06511C28.083 3.84656 28.2238 3.67657 28.4035 3.55515C28.5832 3.43373 28.7896 3.37302 29.0228 3.37302C29.2607 3.37302 29.4696 3.43373 29.6493 3.55515C29.8338 3.67657 29.9771 3.84656 30.0791 4.06511C30.186 4.28367 30.2394 4.53622 30.2394 4.82277C30.2394 5.10932 30.186 5.36187 30.0791 5.58042C29.9771 5.79898 29.8338 5.96896 29.6493 6.09038ZM32.1669 2.39681C32.0552 2.39681 31.9581 2.35796 31.8755 2.28025C31.7978 2.19769 31.759 2.10055 31.759 1.98884C31.759 1.87714 31.7978 1.78243 31.8755 1.70472C31.9581 1.62216 32.0552 1.58088 32.1669 1.58088C32.2786 1.58088 32.3733 1.62216 32.4511 1.70472C32.5336 1.78243 32.5749 1.87714 32.5749 1.98884C32.5749 2.10055 32.5336 2.19769 32.4511 2.28025C32.3733 2.35796 32.2786 2.39681 32.1669 2.39681ZM31.8974 6.68048V2.96505H32.4365V6.68048H31.8974ZM34.188 6.52749C34.4551 6.69262 34.7611 6.77519 35.1059 6.77519C35.4508 6.77519 35.7543 6.69262 36.0166 6.52749C36.2837 6.36236 36.4901 6.13409 36.6358 5.84269C36.7864 5.54642 36.8616 5.20645 36.8616 4.82277C36.8616 4.43908 36.7864 4.10154 36.6358 3.81013C36.4901 3.51387 36.2837 3.28317 36.0166 3.11804C35.7543 2.95291 35.4508 2.87035 35.1059 2.87035C34.7611 2.87035 34.4551 2.95291 34.188 3.11804C33.9257 3.28317 33.7193 3.51387 33.5688 3.81013C33.4231 4.10154 33.3502 4.43908 33.3502 4.82277C33.3502 5.20645 33.4231 5.54642 33.5688 5.84269C33.7193 6.13409 33.9257 6.36236 34.188 6.52749ZM35.9729 5.87911C35.7494 6.14138 35.4605 6.27251 35.1059 6.27251C34.7514 6.27251 34.46 6.14138 34.2317 5.87911C34.0083 5.61199 33.8966 5.25988 33.8966 4.82277C33.8966 4.38566 34.0083 4.03597 34.2317 3.77371C34.46 3.50658 34.7514 3.37302 35.1059 3.37302C35.4605 3.37302 35.7494 3.50658 35.9729 3.77371C36.2011 4.03597 36.3153 4.38566 36.3153 4.82277C36.3153 5.25988 36.2011 5.61199 35.9729 5.87911ZM44.1632 8.68754C44.3271 8.84538 44.5214 8.9243 44.746 8.9243C44.9767 8.9243 45.171 8.84538 45.3288 8.68754C45.4927 8.52969 45.5747 8.33542 45.5747 8.10472C45.5747 7.87403 45.4927 7.67976 45.3288 7.52191C45.171 7.36407 44.9767 7.28515 44.746 7.28515C44.5214 7.28515 44.3271 7.36407 44.1632 7.52191C44.0054 7.67976 43.9264 7.87403 43.9264 8.10472C43.9264 8.33542 44.0054 8.52969 44.1632 8.68754ZM44.0539 9.38873V14.1332H45.4381V9.38873H44.0539ZM18 7.79511V14.1332H22.7262V12.8583H19.4752V11.5652H22.5623V10.2903H19.4752V9.07001H22.6807V7.79511H18ZM24.1066 13.86C24.489 14.1332 24.9838 14.2698 25.5909 14.2698C25.9673 14.2698 26.3043 14.2091 26.6017 14.0876C26.8992 13.9602 27.1329 13.7811 27.3029 13.5504C27.479 13.3136 27.567 13.0343 27.567 12.7126C27.567 12.3362 27.4517 12.0114 27.221 11.7382C26.9903 11.465 26.6412 11.298 26.1737 11.2373L25.5181 11.1463C25.2934 11.1159 25.1326 11.0734 25.0354 11.0188C24.9383 10.9581 24.8897 10.8731 24.8897 10.7638C24.8897 10.6424 24.9444 10.5422 25.0536 10.4633C25.169 10.3783 25.3208 10.3358 25.509 10.3358C25.6972 10.3358 25.852 10.3753 25.9734 10.4542C26.0948 10.527 26.1707 10.6211 26.2011 10.7365H27.4942C27.4638 10.4754 27.3667 10.2326 27.2028 10.008C27.0388 9.78334 26.8112 9.60121 26.5198 9.46158C26.2344 9.32195 25.8914 9.25213 25.4908 9.25213C25.1265 9.25213 24.7956 9.31892 24.4982 9.45248C24.2067 9.57997 23.973 9.76513 23.797 10.008C23.627 10.2447 23.542 10.524 23.542 10.8458C23.542 11.2282 23.6513 11.5409 23.8698 11.7837C24.0884 12.0266 24.4283 12.1814 24.8897 12.2482L25.5545 12.3392C25.8034 12.3756 25.9734 12.4303 26.0645 12.5031C26.1616 12.5699 26.2102 12.661 26.2102 12.7763C26.2102 12.8917 26.1525 12.9888 26.0371 13.0677C25.9218 13.1467 25.7609 13.1861 25.5545 13.1861C25.342 13.1861 25.166 13.1406 25.0263 13.0495C24.8867 12.9585 24.8047 12.8552 24.7804 12.7399H23.4691C23.5177 13.2074 23.7302 13.5807 24.1066 13.86ZM28.3845 16V9.38873H29.7049V9.93512C29.8627 9.71656 30.057 9.54961 30.2877 9.43426C30.5184 9.31284 30.7825 9.25213 31.08 9.25213C31.4867 9.25213 31.8449 9.35838 32.1545 9.57086C32.4702 9.78334 32.7161 10.0808 32.8921 10.4633C33.0743 10.8397 33.1653 11.2738 33.1653 11.7655C33.1653 12.2633 33.0743 12.7004 32.8921 13.0768C32.7161 13.4472 32.4702 13.7386 32.1545 13.9511C31.8449 14.1635 31.4867 14.2698 31.08 14.2698C30.8007 14.2698 30.5488 14.2151 30.3241 14.1059C30.1056 13.9966 29.9174 13.8418 29.7595 13.6414V16H28.3845ZM30.7339 13.0586C31.0375 13.0586 31.2833 12.9433 31.4715 12.7126C31.6658 12.4819 31.7629 12.1662 31.7629 11.7655C31.7629 11.3648 31.6658 11.0491 31.4715 10.8184C31.2833 10.5817 31.0375 10.4633 30.7339 10.4633C30.4304 10.4633 30.1815 10.5817 29.9872 10.8184C29.7929 11.0491 29.6958 11.3648 29.6958 11.7655C29.6958 12.1662 29.7929 12.4819 29.9872 12.7126C30.1815 12.9433 30.4304 13.0586 30.7339 13.0586ZM34.1596 13.86C34.4571 14.1332 34.8548 14.2698 35.3526 14.2698C35.6076 14.2698 35.8565 14.2182 36.0993 14.115C36.3482 14.0057 36.5455 13.8327 36.6912 13.5959V14.1332H37.9479V11.1827C37.9479 10.5149 37.7628 10.0262 37.3924 9.71656C37.0282 9.40694 36.5304 9.25213 35.899 9.25213C35.3101 9.25213 34.8396 9.39177 34.4875 9.67103C34.1354 9.95029 33.9198 10.2963 33.8409 10.7092H35.1431C35.1735 10.612 35.2494 10.527 35.3708 10.4542C35.4922 10.3753 35.6531 10.3358 35.8534 10.3358C36.0781 10.3358 36.2572 10.3935 36.3907 10.5088C36.5304 10.6181 36.6002 10.7911 36.6002 11.0279V11.1918H35.7351C35.1037 11.1918 34.6089 11.3284 34.2507 11.6016C33.8925 11.8748 33.7134 12.2603 33.7134 12.7581C33.7134 13.2134 33.8622 13.5807 34.1596 13.86ZM36.1266 13.1042C35.9931 13.1649 35.8565 13.1952 35.7168 13.1952C35.5226 13.1952 35.3617 13.1497 35.2342 13.0586C35.1067 12.9676 35.043 12.837 35.043 12.667C35.043 12.491 35.1067 12.3574 35.2342 12.2664C35.3678 12.1692 35.556 12.1207 35.7988 12.1207H36.6002V12.3939C36.6002 12.5699 36.5546 12.7186 36.4636 12.8401C36.3786 12.9554 36.2663 13.0434 36.1266 13.1042ZM41.1245 14.2698C40.6388 14.2698 40.2169 14.1635 39.8587 13.9511C39.5066 13.7325 39.2334 13.435 39.0391 13.0586C38.8449 12.6822 38.7477 12.2482 38.7477 11.7564C38.7477 11.2707 38.8449 10.8397 39.0391 10.4633C39.2334 10.0869 39.5066 9.79245 39.8587 9.57997C40.2169 9.36141 40.6388 9.25213 41.1245 9.25213C41.5313 9.25213 41.8864 9.33409 42.19 9.49801C42.4935 9.65585 42.7363 9.87137 42.9185 10.1446C43.1006 10.4117 43.2099 10.7092 43.2463 11.037H41.8439C41.8136 10.867 41.7377 10.7304 41.6163 10.6272C41.5009 10.5179 41.3309 10.4633 41.1063 10.4633C40.821 10.4633 40.5903 10.5817 40.4142 10.8184C40.2381 11.0491 40.1501 11.3618 40.1501 11.7564C40.1501 12.1632 40.2381 12.4819 40.4142 12.7126C40.5903 12.9433 40.821 13.0586 41.1063 13.0586C41.3309 13.0586 41.5039 13.0101 41.6254 12.9129C41.7528 12.8158 41.8318 12.6822 41.8621 12.5122H43.2463C43.2099 12.8401 43.1006 13.1375 42.9185 13.4047C42.7363 13.6718 42.4935 13.8843 42.19 14.0421C41.8864 14.1939 41.5313 14.2698 41.1245 14.2698ZM47.8917 14.2698C47.3939 14.2698 46.9963 14.1332 46.6988 13.86C46.4013 13.5807 46.2526 13.2134 46.2526 12.7581C46.2526 12.2603 46.4317 11.8748 46.7898 11.6016C47.148 11.3284 47.6428 11.1918 48.2742 11.1918H49.1393V11.0279C49.1393 10.7911 49.0695 10.6181 48.9299 10.5088C48.7963 10.3935 48.6172 10.3358 48.3926 10.3358C48.1922 10.3358 48.0314 10.3753 47.9099 10.4542C47.7885 10.527 47.7126 10.612 47.6823 10.7092H46.3801C46.459 10.2963 46.6745 9.95029 47.0266 9.67103C47.3787 9.39177 47.8492 9.25213 48.4381 9.25213C49.0695 9.25213 49.5673 9.40694 49.9316 9.71656C50.3019 10.0262 50.4871 10.5149 50.4871 11.1827V14.1332H49.2304V13.5959C49.0847 13.8327 48.8874 14.0057 48.6384 14.115C48.3956 14.2182 48.1467 14.2698 47.8917 14.2698ZM48.256 13.1952C48.3956 13.1952 48.5322 13.1649 48.6658 13.1042C48.8054 13.0434 48.9177 12.9554 49.0027 12.8401C49.0938 12.7186 49.1393 12.5699 49.1393 12.3939V12.1207H48.3379C48.0951 12.1207 47.9069 12.1692 47.7733 12.2664C47.6458 12.3574 47.5821 12.491 47.5821 12.667C47.5821 12.837 47.6458 12.9676 47.7733 13.0586C47.9008 13.1497 48.0617 13.1952 48.256 13.1952ZM51.5418 7.53102V14.1332H52.926V7.53102H51.5418Z"
													fill="#BCBCBC"
												></path>
											</g>
										</svg>
									</div>
									<div
										aria-labelledby="episodesTextClosedCaptionsAvailable"
										data-tooltip="Legenda descritiva disponível para alguns episódios"
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											class="Hawkins-Icon Hawkins-Icon-Small"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M0 1.75C0 1.33579 0.335786 1 0.75 1H15.25C15.6642 1 16 1.33579 16 1.75V11.25C16 11.6642 15.6642 12 15.25 12H12.75V14C12.75 14.2652 12.61 14.5106 12.3817 14.6456C12.1535 14.7806 11.8709 14.785 11.6386 14.6572L6.80736 12H0.75C0.335786 12 0 11.6642 0 11.25V1.75ZM1.5 2.5V10.5H7H7.19264L7.36144 10.5928L11.25 12.7315V11.25V10.5H12H14.5V2.5H1.5ZM6 5.75L3 5.75V4.25L6 4.25V5.75ZM13 7.25H10V8.75H13V7.25ZM8 8.75L3 8.75V7.25L8 7.25V8.75ZM13 4.25H8V5.75H13V4.25Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
								</div>
								<div className="leftSide--bottom">
									<p>{description}</p>
								</div>
							</div>
							<div className="rightSide">
								<div>
									<span>Cast: </span>
									{cast ? cast.join(', ') : ''}
								</div>
								<div>
									<span>Genres: </span>
									{genres ? genres.join(', ') : ''}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

export default Modal;
