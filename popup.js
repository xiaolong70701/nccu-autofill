document.addEventListener("DOMContentLoaded", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const saveBtn = document.getElementById("save");
    const status = document.getElementById("status");
    const ipDisplay = document.getElementById("ip");
  
    // Load saved username and password when popup loads
    chrome.storage.local.get(["nccuUsername", "nccuPassword"], (result) => {
      username.value = result.nccuUsername || "";
      password.value = result.nccuPassword || "";
    });
  
    // Save function: checks inputs and saves credentials
    function saveCredentials() {
      const user = username.value.trim();
      const pass = password.value.trim();
  
      // Validation: both fields must be filled
      if (!user || !pass) {
        status.textContent = "❌ 請輸入帳號與密碼"; // Display error if empty
        status.style.color = "red";
        return;
      }
  
      // Save to local storage
      chrome.storage.local.set({
        nccuUsername: user,
        nccuPassword: pass
      }, () => {
        status.textContent = "✅ 已儲存"; // Success message
        status.style.color = "green";
        setTimeout(() => status.textContent = "", 2000);
      });
    }
  
    // Save on button click
    saveBtn.addEventListener("click", saveCredentials);
  
    // Save when pressing Enter in input fields
    [username, password].forEach(input => {
      input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          saveCredentials();
        }
      });
    });
  
    // Fetch public IP and store it
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        const ip = data.ip;
        ipDisplay.textContent = ip; // Display IP
        chrome.storage.local.set({ ipAddress: ip }); // Save IP
      })
      .catch(err => {
        ipDisplay.textContent = "無法取得 IP"; // Display error
        console.error("Failed to fetch IP", err);
      });
  
    // Fallback: load saved IP if available
    chrome.storage.local.get("ipAddress", (result) => {
      if (result.ipAddress) {
        ipDisplay.textContent = result.ipAddress;
      }
    });
  });
  