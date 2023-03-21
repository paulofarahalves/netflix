import React, { useContext, useState } from 'react';
import './style.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ModalContext from '../../contexts/ModalContext';
import VideoContext from '../../contexts/VideoContext';

const MovieRow = ({ title, items, type }) => {
	const { setOpenModal } = useContext(ModalContext);
	const { setVideo } = useContext(VideoContext);

	const [scrollX, setScrollX] = useState(0);
	const handleLeftArrow = () => {
		let x = scrollX + Math.round(window.innerWidth / 2);
		if (x > 0) {
			x = 0;
		}

		setScrollX(x);
	};

	const handleRightArrow = () => {
		let x = scrollX - Math.round(window.innerWidth / 2);
		let listWidth = items.results.length * 150;

		if (window.innerWidth - listWidth > x) {
			x = window.innerWidth - listWidth - 60;
		}
		setScrollX(x);
	};

	return (
		<div className="movieRow">
			<h2>{title}</h2>
			<div className="left" onClick={handleLeftArrow}>
				<NavigateBeforeIcon style={{ fontSize: 50 }} />
			</div>
			<div className="right" onClick={handleRightArrow}>
				<NavigateNextIcon style={{ fontSize: 50 }} />
			</div>
			<div className="listArea">
				<div
					className="list"
					style={{
						marginLeft: scrollX,
						width: items.results.length * 150,
					}}
				>
					{items.results.length > 0 &&
						items.results.map((i, k) => (
							<div
								key={k}
								className="item"
								onClick={() => {
									setOpenModal(true);
									i.type = type;
									setVideo(i);
								}}
							>
								<img
									src={`https://image.tmdb.org/t/p/w300${i.poster_path}`}
									alt={title.original_title}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default MovieRow;
