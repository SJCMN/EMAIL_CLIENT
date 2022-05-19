import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInboxComponent } from './home-inbox/home-inbox.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';

const routes: Routes = [{ 
  path: '', 
  component: HomeInboxComponent,
  children: [{
    path: ':id',
    component: EmailShowComponent
  },
    
    {
    path: '',
    component: PlaceholderComponent
  }] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
