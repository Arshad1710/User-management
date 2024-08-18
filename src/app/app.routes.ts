import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './login/home/home.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { ProductPageComponent } from './product/product-page/product-page.component';
import { UploadProductComponent } from './product/upload-product/upload-product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductDataService } from './product/product-data.service';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'product',
        component: ProductPageComponent
    },
    { path: 'product/:name', 
        component: ProductDetailComponent 
    },
    {
        path: 'upload-product',
        component: UploadProductComponent,
        canActivate: [authGuard],
        data: { role: 'admin'}
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
