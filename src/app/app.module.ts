import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
// Import what you need. RECOMMENDED. ✔️
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
  ShoppingCartOutline,
} from '@ant-design/icons-angular/icons';
import { CartComponent } from './cart/cart.component';
const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  ShoppingCartOutline,
];

@NgModule({
  declarations: [AppComponent, HomeComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule.forRoot(icons),
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
