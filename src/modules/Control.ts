// 控制游戏的运行
// 功能：1.按键控制蛇移动 2.蛇吃食物
import Snake from './Snake';
import Food from './Food';
import ScoreBox from './ScoreBox';
class Control {
	snake: Snake;
	food: Food;
	scoreBox: ScoreBox;
	//蛇移动的方向
	direction: string = 'right';
	//蛇是否存活
	isLive: boolean = true;

	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.scoreBox = new ScoreBox();
	}

	//初始化事件
	init() {
		//绑定键盘按下事件
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		//随机生成食物
		this.food.changeRandom();
		this.run();
	}

	//处理键盘按下事件
	handleKeyDown(e: KeyboardEvent) {
		//将'ArrowLeft'转为'left'形式
		let direction = e.key && e.key.replace('Arrow', '').toLowerCase();

		//校验按键为方向键
		let validKeys = ['left', 'right', 'up', 'down'];
		if (validKeys.includes(direction)) {
			//避免掉头和同方向无效运动,即水平方向运动时,只有竖直方向键按下才能改变蛇的方向,竖直同理
			//方向的类型，水平和竖直
			const DERECTION_TYPE = {
				left: 'x',
				right: 'x',
				up: 'y',
				down: 'y'
			};

			//方向的类型不同时,则可以改变方向
			if (DERECTION_TYPE[direction] !== DERECTION_TYPE[this.direction]) {
				this.direction = direction;
			}
		}
	}

	//控制蛇移动
	run() {
		//蛇头的坐标
		let X = this.snake.X;
		let Y = this.snake.Y;
		switch (this.direction) {
			case 'left':
				X -= 10;
				break;
			case 'right':
				X += 10;
				break;
			case 'up':
				Y -= 10;
				break;
			case 'down':
				Y += 10;
				break;
		}

		//判断蛇能否吃到食物
		this.checkEat(X, Y);

		//设置蛇投的坐标
		//如果报错,则游戏结束
		try {
			this.snake.X = X;
			this.snake.Y = Y;
		} catch (e) {
			alert(e.message + 'Game Over!');
			this.isLive = false;
		}

		//每升一级，定时器的时间减少，运动速度加快;蛇死亡时,定时器关闭,蛇不再移动
		this.isLive && setTimeout(this.run.bind(this), 200 - this.scoreBox.level * 30);
	}

	//判断蛇吃食物
	checkEat(X: number, Y: number) {
		// 蛇头的坐标和食物的坐标重合，则代表吃到食物
		if (X === this.food.X && Y === this.food.Y) {
			//分数增加
			this.scoreBox.setScore();
			//蛇的长度增加
			this.snake.addBody()
			//随机改变食物的位置
			this.food.changeRandom();
		}
	}

}
export default Control;