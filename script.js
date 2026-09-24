// =====================================================
// ELEMENTS
// =====================================================

const envelope =
    document.getElementById("envelope");

const intro =
    document.getElementById("intro");

const letterScreen =
    document.getElementById("letterScreen");

const typing =
    document.getElementById("typing");

const continueBtn =
    document.getElementById("continueBtn");

const storyScreen =
    document.getElementById("storyScreen");

const memoriesScreen =
    document.getElementById("memoriesScreen");

const memoryContinue =
    document.getElementById("memoryContinue");

const loveScreen =
    document.getElementById("loveScreen");

const proposalBtn =
    document.getElementById("proposalBtn");


// =====================================================
// PHOTO VIEWER
// =====================================================

const photoViewer =
    document.getElementById("photoViewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerCaption =
    document.getElementById("viewerCaption");

const closeViewer =
    document.getElementById("closeViewer");

const viewerPrev =
    document.getElementById("viewerPrev");

const viewerNext =
    document.getElementById("viewerNext");

const viewerCounter =
    document.getElementById("viewerCounter");


// Old memory cards
const memoryCards =
    document.querySelectorAll(".memory-card");


// =====================================================
// MEMORY WALL
// =====================================================

const memoryWall =
    document.getElementById("memoryWall");

const memoryWallClose =
    document.getElementById("memoryWallClose");

const memoriesPlanet =
    document.querySelector(".planet-four");

const wallPhotos =
    document.querySelectorAll(".wall-photo");


// =====================================================
// LETTER MESSAGE
// =====================================================

const message = `Thangoo...

Before you became my Thangoo...

you were just someone
I had been going to school with
for years.

I had known you since 5th standard...

but somehow,
I never really noticed you.

Not properly.

Not until 12th standard.

And I never knew then
that one ordinary day
would eventually become
the beginning of our story. ❤️`;


// =====================================================
// ENVELOPE → LETTER
// =====================================================

let opened = false;

if (envelope) {

    envelope.addEventListener("click", () => {

        if (opened) return;

        opened = true;

        envelope.classList.add("open");


        setTimeout(() => {

            if (intro) {
                intro.classList.add("hide");
            }

        }, 900);


        setTimeout(() => {

            if (intro) {
                intro.style.display = "none";
            }


            if (letterScreen) {

                letterScreen.style.display =
                    "flex";

                requestAnimationFrame(() => {

                    letterScreen.classList.add(
                        "show"
                    );

                });

            }


            startTyping();

        }, 1500);

    });

}


// =====================================================
// TYPING EFFECT
// =====================================================

function startTyping() {

    if (!typing) return;

    typing.innerHTML = "";

    let index = 0;


    function type() {

        if (index >= message.length) {
            return;
        }


        const character =
            message[index];


        if (character === "\n") {

            typing.innerHTML += "<br>";

        } else {

            typing.innerHTML += character;

        }


        index++;

        setTimeout(type, 38);

    }


    type();

}


// =====================================================
// LETTER → OUR UNIVERSE
// =====================================================

if (continueBtn) {

    continueBtn.addEventListener("click", () => {

        if (letterScreen) {

            letterScreen.style.display =
                "none";

            letterScreen.classList.remove(
                "show"
            );

        }


        if (storyScreen) {

            storyScreen.style.display =
                "flex";

            storyScreen.classList.add(
                "show"
            );

        }


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    });

}


// =====================================================
// OLD MEMORIES → LOVE LETTER
// =====================================================

if (memoryContinue && loveScreen) {

    memoryContinue.addEventListener("click", () => {

        if (memoriesScreen) {

            memoriesScreen.style.display =
                "none";

            memoriesScreen.classList.remove(
                "show"
            );

        }


        loveScreen.style.display =
            "flex";

        loveScreen.classList.add(
            "show"
        );


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    });

}


// =====================================================
// PHOTO VIEWER
// =====================================================

let currentPhoto = 0;


// This stores which gallery is currently open
let viewerSource = "old";


// =====================================================
// OPEN OLD MEMORY PHOTO
// =====================================================

function openOldPhoto(index) {

    if (!photoViewer) return;

    if (!memoryCards.length) return;

    viewerSource = "old";

    currentPhoto = index;

    updateViewer();

    photoViewer.classList.add("show");

}


// =====================================================
// OPEN MEMORY WALL PHOTO
// =====================================================

function openWallPhoto(index) {

    if (!photoViewer) return;

    if (!wallPhotos.length) return;

    viewerSource = "wall";

    currentPhoto = index;

    updateViewer();

    photoViewer.classList.add("show");

}


// =====================================================
// UPDATE PHOTO VIEWER
// =====================================================

function updateViewer() {

    let items;

    if (viewerSource === "wall") {

        items = wallPhotos;

    } else {

        items = memoryCards;

    }


    if (!items.length) return;


    const card =
        items[currentPhoto];


    if (!card) return;


    const image =
        card.querySelector("img");


    if (!image || !viewerImage) return;


    // Image
    viewerImage.src =
        image.src;


    // Caption
    if (viewerCaption) {

        const caption =
            card.querySelector("p");


        if (caption) {

            viewerCaption.textContent =
                caption.textContent;

        } else {

            viewerCaption.textContent =
                `Memory ${currentPhoto + 1}`;

        }

    }


    // Counter
    if (viewerCounter) {

        viewerCounter.textContent =
            `${String(currentPhoto + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

    }


    // Animation
    viewerImage.style.animation =
        "none";

    void viewerImage.offsetWidth;

    viewerImage.style.animation =
        "viewerImageIn 0.5s ease";

}


// =====================================================
// OLD MEMORY CARDS CLICK
// =====================================================

memoryCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                openOldPhoto(index);

            }
        );

    }
);


// =====================================================
// MEMORY WALL PHOTOS CLICK
// =====================================================

wallPhotos.forEach(
    (photo, index) => {

        photo.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                openWallPhoto(index);

            }
        );

    }
);


// =====================================================
// PHOTO PREVIOUS
// =====================================================

if (viewerPrev) {

    viewerPrev.addEventListener(
        "click",
        () => {

            let total;


            if (viewerSource === "wall") {

                total =
                    wallPhotos.length;

            } else {

                total =
                    memoryCards.length;

            }


            if (!total) return;


            currentPhoto--;


            if (currentPhoto < 0) {

                currentPhoto =
                    total - 1;

            }


            updateViewer();

        }
    );

}


// =====================================================
// PHOTO NEXT
// =====================================================

if (viewerNext) {

    viewerNext.addEventListener(
        "click",
        () => {

            let total;


            if (viewerSource === "wall") {

                total =
                    wallPhotos.length;

            } else {

                total =
                    memoryCards.length;

            }


            if (!total) return;


            currentPhoto++;


            if (currentPhoto >= total) {

                currentPhoto = 0;

            }


            updateViewer();

        }
    );

}


// =====================================================
// CLOSE PHOTO VIEWER
// =====================================================

if (closeViewer) {

    closeViewer.addEventListener(
        "click",
        () => {

            if (photoViewer) {

                photoViewer.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// CLICK OUTSIDE PHOTO
// =====================================================

if (photoViewer) {

    photoViewer.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                photoViewer
            ) {

                photoViewer.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// KEYBOARD PHOTO CONTROLS
// =====================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            photoViewer &&
            photoViewer.classList.contains(
                "show"
            )
        ) {

            if (
                event.key ===
                "ArrowLeft"
            ) {

                if (viewerPrev) {
                    viewerPrev.click();
                }

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                if (viewerNext) {
                    viewerNext.click();
                }

            }


            if (
                event.key ===
                "Escape"
            ) {

                photoViewer.classList.remove(
                    "show"
                );

            }

        }

    }
);


// =====================================================
// OUR UNIVERSE
// =====================================================

const universePopup =
    document.getElementById(
        "universePopup"
    );

const universePopupClose =
    document.getElementById(
        "universePopupClose"
    );

const popupLabel =
    document.getElementById(
        "popupLabel"
    );

const popupIcon =
    document.getElementById(
        "popupIcon"
    );

const popupTitle =
    document.getElementById(
        "popupTitle"
    );

const popupText =
    document.getElementById(
        "popupText"
    );

const beginningExtra =
    document.getElementById(
        "beginningExtra"
    );

const planets =
    document.querySelectorAll(
        ".planet"
    );


// =====================================================
// UNIVERSE DATA
// =====================================================

const universePlaces = {

    beginning: {

        label:
            "✦ THE BEGINNING ✦",

        icon:
            "🏫",

        title:
            "The Day I Finally Noticed You",

        text:
            "Same school. So many years. " +
            "5th standard to 12th standard... " +
            "and somehow I never really noticed you. " +
            "Until one ordinary morning when I turned around during drill... " +
            "and there you were. ❤️"

    },


    calls: {

        label:
            "✦ OUR CALLS ✦",

        icon:
            "📞",

        title:
            "The Call That Changed Everything",

        text:
            "I was in Sivagangai for my boxing match. " +
            "I was nervous and tried calling anime-boy first. " +
            "He didn't answer. So I called you. " +
            "That became our first proper conversation... " +
            "and I was sooooo happy. ❤️"

    },


    hug: {

        label:
            "✦ THAT MOMENT ✦",

        icon:
            "🫂",

        title:
            "The Hug I'll Never Forget",

        text:
            "We were drinking tea and went for a drive. " +
            "Then I hugged you... and you hugged me back. " +
            "And when you said, " +
            "\"I wish idhu dhaan en first and last hug-ah irukkanum,\" " +
            "I carried those words with me. ❤️"

    },


    memories: {

        label:
            "✦ OUR LITTLE WORLD ✦",

        icon:
            "📸",

        title:
            "Little Moments, Big Memories",

        text:
            "Some memories are loud. " +
            "Some are tiny. " +
            "But somehow, the smallest moments with you " +
            "became some of my favourite memories. ❤️"

    }

};


// =====================================================
// UNIVERSE PLANETS
// =====================================================

planets.forEach(
    (planet) => {

        planet.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();


                const place =
                    planet.dataset.place;


                // =====================================
                // 📸 MEMORIES
                // =====================================

                if (
                    place ===
                    "memories"
                ) {

                    openMemoryWall();

                    return;

                }


                // =====================================
                // 📞 CALL
                // =====================================

                if (
                    place ===
                    "calls"
                ) {

                    openCallExperience();

                    return;

                }


                // =====================================
                // 🫂 HUG
                // =====================================

                if (
                    place ===
                    "hug"
                ) {

                    openHugExperience();

                    return;

                }


                // =====================================
                // 🏫 BEGINNING
                // =====================================

                const data =
                    universePlaces[
                        place
                    ];


                if (!data) return;


                if (popupLabel) {

                    popupLabel.textContent =
                        data.label;

                }


                if (popupIcon) {

                    popupIcon.textContent =
                        data.icon;

                }


                if (popupTitle) {

                    popupTitle.textContent =
                        data.title;

                }


                if (popupText) {

                    popupText.textContent =
                        data.text;

                }


                if (beginningExtra) {

                    beginningExtra.classList.remove(
                        "show"
                    );

                }


                if (
                    place ===
                    "beginning"
                ) {

                    setTimeout(
                        () => {

                            if (
                                beginningExtra
                            ) {

                                beginningExtra.classList.add(
                                    "show"
                                );

                            }

                        },
                        500
                    );

                }


                if (universePopup) {

                    universePopup.classList.add(
                        "show"
                    );

                }

            }
        );

    }
);


// =====================================================
// UNIVERSE POPUP CLOSE
// =====================================================

if (universePopupClose) {

    universePopupClose.addEventListener(
        "click",
        () => {

            universePopup.classList.remove(
                "show"
            );

        }
    );

}


if (universePopup) {

    universePopup.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                universePopup
            ) {

                universePopup.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// PHONE CALL EXPERIENCE
// =====================================================

const callExperience =
    document.getElementById(
        "callExperience"
    );

const answerCall =
    document.getElementById(
        "answerCall"
    );

const endCall =
    document.getElementById(
        "endCall"
    );

const callStatus =
    document.getElementById(
        "callStatus"
    );

const callDuration =
    document.getElementById(
        "callDuration"
    );

const callTyping =
    document.getElementById(
        "callTyping"
    );

let callSeconds = 0;

let callTimer = null;

let callRevealTimers = [];


// =====================================================
// OPEN CALL
// =====================================================

function openCallExperience() {

    if (!callExperience) return;


    if (universePopup) {

        universePopup.classList.remove(
            "show"
        );

    }


    callExperience.classList.add(
        "show"
    );


    callExperience.classList.remove(
        "connected"
    );


    if (callStatus) {

        callStatus.textContent =
            "Incoming call...";

    }


    if (callTyping) {

        callTyping.textContent =
            "";

    }


    document.body.classList.add(
        "experience-open"
    );

}


// =====================================================
// ANSWER CALL
// =====================================================

if (answerCall) {

    answerCall.addEventListener(
        "click",
        () => {

            if (!callExperience)
                return;


            callExperience.classList.add(
                "connected"
            );


            if (callStatus) {

                callStatus.textContent =
                    "Connected ❤️";

            }


            if (callTyping) {

                callTyping.textContent =
                    "";

            }


            // Clear previous timers

            callRevealTimers.forEach(
                clearTimeout
            );

            callRevealTimers = [];


            // Story reveal 1

            callRevealTimers.push(
                setTimeout(
                    () => {

                        if (callTyping) {

                            callTyping.textContent =
                                "Sivagangai... 📍";

                        }

                    },
                    800
                )
            );


            // Story reveal 2

            callRevealTimers.push(
                setTimeout(
                    () => {

                        if (callTyping) {

                            callTyping.textContent =
                                "I was nervous about my boxing match...";

                        }

                    },
                    2200
                )
            );


            // Story reveal 3

            callRevealTimers.push(
                setTimeout(
                    () => {

                        if (callTyping) {

                            callTyping.textContent =
                                "I called anime-boy first... " +
                                "but he didn't answer.";

                        }

                    },
                    4000
                )
            );


            // Story reveal 4

            callRevealTimers.push(
                setTimeout(
                    () => {

                        if (callTyping) {

                            callTyping.textContent =
                                "So I called you. 📞";

                        }

                    },
                    6200
                )
            );


            // Story reveal 5

            callRevealTimers.push(
                setTimeout(
                    () => {

                        if (callTyping) {

                            callTyping.textContent =
                                "And somehow... " +
                                "that became our first proper conversation. ❤️";

                        }

                    },
                    8000
                )
            );


            // Call timer

            callSeconds = 0;

            clearInterval(
                callTimer
            );


            callTimer =
                setInterval(
                    () => {

                        callSeconds++;


                        const minutes =
                            String(
                                Math.floor(
                                    callSeconds / 60
                                )
                            ).padStart(
                                2,
                                "0"
                            );


                        const seconds =
                            String(
                                callSeconds % 60
                            ).padStart(
                                2,
                                "0"
                            );


                        if (callDuration) {

                            callDuration.textContent =
                                `${minutes}:${seconds}`;

                        }

                    },
                    1000
                );

        }
    );

}


// =====================================================
// END CALL
// =====================================================

if (endCall) {

    endCall.addEventListener(
        "click",
        () => {

            closeCallExperience();

        }
    );

}


function closeCallExperience() {

    if (callExperience) {

        callExperience.classList.remove(
            "show"
        );

        callExperience.classList.remove(
            "connected"
        );

    }


    clearInterval(
        callTimer
    );


    callRevealTimers.forEach(
        clearTimeout
    );

    callRevealTimers = [];


    callSeconds = 0;


    if (callDuration) {

        callDuration.textContent =
            "00:00";

    }


    if (callTyping) {

        callTyping.textContent =
            "";

    }


    document.body.classList.remove(
        "experience-open"
    );

}


// =====================================================
// HUG EXPERIENCE
// =====================================================

const hugExperience =
    document.getElementById(
        "hugExperience"
    );

const hugClose =
    document.getElementById(
        "hugClose"
    );


// =====================================================
// OPEN HUG
// =====================================================

function openHugExperience() {

    if (!hugExperience) return;


    if (universePopup) {

        universePopup.classList.remove(
            "show"
        );

    }


    hugExperience.classList.remove(
        "merged"
    );


    hugExperience.classList.add(
        "show"
    );


    document.body.classList.add(
        "experience-open"
    );


    setTimeout(
        () => {

            if (hugExperience) {

                hugExperience.classList.add(
                    "merged"
                );

            }

        },
        1800
    );

}


// =====================================================
// CLOSE HUG
// =====================================================

if (hugClose) {

    hugClose.addEventListener(
        "click",
        () => {

            closeHugExperience();

        }
    );

}


function closeHugExperience() {

    if (hugExperience) {

        hugExperience.classList.remove(
            "show"
        );

        hugExperience.classList.remove(
            "merged"
        );

    }


    document.body.classList.remove(
        "experience-open"
    );

}


if (hugExperience) {

    hugExperience.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                hugExperience
            ) {

                closeHugExperience();

            }

        }
    );

}


// =====================================================
// MEMORY WALL EXPERIENCE
// =====================================================

function openMemoryWall() {

    if (!memoryWall) return;


    // Close Universe popup

    if (universePopup) {

        universePopup.classList.remove(
            "show"
        );

    }


    // Close other experiences

    if (callExperience) {

        callExperience.classList.remove(
            "show"
        );

    }


    if (hugExperience) {

        hugExperience.classList.remove(
            "show"
        );

        hugExperience.classList.remove(
            "merged"
        );

    }


    // OPEN MEMORY WALL

    memoryWall.classList.add(
        "show"
    );


    // LOCK BACKGROUND

    document.body.classList.add(
        "memory-open"
    );


    // Start at top

    memoryWall.scrollTop = 0;

}


// =====================================================
// CLOSE MEMORY WALL
// =====================================================

function closeMemoryWall() {

    if (memoryWall) {

        memoryWall.classList.remove(
            "show"
        );

    }


    document.body.classList.remove(
        "memory-open"
    );

}


// =====================================================
// MEMORY WALL CLOSE BUTTON
// =====================================================

if (memoryWallClose) {

    memoryWallClose.addEventListener(
        "click",
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            closeMemoryWall();

        }
    );

}


// =====================================================
// MEMORY WALL BACKGROUND CLICK
// =====================================================

if (memoryWall) {

    memoryWall.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                memoryWall
            ) {

                closeMemoryWall();

            }

        }
    );

}


// =====================================================
// LOVE QUIZ
// =====================================================

const loveQuiz =
    document.getElementById(
        "loveQuiz"
    );

const quizClose =
    document.getElementById(
        "quizClose"
    );

const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizNumber =
    document.getElementById(
        "quizNumber"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const quizScore =
    document.getElementById(
        "quizScore"
    );

const quizOptions =
    document.querySelectorAll(
        ".quiz-option"
    );

const playQuizBtn =
    document.getElementById(
        "playQuizBtn"
    );

const quizFinalBtn =
    document.getElementById(
        "quizFinalBtn"
    );


const quizQuestions = [

    {
        question:
            "Who noticed whom first?",

        options: [
            "Me ❤️",
            "You",
            "Both of us",
            "Nobody 😂"
        ],

        answer: 0,

        correct:
            "Of course me 😌❤️ I noticed you first."

    },


    {
        question:
            "Where did our first proper conversation happen?",

        options: [
            "School",
            "Chemistry tuition",
            "Sivagangai",
            "On a random drive"
        ],

        answer: 2,

        correct:
            "Yes! 📞 Sivagangai — the call that changed everything."

    },


    {
        question:
            "What was the moment I will never forget?",

        options: [
            "Our first photo",
            "Our first hug",
            "Our first tea",
            "Our first school day"
        ],

        answer: 1,

        correct:
            "That hug. 🫂❤️ Especially what you said."

    },


    {
        question:
            "After all those years, what finally happened?",

        options: [
            "We stopped talking",
            "We became best friends",
            "We became us ❤️",
            "We forgot everything"
        ],

        answer: 2,

        correct:
            "Yes... after everything, we finally became us. ❤️"

    }

];


let currentQuestion = 0;

let quizPoints = 0;

let quizAnswered = false;


// =====================================================
// SHOW QUIZ QUESTION
// =====================================================

function showQuizQuestion() {

    if (!quizQuestions.length)
        return;


    const question =
        quizQuestions[
            currentQuestion
        ];


    if (quizNumber) {

        quizNumber.textContent =
            `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${String(quizQuestions.length).padStart(2, "0")}`;

    }


    if (quizQuestion) {

        quizQuestion.textContent =
            question.question;

    }


    if (quizResult) {

        quizResult.textContent =
            "";

    }


    quizOptions.forEach(
        (button, index) => {

            button.textContent =
                question.options[index];

            button.classList.remove(
                "correct",
                "wrong"
            );

            button.disabled =
                false;

        }
    );


    if (quizScore) {

        quizScore.textContent =
            `❤️ ${quizPoints} / ${quizQuestions.length}`;

    }


    quizAnswered =
        false;

}


// =====================================================
// ANSWER QUIZ
// =====================================================

quizOptions.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                if (quizAnswered)
                    return;


                quizAnswered =
                    true;


                const question =
                    quizQuestions[
                        currentQuestion
                    ];


                if (
                    index ===
                    question.answer
                ) {

                    button.classList.add(
                        "correct"
                    );


                    quizPoints++;


                    if (quizResult) {

                        quizResult.textContent =
                            question.correct;

                    }

                } else {

                    button.classList.add(
                        "wrong"
                    );


                    if (quizResult) {

                        quizResult.textContent =
                            "Almost 😌❤️ But you know our story better than that.";

                    }


                    if (
                        quizOptions[
                            question.answer
                        ]
                    ) {

                        quizOptions[
                            question.answer
                        ].classList.add(
                            "correct"
                        );

                    }

                }


                quizOptions.forEach(
                    option => {

                        option.disabled =
                            true;

                    }
                );


                if (quizScore) {

                    quizScore.textContent =
                        `❤️ ${quizPoints} / ${quizQuestions.length}`;

                }


                setTimeout(
                    () => {

                        currentQuestion++;


                        if (
                            currentQuestion <
                            quizQuestions.length
                        ) {

                            showQuizQuestion();

                        } else {

                            showQuizFinal();

                        }

                    },
                    1800
                );

            }
        );

    }
);


// =====================================================
// FINAL QUIZ RESULT
// =====================================================

function showQuizFinal() {

    if (quizNumber) {

        quizNumber.textContent =
            "THE END ❤️";

    }


    if (quizQuestion) {

        quizQuestion.innerHTML =
            `You scored ${quizPoints} / ${quizQuestions.length}`;

    }


    if (quizResult) {

        quizResult.innerHTML =
            "No matter the score...<br>" +
            "you are still my favourite person. ❤️";

    }


    quizOptions.forEach(
        option => {

            option.style.display =
                "none";

        }
    );


    if (quizFinalBtn) {

        quizFinalBtn.classList.add(
            "show"
        );

    }

}


// =====================================================
// CLOSE QUIZ
// =====================================================

if (quizClose) {

    quizClose.addEventListener(
        "click",
        () => {

            if (loveQuiz) {

                loveQuiz.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// OPEN QUIZ
// =====================================================

if (
    playQuizBtn &&
    loveQuiz
) {

    playQuizBtn.addEventListener(
        "click",
        () => {

            closeMemoryWall();


            loveQuiz.classList.add(
                "show"
            );


            currentQuestion =
                0;

            quizPoints =
                0;


            quizOptions.forEach(
                option => {

                    option.style.display =
                        "block";

                }
            );


            if (quizFinalBtn) {

                quizFinalBtn.classList.remove(
                    "show"
                );

            }


            showQuizQuestion();

        }
    );

}


// =====================================================
// FINAL LOCKED MESSAGE
// =====================================================

const lockedMessage =
    document.getElementById(
        "lockedMessage"
    );

const unlockBtn =
    document.getElementById(
        "unlockBtn"
    );


if (
    unlockBtn &&
    lockedMessage
) {

    unlockBtn.addEventListener(
        "click",
        () => {

            lockedMessage.classList.add(
                "unlocked"
            );

        }
    );

}


// =====================================================
// QUIZ → FINAL MESSAGE
// =====================================================

if (quizFinalBtn) {

    quizFinalBtn.addEventListener(
        "click",
        () => {

            if (loveQuiz) {

                loveQuiz.classList.remove(
                    "show"
                );

            }


            if (lockedMessage) {

                lockedMessage.classList.add(
                    "show"
                );

                lockedMessage.classList.remove(
                    "unlocked"
                );

            }

        }
    );

}


// =====================================================
// FLOATING HEARTS
// =====================================================

const floatingHearts =
    document.getElementById(
        "floatingHearts"
    );


function createFloatingHeart() {

    if (!floatingHearts)
        return;


    const heart =
        document.createElement(
            "span"
        );


    heart.classList.add(
        "floating-heart"
    );


    const hearts = [
        "♡",
        "♥",
        "✦",
        "✧"
    ];


    heart.textContent =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (
            10 +
            Math.random() * 14
        ) + "px";


    const duration =
        7 +
        Math.random() * 6;


    heart.style.animationDuration =
        duration + "s";


    floatingHearts.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        duration * 1000
    );

}


setInterval(
    createFloatingHeart,
    1200
);


// =====================================================
// HEART CURSOR TRAIL
// =====================================================

document.addEventListener(
    "mousemove",
    (event) => {

        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =
            "♡";


        heart.style.position =
            "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "10000";

        heart.style.fontSize =
            (
                10 +
                Math.random() * 8
            ) + "px";

        heart.style.color =
            "#e99ab1";

        heart.style.transform =
            "translate(-50%, -50%)";

        heart.style.transition =
            "all 0.8s ease";


        document.body.appendChild(
            heart
        );


        requestAnimationFrame(
            () => {

                heart.style.opacity =
                    "0";

                heart.style.transform =
                    "translate(-50%, -80px) scale(1.4)";

            }
        );


        setTimeout(
            () => {

                heart.remove();

            },
            800
        );

    }
);


// =====================================================
// LOADING SCREEN
// =====================================================

const loadingScreen =
    document.getElementById(
        "loadingScreen"
    );


window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                if (loadingScreen) {

                    loadingScreen.classList.add(
                        "hide"
                    );

                }

            },
            1800
        );

    }
);


// =====================================================
// REPLAY
// =====================================================

const replayBtn =
    document.getElementById(
        "replayBtn"
    );


if (replayBtn) {

    replayBtn.addEventListener(
        "click",
        () => {

            window.location.reload();

        }
    );

}


// =====================================================
// SECRET UNIVERSE HEART
// =====================================================

const sunHeart =
    document.getElementById(
        "sunHeart"
    );

const secretMessage =
    document.getElementById(
        "secretMessage"
    );

let secretTimer;


if (
    sunHeart &&
    secretMessage
) {

    sunHeart.addEventListener(
        "click",
        () => {

            secretMessage.classList.add(
                "show"
            );


            clearTimeout(
                secretTimer
            );


            secretTimer =
                setTimeout(
                    () => {

                        secretMessage.classList.remove(
                            "show"
                        );

                    },
                    3000
                );

        }
    );

}


// =====================================================
// CLICK HEART EFFECT
// =====================================================

document.addEventListener(
    "click",
    (event) => {

        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =
            "♥";


        heart.style.position =
            "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.zIndex =
            "10001";

        heart.style.pointerEvents =
            "none";

        heart.style.color =
            "#e99ab1";

        heart.style.fontSize =
            (
                12 +
                Math.random() * 8
            ) + "px";

        heart.style.transform =
            "translate(-50%, -50%) scale(0.5)";

        heart.style.transition =
            "all 0.8s ease";


        document.body.appendChild(
            heart
        );


        requestAnimationFrame(
            () => {

                heart.style.opacity =
                    "0";

                heart.style.transform =
                    "translate(-50%, -70px) scale(1.3)";

            }
        );


        setTimeout(
            () => {

                heart.remove();

            },
            800
        );

    }
);


// =====================================================
// ESCAPE — CLOSE EVERYTHING
// =====================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        if (universePopup) {

            universePopup.classList.remove(
                "show"
            );

        }


        closeCallExperience();

        closeHugExperience();

        closeMemoryWall();


        if (loveQuiz) {

            loveQuiz.classList.remove(
                "show"
            );

        }


        if (photoViewer) {

            photoViewer.classList.remove(
                "show"
            );

        }

    }
);