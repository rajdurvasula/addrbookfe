import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  
  private contacts: Contact[];
  private apiUrl = '/api/contacts';
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  

  constructor(private http: HttpClient) { }
  
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl)
    .pipe(
      tap(_ => console.log('Fetched Contacts ..')),
      catchError(this.handleError<Contact[]>('getContacts', [])));
  }
  
  getContact(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Contact>(url)
    .pipe(
      tap(_ => console.log(`Fetched Contact with Id: ${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`)));
  }
  
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, this.httpOptions)
    .pipe(
      tap((newContact: Contact) => console.log(`Contact added with Id: ${newContact.id}`)),
      catchError(this.handleError<Contact>('addContact')));
  }
  
  updateContact(contact: Contact): Observable<any> {
    const url = `${this.apiUrl}/${contact.id}`;
    return this.http.put(url, contact, this.httpOptions)
    .pipe(
      tap(_ => console.log(`Contact with Id: ${contact.id} updated`)),
      catchError(this.handleError<any>('updateContact')));
  }
  
/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
}
