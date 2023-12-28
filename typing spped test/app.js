const paragraphs = [
    "Rishyashringa, of dreaded name, was born as a son to Vibhandaka, who was a Brahmana saint, who had cultured his soul by means of religious austerities, whose seed never failed in causing generation, and who was learned and bright like the Lord of beings. The father was highly honoured, and the son was possessed of a mighty spirit, and, though a boy, was respected by aged man. That son of Kashyapa, Vibhandaka, having proceeded to a big lake, devoted himself to the practice of penances. That same saint, comparable to a god, laboured for a long period. Once while he was washing his mouth in the waters,",
    "That same hind had really been a daughter of the gods, and had been told of yore by the holy Brahma, “You shall be a hind; and when in that form, you shall give birth to a saint; you shall then be freed.” As Destiny would have it, and as the word of the creator would not be untrue, in that same hind was born Vibhandaka's son a mighty saint..",
    "Rishyashringa, devoted to penances, always passed his days in the forest. There was a horn on the head of that magnanimous saint and for this reason did he come to be known at the time by the name of Rishyashringa. Barring his father, not a man had ever before been seen by him; therefore his mind was entirely devoted to the duties of a continent life.",
    "At this very period there was a ruler of the land of Anga known by the name of Lomapada who was a friend of Dasharatha. He from love of pleasure had been guilty of a falsehood towards a Brahmana. That same ruler had at that time been shunned by all persons of the priestly class.",
    "He was without a ministering priest to assist him in his religious rites. Indra suddenly abstained from giving rain in his territory; so that his people began to suffer and he questioned a number of Brahmanas, devoted to penances, of cultivated minds, and possessed of capabilities with reference to the matter of rain being granted by the lord of gods, saying, “How may the heavens grant us the rain? Think of an expedient for this purpose.” Those same cultured men, being thus questioned, gave expression to their respective views.",
    "Having heard these words, Lomapada made atonement for his sins. He went away; and when the Brahmanas had been appeased, he returned again, and seeing the king returned, the people were again glad at heart. Then the king of Anga convened a meeting of his ministers, proficient in giving counsel. He took great pains in order to settle some plan for securing a visit from Rishyashringa.",
    "With those ministers, who were versed in all branches of knowledge, exceedingly proficient in worldly matters, and had a thorough training in practical affairs, he at last settled a plan. Then he sent for a number of courtesans, women of the town, clever in everything. When they came, the king spoke to them, saying, “You lovely women! ",
    " You must find some means to allure, and obtain the confidence of the son of the saint, Rishyashringa, whom you must bring over to my territory",
    "Those cowbells are nothing more than elements. This could be, or perhaps before stockings, thoughts were only opinions. A coil of the exclamation is assumed to be a hurtless toy. A board is the cast of a religion. In ancient times the first stinko sailboat is, in its own way, an exchange. Few can name a tutti channel that isn't a footless operation. Extending this logic, an oatmeal is the rooster of a shake. Those step-sons are nothing more than matches.",
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);