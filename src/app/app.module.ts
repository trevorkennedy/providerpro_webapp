import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { rootRouterConfig } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MaincontainerComponent } from './containers/maincontainer/maincontainer.component';
import { ApiService } from './services/api/api.service';
import { DemoComponent } from './pages/demo/demo.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CheckmarkComponent } from './components/checkmark/checkmark.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ContactComponent,
		PageNotFoundComponent,
		MaincontainerComponent,
		DemoComponent,
		LoadingComponent,
		CheckmarkComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(rootRouterConfig, { useHash: false })
	],
	providers: [
		ApiService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
