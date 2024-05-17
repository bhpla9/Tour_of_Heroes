import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = []; // Create empty array of messages 

  add(message: string) {
    this.messages.push(message); // Push message into messages array
  }

  clear() {
    this.messages = []; // Empty the messages array
  }
}