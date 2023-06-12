import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlName,
  FormArray,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  title = 'Create Form';
  t = '';
  allData: any[] = [];
  tmpArr: any[] = [];
  createForm: FormGroup;
  cat: any = ['General', 'SC/ST', 'OBC'];
  constructor(
    private modalService: NgbModal,
    private dataService: DataService
  ) {
    this.allData = this.dataService.shareData;
  }
  ngOnInit() {
    this.createForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      category: new FormControl('', [Validators.required]),
      technologies: new FormArray([]),
      proPic: new FormControl(''),
    });
  }
  base64String: string | ArrayBuffer | null = null;

  onFileUpload(event: any) {
    const file = event.target.files[0];

    const allowedExtensions = ['.jpg', '.jpeg', '.png'];

    const fileExtension = file.name
      .substring(file.name.lastIndexOf('.'))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      // Invalid file extension, handle the error
      this.t =
        'Invalid file extension. Please select a .jpg, .jpeg, or .png file.';
      this.createForm.value.proPic = '';
      return;
    } else {
      this.t='';
      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64String = reader.result;
        console.log('Base64 String:', this.base64String);
      };
      reader.readAsDataURL(file);
    }

    // console.log('Base64String', this.base64String);
  }

  // Getter for the technologies form array
  get technologiesFormArray() {
    return this.createForm.get('technologies') as FormArray;
  }

  // Method to handle checkbox changes
  onTechnologyChange(event: Event, technology: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.technologiesFormArray.push(new FormControl(technology));
    } else {
      const index = this.technologiesFormArray.controls.findIndex(
        (control) => control.value === technology
      );
      this.technologiesFormArray.removeAt(index);
    }
  }
  display() {
    console.log(this.createForm.value);
  }
  openModal(content: any) {
    const modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  share() {
    this.tmpArr.push(this.createForm.value);
    this.tmpArr.push(this.base64String);
    this.allData.push(this.tmpArr);
    this.base64String = '';
    this.technologiesFormArray.clear();
    this.dataService.shareData = this.allData;
    console.log(this.dataService.shareData);
    this.createForm.reset();
  }
  checkAllValidation(content: any) {
    if (this.createForm.valid) {
      this.openModal(content);
    } else {
      this.createForm.markAllAsTouched();
    }
  }
  changeCat(e: any) {
    this.cat?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
