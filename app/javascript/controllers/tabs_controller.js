import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]
  static values = { activeIndex: { type: Number, default: 0 } }

  connect() {
    this.showTab(this.activeIndexValue)
  }

  change(event) {
    const index = parseInt(event.currentTarget.dataset.index)
    this.activeIndexValue = index
    this.showTab(index)
  }

  showTab(index) {
    this.tabTargets.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add("bg-sky-600", "text-white", "shadow-sm")
        tab.classList.remove("bg-white", "text-slate-600", "hover:bg-slate-50")
      } else {
        tab.classList.remove("bg-sky-600", "text-white", "shadow-sm")
        tab.classList.add("bg-white", "text-slate-600", "hover:bg-slate-50")
      }
    })

    this.panelTargets.forEach((panel, i) => {
      if (i === index) {
        panel.classList.remove("hidden")
        panel.classList.add("animate-fadeIn")
      } else {
        panel.classList.add("hidden")
        panel.classList.remove("animate-fadeIn")
      }
    })
  }
}
