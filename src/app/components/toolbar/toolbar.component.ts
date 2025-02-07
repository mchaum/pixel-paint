import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faEraser, faPenNib, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() colorChange = new EventEmitter<string>();
  @Output() toggleEraser = new EventEmitter<void>();
  @Output() clearCanvas = new EventEmitter<void>();
  @Output() exportImage = new EventEmitter<void>();

  selectedColor: string = '#000000';
  isEraserActive: boolean = false;

  faDownload = faDownload;
  faEraser = faEraser;
  faPen = faPenNib;
  faTrash = faTrash;

  onColorChange(event: any) {
    this.selectedColor = event.target.value;
    this.colorChange.emit(this.selectedColor);
  }

  onToggleEraser() {
    this.isEraserActive = !this.isEraserActive;
    this.toggleEraser.emit();
  }

  onClearCanvas() {
    this.clearCanvas.emit();
  }

  onExportImage() {
    this.exportImage.emit();
  }
}