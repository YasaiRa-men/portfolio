//アニメーションさせたい要素
const scrollTargets = document.querySelectorAll(".js-scrollAni");
const leftSlideTargets = document.querySelectorAll(".leftscrollAni");
const focusTargets = document.querySelectorAll(".focusText");


//アニメーションタイミング
const offset = 100;

let beforetarget;
//スクロールしたときのイベント
function handleScroll() {
    let scroll = window.scrollY;
    let h = window.innerHeight;

    function updateAnimationForTargets(targets, className, condition) {
        targets.forEach(target => {
            if (condition(target)) {
                target.classList.add(className);
            } else {
                target.classList.remove(className);
            }
        });
    }

    updateAnimationForTargets(scrollTargets, "is-animated", target => scroll > target.getBoundingClientRect().top + scroll - h + offset);
    updateAnimationForTargets(leftSlideTargets, "is-leftanimated", target => scroll > target.getBoundingClientRect().top + scroll - h + offset);

    if (document.getElementById("tableOfContents").getBoundingClientRect().bottom < 0) {
        document.querySelector("#navigationMenu").classList.add("is-navigationMenu-animated");
    } else {
        document.querySelector("#navigationMenu").classList.remove("is-navigationMenu-animated");
    }

    let i = 1;
    // 目次の切り替え高さの調整
    const menuoffset = 450;
    while (true) {
        if (document.getElementById("Focus" + i) == null) break;
        let navigationMenutarget = document.getElementById("Focus" + i);
        // 目次の要素の入れ替え
        if (document.getElementById("sectionIntroduction" + i).getBoundingClientRect().top < navigationMenutarget.getBoundingClientRect().bottom + menuoffset) {
            navigationMenutarget.classList.add("focus");
            if (beforetarget != null && navigationMenutarget != beforetarget) beforetarget.classList.remove("focus");
            beforetarget = navigationMenutarget;
        }
        i++;
    }
}

handleScroll();

window.addEventListener("scroll", handleScroll);

function smoothScrollTo(height) {
    window.scrollTo({
        top: height,
        behavior: "smooth"
    });
}

const offsetY = 70;

function scrollToSection(sectionId) {
    const targetHeight = document.getElementById(sectionId).offsetTop - offsetY;
    smoothScrollTo(targetHeight);
}

function scrollToTop() {
    scrollToSection("pageContainer");
}

function scrollToIntroduction() {
    scrollToSection("sectionIntroduction1");
}

function scrollToSkills() {
    scrollToSection("sectionIntroduction2");
}

function scrollToProjects() {
    scrollToSection("sectionIntroduction3");
}

function scrollToContacts() {
    scrollToSection("sectionIntroduction4");
}

const copytext = document.getElementById("copytext");
copytext.style.opacity = 0;

let opcityTime;
let intervalTime;
function copyToClipboard() {
    clearTimeout(opcityTime); 
    clearInterval(intervalTime);  

    const text = document.getElementById("commandtext").textContent;

    navigator.clipboard.writeText(text)
    .catch((error) => {
        console.error("Error in copying text: ", error);
    });

    copytext.style.opacity = 1;
    opcityTime = setTimeout(function() {
        let i = 0.1;
        intervalTime = setInterval(function() {
            copytext.style.opacity = 1 - i;
            i += 0.1;
            if (i >= 1) clearInterval(intervalTime);
        }, 50);
    }, 1500);
}

function layoutSkillsList() {
    let i = 1;
    while (true) {
        let targetelem = document.getElementById("programlist" + i);
        if (targetelem == null) break;
        if (i % 2) {
            targetelem.style.left = "0px";
        } else {
            targetelem.style.right = "0px";
        }
        
        i++;
        targetelem.style.top = document.getElementById("pageContainer").offsetWidth >= 800 ?
        240 * (Math.floor(i/2) - 1) + "px" : 30 * (Math.floor(i/2) - 1) + "vw";
        document.getElementById("programlist").style.height = document.getElementById("pageContainer").offsetWidth >= 800 ?
        248 * Math.floor(i/2) + "px" : 31 * Math.floor(i/2) + "vw";
    }
}

layoutSkillsList();
window.onresize = layoutSkillsList;

function generateTableOfContents() {
    let i = 1;
    while (true) {
        let targetelem = document.getElementById("tableOfContents" + i);
        if (targetelem == null) break;

        let targettext = targetelem.textContent;
        Displaymenu.insertAdjacentHTML("beforeend",
            '<h6 id="Focus' + i + '" class="focusText">' + targettext + '</h6>'
        );
        i++;
    }
}

generateTableOfContents();

const detailButtons = document.querySelectorAll(".detailButton");

detailButtons.forEach(function(element, index) {

    if (!element) return console.error("制作物のボタンの読み込みに失敗しました");

    element.addEventListener("click", function() {

        modalContent.insertAdjacentHTML("afterbegin", '<iframe id="htmliframe" src="work_'+index+'.html"></iframe>');
        modalBackground.style.display = "block";

        document.addEventListener("scroll", closeMenu);
        backtomenu.addEventListener("click", closeMenu);
        backmenuflag = true;
    });
});

let backmenuflag = false;
function closeMenu() {
    if (backmenuflag) {
        htmliframe.remove();
        modalBackground.style.display = "none";

        document.removeEventListener("scroll", closeMenu);
        backtomenu.removeEventListener("click", closeMenu);
        backmenuflag = false;
    }
}
