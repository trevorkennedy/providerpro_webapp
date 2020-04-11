import { Injectable } from '@angular/core';
import { Contact } from '../../classes/contact';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../../classes/provider';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

	apiUrl: string = 'https://api.providerpro.co';
	constructor(public http: HttpClient) { }

	postContact(contact: Contact) {
		return this.http.post<Contact>(`${this.apiUrl}/v1/contact`, contact).toPromise();
	}

	getProviderByNPI(provider: Provider) {
		return this.http.get<Provider>(`${this.apiUrl}/db/athena?npi=${provider.npi}`)
	}

	getProviderSearch(provider: Provider) {
		return this.http.post<Provider>(`${this.apiUrl}/s/search`, provider);
	}

	public getHospitals(): Observable<any> {
        return this.http.get('/assets/hospitals.json');
    }

}
