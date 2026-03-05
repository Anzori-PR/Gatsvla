import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChatItem {
  id: string;

  userName: string;
  userAvatar: string;

  myItem: string;
  theirItem: string;

  lastMessage: string;
  lastTime: string;

  location?: string;
}

export interface ChatMessage {
  from: 'me' | 'them';
  text: string;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {

  private chats = new BehaviorSubject<ChatItem[]>([
    {
      id: '1',
      userName: 'Gio',
      userAvatar: 'assets/images/camera.jpg',
      myItem: 'Vintage Camera',
      theirItem: 'Smart Headphones',
      lastMessage: 'სად შევხვდეთ?',
      lastTime: '2 წთ წინ'
    },
    {
      id: '2',
      userName: 'Nino',
      userAvatar: 'assets/images/avatar2.jpg',
      myItem: 'Leather Bag',
      theirItem: 'Blue Vase',
      lastMessage: 'ხვალ თავისუფალი ხარ?',
      lastTime: '10 წთ წინ'
    }
  ])

  chats$ = this.chats.asObservable()


  private messages: { [chatId: string]: ChatMessage[] } = {
    '1': [
      { from: 'them', text: 'გამარჯობა', time: '12:10' },
      { from: 'me', text: 'გაცვლა ისევ აქტუალურია?', time: '12:11' }
    ]
  }

  getMessages(chatId: string) {
    return this.messages[chatId] || []
  }

  sendMessage(chatId: string, text: string) {

    const msg: ChatMessage = {
      from: 'me',
      text,
      time: new Date().toLocaleTimeString()
    }

    if (!this.messages[chatId]) {
      this.messages[chatId] = []
    }

    this.messages[chatId].push(msg)
  }

  setLocation(chatId: string, location: string) {

    const chats = this.chats.getValue()

    const updated = chats.map(c => {
      if (c.id === chatId) {
        return { ...c, location }
      }
      return c
    })

    this.chats.next(updated)
  }
}