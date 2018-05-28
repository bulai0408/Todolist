//封装一个代替getElementById（)的方法
function byId(id) {
    return typeof(id) === 'string' ? document.getElementById(id) : id;

}

var index = 0,
    timer = null,
    pics = byId('banner').getElementsByTagName('div'),
    dots = byId('dots').getElementsByTagName('span'),
    prev = byId('prev'),
    next = byId('next'),
    len = pics.length;

function slideImg() {
    let main = byId('main');
    //滑过清除定时器，离开继续
    main.onmouseover = () => {
        //滑过清除定时器
        if (timer)
            clearInterval(timer);
    };
    main.onmouseout = () => {
        timer = setInterval(() => {
            index++;
            if (index >= len)
                index = 0;
            //切换图片
            changeImg();
        }, 2000)
    };

    //一进入就触发鼠标事件
    main.onmouseout();

    //遍历所有圆点，且绑定点击事件，点击圆点来切换图片
    for (let i = 0; i < len; i++) {
        dots[i].id = `${i}`;
        dots[i].onclick = () => {
            index = dots[i].id;
            dots[i].className = 'active';
            changeImg();
        }
    }

    //下一张
    next.onclick = () => {
        index++;
        if(index >= len)
            index = 0;
        changeImg();
    };

    //上一张
    prev.onclick = () => {
        index--;
        if(index < 0)
            index = 2;
        changeImg();
    }

}

function changeImg() {
    //遍历banner下所有的div及dots下所有span，将其隐藏
    for (let i = 0; i < len; i++) {
        pics[i].style.display = 'none';
        dots[i].className = '';
    }
    //根据index索引找到当前div和当前span，将其显示出来和设为当前
    pics[index].style.display = 'block';
    dots[index].className = 'active';
}

slideImg();