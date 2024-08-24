import { Component } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { PdfService } from 'src/app/service/pdf.service';

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css']
})
export class GetAllCustomersComponent {

  customers :  any =[];

  filter = ""
  filteredCusetomer:  any =[];



  constructor(private customerService: CustomerService,private _pdfservice:PdfService){}
  ngOnInit(){
    this.getAllCustomer();
  }
  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe((res)=>{
      console.log(res);
      this.customers=res
      this.filteredCusetomer=this.customers
    })
  }

  deleteCustomer(id: number){

    this.customerService.deleteCustomer(id).subscribe((res)=>{
      console.log(res);
      this.getAllCustomer();
     
    })

  }

  generatePdf() {
    // Llama al método del servicio para generar el PDF
    this._pdfservice.generatePdf(this.filteredCusetomer); // Usa los datos filtrados para el PDF
  }

  onFilterChange(value: string) {
    this.filter = value;
    this.applyFilter();
  }




  applyFilter() {
    if (this.filter) {
      this.filteredCusetomer = this.customers.filter((user:any) => 
        user.name.toLowerCase().includes(this.filter.toLowerCase()) ||
        user.phone.toLowerCase().includes(this.filter.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filter.toLowerCase())
       
      );
    } else {
      this.filteredCusetomer = [...this.customers]; // Muestra todos los usuarios si no hay filtro
    }
  }



}
