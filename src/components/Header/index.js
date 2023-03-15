import React from 'react';
import './style.css';

export default ({ black }) => {
	return (
		<header className={black ? 'black' : ''}>
			<div className="logo">
				<a href="">
					<img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" />
				</a>
			</div>
			<div className="user">
				<a className="">
					<img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
				</a>
			</div>
		</header>
	);
};
