import React from 'react';

const Phrase = ({letters}) => (
	<div className="phrase">
		{ letters.split('').map((letter, key) => (
			<span className="phrase__letter" key={key}>{letter}</span>
		 ))
		}
	</div>
)


export default Phrase;