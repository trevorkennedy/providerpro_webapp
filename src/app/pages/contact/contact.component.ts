import { Component, OnInit } from '@angular/core';
import { Contact } from '../../classes/contact';
import { ApiService } from '../../services/api/api.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	contact: Contact = new Contact();
	submitting: boolean = false;
	error: string;

	constructor(private api: ApiService) { }

	ngOnInit() {
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	submit() {
		this.error = null;

		if(this.contact.name.length < 1) {
			this.error = 'Please let us know your name';
		}
		if(!this.validateEmail(this.contact.email)) {
			this.error = 'Please enter a valid email address';
		}
		if(this.contact.phone.length < 10) {
			this.error = 'Please enter a valid phone number';
		}
		if(this.contact.desc.length < 1) {
			this.error = 'Please provide us with some comments';
		}
		if(this.error) {
			return;
		}

		this.submitting = true;
		this.api.postContact(this.contact);
	}

}
