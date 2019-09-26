import React, { Context } from 'react';

/**
 * The default export accepts the React Context as a prop. It will take the other props and extend on top of the current
 * value for the Context, supplying a new value for that Context tree
 */
export default function ReactExtendContext<TProps extends object>(props: ReactExtendContextProps<TProps>) {
	const { Context, children, ...extensions } = props;

	return (
		<Context.Consumer>
			{(value) => {
				// extend the old value with the new extensions
				const newValue = {
					...value,
					...extensions
				};

				return <Context.Provider value={newValue}>{children}</Context.Provider>;
			}}
		</Context.Consumer>
	);
}

/**
 * A HOC component that will return a new component with the Context in its closure. That way, the Context will only
 * have to be passed once, and the Component it returns can receive all of the other props
 */
export function withExtendedContext<TContext extends object>(Ctx: Context<TContext>) {
	return function ScopedContext(props: ScopedContextProps & Partial<TContext>) {
		return <ReactExtendContext Context={Ctx} {...props} />;
	};
}

interface ScopedContextProps {
	children: React.ReactNode;
}

type ReactExtendContextProps<TProps extends object> = ScopedContextProps & Partial<TProps> & { Context: Context<TProps> };
