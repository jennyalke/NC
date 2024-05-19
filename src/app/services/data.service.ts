import { Injectable } from '@angular/core'
import moment, { Moment } from 'moment'
import { BehaviorSubject } from 'rxjs'

const TITLE_KEY = 'EVENT_TITLE'
const DATE_KEY = 'EVENT_DATE'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private eventTitleSubject = new BehaviorSubject<string>(localStorage.getItem(TITLE_KEY) ?? '')
  eventTitle$ = this.eventTitleSubject.asObservable()

  private eventDateSubject = new BehaviorSubject<Moment | undefined>(
    localStorage.getItem(DATE_KEY) ? moment(localStorage.getItem(DATE_KEY)) : undefined,
  )
  eventDate$ = this.eventDateSubject.asObservable()

  updateEventTitle(newTitle: string) {
    this.eventTitleSubject.next(newTitle)
    localStorage.setItem(TITLE_KEY, newTitle)
  }

  updateEventDate(date: Moment | null | undefined) {
    if (!date) {
      localStorage.removeItem(DATE_KEY)
      this.eventDateSubject.next(undefined)
      return
    }

    this.eventDateSubject.next(date)
    localStorage.setItem(DATE_KEY, date.format('YYYY-MM-DD'))
  }
}
