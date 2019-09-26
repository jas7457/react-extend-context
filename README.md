# react-extend-context

Simple API for <i>extending</i> rather than <i>replacing</i> React.Context `values`

## Installation

This module is distributed via [npm][npm] and
should be installed as one of your project's regular `dependencies`:

```
yarn add react-extend-context
```

or

```
npm install react-extend-context
```

This library has a `peerDependencies` listing for `react` at version 16.3.0 (or higher) to be able to use the new React.Context API.

## Usage

The API for this package is meant to be simple and succinct. The only assumption that it makes is the `value` that you use for your React.Context is a plain JavaScript object.

There are two exports for the package: the default `ReactExtendContext` component and a named Higher-Order Component `withExtendedContext` export.

### ReactExtendContext example

```jsx
import React from 'react';
import ReactExtendContext from 'react-extend-context';

// create a "CarContext" and provide some defaults
const CarContext = React.createContext({
	make: '',
	model: '',
	type: '',
	year: 2000
});

// Output the values from CarContext
function Display() {
	const carContext = useContext(CarContext);
	const { make, model, type, year } = carContext;

	return (
		<div>
			{year} {make} {model}: {type}
		</div>
	);
}

// The expected outcome is "1997 Toyota Avalon: Coupe"
export default function App() {
	return (
		<ReactExtendContext Context={CarContext} make="Toyota" model="Avalon" type="Coupe" year={1997}>
			<Display />
		</ReactExtendContext>
	);
}
```

The above example is simple (and admittedly useless). The real use-case for this package is if different layers of your app need to add different parts of the Context instead of defining it all at once.

You can pick and choose which Component adds (or modifies) which part of the context.

```jsx
// The expected outcome is "1997 Toyota Avalon: Coupe"
export default function App() {
	return (
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
}
```

### withExtendedContext HOC example

The only other export from this package is the named export `withExtendedContext`. Generally, you don't deal with too many different types of React.Context, so this HOC provides a way to scope your context without having to constantly pass it down.

The signature that it expects is identical to ReactExtendContext, but you no longer have to pass Context at each level.

```jsx
import React from 'react';
import { withExtendedContext } from 'react-extend-context';

...
const ExtendedCarContext = withExtendedContext( CarContext );
...

// The expected outcome is "1997 Toyota Avalon: Coupe"
export default function App() {
    return (
        <ExtendedCarContext make="Toyota">
            <ExtendedCarContext model="Avalon">
                <ExtendedCarContext type="Coupe">
                    <ExtendedCarContext year={1997}>
                        <Display />
                    </ExtendedCarContext>
                </ExtendedCarContext>
            </ExtendedCarContext>
        </ExtendedCarContext>
    );
}
```

Similarly, you can mix and match which attributes are passed at which level:

```jsx
import React from 'react';
import { withExtendedContext } from 'react-extend-context';

...
const ExtendedCarContext = withExtendedContext( CarContext );
...

// The expected outcome is "1997 Toyota Avalon: Coupe"
export default function App() {
    return (
        <ExtendedCarContext make="Toyota" model="Avalon">
            <ExtendedCarContext type="Coupe" year={1997}>
                <Display />
            </ExtendedCarContext>
        </ExtendedCarContext>
    );
}
```

## LICENSE

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[license]: https://github.com/testing-library/react-testing-library/blob/master/LICENSE
<!-- prettier-ignore-end -->
