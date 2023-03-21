const API_KEY = '8c290e0b3b70b5e8c4b3a5abb4c3b669';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
	const req = await fetch(`${API_BASE}${endpoint}`);
	const json = await req.json();
	return json;
};

const Api = {
	getHomeList: async () => {
		return [
			{
				slug: 'originals',
				title: 'Netflix Originals',
				items: await basicFetch(
					`/discover/tv?with_network=213&api_key=${API_KEY}`
				),
				type: 'tv',
			} /*
			{
				slug: 'trending',
				title: 'Recommended for you',
				items: await basicFetch(
					`/trending/all/week?api_key=${API_KEY}`
				),
			},*/,
			{
				slug: 'toprated',
				title: 'Top Rated',
				items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
				type: 'movie',
			},
			{
				slug: 'action',
				title: 'Action',
				items: await basicFetch(
					`/discover/movie?with_genres=28&api_key=${API_KEY}`
				),
				type: 'movie',
			},
			{
				slug: 'comedy',
				title: 'Comedy',
				items: await basicFetch(
					`/discover/movie?with_genres=35&api_key=${API_KEY}`
				),
				type: 'movie',
			},
			{
				slug: 'horror',
				title: 'Horror',
				items: await basicFetch(
					`/discover/movie?with_genres=27&api_key=${API_KEY}`
				),
				type: 'movie',
			},
			{
				slug: 'romance',
				title: 'Romance',
				items: await basicFetch(
					`/discover/movie?with_genres=10749&api_key=${API_KEY}`
				),
				type: 'movie',
			},
			{
				slug: 'documentary',
				title: 'Documentaries',
				items: await basicFetch(
					`/discover/movie?with_genres=99&api_key=${API_KEY}`
				),
				type: 'movie',
			},
		];
	},
	getMovieInfo: async (id, type) => {
		let info = {};

		if (id) {
			switch (type) {
				case 'movie':
					info = await basicFetch(`/movie/${id}?api_key=${API_KEY}`);
					break;
				case 'tv':
					info = await basicFetch(`/tv/${id}?api_key=${API_KEY}`);
					break;
				default:
					info = null;
					break;
			}
		}

		return info;
	},
	getMovieCredits: async (id, type) => {
		let credits = {};

		if (id) {
			switch (type) {
				case 'movie':
					credits = await basicFetch(
						`/movie/${id}/credits?api_key=${API_KEY}`
					);
					break;
				case 'tv':
					credits = await basicFetch(
						`/tv/${id}/credits?api_key=${API_KEY}`
					);
					break;
				default:
					credits = null;
					break;
			}
		}

		return credits;
	},
	getVideoInfo: async (id, type) => {
		let videoInfo = {};

		if (id) {
			switch (type) {
				case 'movie':
					videoInfo = await basicFetch(
						`/movie/${id}/videos?api_key=${API_KEY}`
					);
					break;
				case 'tv':
					videoInfo = await basicFetch(
						`/tv/${id}/videos?api_key=${API_KEY}`
					);
					break;

				default:
					videoInfo = null;
					break;
			}
		}

		return videoInfo;
	},
};

export default Api;
