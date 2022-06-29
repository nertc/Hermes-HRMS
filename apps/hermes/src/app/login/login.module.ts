import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './login.routes';

const components = [LoginComponent];

const services = [LoginService];

@NgModule({
  declarations: [...components],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [...services],
  exports: [...components],
})
export class LoginModule {}
