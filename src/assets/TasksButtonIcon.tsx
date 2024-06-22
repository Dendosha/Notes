import { SVGAttributes } from 'react';

function TasksButtonIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='75'
			height='75'
			viewBox='0 0 75 75'
			fill='#FFBB00'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M53.5714 21.4286H10.7143V26.7857H50.8929H53.5714V21.4286ZM64.2857 30.8518V0H0V64.2857H30.8518C35.175 70.7438 42.533 74.9973 50.8929 75C64.208 74.9946 74.9946 64.208 75 50.8929C74.9973 42.533 70.7438 35.175 64.2857 30.8518ZM30.8491 37.5C29.7455 39.15 28.8589 40.9527 28.1866 42.8571H10.7143V48.2143H26.9411C26.8446 49.0955 26.7857 49.9848 26.7857 50.8929C26.7857 53.7161 27.2946 56.4134 28.1866 58.9286H5.35714V5.35714H58.9286V28.1866C56.4134 27.2946 53.7161 26.7857 50.8929 26.7857C45.1527 26.7857 39.892 28.7973 35.7536 32.1429H10.7143V37.5H30.8491ZM50.8929 69.3295C40.7116 69.3054 32.475 61.0688 32.4509 50.8929C32.475 40.7116 40.7116 32.475 50.8929 32.4536C61.0688 32.475 69.3054 40.7116 69.3295 50.8929C69.3054 61.0688 61.0688 69.3054 50.8929 69.3295Z' />
			<path d='M37.5 50.8929L42.8571 45.5357L48.2143 50.8929L58.9286 40.1786L64.2857 45.5357L48.2143 61.6071L37.5 50.8929Z' />
		</svg>
	);
}

export default TasksButtonIcon;
