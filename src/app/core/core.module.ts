import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalGuard } from './authentication/portal.guard';
import { AuthGuard } from './authentication/auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthGuard, PortalGuard],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('Only import in AppModule');
    }
  }
}
