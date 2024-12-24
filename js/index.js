
const parallax = document.getElementById("parallax");
const objsContainer_elm = document.getElementById("objsContainer");
const ratio = [8, 4]; // скорость эффекта
const modClose_elm = document.getElementById("modClose");
const modal_elm = document.getElementById("modal");
const iframe_elm = document.getElementById("video-frame");

const hVideos = {
    ornament1: {
        departName: "ДУПОР",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("dupor"),
    },
    ornament2: {
        departName: "СЭ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("sa"),
    },
    ornament3: {
        departName: "Диис",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("diis"),
    },
    ornament4: {
        departName: "СК",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("sk"),
    },
    ornament5: {
        departName: "КТС",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("kts"),
    },
    ornament6: {
        departName: "МСК",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("mosсow"),
    },
    ornament7: {
        departName: "Дсил",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("dsil"),
    },
    ornament8: {
        departName: "НПУ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("ntu"),
    },
    ornament9: {
        departName: "ОТИЗ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("otiz"),
    },
    ornament10: {
        departName: "ПДОП",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("pdop"),
    },
    ornament11: {
        departName: "КД",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("kd"),
    },
    ornament12: {
        departName: "ДСВЧЭ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("dsvch"),
    },
    ornament13: {
        departName: "ДЭП",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("dap"),
    },
    ornament14: {
        departName: "ДКЗ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("dkz"),
    },
    ornament15: {
        departName: "ЗРЭА",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("zraa"),
    },
    ornament16: {
        departName: "ДФ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("df"),
    },
    ornament17: {
        departName: "ДКТ",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("dtk"),
    },
    ornament18: {
        departName: "ДС",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("ds"),
    },
    ornament19: {
        departName: "ПД",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("pd"),
    },
    ornament20: {
        departName: "Администрация",
        videoUrl: "https://rutube.ru/play/embed/b6be615d3f1afa648bf6b9dcfae10610",
        bWatched: false,
        bElm: document.getElementById("deparStar"),
    }
};

globalThis.addEventListener("load", () => {
    const tmpDataLs = get_storage_obj__ls("ornamentData");
    if (tmpDataLs !== null) {
        for (const obj in hVideos) {
            if (tmpDataLs[obj] != undefined) {
                hVideos[obj].bWatched = tmpDataLs[obj].bWatched;
                if (hVideos[obj].bWatched == true) {
                    hVideos[obj].bElm.classList.add("ball-watched");
                }
            }
        }
    } else {
        set_storage_obj__ls("ornamentData", hVideos);
    }

    for (const obj in hVideos) {
        hVideos[obj].bElm.addEventListener("click", () => {
            updateWatchedState(obj);
        });
    }
});

globalThis.addEventListener("message", handleMessage);

function handleMessage(event) {
    if (!event.data) return;

    let ev_type;
    let ev_data;

    try {
        const data = JSON.parse(event.data);
        ev_type = data.type;
        ev_data = data.data;
    } catch (err) {
        ev_type = "JSON invalid";
    }

    if (ev_type === "player:ready") {
        if (iframe_elm && iframe_elm.contentWindow) {
            iframe_elm.contentWindow.postMessage(
                JSON.stringify({ type: "player:play", data: {} }),
                "*"
            );
        }
    }
}

modClose_elm.addEventListener("click", () => {
    iframe_elm.src = "";
    modal_elm.style.display = "none";
    modal_elm.classList.remove("modal-open");
});

document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * ratio[0] - (ratio[0] / 2);
    const y = (event.clientY / window.innerHeight) * ratio[1] - (ratio[1] / 2);
    parallax.style.transform = `translate(${x}px, ${y}px)`;
});

function saveOrnamentData() {
    set_storage_obj__ls("ornamentData", hVideos);
}

function updateWatchedState(xIndx = null) {
    if (xIndx != null) {
        hVideos[xIndx].bWatched = true;
        if (hVideos[xIndx].bWatched == true && !hVideos[xIndx].bElm.classList.contains("ball-watched")) {
            hVideos[xIndx].bElm.classList.add("ball-watched");
        }
        saveOrnamentData();

        const videoSrc = hVideos[xIndx].videoUrl;
        iframe_elm.src = videoSrc;
        modal_elm.style.display = "block";
        modal_elm.classList.add("modal-open");
    }
}
