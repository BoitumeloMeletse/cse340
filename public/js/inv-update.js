const form = document.querySelector("#updateForm")

if (form) {
  form.addEventListener("change", () => {
    const updateBtn = document.querySelector("button[type='submit']")
    if (updateBtn) {
      updateBtn.removeAttribute("disabled")
    }
  })

  // Also listen for input events to catch typing changes
  form.addEventListener("input", () => {
    const updateBtn = document.querySelector("button[type='submit']")
    if (updateBtn) {
      updateBtn.removeAttribute("disabled")
    }
  })
}
