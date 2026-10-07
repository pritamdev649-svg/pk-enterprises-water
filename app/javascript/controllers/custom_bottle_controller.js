import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "bottlePreview", 
    "capElement", 
    "labelArea", 
    "brandName", 
    "brandSubtitle", 
    "brandLogo", 
    "volumeBadge",
    "priceDisplay",
    "nameInput",
    "subtitleInput",
    "sizeInput",
    "capInput",
    "interactiveView",
    "photoView",
    "interactiveTabBtn",
    "photoTabBtn"
  ]

  static values = {
    currentSize: { type: String, default: "500ml" },
    currentCap: { type: String, default: "gold" },
    currentLabelStyle: { type: String, default: "midnight" },
    basePrice: { type: Number, default: 11.50 }
  }

  connect() {
    this.updatePreview()
  }

  selectSize(event) {
    const size = event.currentTarget.dataset.size
    const price = parseFloat(event.currentTarget.dataset.price || 11.50)
    this.currentSizeValue = size
    this.basePriceValue = price

    // Update active button state
    this.element.querySelectorAll("[data-size-button]").forEach(btn => {
      btn.classList.remove("bg-sky-600", "text-white", "shadow-sm")
      btn.classList.add("bg-white", "text-slate-700")
    })
    event.currentTarget.classList.remove("bg-white", "text-slate-700")
    event.currentTarget.classList.add("bg-sky-600", "text-white", "shadow-sm")

    this.updatePreview()
  }

  selectCap(event) {
    const cap = event.currentTarget.dataset.cap
    this.currentCapValue = cap

    // Update active cap button ring
    this.element.querySelectorAll("[data-cap-button]").forEach(btn => {
      btn.classList.remove("ring-4", "ring-sky-400", "scale-110")
    })
    event.currentTarget.classList.add("ring-4", "ring-sky-400", "scale-110")

    this.updatePreview()
  }

  selectLabelStyle(event) {
    const style = event.currentTarget.dataset.style
    this.currentLabelStyleValue = style

    this.element.querySelectorAll("[data-style-button]").forEach(btn => {
      btn.classList.remove("ring-2", "ring-sky-500", "font-bold")
      btn.classList.add("text-slate-600")
    })
    event.currentTarget.classList.add("ring-2", "ring-sky-500", "font-bold")
    event.currentTarget.classList.remove("text-slate-600")

    this.updatePreview()
  }

  updateBrandName(event) {
    const text = event.target.value.trim() || "YOUR BRAND HERE"
    if (this.hasBrandNameTarget) {
      this.brandNameTarget.textContent = text
    }
  }

  updateSubtitle(event) {
    const text = event.target.value.trim() || "PREMIUM PACKAGED WATER"
    if (this.hasBrandSubtitleTarget) {
      this.brandSubtitleTarget.textContent = text
    }
  }

  handleLogoUpload(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (this.hasBrandLogoTarget) {
          this.brandLogoTarget.src = e.target.result
          this.brandLogoTarget.classList.remove("hidden")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  updatePreview() {
    // Update cap colors
    const capColors = {
      gold: "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 border-amber-600",
      blue: "bg-gradient-to-r from-sky-600 via-sky-400 to-sky-800 border-sky-800",
      black: "bg-gradient-to-r from-slate-900 via-slate-800 to-black border-slate-950",
      clear: "bg-white/80 backdrop-blur-xs border-sky-200 shadow-inner",
      green: "bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-800 border-emerald-800"
    }

    if (this.hasCapElementTarget) {
      this.capElementTarget.className = `w-14 h-9 mx-auto rounded-t-lg border-b-2 shadow-md transition-all duration-300 ${capColors[this.currentCapValue] || capColors.gold}`
    }

    // Update label styles
    const labelStyles = {
      midnight: "bg-gradient-to-b from-slate-900 via-slate-950 to-sky-950 text-white shadow-xl",
      royal_white: "bg-white text-slate-900 shadow-md border-y border-slate-100",
      transparent_cyan: "bg-sky-500/20 backdrop-blur-md text-sky-950 border border-sky-300/40 shadow-sm",
      luxury_gold: "bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 text-amber-100 border-y border-amber-400/40 shadow-xl"
    }

    if (this.hasLabelAreaTarget) {
      this.labelAreaTarget.className = `relative w-full py-8 px-4 text-center rounded-sm transition-all duration-300 ${labelStyles[this.currentLabelStyleValue] || labelStyles.midnight}`
    }

    // Update volume badge
    if (this.hasVolumeBadgeTarget) {
      this.volumeBadgeTarget.textContent = this.currentSizeValue
    }

    // Update price estimate
    if (this.hasPriceDisplayTarget) {
      this.priceDisplayTarget.textContent = `₹${this.basePriceValue.toFixed(2)}`
    }
  }

  showInteractive() {
    if (this.hasInteractiveViewTarget && this.hasPhotoViewTarget) {
      this.interactiveViewTarget.classList.remove("hidden")
      this.photoViewTarget.classList.add("hidden")
    }
    if (this.hasInteractiveTabBtnTarget && this.hasPhotoTabBtnTarget) {
      this.interactiveTabBtnTarget.classList.add("bg-sky-600", "text-white")
      this.interactiveTabBtnTarget.classList.remove("text-slate-400", "hover:text-white")
      this.photoTabBtnTarget.classList.remove("bg-sky-600", "text-white")
      this.photoTabBtnTarget.classList.add("text-slate-400", "hover:text-white")
    }
  }

  showPhoto() {
    if (this.hasInteractiveViewTarget && this.hasPhotoViewTarget) {
      this.interactiveViewTarget.classList.add("hidden")
      this.photoViewTarget.classList.remove("hidden")
    }
    if (this.hasInteractiveTabBtnTarget && this.hasPhotoTabBtnTarget) {
      this.photoTabBtnTarget.classList.add("bg-sky-600", "text-white")
      this.photoTabBtnTarget.classList.remove("text-slate-400", "hover:text-white")
      this.interactiveTabBtnTarget.classList.remove("bg-sky-600", "text-white")
      this.interactiveTabBtnTarget.classList.add("text-slate-400", "hover:text-white")
    }
  }

  requestSample(event) {
    event.preventDefault()
    // Open modal with pre-filled specs
    const modalController = this.application.getControllerForElementAndIdentifier(
      document.querySelector('[data-controller="modal"]'),
      "modal"
    )
    if (modalController) {
      modalController.open({
        size: this.currentSizeValue,
        cap: this.currentCapValue,
        brand: this.hasNameInputTarget ? this.nameInputTarget.value : "Custom Brand"
      })
    }
  }
}
