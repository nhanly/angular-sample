import { StoreRequestStateUpdater } from 'src/app/infrastructure/api-integration/types/store-request-state-updater';

export function getStoreRequestStateUpdater(
	store: any,
): StoreRequestStateUpdater {
	return (requestName, requestState) => {
		store.setState({
			...store.state,
			requests: {
				...store.state.requests,
				[requestName]: requestState,
			},
		});
	};
}
