// 属性：XY坐标   功能：1.随机生成食物(改变食物的坐标位置)
import Snake from './Snake';
class Food {
	element: HTMLElement;
	snake: Snake;

	constructor() {
		this.element = document.querySelector('#food') as HTMLElement;
		this.snake = new Snake();
	}

	//获取食物的XY坐标
	get X() {
		return this.element.offsetLeft;
	}
	get Y() {
		return this.element.offsetTop;
	}

	// 随机生成食物(改变食物的位置)
	changeRandom() {
		//x的坐标在0-290 y的坐标在0-290
		//且规定10px为一格，即生成的坐标要是10的倍数
		let top = Math.round(Math.random() * 29) * 10;
		let left = Math.round(Math.random() * 29) * 10;

		//食物生成的位置不能在蛇的身体里
		for (let i = 0; i < this.snake.body.length; i++) {
			let snakeX = (this.snake.body[i] as HTMLElement).offsetLeft;
			let snakeY = (this.snake.body[i] as HTMLElement).offsetTop;

			//如果生成食物的位置与蛇重合,则重新执行生成食物方法,且跳出当前方法
			if (top === snakeY && left === snakeX) {
				this.changeRandom();
				return;
			}
		}
		this.element.style.top = top + 'px';
		this.element.style.left = left + 'px';
	}
}
export default Food;