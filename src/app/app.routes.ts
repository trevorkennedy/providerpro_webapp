import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MaincontainerComponent } from './containers/maincontainer/maincontainer.component';
import { DemoComponent } from './pages/demo/demo.component';

export const rootRouterConfig: Routes = [{
	path: '',
	component: MaincontainerComponent,
	children: [

		{ path: '', component: HomeComponent },
		{ path: 'contact', component: ContactComponent },
		{ path: 'demo', component: DemoComponent },

		// Fallback
		{ path: '**', component: PageNotFoundComponent }
	]
}];

