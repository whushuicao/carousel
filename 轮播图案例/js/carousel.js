window.addEventListener('load',function(){
    //1.鼠标经过才显示左右箭头，鼠标离开时隐藏
    var box= document.querySelector('.box');
    var arrow_l=document.querySelector('.arrow_l');
    var arrow_r=document.querySelector('.arrow_r');
    var imgWidth=box.offsetWidth;
    //鼠标经过时，停止自动播放
    box.addEventListener('mouseover',function(){
        arrow_l.style.display='block';
        arrow_r.style.display='block';
        clearInterval(timer);
        timer=null;
    })
    //鼠标离开时，恢复自动播放
    box.addEventListener('mouseout',function(){
        arrow_l.style.display='none';
        arrow_r.style.display='none';
        timer=setInterval(function(){
            arrow_r.click();
        },2000);
    })

    //2.根据轮播图的图片个数，动态生成小圆点
    var ul=box.querySelector('ul');
    var ol=box.querySelector('.circle');
    for(var i=0;i<ul.children.length;i++){
        //创建元素，然后给circle添加
        var li=document.createElement('li');
        //通过自定义属性存储和获取小圆点索引
        li.setAttribute('data-index',i);
        ol.appendChild(li);

        //同时给小圆点注册点击事件
        li.addEventListener('click',function(){
            //点击小圆点，改变样式，注意排他性
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            this.className='current';

            //3.点击小圆点，滑动到对应图片
            var index=this.getAttribute('data-index');
            animate(ul,-index*imgWidth);
            //注意让其与点击方向箭头的事件索引号保持一致
            num=index;
            circle=index;
        })
    }
    //默认ol中的第一个li被选中
    ol.children[0].className='current';

    //4.点击右箭头，换一张图片，图片往后滑动一次
    var num=0;//图片的索引号
    var circle=0;//小圆点的索引号
    //小圆点的索引号和图片的索引号不能使用同一个，因为小圆点个数比图片要少一个，会超出索引
    var flag=true;//节流阀
    
    //给ul末尾添加第一张图片，完成无缝滑动效果
    //cloneNode()参数为true，表示深拷贝，拷贝他下面的所有子节点
    var li=ul.children[0].cloneNode(true);
    //注意这里因为写在生成小圆点函数的下面，js按顺序执行，所以不会影响生成小圆点的个数
    ul.appendChild(li);
    arrow_r.addEventListener('click',function(){
        if(flag){
            flag=false;
            //如果num===ul.children.length-1，说明已经到了复制的那张图片了
            if(num===ul.children.length-1){
                //不要动画效果，直接回到起点，瞬间的效果
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*imgWidth,function(){
                flag=true;
            });

            //5.点击右箭头切换图片时，对应的小圆点要改变样式，注意排他
            //小圆点先自增后判断
            circle++;
            if(circle===ol.children.length){
                circle=0;
            }
            circleChange();
        }
    })

    //6.点击左箭头，换一张图片，图片往前滑动一次
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag=false;
            //如果num===0，说明已经到了第一张图片
            if(num===0){
                //不要动画效果，直接回到最后一张图片，瞬间的效果，一定要记得加px！
                num=ul.children.length-1;
                ul.style.left=-num*imgWidth +'px';
            }
            num--;
            animate(ul,-num*imgWidth,function(){
                flag=true;
            });

            //对应的小圆点要改变样式，注意排他
            circle--;
            if(circle<0){
                circle=ol.children.length-1;
            }
            circleChange();
        }
    })

    //7.图片自动播放
    //自动播放的效果和鼠标点击右箭头的效果是一样的，所以我们只需要定时手动调用右箭头的鼠标点击事件
    var timer=setInterval(function(){
        arrow_r.click();
    },2000);

    function circleChange(){
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        ol.children[circle].className='current';
    }
})