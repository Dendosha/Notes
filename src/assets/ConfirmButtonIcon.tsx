import { SVGAttributes } from 'react';

function ConfirmButtonIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='80'
			height='60'
			viewBox='0 0 80 60'
			fill='white'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M26.1333 59.1818L0.8 33.2727C-0.266667 32.1818 -0.266667 30.2727 0.8 28.9091L4.8 24.8182C5.86667 23.7273 7.73333 23.7273 9.06667 24.8182L28.2667 44.4545L70.9333 0.818182C72 -0.272727 73.8667 -0.272727 75.2 0.818182L79.2 4.90909C80.2667 6 80.2667 7.90909 79.2 9.27273L30.4 59.1818C29.0667 60.2727 27.2 60.2727 26.1333 59.1818Z' />
		</svg>
	);
}

export default ConfirmButtonIcon;
