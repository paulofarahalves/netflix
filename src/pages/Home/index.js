import React, { useEffect, useState } from 'react';
import Tmdb from '../../helpers/Tmdb';
import MovieRow from '../../components/MovieRow';
import FeaturedMovie from '../../components/FeaturedMovie';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Page = () => {
	const [movieList, setMovieList] = useState([]);
	const [featuredData, setFeaturedData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const loadAll = async () => {
			let list = await Tmdb.getHomeList();
			setMovieList(list);

			setLoading(false);

			let originals = list.filter((i) => i.slug === 'originals');

			let random = Math.floor(
				Math.random() * (originals[0].items.results.length - 1)
			);

			let chosen = originals[0].items.results[random];

			//let types = ['movie', 'tv'];

			//let type = types[Math.floor(Math.random() * types.length)];

			let type = 'tv';

			let chosenInfo = await Tmdb.getMovieInfo(chosen.id, type);

			setFeaturedData(chosenInfo);
		};
		loadAll();
	}, []);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		};
		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return (
		<div className="page">
			<Header black={blackHeader} />
			{featuredData && <FeaturedMovie item={featuredData} />}

			<section className="lists">
				{movieList.map((i, k) => (
					<MovieRow key={k} title={i.title} items={i.items} />
				))}
			</section>
			<Footer />
			{loading && (
				<div className="loading">
					<img
						src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
						alt="Loading"
					/>
				</div>
			)}
		</div>
	);
};

export default Page;
