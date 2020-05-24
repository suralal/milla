import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'milla-sign-create',
  templateUrl: './sign-create.component.html',
  styleUrls: ['./sign-create.component.scss']
})
export class SignCreateComponent implements OnInit {
  isChecked: boolean;
  length_num: number;
  last_item: any;
  selectedItems = [];
  signs: FormGroup;
  selected: string;
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado'];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signs = this.fb.group({
      categories: ['', Validators.required]
    });
  }
  onSelect(): void {
    this.selectedItems.push(this.signs.value.categories);
    this.removeDuplicateUsingFilter(this.selectedItems);
    this.signs.patchValue({
      categories: ''
    });
    console.log('hai', this.selectedItems);
  }
  removeDuplicateUsingFilter(selectedItems) {
    const unique_array = this.selectedItems.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.selectedItems = unique_array;
    return this.selectedItems;
  }
  onDropItemDeleted(i) {
    if (this.selectedItems.indexOf(this.selectedItems[i] > -1)) {
      this.selectedItems.splice(i, 1);
    }
    this.last_item = this.selectedItems.slice(-1).pop();
    return this.selectedItems;
  }
  toggleChecked() {
    this.isChecked = !this.isChecked;
  }
}
