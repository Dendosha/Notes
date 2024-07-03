import { SVGAttributes } from 'react';

function UnpinButton(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='81'
			height='81'
			viewBox='0 0 81 81'
			fill='none'
			stroke='#FFBB00'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M3 3L78 78M53 9.25L39.4625 22.7875M28.7542 28.7583L19.6667 32.1667L13.4167 38.4167L42.5833 67.5833L48.8333 61.3333L52.25 52.225M58.2083 41.5458L71.75 28M28 53L9.25 71.75M50.9167 7.16667L73.8333 30.0833'
				strokeWidth={6}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default UnpinButton;
