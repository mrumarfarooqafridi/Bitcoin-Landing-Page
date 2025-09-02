document.addEventListener("DOMContentLoaded", function () {
  const cardHeader = document.getElementById("cardHeader");
  const statusText = document.getElementById("statusText");
  const mainProgressBar = document.getElementById("mainProgressBar");
  const progressSection = document.getElementById("progressSection");
  const finalContent = document.getElementById("finalContent");
  const accountBtn = document.querySelector(".account-btn");
  const showOnClick = document.getElementById("showOnClick");
  const rightContent = document.querySelector(
    ".final-content .col-md-6:not(.text-center)"
  );

  const steps = [
    { text: "Connecting to server", progress: 25 },
    { text: "Sending Test", progress: 50 },
    { text: "Account is activate", progress: 75 },
    { text: "Create new Account", progress: 100 },
  ];

  let currentStep = 0;

  function executeStep() {
    if (currentStep < steps.length) {
      // Update progress bar
      mainProgressBar.style.width = steps[currentStep].progress + "%";

      // Update status text with animation
      statusText.style.opacity = 0;
      setTimeout(() => {
        statusText.textContent = steps[currentStep].text;
        statusText.style.opacity = 1;
      }, 500);

      currentStep++;

      // Schedule next step or final display
      if (currentStep === steps.length) {
        setTimeout(showFinalContent, 2000);
      } else {
        setTimeout(executeStep, 2000);
      }
    }
  }

  function showFinalContent() {
    // Animate out the progress section
    progressSection.style.opacity = 0;
    progressSection.style.transition = "opacity 0.8s ease";

    // Change header text with animation
    cardHeader.classList.add("fade-in");
    cardHeader.textContent = "You can now start trading";

    // Show final content with animation
    setTimeout(() => {
      progressSection.style.display = "none";
      finalContent.style.display = "block";
      finalContent.classList.add("slide-in");

      // Add click event to the account button
      accountBtn.addEventListener("click", handleAccountButtonClick);
    }, 800);
  }

  function handleAccountButtonClick() {
    // Hide the right content with animation
    rightContent.style.opacity = "0";
    rightContent.style.transition = "opacity 0.5s ease";

    // After the right content fades out, show the showOnClick section
    setTimeout(() => {
      rightContent.style.display = "none";
      showOnClick.classList.remove("d-none");
      showOnClick.classList.add("d-block");

      // Animate the showOnClick section from top to bottom
      showOnClick.style.opacity = "0";
      showOnClick.style.transform = "translateY(-20px)";
      showOnClick.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      // Trigger reflow for smooth animation
      void showOnClick.offsetWidth;

      showOnClick.style.opacity = "1";
      showOnClick.style.transform = "translateY(0)";

      // Animate each span element sequentially
      const spans = showOnClick.querySelectorAll("span");
      spans.forEach((span, index) => {
        span.style.opacity = "0";
        span.style.transform = "translateY(-10px)";
        span.style.transition = "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";

          // Add click event to each span
          span.addEventListener("click", handleSpanClick);
        }, 300 * (index + 1));
      });
    }, 500);
  }

  function handleSpanClick(event) {
    const span = event.currentTarget;
    const amount = span.querySelector("strong").textContent;

    // Extract profit from span text
    const profitText = span.textContent;
    const profitMatch = profitText.match(/profit:([^$]+)/);
    const profit = profitMatch ? profitMatch[1].trim() : "5,000";

    // Hide the paragraph
    const paragraph = showOnClick.querySelector("p");
    paragraph.style.opacity = "0";
    paragraph.style.transition = "opacity 0.3s ease";

    // Create the replacement content
    const replacementContent = document.createElement("div");
    replacementContent.className = "span-replacement";
    replacementContent.innerHTML = `
      <div class="text-center">
        <h5 class="text-success mb-3">You must log in for getting access to your Bitcoin Account</h5>
        <p class="mb-3">Make Sure to do a deposit. </p>
        <button class="btn btn-success me-2 confirm-deposit">Go to Account</button>
      </div>
    `;

    // Add to DOM - we'll replace the entire content of showOnClick
    // First, store the original height of showOnClick
    const originalHeight = showOnClick.offsetHeight;

    // Hide all spans and paragraph
    const spans = showOnClick.querySelectorAll("span");
    spans.forEach((s) => {
      s.style.display = "none";
    });
    paragraph.style.display = "none";

    // Add the replacement content
    showOnClick.appendChild(replacementContent);

    // Get the new height after adding replacement content
    const newHeight = showOnClick.offsetHeight;

    // Set the height to the original height initially
    showOnClick.style.height = `${originalHeight}px`;
    showOnClick.style.overflow = "hidden";
    showOnClick.style.transition = "height 0.5s ease";

    // Animate to the new height
    setTimeout(() => {
      showOnClick.style.height = `${newHeight}px`;
    }, 10);

    // Show replacement content with animation
    replacementContent.style.opacity = "0";
    replacementContent.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      replacementContent.style.opacity = "1";

      // Add event listeners to the new buttons
      replacementContent
        .querySelector(".confirm-deposit")
        .addEventListener("click", function () {
          alert(`Deposit of ${amount} confirmed!`);
        });
    }, 500);
  }

  // Start the process
  setTimeout(executeStep, 1000);
});
