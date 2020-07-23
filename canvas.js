const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;


// Score board

let highscore = document.querySelector(".highscore");
let score = document.querySelector(".score");
let hs = 0;

function Snake() {
    this.x = scale * 4;
    this.y = scale * 4;
    this.xv = scale;
    this.yv = 0;
    // food eaten
    this.total = 0;
    this.tail = [];

    this.update = function () {

        if (this.tail.length > 1) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xv;
        this.y += this.yv;

        if (this.x >= canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        } else if (this.y >= canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = canvas.height;
        }

    }

    this.draw = function () {
        // head
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, scale, scale);

        // body
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        //eyes
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(this.x + scale * 0.2, this.y + scale * 0.2, scale * 0.2, scale * 0.2);
        ctx.fillRect(this.x + scale * 0.6, this.y + scale * 0.2, scale * 0.2, scale * 0.2);
    }

    this.changeDirection = function (event) {
        if (event.key === "ArrowDown" && snake.yv !== -scale) {
            snake.xv = 0;
            snake.yv = scale;
        } else if (event.key === "ArrowUp" && snake.yv !== scale) {
            snake.xv = 0;
            snake.yv = -scale;
        } else if (event.key === "ArrowRight" && snake.xv !== -scale) {
            snake.xv = scale;
            snake.yv = 0;
        } else if (event.key === "ArrowLeft" && snake.xv !== scale) {
            snake.xv = -scale;
            snake.yv = 0;
        }
    }

    this.eat = function (food) {
        if (this.x === food.x && this.y === food.y) {
            this.total += 1;
            return true;
        } return false;
    }

    this.crossed = function () {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
                return true;
            }
        }
        return false;
    }

}

function Food() {
    this.x;
    this.y;

    this.pickLocation = function () {
        this.x = (Math.floor(Math.random() * rows)) * scale;
        this.y = (Math.floor(Math.random() * columns)) * scale;
    }

    this.draw = function () {
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

let snake;
let food;


(function setup() {
    snake = new Snake();
    food = new Food();

    food.pickLocation();

    window.setInterval(function () {
        // Score board
        score.innerHTML = snake.total;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (snake.eat(food)) {
            food.pickLocation();
        }

        snake.update();
        snake.draw();
        food.draw();

        if (snake.crossed()) {
            // highscore update
            if (hs < snake.total) {
                hs = snake.total
                highscore.innerHTML = "highscore : " + hs;
            }
            // snake update
            snake.x = scale * 4;
            snake.y = scale * 4;
            snake.total = 0;
            snake.tail = [];
        }


    }, 250);


}());


window.addEventListener("keydown", function (event) {
    snake.changeDirection(event);
});

