//动画函数
function animate(obj, target, callback) {
    //先清除一下之前的定时器，保证只留下一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //在动画执行完之后，如果有回调函数，就调用它
            if (callback) {
                callback();
            }
        } else {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}