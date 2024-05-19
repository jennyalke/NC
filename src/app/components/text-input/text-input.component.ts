import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  constructor(private dataService: DataService) {}
  @Input() fieldTitle: string | undefined

  value = this.dataService.eventTitle$

  onValueChanged(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value

    this.dataService.updateEventTitle(newValue)
  }
}
