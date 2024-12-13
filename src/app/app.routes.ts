import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TestComponent } from './components/test/test.component';
import { CartComponent } from './components/cart/cart.component';
export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path:"test", component:TestComponent},
  {path:"cart", component:CartComponent}
];
