import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ProjectService } from '@app/project/project.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends BaseComponent implements OnInit {

  public isDocumentTypeFormAttemptSubmit :Boolean = false;
  public documentTypeSaveForm : FormGroup;

  public documentTypeList : Array<any>; // Project document types

  constructor(private projectService: ProjectService) {
    super(projectService);
  }

  ngOnInit() {
    this.documentTypeSaveForm = new FormGroup({
      documentTypeId : new FormControl(''),
      type : new FormControl('', Validators.required),
      drawingSeries : new FormControl('',  Validators.required),
    });

    this.getDocumentTypes();
  }

  // Convenience getter for easy access to leave request form fields.
  get documentTypeForm() { return this.documentTypeSaveForm.controls; }

  public onDocumentTypeSubmitted(){
    this.isDocumentTypeFormAttemptSubmit = true;
    if(this.documentTypeSaveForm.valid) {
      let documentType = this.documentTypeSaveForm.value;
      documentType.documentTypeId = documentType.documentTypeId == "" ? 0 : documentType.documentTypeId;
      this.projectService.saveOrUpdateDocumentType(documentType).subscribe((resp:any)=>{
        this.showAlert("Document type details has been submitted successfully");
        this.getDocumentTypes();
        this.closeDocumentTypeEntryForm();
      });
    } else {
      this.showAlert("Please fill all the mandatory fields before submit.");
    }
  }

  public editDocumentTypeDetails(documentTypeInfo:any){
    this.openDocumentTypeEntryForm();
    this.documentTypeSaveForm.patchValue(documentTypeInfo);
  }

  /* Add / Save View  Model Open Close Method */
  public openDocumentTypeEntryForm() {
    this.isDocumentTypeFormAttemptSubmit = false;
    document.getElementById('documentTypeModal').classList.toggle('d-block');
  }

  public resetAndOpenDocumentTypeEntryForm() {
    this.documentTypeSaveForm.reset();
    this.isDocumentTypeFormAttemptSubmit = false;
    document.getElementById('documentTypeModal').classList.toggle('d-block');
  }

  public closeDocumentTypeEntryForm() {
    this.documentTypeSaveForm.reset();
    this.isDocumentTypeFormAttemptSubmit = false;
    document.getElementById('documentTypeModal').classList.toggle('d-block');
  }

  protected getDocumentTypes(){
    this.projectService.getProjectDocumentTypes().subscribe((resp: any) => {
      this.documentTypeList = resp.documentTypes;
    });
  }

}
