import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
// import test from 'node:test';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });
  
  it('should be created', () => { // Service should be created
    expect(service).toBeTruthy();
  });

  it('should be empty of messages when created', () => { // Should be no messages when the service is created
    expect(service.messages).toHaveSize(0);
  });

  it('should be deleted when clear button is clicked', () => { // Messages should be deleted (array emptied) when the clear button is clicked 
    expect(service.messages).toHaveSize(0);
  });

  it('should add a message', () => {
    const testMessage = 'Test Message'
    service.add(testMessage)
    expect(service.messages.length).toBe(1) // Should contain the test message above 
    expect(service.messages[0]).toBe(testMessage); // Should include the test message
  });
});
