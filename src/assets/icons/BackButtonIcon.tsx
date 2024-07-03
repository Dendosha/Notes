import { SVGAttributes } from 'react';

function BackButton(props: SVGAttributes<SVGElement>) {
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
				d='M70.5 33H28.5L45.825 15.675C47.3025 14.1975 48 12.435 48 10.5C48 6.81 44.9513 3 40.5 3C38.5087 3 36.7725 3.72375 35.325 5.175L5.4825 35.0175C4.2525 36.2475 3 37.7663 3 40.5C3 43.2337 4.04625 44.55 5.4225 45.9263L35.325 75.825C36.7725 77.2762 38.5087 78 40.5 78C44.955 78 48 74.19 48 70.5C48 68.565 47.3025 66.8025 45.825 65.325L28.5 48H70.5C74.64 48 78 44.64 78 40.5C78 36.36 74.64 33 70.5 33Z'
				strokeWidth={6}
			/>
		</svg>
	);
}

export default BackButton;
