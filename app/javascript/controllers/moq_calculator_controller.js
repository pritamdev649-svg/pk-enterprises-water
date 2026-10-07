import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "slider", 
    "quantityDisplay", 
    "unitPriceDisplay", 
    "totalEstimateDisplay", 
    "discountBadge",
    "turnaroundBadge",
    "bottleSelect"
  ]

  connect() {
    this.calculate()
  }

  updateQuantity(event) {
    this.calculate()
  }

  calculate() {
    const quantity = parseInt(this.sliderTarget.value || 1000)
    const bottleSize = this.hasBottleSelectTarget ? this.bottleSelectTarget.value : "500ml"

    // Base prices per bottle size
    const baseRates = {
      "200ml": 7.50,
      "500ml": 11.50,
      "1000ml": 17.00,
      "20L": 45.00
    }

    const base = baseRates[bottleSize] || 11.50

    // Tier discounts
    let discountPct = 0
    let turnaround = "4-6 Business Days"
    let badgeText = "Standard Tier"

    if (quantity >= 10000) {
      discountPct = 25
      turnaround = "7-10 Business Days (Dedicated Line)"
      badgeText = "Mega Wholesale (25% OFF)"
    } else if (quantity >= 5000) {
      discountPct = 18
      turnaround = "5-7 Business Days"
      badgeText = "Bulk Commercial (18% OFF)"
    } else if (quantity >= 2000) {
      discountPct = 10
      turnaround = "4-5 Business Days"
      badgeText = "Tier 1 Wholesale (10% OFF)"
    } else if (quantity >= 1000) {
      discountPct = 5
      turnaround = "3-4 Business Days"
      badgeText = "Standard Tier (5% OFF)"
    }

    const discountedUnitPrice = base * (1 - discountPct / 100)
    const totalEstimate = discountedUnitPrice * quantity

    // Update UI targets
    if (this.hasQuantityDisplayTarget) {
      this.quantityDisplayTarget.textContent = quantity.toLocaleString() + " Bottles"
    }

    if (this.hasUnitPriceDisplayTarget) {
      this.unitPriceDisplayTarget.textContent = `₹${discountedUnitPrice.toFixed(2)}`
    }

    if (this.hasTotalEstimateDisplayTarget) {
      this.totalEstimateDisplayTarget.textContent = `₹${Math.round(totalEstimate).toLocaleString()}`
    }

    if (this.hasDiscountBadgeTarget) {
      this.discountBadgeTarget.textContent = badgeText
    }

    if (this.hasTurnaroundBadgeTarget) {
      this.turnaroundBadgeTarget.textContent = turnaround
    }
  }

  requestQuote(event) {
    event.preventDefault()
    const quantity = parseInt(this.sliderTarget.value)
    const bottleSize = this.hasBottleSelectTarget ? this.bottleSelectTarget.value : "500ml"

    const modalController = this.application.getControllerForElementAndIdentifier(
      document.querySelector('[data-controller="modal"]'),
      "modal"
    )
    if (modalController) {
      modalController.open({
        size: bottleSize,
        quantity: quantity,
        notes: `Estimated batch from MOQ Calculator (${quantity} units of ${bottleSize})`
      })
    }
  }
}
