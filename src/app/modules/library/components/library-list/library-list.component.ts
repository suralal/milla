import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'milla-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {
  searchItems: string;
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut'];
  searchSigns: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchSigns = this.fb.group({
      searchItems: ['', Validators.required]
    });
  }
}
