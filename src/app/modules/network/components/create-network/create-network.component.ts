import { GetSelectedNetwork } from './../../../../store/network/actions/get-selected-network.actions';
import { map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateNetworkService } from './../../../../store/network/services/create-network.service';
import { Languages } from './../../../shared/services/languages/languages';
import { UploadImageService } from '../../../shared/services/upload-image.service';
import {
  NetworksState,
  GetSelectedNetwork$,
  UpdateNetworkService
} from '../../../../store/network';
import { API_BASE_URL } from './../../../../utils/config';
import { MillaNetwork } from '../../../../store/models';
import { isEmptyObject } from '../../../../utils/helpers';

@Component({
  selector: 'milla-create-network',
  templateUrl: './create-network.component.html',
  styleUrls: ['./create-network.component.scss']
})
export class CreateNetworkComponent implements OnInit {
  networkPicURL: string;
  selectedNetwork: MillaNetwork;
  id: any;
  formData: FormData;
  uploadedNetworkPic: any;
  ageArray: number[];
  createNetworkForm: FormGroup;
  languages: any[];
  errorMessage;
  constructor(
    private fb: FormBuilder,
    private createNetworkService: CreateNetworkService,
    private updateNetworkService: UpdateNetworkService,
    private router: Router,
    private uploadImageService: UploadImageService,
    private networkStore: Store<NetworksState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getAndLoadNetworkDetails(this.id);
    }
    this.ageArray = Array(100).fill(100);
    this.createNetworkForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      language: ['', Validators.required],
      client_age: ['20', Validators.required],
      client_gender: ['MALE', Validators.required]
    });
    this.languages = Languages;
  }
  submitCreateNetworkForm() {
    if (this.createNetworkForm.valid) {
      if (this.id) {
        this.updateNetworkService
          .updateNetwork(this.createNetworkForm.value, this.id)
          .subscribe(
            res => {
              this.uploadNetworkPhoto(this.id);
              this.router.navigate(['/dashboard']);
            },
            err => {
              if (err.status === 500) {
                this.errorMessage = 'Something happend. Retry Later';
              } else {
                this.errorMessage = err.error.errors[0].message;
              }
            }
          );
      } else {
        this.createNetworkService
          .createNetwork(this.createNetworkForm.value)
          .subscribe(
            res => {
              this.uploadNetworkPhoto(res.id);
              this.router.navigate(['/dashboard']);
            },
            err => {
              if (err.status === 500) {
                this.errorMessage = 'Something happend. Retry Later';
              } else {
                this.errorMessage = err.error.errors[0].message;
              }
            }
          );
      }
    } else {
      Object.keys(this.createNetworkForm.controls).forEach(field => {
        const control = this.createNetworkForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  saveNetworkPhoto(e) {
    console.log(e);
    const fileBrowser = e.target;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.formData = new FormData();
      this.formData.append('networkPicture', fileBrowser.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        this.uploadedNetworkPic = reader.result;
      };
      reader.readAsDataURL(fileBrowser.files[0]);
    }
  }
  uploadNetworkPhoto(id) {
    if (this.formData) {
      const url = `${API_BASE_URL}/networks/${id}/picture`;
      this.uploadImageService.uploadImage(url, this.formData).subscribe(res => {
        // this.formData.delete('networkPicture');
      });
    }
  }
  getAndLoadNetworkDetails(id: string): any {
    this.networkStore.dispatch(new GetSelectedNetwork({ id: id }));
    this.networkStore.select(GetSelectedNetwork$).subscribe(res => {
      this.selectedNetwork = res;
      if (!isEmptyObject(res)) {
        this.createNetworkForm.patchValue({
          title: res.title,
          description: res.description,
          language: res.language,
          client_age: res.client_age,
          client_gender: res.client_gender
        });
        this.networkPicURL = res.image_url;
      }
    });
  }
}
