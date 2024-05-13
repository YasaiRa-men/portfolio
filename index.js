//アニメーションさせたい要素
const targets = document.querySelectorAll(".js-scrollAni");
const lefttargets = document.querySelectorAll(".leftscrollAni");
const focustargets = document.querySelectorAll(".Displaymenutext");


//アニメーションタイミング
const offset = 100;

let beforetarget;
//スクロールしたときのイベント
function ScrollEvent() {
    let scroll = window.scrollY;
    let h = window.innerHeight;

    for(let target of targets) {
        //アニメーションさせたい要素の位置を取得
        let pos = target.getBoundingClientRect().top + scroll;

        //スクロール量 > アニメーションさせたい要素の位置 の真偽で表示方法を決める
        if (scroll > pos - h + offset) {
            target.classList.add("is-animated");
        } else {
            target.classList.remove("is-animated");
        }
    }

    for(let target of lefttargets) {
        //アニメーションさせたい要素の位置を取得
        let pos = target.getBoundingClientRect().top + scroll;

        //スクロール量 > アニメーションさせたい要素の位置 の真偽で表示方法を決める
        if (scroll > pos - h + offset) {
            target.classList.add("is-leftanimated");
        } else {
            target.classList.remove("is-leftanimated");
        }
    }

    if (document.getElementById("mainList").getBoundingClientRect().bottom < 0) {
        document.querySelector("#upmenu").classList.add("is-upmenu-animated");
    } else {
        document.querySelector("#upmenu").classList.remove("is-upmenu-animated");
    }

    let i = 1;
    const menuoffset = 200;
    while (true) {
        if (document.getElementById("Focus" + i) == null) break;
        let upmenutarget = document.getElementById("Focus" + i);
        if (document.getElementById("maintitle" + i).getBoundingClientRect().top < upmenutarget.getBoundingClientRect().bottom + menuoffset) {
            upmenutarget.classList.add("focus");
            if (beforetarget != null && upmenutarget != beforetarget) beforetarget.classList.remove("focus");
            beforetarget = upmenutarget;
        }
        i++;
    }
}

ScrollEvent();

window.addEventListener("scroll", ScrollEvent);

function SmoothScroll(targetelemheight) {
    window.scrollTo({
        top: targetelemheight,
        behavior: "smooth"
    });
}

const offsetY = 70;

function ToHome() {
    SmoothScroll(0);
}

function Tomaintitle1() {
    const targetheight = document.getElementById("maintitle1").offsetTop - offsetY;
    SmoothScroll(targetheight);
}

function Tomaintitle2() {
    const targetheight = document.getElementById("maintitle2").offsetTop - offsetY;
    SmoothScroll(targetheight);
}

function Tomaintitle3() {
    const targetheight = document.getElementById("maintitle3").offsetTop - offsetY;
    SmoothScroll(targetheight);
}

const copytext = document.getElementById("copytext");
copytext.style.opacity = 0;

let opcityTime;
let intervalTime;
function Copy() {
    clearTimeout(opcityTime); 
    clearInterval(intervalTime);  

    const text = document.getElementById("commandtext").textContent;

    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard');
    })
    .catch((error) => {
        console.error('Error in copying text: ', error);
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

function ProgramList() {
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
        targetelem.style.top = document.getElementById("htmlbody").offsetWidth >= 800 ?
        240 * (Math.floor(i/2) - 1) + "px" : 30 * (Math.floor(i/2) - 1) + "vw";
        document.getElementById("programlist").style.height = document.getElementById("htmlbody").offsetWidth >= 800 ?
        248 * Math.floor(i/2) + "px" : 31 * Math.floor(i/2) + "vw";
    }
}

ProgramList();
window.onresize = ProgramList;

function CreatemainList() {
    let i = 1;
    while (true) {
        let targetelem = document.getElementById("mainList" + i);
        if (targetelem == null) break;

        let targettext = targetelem.textContent;
        Displaymenu.insertAdjacentHTML("beforeend",
            '<h6 id="Focus' + i + '" class="Displaymenutext">' + targettext + '</h6>'
        );
        i++;
    }
}

CreatemainList();

const clickEvents = document.querySelectorAll(".click-event");

clickEvents.forEach(function(element, index) {
    element.addEventListener("click", function() {
        console.log(element); // クリックされた要素
        console.log(index); // 要素のインデックス
        htmlmenu.insertAdjacentHTML("afterbegin", '<iframe id="htmliframe" src="index.3_'+index+'.html"></iframe>');
        menuback.style.display = "block";

        document.addEventListener("scroll", Backmenu);
        backtomenu.addEventListener("click", Backmenu);
        backmenuflag = true;
    });
});

let backmenuflag = false;
function Backmenu() {
    if (backmenuflag) {
        htmliframe.remove();
        menuback.style.display = "none";

        document.removeEventListener("scroll", Backmenu);
        backtomenu.removeEventListener("click", Backmenu);
        backmenuflag = false;
    }
}