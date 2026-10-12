
"use strict";

// ==========================================
// SAI SHRUTHI'S BIRTHDAY SURPRISE ❤️
// ==========================================

const screens = document.querySelectorAll(".screen");
const heartsLayer = document.getElementById("heartsLayer");

const startButton = document.getElementById("startButton");
const typedLetter = document.getElementById("typedLetter");

const birthdayMusic = document.getElementById("birthdayMusic");
const playButton = document.getElementById("playButton");
const record = document.getElementById("record");
const musicNote = document.getElementById("musicNote");

const revealButton = document.getElementById("revealButton");
const secretCard = document.getElementById("secretCard");
const replayButton = document.getElementById("replayButton");

const candles = document.querySelectorAll(".candle");
const candleMessage = document.getElementById("candleMessage");
const wishButton = document.getElementById("wishButton");

let typingTimer = null;
let musicAvailable = true;
let wishMade = false;

const letterMessage = `Happy Birthday, Sai Shruthi! ❤️

Today is a reminder that the world became a little more beautiful the day you arrived in it.

Your smile, your kindness, and the little things that make you who you are deserve to be celebrated, today and every day.

I hope this new chapter brings you wonderful surprises, peaceful moments, dreams that come true, and people who make you feel appreciated.

May you never run out of reasons to smile, courage to chase your dreams, or little moments that make life magical.

You deserve all the happiness this beautiful world has to offer.

Have the loveliest birthday. Keep shining, always. ✨`;

// Check required elements before initializing.
function elementsReady() {
    const required = {
        heartsLayer,
        startButton,
        typedLetter,
        birthdayMusic,
        playButton,
        record,
        musicNote,
        revealButton,
        secretCard,
        replayButton,
        candleMessage,
        wishButton
    };

    const missing = Object.entries(required)
        .filter(([, element]) => !element)
        .map(([name]) => name);

    if (missing.length > 0) {
        console.error("Birthday website: missing HTML elements:", missing);
        return false;
    }

    if (screens.length === 0) {
        console.error("Birthday website: no .screen elements found.");
        return false;
    }

    return true;
}

// Change screens.
function showScreen(screenId) {
    const target = document.getElementById(screenId);

    if (!target || !target.classList.contains("screen")) {
        console.error("Screen not found:", screenId);
        return;
    }

    screens.forEach(screen => screen.classList.remove("active"));
    target.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (screenId === "letter") {
        typeLetter();
    }
}

// Type the letter one character at a time.
function typeLetter() {
    clearInterval(typingTimer);
    typedLetter.textContent = "";

    let index = 0;

    typingTimer = setInterval(() => {
        typedLetter.textContent += letterMessage[index];
        index++;

        if (index >= letterMessage.length) {
            clearInterval(typingTimer);
            typingTimer = null;
        }
    }, 28);
}

// Create a floating heart.
function createFloatingHeart() {
    if (!heartsLayer) return;

    const heart = document.createElement("span");
    const symbols = ["♡", "♥", "✦", "✨"];

    heart.className = "floating-heart";
    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.animationDuration = (6 + Math.random() * 6) + "s";

    heartsLayer.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
}

// Release a burst of floating hearts.
function burstHearts(count = 15) {
    for (let i = 0; i < count; i++) {
        setTimeout(createFloatingHeart, i * 90);
    }
}

// Blow out one candle.
function blowOutCandle(candle) {
    if (candle.classList.contains("out")) return;

    candle.classList.add("out");
    burstHearts(4);

    const remaining = document.querySelectorAll(
        ".candle:not(.out)"
    ).length;

    if (remaining === 0) {
        candleMessage.textContent =
            "All the candles are out! Make a beautiful wish. ✨";
        wishButton.textContent = "Your wish is ready 💖";
    } else {
        candleMessage.textContent =
            `${remaining} candle${remaining === 1 ? "" : "s"} left. Keep going! ✨`;
    }
}

// Initialize all interactions.
function initializeBirthdayWebsite() {
    if (!elementsReady()) return;

    console.log("Birthday website initialized successfully.");

    // Opening screen -> letter.
    startButton.addEventListener("click", () => {
        console.log("Opening button clicked!");
        showScreen("letter");
        burstHearts(20);
    });

    // Continue buttons.
    document.querySelectorAll("[data-next]").forEach(button => {
        button.addEventListener("click", () => {
            showScreen(button.dataset.next);
        });
    });

    // Candle interactions: mouse and keyboard.
    candles.forEach(candle => {
        candle.addEventListener("click", () => {
            blowOutCandle(candle);
        });

        candle.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                blowOutCandle(candle);
            }
        });
    });

    // Make a wish.
 
wishButton.addEventListener("click", () => {
    const remainingCandles = document.querySelectorAll(
        ".candle:not(.out)"
    ).length;

    // Require the user to blow out every candle manually.
    if (remainingCandles > 0) {
        candleMessage.textContent =
            `Blow out all ${remainingCandles} remaining candle${remainingCandles === 1 ? "" : "s"} first! 🕯️`;

        return;
    }

    if (wishMade) {
        candleMessage.innerHTML =
            "May your wish find its way to something beautiful. ❤️" +
            '<br><strong class="continue-hint">' +
            "Click 'Continue to your song' below. 🎶" +
            "</strong>";

        return;
    }

    wishMade = true;

    candleMessage.innerHTML =
        "Close your eyes, make a wish, and keep it in your heart. 💖" ;

    wishButton.textContent = "Wish made! ✨";
    burstHearts(35);
});


// Music player.
let songHasPlayed = false;

playButton.addEventListener("click", async () => {
    if (!musicAvailable) {
        musicNote.textContent =
            "Check that images/birthday-song.mp3 exists, then reload. ♡";
        return;
    }

    if (birthdayMusic.paused) {
        try {
            await birthdayMusic.play();

            // Allow navigation only after the song starts successfully.
            songHasPlayed = true;

            playButton.textContent = "Ⅱ";
            playButton.setAttribute("aria-label", "Pause music");
            record.classList.add("playing");
            musicNote.textContent = "Enjoy your little soundtrack. ♡";
        } catch (error) {
            console.error("Music playback failed:", error);
            musicNote.textContent =
                "Music could not start. Check your song file.";
        }
    } else {
        birthdayMusic.pause();
        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "Play music");
        record.classList.remove("playing");
    }
});

birthdayMusic.addEventListener("error", () => {
    musicAvailable = false;
    musicNote.textContent =
        "Check that your music file exists at images/birthday-song.mp3. ♡";
});

birthdayMusic.addEventListener("ended", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play music");
    record.classList.remove("playing");
});


// Prevent moving to the secret screen until the song has started.
document.querySelectorAll('#music [data-next="secret"]').forEach((button) => {
    button.addEventListener("click", (event) => {
        if (!songHasPlayed) {
            event.preventDefault();
            event.stopImmediatePropagation();

            musicNote.textContent =
                "First, play your birthday song! 🎶❤️";
        }
    }, true);
});


    // Reveal the secret message.
    revealButton.addEventListener("click", () => {
        secretCard.classList.remove("hidden");
        revealButton.classList.add("hidden");

        burstHearts(40);

        secretCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    // Replay from the beginning.
    replayButton.addEventListener("click", () => {
        clearInterval(typingTimer);
        typingTimer = null;

        candles.forEach(candle => candle.classList.remove("out"));

        candleMessage.textContent =
            "Five little lights, five little wishes. ✨";

        wishButton.textContent = "Make a wish ✨";
        wishMade = false;

        secretCard.classList.add("hidden");
        revealButton.classList.remove("hidden");

        birthdayMusic.pause();
        birthdayMusic.currentTime = 0;
        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "Play music");
        record.classList.remove("playing");

        showScreen("opening");
        burstHearts(20);
    });

    // Floating hearts in the background.
    setInterval(createFloatingHeart, 700);
}

// Support both normal page loading and scripts loaded after DOMContentLoaded.
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeBirthdayWebsite,
        { once: true }
    );
} else {
    initializeBirthdayWebsite();
}
