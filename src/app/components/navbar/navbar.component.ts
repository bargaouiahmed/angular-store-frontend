import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router){}
  handleclick(){
    this.router.navigate([''])

  }
cart = inject(CartService)
handleclick2(){
  this.router.navigate(['/cart']);
}

}
