import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  @Output() chatSelected = new EventEmitter<any>();
  @Input() selectedChatId: number | null = null;

  searchQuery = '';

  chats = [
    {
      id: 1,
      username: 'Sarah M.',
      userImage: 'https://i.pravatar.cc/100?img=47',
      myItem: 'Vintage Camera',
      theirItem: 'MacBook Pro',
      lastMessage: 'I can meet at Central Park on Saturday!',
      timestamp: '2m ago',
      unread: 2,
      status: 'online',
      myItemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=60&h=60&fit=crop',
      theirItemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop'
    },
    {
      id: 2,
      username: 'Mike R.',
      userImage: 'https://i.pravatar.cc/100?img=12',
      myItem: 'Headphones',
      theirItem: 'PlayStation 5',
      lastMessage: 'Deal confirmed! See you tomorrow.',
      timestamp: '1h ago',
      unread: 0,
      status: 'online',
      myItemImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop',
      theirItemImage: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=60&h=60&fit=crop'
    },
    {
      id: 3,
      username: 'Anna K.',
      userImage: 'https://i.pravatar.cc/100?img=5',
      myItem: 'Desk Lamp',
      theirItem: 'Yoga Mat Set',
      lastMessage: 'What condition is the lamp in?',
      timestamp: '3h ago',
      unread: 1,
      status: 'away',
      myItemImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=60&h=60&fit=crop',
      theirItemImage: 'https://images.unsplash.com/photo-1599447292325-6adc4dbc1742?w=60&h=60&fit=crop'
    },
    {
      id: 4,
      username: 'David P.',
      userImage: 'https://i.pravatar.cc/100?img=33',
      myItem: 'Travel Bag',
      theirItem: 'Drone',
      lastMessage: 'Sounds good, I\'ll bring it Saturday.',
      timestamp: 'Yesterday',
      unread: 0,
      status: 'offline',
      myItemImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop',
      theirItemImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=60&h=60&fit=crop'
    }
  ];

  get filteredChats() {
    if (!this.searchQuery.trim()) return this.chats;
    const q = this.searchQuery.toLowerCase();
    return this.chats.filter(c =>
      c.username.toLowerCase().includes(q) ||
      c.myItem.toLowerCase().includes(q) ||
      c.theirItem.toLowerCase().includes(q)
    );
  }

  openChat(chat: any) {
    chat.unread = 0;
    this.chatSelected.emit(chat);
  }

  totalUnread() {
    return this.chats.reduce((sum, c) => sum + c.unread, 0);
  }
}