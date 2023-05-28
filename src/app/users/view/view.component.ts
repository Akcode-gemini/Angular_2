import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  allData:any[]=[];
   flag:boolean=false;
 constructor(private dataService:DataService){
}

ngOnInit(){
if(this.dataService.shareData.length>0){
this.allData=this.dataService.shareData;
console.log(this.allData);
this.flag=true;
}
}
}
