import React from 'react';
import './style.css';

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
							<a
								href={`/watch/${item.id}`}
								className="playButton"
							>
								▶ Play
							</a>
							<a
								href={`/list/add/${item.id}`}
								className="myListButton"
							>
								+ My List
							</a>
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
