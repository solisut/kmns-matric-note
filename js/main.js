$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);

    function init() {
        document.getElementById('titleWeb').innerHTML = CONFIG.titleWeb;
        $('#title').text(CONFIG.title);
        $('#desc').text(CONFIG.desc);
        $('#yes').text(CONFIG.btnYes);
        $('#no').text(CONFIG.btnNo);

        var xYes = (0.9 * $(window).width() - $('#yes').width() - $('#no').width()) / 2;
        var xNo = xYes + $('#yes').width() + 0.1 * $(window).width();
        var y = 0.75 * $(window).height();
        $('#yes').css({ left: xYes, top: y });
        $('#no').css({ left: xNo, top: y });
    }

    function firstQuestion() {
        $('.content').hide();
        Swal.fire({
            title: CONFIG.introTitle,
            text: CONFIG.introDesc,
            imageUrl: 'img/logi.gif',
            imageWidth: 300,
            imageHeight: 300,
            background: '#fff url("img/iput-bg.jpg")',
            imageAlt: 'Custom image',
            confirmButtonText: CONFIG.btnIntro
        }).then(function() {
            $('.content').show(200);
            var audio = new Audio('sound/sound.mp3');
            audio.play();
        });
    }

    // switch button position
    function switchButton() {
        var audio = new Audio('sound/duck.mp3');
        audio.play();
        var leftNo = $('#no').css("left");
        var topNo = $('#no').css("top");
        var leftYes = $('#yes').css("left");
        var topYes = $('#yes').css("top");
        $('#no').css({ left: leftYes, top: topYes });
        $('#yes').css({ left: leftNo, top: topNo });
    }

    // move random button position
    function moveButton() {
        var audio = new Audio('sound/Swish1.mp3');
        audio.play();
        var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
        var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
        $('#no').css({ left: x + 'px', top: y + 'px' });
    }

    init();

    var n = 0;
    $('#no').mousemove(function() {
        if (Math.random() < 0.5 || n == 1)
            switchButton();
        else
            moveButton();
        n++;
    });

    $('#no').click(() => {
        if (screen.width >= 900)
            switchButton();
    });

    // generate text in input
    function textGenerate() {
        var n = "";
        var text = " " + CONFIG.reply;
        var a = Array.from(text);
        var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
        var count = textVal.length;
        if (count > 0) {
            for (let i = 1; i <= count; i++) {
                n = n + a[i];
                if (i == text.length + 1) {
                    $('#txtReason').val("");
                    n = "";
                    break;
                }
            }
        }
        $('#txtReason').val(n);
        setTimeout(textGenerate, 1);
    }

    // show popup
    $('#yes').click(function() {
        var audio = new Audio('sound/tick.mp3');
        audio.play();
        Swal.fire({
            title: CONFIG.question,
            width: 900,
            padding: '3em',
            html: "<input type='text' class='form-control' id='txtReason' onmousemove='textGenerate()' placeholder='Whyyy'>",
            background: '#fff url('img/iput-bg.jpg')',
            backdrop: `
                  rgba(0,0,123,0.4)
                  url("img/giphy2.gif")
                  left top
                  no-repeat
                `,
            confirmButtonColor: '#fe8a71',
            confirmButtonText: CONFIG.btnReply
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    width: 900,
                    confirmButtonText: CONFIG.btnAccept,
                    background: '#fff url("img/iput-bg.jpg")',
                    title: CONFIG.mess,
                    text: CONFIG.messDesc,
                    confirmButtonColor: '#83d0c9',
                    onClose: () => {
                        window.location = CONFIG.messLink;
                    }
                });
            }
        });
    });
});

