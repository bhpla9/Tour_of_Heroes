import { Component } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {} // Must be public as Angular only binds to public component properties

}
