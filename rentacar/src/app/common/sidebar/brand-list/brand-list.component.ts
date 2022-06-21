
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands : Brand[];

  constructor(private brandService:BrandService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(data=>{
      this.brands = data
    })
  }

  brandDelete(val:Number){
    if(confirm("Are you sure want to delete?")){
      this.brandService.deleteBrand(val).subscribe(()=>{
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

  selectedBrandId(selectedBrand:Brand):void{
    window.location.href= `brand/${selectedBrand.id}`
}

selectBrandId(brandId:number):void{
  window.location.href= `car/brandId/${brandId}`
}

}
