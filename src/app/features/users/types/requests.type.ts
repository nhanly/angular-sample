import { RequestState } from 'src/app/infrastructure/api-integration/types/request-state';

export interface Requests {
	getData: RequestState;
	updateData: RequestState;
}
