var cd = document.querySelector(".cd");
var needle = document.querySelector(".needle");

// 播放对象
let audio = document.querySelector('#ado')
// 播放按钮
const _audio = document.querySelector('._audio')
const _voice = document.querySelector('._voice')

// 音频设置
audio.src = "./audio/當山みれい - 春夏秋冬 reprise.mp3"
audio.controls = false
audio.loop = true
audio.volume = 0.3

// 播放开始与暂停以及相关的图标字体修改
function bofang() {
    if (audio.paused) {
        audio.play()
        _audio.classList.remove('icon-bofang')
        _audio.classList.add('icon-zanting')

        cd.style.animationPlayState = "running"; //cd转动
        needle.id = "";
        needle.style.animationPlayState = "running";
    } else {
        audio.pause()
        _audio.classList.remove('icon-zanting')
        _audio.classList.add('icon-bofang')

        cd.style.animationPlayState = "paused"; //cd停止转动
        needle.id = "pause";
    }
}

// 是否静音与相关的图标字体修改
_voice.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false
        _voice.classList.remove('icon-yinliangguanbi')
        _voice.classList.add('icon-yinliangkai')
    } else {
        audio.muted = true
        _voice.classList.remove('icon-yinliangkai')
        _voice.classList.add('icon-yinliangguanbi')
    }
})

// 一上来先调一次初始化函数
changeSong()

// 将audio的初始化函数封装
function changeSong() {
    // 获取音频时长
    if (audio != null) {
        audio.load()
        audio.oncanplay = function () {
            let duraTime = document.querySelector('.duraTime')
            duraTime.innerHTML = transTime(audio.duration)
        }
    }

    // 格式化时间格式
    function transTime(time) {
        let duration = parseInt(time)
        let minute = parseInt(duration / 60)
        let sec = (duration % 60) + ''
        let isM0 = ':'
        if (minute == 0) {
            minute = '00'
        } else if (minute < 10) {
            minute = "0" + minute
        }
        if (sec.length == 1) {
            sec = "0" + sec
        }
        return minute + isM0 + sec
    }

    // 时长进度条
    const progress = document.querySelector(".progress");
    const slide = document.querySelector(".slide");
    const fill = document.querySelector(".fill")
    audio.ontimeupdate = function () {
        let l = (audio.currentTime / audio.duration) * 100;
        slide.style.left = l + "%";
        fill.style.width = l + "%";
        if (audio.currentTime == 0) {
            slide.style.left = "0%";
        }
        const currentTime = document.querySelector(".currentTime");
        currentTime.innerHTML = transTime(parseInt(audio.currentTime));
        const duraTime = document.querySelector(".duraTime");
        duraTime.innerHTML = transTime(audio.duration);
    };

    // 进度条拖动
    slide.onmousedown = function (e) {
        let x = e.clientX - this.offsetLeft
        document.onmousemove = function (e) {
            let jlx = ((e.clientX - x) / progress.clientWidth) * 100
            if (jlx <= 100 && jlx >= 0) {
                slide.style.left = jlx + "%"
            }
            audio.currentTime = (jlx / 100) * audio.duration
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    slide.ontouchstart = function (e) {
        let x = e.targetTouches[0].clientX - this.offsetLeft
        document.ontouchmove = function (e) {
            let jlx = ((e.targetTouches[0].clientX - x) / progress.clientWidth) * 100
            if (jlx <= 100 && jlx >= 0) {
                slide.style.left = jlx + '%'
            }
            audio.currentTime = (jlx / 100) * audio.duration
        }
        document.ontouchend = function (e) {
            document.ontouchmove = null
            document.ontouchend = null
        }
    }
}

// right_box > .navigation 修改right_box 导航栏部分样式1

const items = document.querySelectorAll('.navigation li')
function setActive() {
    items.forEach((items) => {
        items.classList.remove('active')
    })
    this.classList.add('active')
    current_tag.innerText = this.innerText
}

items.forEach((items) => {
    items.addEventListener('click', setActive)
})

// 获取推荐歌曲  切歌功能
const image = document.querySelector('._img')
const picture = document.querySelector('.picture')
const recm_list = document.querySelectorAll('.recm_list ul li')
const audio_list = ['夜驱', 'Call your name', '万疆', 'アムリタ', '群青']
const image_list = ['夜驱', 'callYourName', '万疆', '翼年代', '群青']
// ftleft 切歌后对应的图片歌名和歌手名称也需要切换
const songTitle = document.querySelector('.songTitle')
const info_singer = document.querySelector('.info_singer')
const songName = document.querySelector('.songName')
const singer = document.querySelector('.singer')
const songAndSinger_list = [
    ['夜に駆ける','YOASOBI'],
    ['Call your name','李阿亚'],
    ['万疆','李玉刚'],
    ['アムリタ','牧野由依'],
    ['群青','YOASOBI']
]

// for (let i = 0; i < recm_list.length; i++) {
//     recm_list[i].addEventListener('click', function() {5
//         audio.src = "./audio/" + audio_list[i] + ".mp3"
//         image.src = "./image/main/" + image_list[i] + ".jpg"
//         songName.innerHTML = songAndSinger_list[i][0] + '<i class="iconfont icon-aixin"></i>'
//         singer.innerHTML = songAndSinger_list[i][1]
//         changeSong()
//         audio.play()
//     })
// }

var currentSong = 0;

function previousSong() {
    currentSong--;
    currentSong = currentSong < 0 ? audio_list.length - 1 : currentSong;
    audio.src = "./audio/" + audio_list[currentSong] + ".mp3";
    image.src = "./image/main/" + image_list[currentSong] + ".jpg"
    picture.src = "./image/main/" + image_list[currentSong] + ".jpg"
    songName.innerHTML = songAndSinger_list[currentSong][0] + '<i class="iconfont icon-aixin"></i>'
    singer.innerHTML = songAndSinger_list[currentSong][1]

    songTitle.innerHTML = songAndSinger_list[currentSong][0];
    info_singer.innerHTML = songAndSinger_list[currentSong][1]

    changeSong()
    bofang()
    audio.play()
}

function nextSong() {
    currentSong++;
    currentSong = currentSong < audio_list.length ? currentSong : 0;
    audio.src = "./audio/" + audio_list[currentSong] + ".mp3";
    image.src = "./image/main/" + image_list[currentSong] + ".jpg"
    picture.src = "./image/main/" + image_list[currentSong] + ".jpg"
    songName.innerHTML = songAndSinger_list[currentSong][0] + '<i class="iconfont icon-aixin"></i>'
    singer.innerHTML = songAndSinger_list[currentSong][1]

    songTitle.innerHTML = songAndSinger_list[currentSong][0];
    info_singer.innerHTML = "作者：" + songAndSinger_list[currentSong][1]

    changeSong()
    bofang()
    audio.play()
}

image.addEventListener('click', function() {
    window.location.href = "./play.html";
});



/*--背景特效--begin*/
!function () {
    //封装方法，压缩之后减少文件大小
    function get_attribute(node, attr, default_value) {
        return node.getAttribute(attr) || default_value;
    }

    //封装方法，压缩之后减少文件大小
    function get_by_tagname(name) {
        return document.getElementsByTagName(name);
    }

    //获取配置参数
    function get_config_option() {
        var scripts = get_by_tagname("script"),
            script_len = scripts.length,
            script = scripts[script_len - 1]; //当前加载的script
        return {
            l: script_len, //长度，用于生成id用
            z: get_attribute(script, "zIndex", -1), //z-index
            o: get_attribute(script, "opacity", 0.8), //opacity
            c: get_attribute(script, "color", "255,255,255"), //color
            n: get_attribute(script, "count", 350) //count
        };
    }

    //设置canvas的高宽
    function set_canvas_size() {
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    //绘制过程
    function draw_canvas() {
        context.clearRect(0, 0, canvas_width, canvas_height);
        //随机的线条和当前位置联合数组
        var e, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点
        random_points.forEach(function (r, idx) {
            r.x += r.xa,
                r.y += r.ya, //移动
                r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
                r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
                context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
            //从下一个点开始
            for (i = idx + 1; i < all_array.length; i++) {
                e = all_array[i];
                // 当前点存在
                if (null !== e.x && null !== e.y) {
                    x_dist = r.x - e.x; //x轴距离 l
                    y_dist = r.y - e.y; //y轴距离 n
                    dist = x_dist * x_dist + y_dist * y_dist; //总距离, m

                    dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                        d = (e.max - dist) / e.max,
                        context.beginPath(),
                        context.lineWidth = d / 2,
                        context.strokeStyle = "#000000",
                        context.moveTo(r.x, r.y),
                        context.lineTo(e.x, e.y),
                        context.stroke());
                }
            }
        }), frame_func(draw_canvas);
    }

    //创建画布，并添加到body中
    var the_canvas = document.createElement("canvas"), //画布
        config = get_config_option(), //配置
        canvas_id = "c_n" + config.l, //canvas id
        context = the_canvas.getContext("2d"), canvas_width, canvas_height,
        frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
            window.setTimeout(func, 1000 / 40);
        }, random = Math.random,
        current_point = {
            x: null, //当前鼠标x
            y: null, //当前鼠标y
            max: 20000 // 圈半径的平方
        },
        all_array;
    the_canvas.id = canvas_id;
    the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
    get_by_tagname("body")[0].appendChild(the_canvas);

    //初始化画布大小
    set_canvas_size();
    window.onresize = set_canvas_size;
    //当时鼠标位置存储，离开的时候，释放当前位置信息
    window.onmousemove = function (e) {
        e = e || window.event;
        current_point.x = e.clientX;
        current_point.y = e.clientY;
    }, window.onmouseout = function () {
        current_point.x = null;
        current_point.y = null;
    };
    //随机生成config.n条线位置信息
    for (var random_points = [], i = 0; config.n > i; i++) {
        var x = random() * canvas_width, //随机位置
            y = random() * canvas_height,
            xa = 2 * random() - 1, //随机运动方向
            ya = 2 * random() - 1;
        // 随机点
        random_points.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 6000 //沾附距离
        });
    }
    all_array = random_points.concat([current_point]);
    //0.1秒后绘制
    setTimeout(function () {
        draw_canvas();
    }, 100);
}();
/*--背景特效--end*/