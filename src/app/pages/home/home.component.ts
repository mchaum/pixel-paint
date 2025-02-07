import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { PixelGridComponent } from '../../components/pixel-grid/pixel-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    PixelGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(PixelGridComponent) pixelGrid!: PixelGridComponent;
  
  selectedColor: string = '#000000';
  isErasing: boolean = false;
  gridSize: number = 32;

  toggleEraser() {
    this.isErasing = !this.isErasing;
  }

  clearCanvas() {
    this.pixelGrid.createGrid();
  }

  exportToImage() {
    this.pixelGrid.exportToImage();
  }
}