import { SVGAttributes } from 'react';

function PinButtonIcon(props: SVGAttributes<SVGElement>) {
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
				d='M53.8065 5.41935L34.4516 24.7742L15.0968 32.0323L7.83871 39.2903L41.7097 73.1613L48.9677 65.9032L56.2258 46.5484L75.5806 27.1935M24.7742 56.2258L3 78M51.3871 3L78 29.6129'
				strokeWidth={6}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default PinButtonIcon;
