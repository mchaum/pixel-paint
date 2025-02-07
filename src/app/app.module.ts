import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PixelGridComponent } from './components/pixel-grid/pixel-grid.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PixelGridComponent,
    ToolbarComponent,
    HomeComponent
  ],
  providers: [],
})
export class AppModule {}
