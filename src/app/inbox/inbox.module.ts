import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InboxRoutingModule } from './inbox-routing.module';
import { HomeInboxComponent } from './home-inbox/home-inbox.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailCreateComponent } from './email-create/email-create.component';
import { EmailReplyComponent } from './email-reply/email-reply.component';
import { EmailIndexComponent } from './email-index/email-index.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShareModule } from '../share/share.module';
import { EmailFormComponent } from './email-form/email-form.component';

@NgModule({
  declarations: [
    HomeInboxComponent,
    EmailShowComponent,
    EmailCreateComponent,
    EmailReplyComponent,
    EmailIndexComponent,
    PlaceholderComponent,
    NotFoundComponent,
    EmailFormComponent,
  ],
  imports: [CommonModule, InboxRoutingModule, ShareModule, ReactiveFormsModule],
})
export class InboxModule {}
