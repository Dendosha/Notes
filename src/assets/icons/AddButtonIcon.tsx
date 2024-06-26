import { SVGAttributes } from 'react';

function AddButtonIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='80'
			height='80'
			viewBox='0 0 80 80'
			xmlns='http://www.w3.org/2000/svg'
			fill='white'
			{...props}
		>
			<path d='M74.2857 34.2857H45.7143V5.71429C45.7143 2.56 43.1543 0 40 0C36.8457 0 34.2857 2.56 34.2857 5.71429V34.2857H5.71429C2.56 34.2857 0 36.8457 0 40C0 43.1543 2.56 45.7143 5.71429 45.7143H34.2857V74.2857C34.2857 77.44 36.8457 80 40 80C43.1543 80 45.7143 77.44 45.7143 74.2857V45.7143H74.2857C77.44 45.7143 80 43.1543 80 40C80 36.8457 77.44 34.2857 74.2857 34.2857Z' />
		</svg>
	);
}

export default AddButtonIcon;
