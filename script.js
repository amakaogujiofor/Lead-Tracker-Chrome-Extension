// Declarations Section
let myLeads = [];
let inputEl = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("save-btn");

if (leadsFromLocalStorage === true) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

// Logic Section
// Input Button
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  //   Save the myLeads array to localStorage
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//Rendering Saved Leads
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}    
        </a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

// Delete Button Functionality
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// Save button Functionality
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    let activeTab = tabs[0];
    let activeTabId = activeTab.id;
  });
});
