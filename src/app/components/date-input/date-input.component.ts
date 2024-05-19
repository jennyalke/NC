import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker'
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { CommonModule } from '@angular/common'
import moment, { Moment } from 'moment'
import { DataService } from '../../services/data.service'

const MOMENT_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY-MM',
  },
}

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_FORMAT },
  ],
})
export class DateInputComponent {
  constructor(private dataService: DataService) {}

  @Input() fieldTitle: string | undefined
  @ViewChild('picker') datepicker!: MatDatepicker<Moment>

  value = this.dataService.eventDate$

  openDatepicker() {
    this.datepicker.open()
  }

  onValueChanged(newValue: Moment | null) {
    this.dataService.updateEventDate(newValue)
  }
}
