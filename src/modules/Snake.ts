// 属性：XY坐标
// 功能: 1.移动(设置坐标)-附加1:判断是否吃到自己 附加2:判断是否撞墙
class Snake {
	//装蛇的容器
	element: HTMLElement;
	//蛇头,控制移动和吃食物
	head: HTMLElement;
	//蛇的身体(包括蛇头),不好获取去除蛇头的身体部分，所以在此处全部获取
	body: HTMLCollection;

	constructor() {
		this.element = document.querySelector('#snake') as HTMLElement;
		this.head = this.element.querySelector('div') as HTMLElement;
		this.body = this.element.getElementsByTagName('div');
	}

	//返回蛇头的坐标
	get X() {
		return this.head.offsetLeft;
	}
	get Y() {
		return this.head.offsetTop;
	}

	// 设置蛇头的坐标
	set X(value: number) {
		//当前坐标值和要改动的坐标值相等时，直接退出
		if (this.X === value) {
			return;
		}
		//检查是否撞墙
		if (value < 0 || value > 290) {
			throw new Error('蛇撞墙了！')
		}

		//先移动身体，再移动头部
		this.moveBody();
		this.head.style.left = value + 'px';

		//检查是否吃到自己
		this.checkEatSelf()
	}

	set Y(value: number) {
		//当前坐标值和要改动的坐标值相等时，直接退出
		if (this.Y === value) {
			return;
		}

		//检查是否撞墙
		if (value < 0 || value > 290) {
			throw new Error('蛇撞墙了！')
		}

		//先移动身体，再移动头部
		this.moveBody()
		this.head.style.top = value + 'px';

		//检查是否吃到自己
		this.checkEatSelf();
	}

	//蛇身体增加一节
	addBody() {
		let child: Node = document.createElement('div');
		this.element.appendChild(child);
	}

	//控制身体的移动
	moveBody() {
		//当蛇头移动后，则第二节移动到第一节的位置，第三节移动到第二节的位置，这样控制整个身体的移动
		//先移动身子，再移动蛇头;
		//先移动蛇头的话, 再移动身体比较麻烦,需要中间变量来记录前一节移动前的位置
		for (let i = this.body.length - 1; i > 0; i--) {
			//获取前一节的坐标
			let X = (this.body[i - 1] as HTMLElement).offsetLeft;
			let Y = (this.body[i - 1] as HTMLElement).offsetTop;
			console.log('body', X);

			//移动这一节身体到前一节的位置
			(this.body[i] as HTMLElement).style.left = X + 'px';
			(this.body[i] as HTMLElement).style.top = Y + 'px';
		}
	}

	//判断是否吃到自己
	checkEatSelf() {
		//蛇头的坐标和身体部分的坐标相同则吃到自己
		for (let i = 1; i < this.body.length; i++) {
			//获取身体部分坐标位置
			let bodyX = (this.body[i] as HTMLElement).offsetLeft;
			let bodyY = (this.body[i] as HTMLElement).offsetTop;
			if (this.X === bodyX && this.Y === bodyY) {
				throw new Error('吃到自己了！')
			}
		}
	}

}
export default Snake;