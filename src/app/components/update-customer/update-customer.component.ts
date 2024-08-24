import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
  updateCustomerForm!: FormGroup ;

  id: number = this.activatedRoute.snapshot.params["id"];
  
  
  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,private service: CustomerService, private route: Router){}
  
  ngOnInit() {

    this.updateCustomerForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    })

    this.getCustomerById();
   
    
  }

  getCustomerById(){
    this.service.getAllCustomerById(this.id).subscribe((res)=>{
      console.log(res);
      this.updateCustomerForm.patchValue(res);
    })

  }

  updateCustomer(){
    this.service.updateCustomer(this.id,this.updateCustomerForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id !=null){
        this.route.navigateByUrl("")
      }

    })

  }

}
