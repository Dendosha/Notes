import { SVGAttributes } from 'react';

function PinIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='38'
			height='38'
			viewBox='0 0 38 38'
			fill='none'
			stroke='#FFBB00'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M24.3226 4.96774L16.5806 12.7097L8.83871 15.6129L5.93548 18.5161L19.4839 32.0645L22.3871 29.1613L25.2903 21.4194L33.0323 13.6774M12.7097 25.2903L4 34M23.3548 4L34 14.6452'
				strokeWidth={4}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default PinIcon;
