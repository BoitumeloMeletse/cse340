// Get a list of items in inventory based on the classification_id
const classificationList = document.querySelector("#classificationList")

if (classificationList) {
  classificationList.addEventListener("change", () => {
    const classification_id = classificationList.value
    console.log(`classification_id is: ${classification_id}`)

    if (classification_id) {
      const classIdURL = "/inv/getInventory/" + classification_id
      fetch(classIdURL)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw Error("Network response was not OK")
        })
        .then((data) => {
          console.log(data)
          buildInventoryList(data)
        })
        .catch((error) => {
          console.log("There was a problem: ", error.message)
          // Display error message to user
          const inventoryDisplay = document.getElementById("inventoryDisplay")
          inventoryDisplay.innerHTML =
            '<tr><td colspan="3" style="text-align: center; color: red;">Error loading inventory data. Please try again.</td></tr>'
        })
    } else {
      // Clear the table if no classification is selected
      const inventoryDisplay = document.getElementById("inventoryDisplay")
      inventoryDisplay.innerHTML = ""
    }
  })
}

// Build inventory items into HTML table components and inject into DOM
function buildInventoryList(data) {
  const inventoryDisplay = document.getElementById("inventoryDisplay")

  // Set up the table labels
  let dataTable = "<thead>"
  dataTable += "<tr><th>Vehicle Name</th><th>Modify</th><th>Delete</th></tr>"
  dataTable += "</thead>"

  // Set up the table body
  dataTable += "<tbody>"

  // Check if data exists and has items
  if (data && data.length > 0) {
    // Iterate over all vehicles in the array and put each in a row
    data.forEach((element) => {
      console.log(element.inv_id + ", " + element.inv_model)
      dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`
      dataTable += `<td><a href='/inv/edit/${element.inv_id}' title='Click to update'>Modify</a></td>`
      dataTable += `<td><a href='/inv/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`
    })
  } else {
    // Display message when no vehicles found
    dataTable +=
      '<tr><td colspan="3" style="text-align: center; font-style: italic;">No vehicles found for this classification.</td></tr>'
  }

  dataTable += "</tbody>"

  // Display the contents in the Inventory Management view
  inventoryDisplay.innerHTML = dataTable
}

// Initialize page - clear table on load
document.addEventListener("DOMContentLoaded", () => {
  const inventoryDisplay = document.getElementById("inventoryDisplay")
  if (inventoryDisplay) {
    inventoryDisplay.innerHTML = ""
  }
})
