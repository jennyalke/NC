import { Component, OnDestroy, OnInit } from '@angular/core'
import { Moment } from 'moment'
import { Observable, Subscription, map, switchMap, timer } from 'rxjs'
import { DataService } from './../../services/data.service'
import { CommonModule } from '@angular/common'
import { ScaleTextDirective } from '../../directives/text-scale.directive'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, ScaleTextDirective],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}
  countdown$!: Observable<Moment | undefined>
  eventTitle = this.dataService.eventTitle$
  eventDate = this.dataService.eventDate$

  private subscription!: Subscription
  days: number = 0
  hours: number = 0
  minutes: number = 0
  seconds: number = 0

  ngOnInit(): void {
    this.countdown$ = this.dataService.eventDate$.pipe(
      switchMap(targetDate => timer(0, 1000).pipe(map(() => targetDate))),
    )

    this.subscription = this.countdown$.subscribe(targetDate => {
      this.calculateTime(targetDate)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private resetTime() {
    this.days = 0
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
  }

  private calculateTime(date?: Moment): void {
    console.log(date)
    if (!date) {
      this.resetTime()
      return
    }

    const now = new Date().getTime()
    const difference = date.toDate().getTime() - now

    if (difference <= 0) {
      this.resetTime()
      return
    }

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24))
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000)
  }
}
