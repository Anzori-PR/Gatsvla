import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  mine: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnChanges {
  @Input() chat: any;
  @Output() backClicked = new EventEmitter<void>();
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  newMessage = '';
  showDealPanel = false;

  allMessages: { [chatId: number]: Message[] } = {
    1: [
      { id: 1, text: 'Hey! I saw you have a vintage camera listed 📷', mine: false, timestamp: '10:24 AM' },
      { id: 2, text: 'Yes! It\'s a Leica M1 in great condition. Still interested in the MacBook?', mine: true, timestamp: '10:25 AM', status: 'read' },
      { id: 3, text: 'Absolutely. Can we meet somewhere in Manhattan?', mine: false, timestamp: '10:26 AM' },
      { id: 4, text: 'I can meet at Central Park on Saturday!', mine: false, timestamp: '10:27 AM' },
      { id: 5, text: 'Saturday works great. Around noon?', mine: true, timestamp: '10:28 AM', status: 'read' }
    ],
    2: [
      { id: 1, text: 'Still on for the headphones trade?', mine: false, timestamp: '9:00 AM' },
      { id: 2, text: 'Yes! Bringing them tomorrow', mine: true, timestamp: '9:05 AM', status: 'delivered' },
      { id: 3, text: 'Deal confirmed! See you tomorrow.', mine: false, timestamp: '9:06 AM' }
    ],
    3: [
      { id: 1, text: 'Hi! Interested in trading my yoga mat for your desk lamp', mine: false, timestamp: 'Yesterday' },
      { id: 2, text: 'Sure, what\'s the condition of the mat?', mine: true, timestamp: 'Yesterday', status: 'read' },
      { id: 3, text: 'What condition is the lamp in?', mine: false, timestamp: '3h ago' }
    ],
    4: [
      { id: 1, text: 'Love the leather bag! Drone for it?', mine: false, timestamp: 'Yesterday' },
      { id: 2, text: 'Sounds good, I\'ll bring it Saturday.', mine: true, timestamp: 'Yesterday', status: 'read' }
    ]
  };

  get messages(): Message[] {
    if (!this.chat) return [];
    return this.allMessages[this.chat.id] || [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chat']) {
      this.showDealPanel = false;
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  scrollToBottom() {
    if (this.messagesEnd?.nativeElement) {
      this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  sendMessage() {
    const text = this.newMessage.trim();
    if (!text || !this.chat) return;

    const msg: Message = {
      id: Date.now(),
      text,
      mine: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    if (!this.allMessages[this.chat.id]) {
      this.allMessages[this.chat.id] = [];
    }
    this.allMessages[this.chat.id].push(msg);
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 50);
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  toggleDealPanel() {
    this.showDealPanel = !this.showDealPanel;
  }

  back() {
    this.backClicked.emit();
  }
}