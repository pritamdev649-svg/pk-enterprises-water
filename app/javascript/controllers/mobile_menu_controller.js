import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "openIcon", "closeIcon"]
  static values = { isOpen: { type: Boolean, default: false } }

  toggle() {
    this.isOpenValue = !this.isOpenValue
    if (this.isOpenValue) {
      this.menuTarget.classList.remove("hidden")
      if (this.hasOpenIconTarget) this.openIconTarget.classList.add("hidden")
      if (this.hasCloseIconTarget) this.closeIconTarget.classList.remove("hidden")
    } else {
      this.menuTarget.classList.add("hidden")
      if (this.hasOpenIconTarget) this.openIconTarget.classList.remove("hidden")
      if (this.hasCloseIconTarget) this.closeIconTarget.classList.add("hidden")
    }
  }

  close() {
    this.isOpenValue = false
    this.menuTarget.classList.add("hidden")
    if (this.hasOpenIconTarget) this.openIconTarget.classList.remove("hidden")
    if (this.hasCloseIconTarget) this.closeIconTarget.classList.add("hidden")
  }
}
