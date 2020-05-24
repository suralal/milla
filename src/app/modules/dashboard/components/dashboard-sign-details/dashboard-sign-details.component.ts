import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'milla-dashboard-sign-details',
  templateUrl: './dashboard-sign-details.component.html',
  styleUrls: ['./dashboard-sign-details.component.scss']
})
export class DashboardSignDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
}
