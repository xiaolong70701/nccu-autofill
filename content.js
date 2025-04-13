(async () => {
    // Get login input fields and login button
    const usernameInput = document.getElementById("captcha_Login1_UserName");
    const passwordInput = document.getElementById("captcha_Login1_Password");
    const loginButton = document.getElementById("captcha_Login1_LoginButton");
  
    // Exit if any input or button is missing
    if (!usernameInput || !passwordInput || !loginButton) return;
  
    // Load saved username and password from local storage
    chrome.storage.local.get(["nccuUsername", "nccuPassword"], (result) => {
      if (result.nccuUsername && result.nccuPassword) {
        // 自動填入帳號與密碼
        usernameInput.value = result.nccuUsername;
        passwordInput.value = result.nccuPassword;
      }
    });
  })();
  