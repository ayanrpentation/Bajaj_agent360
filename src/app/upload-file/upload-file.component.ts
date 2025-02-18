import { Component, OnInit } from '@angular/core';
import { AfterViewInit} from '@angular/core';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';
import { Location } from '@angular/common';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  // selectedFiles: any;
  // currentFileUpload:any;

  fileList = [] as any;

  uploadtype = 'a';

  fd = new FormData;

  confType = "Between";
  confVal = '';
  confUpperRange = null;
  confLowerRange = 0;
  confScore = 0;

  deletefileId = -1;
  editconfid = -1;

  editScore = 0;
  maxScoreConfig = [] as any;
  totalScore = 0;

  



  agentScoreCard = true;

  filetype_dropdownList = [] as any;
  filetype_selectedItems = [] as any;
  filetype_dropdownSettings:IDropdownSettings = {} as any

  bifurcation_dropdownList = [] as any;
  bifurcation_selectedItems = [] as any;
  bifurcation_dropdownSettings:IDropdownSettings = {} as any


  scoreConfigList = [] as any;

  constructor(    private rest: RestApiService,
    private notifier: NotifierService,
    private common: CommonService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFileTypeList();
    this.getUploadedFileList();
    // this.getScoreConfig();
    // this.getHeadWiseMaxScore();
    // this.filetype_dropdownList = [{"filetype": 'RM CH ZH MAPPING FILE'}]

    this.filetype_dropdownSettings = {
      singleSelection: true,
      idField: 'filetype',
      textField: 'filetype',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }



  }

  saveFile(event:any){
    // let formData = new FormData();
    // this.selectedFiles = event.target.files;
    // this.currentFileUpload = this.selectedFiles.item(0);


    // // console.log(this.currentFileUpload)
    // formData.append('file', this.currentFileUpload);

    // formData.append('labelName', 'test');
    // formData.append('formPart', 'test');
    // console.log(JSON.stringify(formData))

    this.fd = new FormData();
    const files = event.target.files;
    // console.log("file details", files);
    // console.log("file details", files[0]);

    this.fd.append('file', files[0]);
    this.fd.append('id', '12');

    // console.log(fd);

    


  }
  
  uploadFile(){
    this.fd.append('fileType', this.filetype_selectedItems[0].filetype);
    this.fd.append('uploadtype', this.uploadtype);
    // console.log(this.fd);
    this.rest.uploadFile(this.fd).subscribe((res: any) => {
      if (res.success) {        
        // this.bifurcation_dropdownList = res.bifurcationList;
        this.notifier.notify( 'success',this.filetype_selectedItems[0].filetype + " File Uploaded Successfully")
        
      } else {
        this.notifier.notify( 'error',"Some error occurred while "+this.filetype_selectedItems[0].filetype + " File")

      }
    });
  }

  closeModal(){
    this.modalService.dismissAll();
  }
  openDeleteModal(modal:any, id:any){
    this.deletefileId = id;
    this.modalService.open(modal, {centered: true, size: 'sm'});

  }

  openEditSection(id:any){
    this.editconfid = id;
    this.editScore = 1;

  }


  deleteFile(){

    
    const data = {
      conf_id: this.deletefileId
    }
    this.rest.deleteFile(data).subscribe((res: any) => {
      if (res.success) {        
        // this.bifurcation_dropdownList = res.bifurcationList;
        this.notifier.notify('success', res.message);
        this.modalService.dismissAll();
        // this.getScoreConfig();

        this.deletefileId = -1;
        
      } else {
      }
    });
  }

  getFileTypeList(){
    this.rest.getFileTypeList().subscribe((res: any) => {
      if (res.success) {        
        this.filetype_dropdownList = res.result;
        
      } else {
      }
    });
  }

  getUploadedFileList(){
    const data = {
      fileType: this.filetype_selectedItems
    }
    this.rest.getUploadedFileList(data).subscribe((res: any) => {
      if (res.success) {        
        this.fileList = res.result;
        
      } else {
      }
    });
  }

  
  // getScoreConfig(){

    

  //   const data = {
  //     head : this.filetype_selectedItems,
  //     bifurcation : this.bifurcation_selectedItems,
     
  //   }  
  //   this.rest.getScoreConfig(data).subscribe((res: any) => {
  //     if (res.success) {        
  //       this.scoreConfigList = res.scoreConfigList
  //       // return this.zone_dropdownList
  //     } else {
  //     }
  //   });

  // }
  resetAll(){

  }

}
