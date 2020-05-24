import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'milla-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrls: ['./chat-side-nav.component.scss']
})
export class ChatSideNavComponent implements OnInit {
  isFirstOpen = true;
  @Input() user;
  constructor() {}

  ngOnInit() {}
}
