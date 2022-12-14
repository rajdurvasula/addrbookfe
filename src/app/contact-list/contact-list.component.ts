import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[] = [];

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.getContacts();
    console.log(this.contacts);
  }
  
  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }
}
