import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  SimpleChanges,
} from '@angular/core'

@Directive({
  selector: '[appScaleText]',
  standalone: true,
})
export class ScaleTextDirective implements AfterViewInit, OnDestroy {
  private observer: MutationObserver

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.observer = new MutationObserver(() => {
      this.scaleText()
    })
  }

  ngAfterViewInit() {
    this.scaleText()
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }

  ngOnDestroy(): void {
    this.observer.disconnect()
  }

  @HostListener('window:resize')
  onResize() {
    this.scaleText()
  }

  private scaleText() {
    const container = this.el.nativeElement as HTMLElement
    const textElement = container.querySelector('span')
    container.style.maxWidth = '100vw'
    container.style.textWrap = 'nowrap'

    if (textElement) {
      const containerWidth = container.offsetWidth
      let fontSize = 10
      this.renderer.setStyle(textElement, 'fontSize', `${fontSize}px`)

      while (textElement.offsetWidth < containerWidth && fontSize < 300) {
        fontSize += 1
        this.renderer.setStyle(textElement, 'fontSize', `${fontSize}px`)
      }

      while (textElement.offsetWidth > containerWidth && fontSize > 0) {
        fontSize -= 1
        this.renderer.setStyle(textElement, 'fontSize', `${fontSize}px`)
      }
    }
  }
}
