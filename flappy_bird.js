document.addEventListener("DOMContentLoaded", () => {
    let Gravityinterval = setInterval(dropbird, 20);
    let bird = document.querySelector(".bird");
    let container = document.querySelector(".container");
    let gameStarted = false
    let score = document.querySelector(".score");
    let over_text = document.querySelector(".gameOver");
    let speed = 2;
    function dropbird() {
        bird.style.top = parseInt(bird.style.top) + 2 + "px";
        if (parseInt(bird.style.top) > 377.5) {
            StopGame();
        }
    }
    function tubes() {
        let tube = document.createElement("div")
        let tube2 = document.createElement("div")
        tube.classList.add("tube");
        tube2.classList.add("tubeTop");
        container.appendChild(tube)
        container.appendChild(tube2)
        let clientWidth = document.documentElement.clientWidth;
        tube.style.right = -(clientWidth - (clientWidth / 2) - 200 + 60) + "px";
        tube2.style.right = -(clientWidth - (clientWidth / 2) - 200 + 60) + "px"
        let tube2Top = (Math.random() * (-200)) + "px";
        let tubeTop = Math.random() * (210) - 80 + "px";
        while ((550 - ((300 + parseInt(tubeTop)) + (300 + parseInt(tube2Top)))) < 90) {
            tube2Top = (Math.random() * (-200)) + "px";
            tubeTop = Math.random() * (130 + 80) - 80 + "px";
        }
        tube2.style.top = tube2Top;
        tube.style.bottom = tubeTop;
    }
    function moveTube() {
        let tube = document.querySelectorAll(".tube");
        let tube2 = document.querySelectorAll(".tubeTop");
        let clientWidth = document.documentElement.clientWidth;
        for (let i of tube) {
            if (parseInt(i.style.right) > 248 && gameStarted == true) {
                if (!i.classList.contains("tubeTemp")) {
                    score.textContent = parseInt(score.textContent) + 1;
                    i.classList.add("tubeTemp");
                    if (score.textContent % 5 == 0) {
                        speed++;
                        clearInterval(tubeIntevral);
                        if (speed < 5) {
                            tubeIntevral = setInterval(tubes, 2000);
                        }
                        else if (speed < 7) {
                            tubeIntevral = setInterval(tubes, 1500);
                        }
                        else if (speed < 9) {
                            tubeIntevral = setInterval(tubes, 1100);
                        }
                        else if (speed < 12) {
                            tubeIntevral = setInterval(tubes, 800);
                        }
                        else {
                            tubeIntevral = setInterval(tubes, 500)
                        }
                    }
                }

            }
            if (parseInt(i.style.right) > 155 && parseInt(i.style.right) < 250 &&
                parseInt(bird.style.top) > (515 - (300 + parseInt(i.style.bottom)))) {
                StopGame()
            }
            i.style.right = parseInt(i.style.right) + speed + "px";
            if (parseInt(i.style.right) >= (clientWidth / 2 + 260)) {
                container.removeChild(i);
            }

        }
        for (let i of tube2) {
            if (parseInt(i.style.right) > 155 && parseInt(i.style.right) < 250 &&
                parseInt(bird.style.top) < ((300 + parseInt(i.style.top)))) {
                StopGame()
            }
            i.style.right = parseInt(i.style.right) + speed + "px"
            if (parseInt(i.style.right) >= (clientWidth / 2 + 260)) {
                container.removeChild(i);
            }
        }
    }
    let moveInterval = setInterval(moveTube, 20);
    let tubeIntevral = setInterval(tubes, 2700);


    function StopGame() {
        clearInterval(tubeIntevral);
        clearInterval(Gravityinterval);
        clearInterval(moveInterval);
        document.removeEventListener("keyup", SpaceKey);
        over_text.textContent = "press any key to start again";
        let start = document.addEventListener("keyup", StartGame);
        let highscore = parseInt(localStorage.getItem("highscore")) || 0;
        if (highscore != null && highscore < score.textContent) {
            localStorage.setItem("highscore", score.textContent);
            highscore = score.textContent;
            alert("congrats on hitting a new highscore, keep it going!!")
        }
        score.textContent = "your Score: " + score.textContent + ", HighScore:" + highscore;

    }
    function StartGame() {
        speed = 2
        score.textContent = 0;
        document.removeEventListener("keyup", StartGame);
        document.removeEventListener("keyup", start);
        document.addEventListener("keyup", SpaceKey);
        let tube = document.querySelectorAll(".tube");
        over_text.textContent = "press Space or Enter to Jump";
        setTimeout(ClearText, 3600)
        let tubesTop = document.querySelectorAll(".tubeTop");
        for (let i of tube) {
            container.removeChild(i);
        }
        for (let i of tubesTop) {
            container.removeChild(i);
        }
        tubes();
        jump();
        moveInterval = setInterval(moveTube, 20);
        tubeIntevral = setInterval(tubes, 2700);
        Gravityinterval = setInterval(dropbird, 20);
    }
    function ClearText() {
        over_text.textContent = ""
    }

    function jump() {
        gameStarted = true;
        if (parseInt(bird.style.top) > 75) {
            bird.style.top = parseInt(bird.style.top) - 40 + "px";
        }
        else {
            bird.style.top = 0 + "px";
        }
    }
    document.addEventListener("keyup", start);
    function start() {
        StopGame();
        StartGame();
    }
    function SpaceKey(e) {
        if (e.keyCode === 32 || e.keyCode === 13) {
            jump();
        }
    }
})
