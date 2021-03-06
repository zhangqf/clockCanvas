
/** 
 * @param { string } id 挂载dom元素id
 * @param { string } fillNumberColor 表盘数字填充色
 * @param { string } arcBorderColor 表盘边框填充色
 * @param { string } dialLargeScaleColor 表盘大刻度（12份）填充色
 * @param { string } dialScaleColor 表盘刻度（60份）填充色
 * @param { string } hourHandColor 时针填充色
 * @param { string } minuteHandColor 分针填充色
 * @param { string } secondHandColor 秒针填充色
 */

/*
 *@Description: 定义ClockCanvas构造函数，及默认参数，
 *@ClassAuthor: Qian
 *@Date: 2021-07-26 15:56:43
*/
function ClockCanvas(
    id = 'canvas',
    fillNumberColor = "rgb(247,68,97)",
    arcBorderColor = "rgb(252,157,154)",
    dialLargeScaleColor = "rgb(247,68,97)",
    dialScaleColor = "rgb(247,68,97)",
    hourHandColor = "rgb(222,157,154)",
    minuteHandColor = "rgb(252,157,154)",
    secondHandColor = "#f10",
) {
    this.nodeId = id
    this.fillNumberColor = fillNumberColor,
        this.dialLargeScaleColor = dialLargeScaleColor,
        this.dialScaleColor = dialScaleColor,
        this.minuteHandColor = minuteHandColor,
        this.hourHandColor = hourHandColor,
        this.arcBorderColor = arcBorderColor
    this.secondHandColor = secondHandColor
}
/*
 *@Description: 重写ClockCanvas原型
 *@ClassAuthor: Qian
 *@Date: 2021-07-26 15:57:57
*/

ClockCanvas.prototype = {
    constructor: 'ClockCanvas',
    init() {
        const canvas = document.getElementById(this.nodeId)
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        const ctx = canvas.getContext('2d')
        ctx.save()
        // 开始画图前清空画布
        ctx.clearRect(0, 0, w, h)
        // 设置中心点，分别为canvas的宽度和高度的一半
        ctx.translate(w / 2, h / 2)
        // 入栈
        ctx.save()
        // 开始画表外边框 
        ctx.beginPath();
        ctx.arc(0, 0, (w - 20) / 2, 0, 2 * Math.PI)
        ctx.strokeStyle = this.arcBorderColor
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath();
        ctx.arc(0, 0, 0, 0, 2 * Math.PI)

        ctx.stroke()
        ctx.closePath()

        let time = new Date()
        let hour = time.getHours() % 12
        let min = time.getMinutes()
        let sec = time.getSeconds()
        // 时针
        ctx.rotate(2 * Math.PI / 12 * hour + 2 * Math.PI / 12 * (min / 60) - Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(w / 4, 0)
        ctx.strokeStyle = this.hourHandColor
        ctx.lineWidth = 4;
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(w / 4, 0)
        ctx.lineTo(w / 4, 10)
        ctx.lineTo(w / 3.4, 0)
        ctx.lineTo(w / 4, -10)
        ctx.lineTo(w / 4, 0)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        ctx.save();


        // 分针
        ctx.rotate(2 * Math.PI / 60 * min + 2 * Math.PI / 60 * (sec / 60) - Math.PI / 2)

        ctx.beginPath();
        ctx.moveTo(0, 0)
        ctx.lineTo(w / 3.1, 0)
        ctx.lineWidth = 5
        ctx.strokeStyle = this.minuteHandColor
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(w / 3.1, 0)
        ctx.lineTo(w / 3.1, 10)
        ctx.lineTo(w / 2.74, 0)
        ctx.lineTo(w / 3.1, -10)
        ctx.lineTo(w / 3.1, 0)
        ctx.lineWidth = 4
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        ctx.save()
        // 秒针
        ctx.rotate(2 * Math.PI / 60 * sec - Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(w / 2.38, 0)
        ctx.lineTo(w / 2.32, 0)
        ctx.strokeStyle = this.secondHandColor
        ctx.lineWidth = 6
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        ctx.save()
        // 小刻度
        ctx.lineWidth = 1
        for (let i = 0; i < 60; i++) {
            ctx.rotate(2 * Math.PI / 60)
            ctx.beginPath()
            ctx.moveTo(w / 2 - w / 18, 0)
            ctx.lineTo(w / 2 - w / 40, 0)
            ctx.strokeStyle = this.dialScaleColor
            ctx.stroke()
            ctx.closePath()
        }

        ctx.restore()
        ctx.save()

        // 大刻度
        ctx.lineWidth = 5
        for (let i = 0; i < 12; i++) {
            ctx.rotate(2 * Math.PI / 12)
            ctx.beginPath()
            ctx.moveTo(w / 2 - w / 16, 0)
            ctx.lineTo(w / 2 - w / 40, 0)
            ctx.strokeStyle = this.dialLargeScaleColor
            ctx.stroke()
            ctx.closePath()
        }
        ctx.restore()
        ctx.save()
        // 大刻度数字描述
        for (let i = 0; i < 12; i++) {
            // ctx.rotate(2 * Math.PI / 12)
            ctx.beginPath()
            ctx.font = '24px "微软雅黑"';
            ctx.fillStyle = this.fillNumberColor;
            ctx.textBaseline = "center";
            switch (i) {
                case 0:
                    ctx.fillText("12", -w / 50, -h / 2.6);
                    break;
                case 1:
                    ctx.fillText("1", w / 5.2, -h / 3.16);
                    break;
                case 2:
                    ctx.fillText("2", w / 3, -h / 5.3);
                    break;
                case 3:
                    ctx.fillText("3", w / 2.56, h / 68);
                    break;
                case 4:
                    ctx.fillText("4", w / 3, h / 4.8);
                    break;
                case 5:
                    ctx.fillText("5", w / 5.2, h / 2.8);
                    break;
                case 6:
                    ctx.fillText("6", -w / 80, h / 2.46);
                    break;
                case 7:
                    ctx.fillText("7", -w / 4.8, h / 2.8);
                    break;
                case 8:
                    ctx.fillText("8", -w / 2.8, h / 4.6);
                    break;
                case 9:
                    ctx.fillText("9", -w / 2.4, h / 68);
                    break;
                case 10:
                    ctx.fillText("10", -w / 2.8, -h / 5.4);
                    break;
                case 11:
                    ctx.fillText("11", -w / 4.6, -h / 3.16);
                    break;

            }

            ctx.closePath()
        }
        ctx.restore()
        ctx.restore()
    },

}




