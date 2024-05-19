import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { DateInputComponent } from './components/date-input/date-input.component'
import { TextInputComponent } from './components/text-input/text-input.component'
import { CountdownComponent } from './components/countdown/countdown.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DateInputComponent, TextInputComponent, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
