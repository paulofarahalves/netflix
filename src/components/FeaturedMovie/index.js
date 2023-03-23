import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Tmdb from '../../helpers/Tmdb';

const FeaturedMovie = ({ item }) => {
	let firstDate = new Date(item.first_air_date);
	let genres = [];
	for (let i in item.genres) {
		genres.push(item.genres[i].name);
	}

	let description = item.overview;
	if (description.length > 300) {
		description = description.substring(0, 300) + '...';
	}

	const [videoInfo, setVideoInfo] = useState();

	useEffect(() => {
		const loadVideoInfo = async () => {
			let videoInformation = await Tmdb.getVideoInfo(item.id, 'tv');
			setVideoInfo(videoInformation);
		};
		loadVideoInfo();
	}, [item]);

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

	return (
		<section
			className="featured"
			style={{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
			}}
		>
			<div className="vertical">
				<div className="horizontal">
					<div className="name">{item.original_name}</div>
					<div className="info">
						<div className="points">
							{Math.round(item.vote_average * 10) / 10} points
						</div>
						<div className="year">{firstDate.getFullYear()}</div>
						<div className="seasons">
							{item.number_of_seasons} Season
							{item.number_of_seasons !== 1 ? 's' : ''}
						</div>
						<div className="description">{description}</div>
						<div className="buttons">
							<Link
								to={`/netflix/watch/${videoId}`}
								className="playButton"
							>
								▶ Watch
							</Link>
							{/*<a
								href={`/list/add/${item.id}`}
								className="myListButton"
							>
								+ My List
							</a> */}
						</div>
						<div className="genres">
							<strong>Genres:</strong> {genres.join(', ')}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturedMovie;
