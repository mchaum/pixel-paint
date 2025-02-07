import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pixel-grid',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pixel-grid.component.html',
  styleUrl: './pixel-grid.component.scss'
})
export class PixelGridComponent {
  @Input() selectedColor: string = '#000000';
  @Input() isErasing: boolean = false;
  @Input() gridSize: number = 32;

  pixels: string[][] = [];
  isDrawing: boolean = false;

  constructor() {
    this.createGrid();
  }

  createGrid() {
    this.pixels = Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill('#FFFFFF')
    );
  }

  startDrawing(row: number, col: number) {
    this.isDrawing = true;
    this.paintPixel(row, col);
  }

  paintPixel(row: number, col: number) {
    if (this.isDrawing) {
      this.pixels[row][col] = this.isErasing ? '#FFFFFF' : this.selectedColor;
    }
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  exportToImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) return;
  
    const pixelSize = 10;
    canvas.width = this.gridSize * pixelSize;
    canvas.height = this.gridSize * pixelSize;
  
    this.pixels.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        ctx.fillStyle = color;
        ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
      });
    });
  
    // Ajustement de l'orientation //
    const rotatedCanvas = document.createElement('canvas');
    const rotatedCtx = rotatedCanvas.getContext('2d');
    if (rotatedCtx) {
      rotatedCanvas.width = canvas.height;
      rotatedCanvas.height = canvas.width;
      rotatedCtx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
      rotatedCtx.rotate(Math.PI / 2);  // Rotation de 90° dans le sens des aiguilles d'une montre //
      rotatedCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
    }

    const mirroredCanvas = document.createElement('canvas');
    const mirroredCtx = mirroredCanvas.getContext('2d');
    if (mirroredCtx) {
      mirroredCanvas.width = rotatedCanvas.width;
      mirroredCanvas.height = rotatedCanvas.height;
      mirroredCtx.translate(mirroredCanvas.width, 0);
      mirroredCtx.scale(-1, 1); // Flip horizontal //
      mirroredCtx.drawImage(rotatedCanvas, 0, 0);
    }
  
    const link = document.createElement('a');
    link.href = mirroredCanvas.toDataURL('image/png');
    link.download = 'pixel-art.png';
    link.click();
  }
  
}