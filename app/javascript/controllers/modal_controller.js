import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "backdrop", "sizeInput", "quantityInput", "notesInput"]

  connect() {
    this.close()
  }

  open(prefill = {}) {
    if (this.hasModalTarget) {
      this.modalTarget.classList.remove("hidden")
      document.body.classList.add("overflow-hidden")

      if (prefill.size && this.hasSizeInputTarget) {
        this.sizeInputTarget.value = prefill.size
      }
      if (prefill.quantity && this.hasQuantityInputTarget) {
        this.quantityInputTarget.value = prefill.quantity
      }
      if (prefill.notes && this.hasNotesInputTarget) {
        this.notesInputTarget.value = prefill.notes
      }
    }
  }

  close(event) {
    if (event) event.preventDefault()
    if (this.hasModalTarget) {
      this.modalTarget.classList.add("hidden")
      document.body.classList.remove("overflow-hidden")
    }
  }

  handleBackdropClick(event) {
    if (event.target === this.backdropTarget) {
      this.close()
    }
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }
}
