import { MessageService } from 'primeng/api';
import { ColorService } from './../../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors:Color[];

  constructor(private colorService:ColorService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(data=>{
      this.colors = data
    })
  }

  selectColorId(color:Color){
      window.location.href=`cars/colorId/${color.id}`
  }

  carDelete(val:Number){
    if(confirm("Are you sure want to delete?")){
      this.colorService.deleteColor(val).subscribe(()=>{
        setTimeout(() => {
          location.reload();
        }, 1500);
        this.messageService.add({
          severity: 'warn',
          summary: 'Brand Successfully Deleted'
        })
      })
    }
  }
}
