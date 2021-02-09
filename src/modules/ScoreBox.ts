//设置分数和等级
class ScoreBox {
    scoreElement: HTMLElement;
    levelElement: HTMLElement;
    score: number = 0;
    level: number = 1;
    //最高等级
    maxLevel: number = 10;

    constructor() {
        this.scoreElement = document.querySelector('#score') as HTMLElement;
        this.levelElement = document.querySelector('#level') as HTMLElement;
    }

    //增加分数
    setScore(value: number = 1) {
        //分数增加
        this.score += value;
        this.scoreElement.innerHTML = this.score + '';
        //每5分升一级
        if (this.score % 2 === 0) {
            this.setLevel();
        }
    }

    //增加等级
    setLevel() {
        //最高等级为10级
        if (this.level < this.maxLevel) {
            this.levelElement.innerHTML = ++this.level + '';
        }
    }
}
export default ScoreBox;