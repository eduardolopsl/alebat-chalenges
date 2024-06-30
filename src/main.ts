import { buttonsData } from './constants/buttonsData'
import { ToastData } from './types/buttons'

class GenerateNotification {
  toastContainer: HTMLDivElement
  constructor() {
    const notificationContainer = document.querySelector('#toast-container')
    if (!notificationContainer) {
      this.toastContainer = new HTMLDivElement()
      return
    }
    this.toastContainer = notificationContainer as HTMLDivElement
    const buttons = document.querySelectorAll('button[data-toast]')
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        if (
          event.target &&
          'tagName' in event.target &&
          event.target.tagName === 'BUTTON'
        ) {
          this.lifeCycleNotification(event.target as HTMLButtonElement)
        }
      })
    })
  }

  obtainObject(button: HTMLElement): ToastData | undefined {
    const type = button.getAttribute('data-toast')
    const toast = buttonsData.find((element) => element.id === type)
    return toast
  }

  searchIcon(notificationData: ToastData) {
    return notificationData.icon
  }

  searchMessage(notificationData: ToastData) {
    return notificationData.message
  }

  lifeCycleNotification(button: HTMLButtonElement) {
    const notificationData = this.obtainObject(button)
    if (!notificationData) {
      return
    }
    const icon = this.searchIcon(notificationData)
    const message = this.searchMessage(notificationData)
    const id = notificationData.id
    const toast = this.createNotification(id, icon, message)
    this.removeNotification(toast)
  }

  createNotification(id: string, icon: string, message: string): HTMLElement {
    const toast = document.createElement('article')
    const toastIcon = document.createElement('img')
    const toastMessage = document.createElement('p')
    toastIcon.src = icon
    toastMessage.innerText = message
    toast.appendChild(toastIcon)
    toast.appendChild(toastMessage)
    toast.classList.add('toast')
    toast.classList.add(id)

    this.toastContainer.appendChild(toast)

    return toast
  }

  animateNotification() {}

  removeNotification(toast: HTMLElement) {
    setTimeout(() => {
      this.toastContainer.removeChild(toast)
    }, 3000)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GenerateNotification()
})
