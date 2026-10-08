```javascript
function startCelebration() {

    // Scroll to birthday message
    document.querySelector(".message-section")
        .scrollIntoView({
            behavior: "smooth"
        });

    // Create confetti
    createConfetti();

}


/* Confetti */

function createConfetti() {

    const container =
        document.getElementById("confetti-container");

    const symbols = ["🎉", "❤️", "✨", "🎈", "💕", "⭐"];

    for (let i = 0; i < 100; i++) {

        const confetti =
            document.createElement("div");

        confetti.classList.add("confetti");

        confetti.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.fontSize =
            Math.random() * 15 + 10 + "px";

        confetti.style.animationDuration =
            Math.random() * 3 + 2 + "s";

        container.appendChild(confetti);


        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }

}
```