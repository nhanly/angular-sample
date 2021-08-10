import { Injectable, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserStoreState } from './users.store.state';
import { Store } from 'src/app/infrastructure/store/store';
import { StoreRequestStateUpdater } from 'src/app/infrastructure/api-integration/types/store-request-state-updater';
import { UsersEndPoint } from './users.endpoint';
import { Users } from '../types/users.type';
import { getStoreRequestStateUpdater } from 'src/app/shared/helpers/endpoint.helpers';

@Injectable()
export class PatientStore extends Store<UserStoreState> implements OnDestroy {
	private unsubscribe$: Subject<undefined> = new Subject();
	private storeRequestStateUpdater: StoreRequestStateUpdater;

	constructor(private readonly endpoint: UsersEndPoint) {
		super(new UserStoreState());

		this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
	}

	getUsers(): void {
		this.endpoint
			.getData(this.storeRequestStateUpdater)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((users: Users[]) => {
				this.setUsers(users);
			});
	}

	setUsers(users: Users[]) {
		this.setState({
			...this.state,
			users,
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
