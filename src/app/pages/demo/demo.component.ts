import { Component, OnInit } from '@angular/core';
import { Provider } from '../../classes/provider';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

	provider: Provider = new Provider();
	errorLookup: string;
	errorSearch: string;
	lookingup: boolean = false;
	searching: boolean = false;
	step = 0;
	selectedProvider;

	searchResults = [];

	hospitals;
	filter: string = '';
	filteredFacilityResults = [];
	selectedHospital;

	insuranceProviders = {
		bcbs: false,
		cigna: false,
		aetna: false,
		uhc: false,
		neighborhood: false,
		humana: false
	};

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.api.getHospitals().subscribe(hospitals => {
			this.hospitals = hospitals;
		})
	}

	lookup() {
		this.errorLookup = null;
		this.errorSearch = null;
		if(this.provider.npi.length != 10) {
			this.errorLookup = 'Please enter a valid NPI';
			return;
		}

		this.lookingup = true;
		this.api.getProviderByNPI(this.provider).subscribe((results: any) => {
			console.log(results);
			this.lookingup = false;
			this.selectedProvider = results.other_name.Rows[1].Data;
			this.step += 2; // skip search results
		}, err => {
			this.lookingup = false;
			this.errorLookup = 'There was an issue finding a provider with that NPI';
		});
	}

	search() {
		this.errorLookup = null;
		this.errorSearch = null;
		this.searchResults = [];
		this.lookingup = true;

		this.api.getProviderSearch(this.provider).subscribe((results: any) => {
			// let body = JSON.parse(results['body-json'].body);
			for(var i=1; i<results.retults.Rows.length; i++) {
				this.searchResults.push(results.retults.Rows[i].Data);
			}
			this.lookingup = false;
			this.step++;
		});
	}

	selectDoc(doc) {
		this.selectedProvider = doc;
		this.step++;
	}

	selectInstitution() {
		this.step++;
	}

	searchHospitals(filter) {
		filter = filter.toUpperCase();
		this.filteredFacilityResults = [];
		this.hospitals.forEach(hospital => {
			if(hospital.name.toUpperCase().indexOf(filter) > -1 || hospital.city.toUpperCase().indexOf(filter) > -1 || hospital.healthSystem.toUpperCase().indexOf(filter) > -1) {
				this.filteredFacilityResults.push(hospital);
			}
		});
	}

	addFacility(hospital) {
		this.selectedHospital = hospital;
		this.filteredFacilityResults = [];
		this.filter = '';
	}

	selectPayers() {
		this.step++;
	}

	providerClick(insurance) {
		this.insuranceProviders[insurance] = !this.insuranceProviders[insurance];
	}

	complete() {
		this.step++;
	}
}
