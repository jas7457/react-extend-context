import React, { useContext } from 'react';
import { render } from '@testing-library/react';

import ReactExtendContext, { withExtendedContext } from './ReactExtendContext';

const CarContext = React.createContext({
	make: '',
	model: '',
	type: '',
	year: 2000
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Display() {
	const carContext = useContext(CarContext);
	const { make, model, type, year } = carContext;

	return (
		<div>
			{year} {make} {model}: {type}
		</div>
	);
}

describe('working with the default ReactExtendContext', () => {
	test('allows everything to be defined in one fell-swoop', () => {
		const { getByText } = render(
			<ReactExtendContext Context={CarContext} make="Toyota" model="Avalon" type="Coupe" year={1997}>
				<Display />
			</ReactExtendContext>
		);

		expect(getByText('1997 Toyota Avalon: Coupe')).toBeDefined();
	});

	test('allows things to be defined at each level', () => {
		const { getByText } = render(
			<ReactExtendContext Context={CarContext} make="Toyota">
				<ReactExtendContext Context={CarContext} model="Avalon">
					<ReactExtendContext Context={CarContext} type="Coupe">
						<ReactExtendContext Context={CarContext} year={1997}>
							<Display />
						</ReactExtendContext>
					</ReactExtendContext>
				</ReactExtendContext>
			</ReactExtendContext>
		);

		expect(getByText('1997 Toyota Avalon: Coupe')).toBeDefined();
	});

	test('allows lower levels to redefine specific attributes', () => {
		const { getByText } = render(
			<ReactExtendContext Context={CarContext} make="Toyota" model="Avalon" type="Coupe" year={1997}>
				<ReactExtendContext Context={CarContext} model="Corolla">
					<ReactExtendContext Context={CarContext} type="Sedan">
						<Display />
					</ReactExtendContext>
				</ReactExtendContext>
			</ReactExtendContext>
		);

		expect(getByText('1997 Toyota Corolla: Sedan')).toBeDefined();
	});
});

describe('working with the HOC withExtendedContext', () => {
	const ExtendedContext = withExtendedContext(CarContext);

	test('allows everything to be defined in one fell-swoop', () => {
		const { getByText } = render(
			<ExtendedContext make="Toyota" model="Avalon" type="Coupe" year={1997}>
				<Display />
			</ExtendedContext>
		);

		expect(getByText('1997 Toyota Avalon: Coupe')).toBeDefined();
	});

	test('allows things to be defined at each level', () => {
		const { getByText } = render(
			<ExtendedContext make="Toyota">
				<ExtendedContext model="Avalon">
					<ExtendedContext type="Coupe">
						<ExtendedContext year={1997}>
							<Display />
						</ExtendedContext>
					</ExtendedContext>
				</ExtendedContext>
			</ExtendedContext>
		);

		expect(getByText('1997 Toyota Avalon: Coupe')).toBeDefined();
	});

	test('allows lower levels to redefine specific attributes', () => {
		const { getByText } = render(
			<ExtendedContext make="Toyota" model="Avalon" type="Coupe" year={1997}>
				<ExtendedContext model="Corolla">
					<ExtendedContext type="Sedan">
						<Display />
					</ExtendedContext>
				</ExtendedContext>
			</ExtendedContext>
		);

		expect(getByText('1997 Toyota Corolla: Sedan')).toBeDefined();
	});
});
