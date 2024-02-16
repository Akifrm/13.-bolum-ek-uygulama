async function timeControl() {
    localStorage.getItem("tomarrow")
        ? new Date() > new Date(localStorage.getItem("tomarrow"))
            ? (console.log("yeni gÃ¼n oldu"),
                localStorage.setItem("tomarrow", new Date(tomorrow)),
                await fetch(
                    "https://api.countapi.xyz/get/afrhDailyVisits/afrhDailyVisits",
                )
                    .then((n) => n.json())
                    .then((n) => {
                        for (var t = 0; t < n.value - 1; t++)
                            fetch(
                                "https://api.countapi.xyz/update/afrhDailyVisits/afrhDailyVisits/?amount=-1",
                            )
                                .then((n) => n.json())
                                .then((n) => {
                                    console.log(n.value),
                                        n.value === 1 &&
                                        (localStorage.setItem("tomarrow", new Date(tomorrow)),
                                            sessionStorage.setItem("_Daily_Visit_Count", n.value),
                                            sessionStorage.setItem("useWebDay", "true"));
                                });
                    }))
            : (console.log("yeni gÃ¼n olmadÄ±"),
                await sessionStorage.setItem(
                    "useWebDay",
                    sessionStorage.getItem("useWebDay") ? "true" : "false",
                ),
                sessionStorage.getItem("useWebDay") == "false"
                    ? (await fetch(
                        `https://api.countapi.xyz/update/afrhDailyVisits/afrhDailyVisits/?amount=1`,
                    )
                        .then((n) => n.json())
                        .then((n) => {
                            console.log("GiriÅŸ YapÄ±ldÄ± = " + n.value),
                                sessionStorage.setItem("useWebDay", "true"),
                                sessionStorage.setItem("_Daily_Visit_Count", n.value);
                        }),
                        sessionStorage.setItem("useWebDay", "true"))
                    : (console.log("Daha Ã–nce GiriÅŸ YaptÄ±n"),
                        (_Daily_Visit_Count = sessionStorage.getItem("_Daily_Visit_Count")),
                        sessionStorage.setItem("useWebDay", "true"),
                        await fetch(
                            `https://api.countapi.xyz/get/afrhDailyVisits/afrhDailyVisits`,
                        )
                            .then((n) => n.json())
                            .then((n) => {
                                n.value != Number(_Daily_Visit_Count)
                                    ? ((_Daily_Visit_Count = n.value),
                                        console.log(
                                            "Birisi GiriÅŸ YaptÄ±, DeÄŸer DeÄŸiÅŸti, Yeni DeÄŸer = " +
                                            _Daily_Visit_Count,
                                        ))
                                    : (console.log("Kimse GiriÅŸ YapmadÄ±"),
                                        sessionStorage.setItem(
                                            "_Daily_Visit_Count",
                                            _Daily_Visit_Count,
                                        ));
                            })))
        : localStorage.setItem("tomarrow", new Date(tomorrow));
}
async function visit() {
    await sessionStorage.setItem(
        "useWeb",
        sessionStorage.getItem("useWeb") ? "true" : "false",
    );
    sessionStorage.getItem("useWeb") == "false"
        ? await fetch(
            "https://api.countapi.xyz/update/eedtaTotalVisit/eedtaTotalVisit/?amount=1",
        )
            .then((n) => n.json())
            .then((n) => {
                sessionStorage.setItem("useWeb", "true"),
                    sessionStorage.setItem("_Visit_Count", n.value);
            })
        : ((_Visit_Count = sessionStorage.getItem("_Visit_Count")),
            await fetch(
                "https://api.countapi.xyz/get/eedtaTotalVisit/eedtaTotalVisit",
            )
                .then((n) => n.json())
                .then((n) => {
                    n.value != _Visit_Count &&
                        ((_Visit_Count = n.value),
                            sessionStorage.setItem("_Visit_Count", _Visit_Count));
                }));
    await $("._Total_Visit").text(sessionStorage.getItem("_Visit_Count"));
}
async function functionStart() {
    await timeControl();
    await visit();
    await fetch("https://api.countapi.xyz/get/afrhDailyVisits/afrhDailyVisits")
        .then((n) => n.json())
        .then(
            (n) =>
            (document.querySelector("._Daily_Visit_Div").innerHTML =
                `<span class="_Daily_Visit">${n.value}</span>`),
        );
}
function myFunction(n) {
    n.matches &&
        $("._Categories_Main").slick({
            dots: !1,
            infinite: !0,
            arrows: !1,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
}
function delay(n) {
    return new Promise((t) => setTimeout(t, n));
}
async function _Item_Actived(n, t, i, r, u) {
    while (i < u)
        i++,
            i == u
                ? $(n[i]).css("background-color", "rgb(36, 58, 148,." + r + ")")
                : $(n[i]).addClass("active"),
            await delay(250);
}
async function textAnimation(n, t, i) {
    let r = 0;
    while (r <= t) $(n).text(r), await delay((250 * i) / t), r++;
}
function changeBlog(n) {
    let t = $("._Populer_Courses_Items_Slider_Not")[0];
    $(t)
        .find("._Populer_Courses_Image img")
        .attr("src", $(n).find("._Populer_Courses_Image img").attr("src"));
    $(t)
        .find("._Populer_Courses_Name_Date ._Writer")
        .text($.trim($(n).find("._Populer_Courses_Name_Date ._Writer").text()));
    $(t)
        .find("._Populer_Courses_Name_Date ._Date")
        .text($.trim($(n).find("._Populer_Courses_Name_Date ._Date").text()));
    $(t)
        .find("._Populer_Courses_Title p")
        .text($.trim($(n).find("._Populer_Courses_Title p").text()));
    $(t)
        .find("._Populer_Courses_Content p")
        .text($.trim($(n).find("._Populer_Courses_Content p").text()));
    $(t)
        .find("._Populer_Courses_Button a")
        .attr(
            "href",
            "blogi-detay/" + $.trim($(n).find("._Populer_Courses_Link span").text()),
        );
}
var tomorrow, i, _Interval_count, _Image_Prew_ID, x;
const initIMask = () => {
    $("input.imask").each((n, t) => {
        const i = $(t).data("is-regex")
            ? new RegExp($(t).data("mask"))
            : $(t).data("mask");
        new IMask(t, { mask: i });
    });
};
let _Visit_Count,
    _Daily_Visit_Count = 0;
const today = new Date().toDateString();
tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
document.querySelector("._Daily_Visit_Div").innerHTML = `
  <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
  </div>`;
functionStart();
$(".hamburger").on("click", function () {
    $(this).toggleClass("_Opened");
    $(this).hasClass("_Opened")
        ? $("div._Mobile_Menu").addClass("_Opened_Mobile_Menu")
        : $("div._Mobile_Menu").removeClass("_Opened_Mobile_Menu");
});
$("._Blog_Page_Left_Item:first-child").addClass("active");
let logos = $("._Slide_Logos_Section").find("._Slide_Logos_Item");
for (i = 0; i < logos.length; i++)
    i % 2 == 0
        ? $(logos[i])
            .find("._Logo_Back_Image")
            .attr(
                "src",
                "https://storage.acerapps.io/app-1264/images/afrh_beyaz.png",
            )
        : i % 2 == 1 &&
        $(logos[i])
            .find("._Logo_Back_Image")
            .attr(
                "src",
                "https://storage.acerapps.io/app-1264/images/afrh_mavi.png",
            );
$("._Page_Banner_Main")
    .find("img")
    .attr("src", "https://storage.acerapps.io/app-1264/images/banner.png");
setTimeout(function () {
    $("._Rules_Item:first-child").addClass("active");
    $("._Rules_Item").each((n, t) => {
        $(t).attr("data-slide", n);
    });
}, 10);
let _This_ID = 0,
    _This_ID_Prew = 0;
_Interval_count = 0;
_Image_Prew_ID = 0;
$(document).ready(function () {
    function t(t) {
        t == 0
            ? (_This_ID++,
                _This_ID > 3 && (_This_ID = 0),
                (_This_ID_Prew = _This_ID + 1),
                _This_ID_Prew == 4 && (_This_ID_Prew = 0))
            : t == 1
                ? (_This_ID--,
                    _This_ID < 0 && (_This_ID = 3),
                    (_This_ID_Prew = _This_ID - 1),
                    _This_ID_Prew == -1 && (_This_ID_Prew = 3))
                : (_This_ID = 0);
        _Image_Prew_ID = _This_ID;
        _This_ID % 2 == 1
            ? (_This_ID == 3 && (_This_ID = -1),
                $("._Small_Images_Div").addClass("Side_Image_Move"),
                $(".Main_Slide_Text").addClass("Text_Move"),
                $("._Background_Image").addClass("BG_Move"),
                $("._Banner_Content").removeClass("Paragraph_Move"),
                $(n).attr(
                    "src",
                    $.trim(
                        $("._Banner_Slider_Item[data_id='" + _Image_Prew_ID + "']")
                            .find("._Big_Image")
                            .attr("src"),
                    ),
                ),
                $(r).attr(
                    "src",
                    $.trim(
                        $("._Banner_Slider_Item[data_id='" + (_This_ID + 1) + "']")
                            .find("._Small_Image")
                            .attr("src"),
                    ),
                ),
                $(u).attr(
                    "src",
                    $.trim(
                        $("._Banner_Slider_Item[data_id='" + (_This_ID + 1) + "']")
                            .find("._Small_Image")
                            .attr("src"),
                    ),
                ))
            : (_This_ID == 0 && (_This_ID = 4),
                $("._Small_Images_Div").removeClass("Side_Image_Move"),
                $(".Main_Slide_Text").removeClass("Text_Move"),
                $("._Background_Image").removeClass("BG_Move"),
                $("._Banner_Content").addClass("Paragraph_Move"),
                $(n).attr(
                    "src",
                    $.trim(
                        $("._Banner_Slider_Item[data_id='" + _Image_Prew_ID + "']")
                            .find("._Big_Image")
                            .attr("src"),
                    ),
                ),
                $(r).attr(
                    "src",
                    $.trim(
                        $("._Banner_Slider_Item[data_id='" + (_This_ID - 1) + "']")
                            .find("._Small_Image")
                            .attr("src"),
                    ),
                ),
                $(u).attr(
                    "src",
                    $.trim(
                        $("._Banner_Slider_Item[data_id='" + (_This_ID - 1) + "']")
                            .find("._Small_Image")
                            .attr("src"),
                    ),
                ));
        _This_ID = _Image_Prew_ID;
        $("._Banner_Slider_Item:first-child")
            .find("._Banner_Title h1")
            .text(
                $.trim(
                    $("._Banner_Slider_Item[data_id='" + _This_ID + "']")
                        .find("._Banner_Title h1")
                        .text(),
                ),
            );
        $("._Banner_Slider_Item:first-child")
            .find("._Banner_Paragraph p")
            .text(
                $.trim(
                    $("._Banner_Slider_Item[data_id='" + _This_ID + "']")
                        .find("._Banner_Paragraph p")
                        .text(),
                ),
            );
        $("._Banner_Slider_Item:first-child")
            .find("._Banner_Button a")
            .text(
                $.trim(
                    $("._Banner_Slider_Item[data_id='" + _This_ID + "']")
                        .find("._Banner_Button a")
                        .text(),
                ),
            );
        let i = $(".Slider_Dots_Item");
        for (let n = 0; n < i.length; n++)
            $(i[n]).attr("data_id") == _This_ID
                ? $(i[n]).addClass("_Active")
                : $(i[n]).removeClass("_Active");
    }
    function i() {
        let t = n.style.right,
            i = r.style.right;
        t == "-4%"
            ? ((n.style.right = "73%"), (Big_Image_Tr = n.style.right))
            : t == "73%" && ((n.style.right = "-4%"), (Big_Image_Tr = n.style.right));
    }
    setTimeout(function () {
        $("._Banner_Button").each((n, t) => {
            $(t).find("a").text() == "#" && $(t).remove();
        });
    }, 5);
    let n = $("._Banner_Slider_Item:first-child").find("._Big_Image")[0],
        r = $("._Banner_Slider_Item:first-child").find("._Small_Image")[0],
        u = $("._Banner_Slider_Item:first-child").find("._Small_Image_Side")[0];
    t("start", "", 3);
    $("body").on("click", "#_Slider_Next_Button", function () {
        t(0, "", "");
        i();
    });
    $("body").on("click", "#_Slider_Prew_Button", function () {
        t(1, "", "");
        i();
    });
    $("body").on("click", ".Slider_Dots_Item", function () {
        let r = $(this).attr("data_id");
        var n = Math.abs(_This_ID - r);
        if (_This_ID < r) {
            if ((t(0, "", ""), i(), (_Interval_count = 0), n != 1)) {
                const r = setInterval(() => {
                    t(0, "", ""),
                        i(),
                        _Interval_count++,
                        console.log("int = " + _Interval_count),
                        console.log("mov = " + n),
                        _Interval_count == n - 1 && clearInterval(r);
                }, 600);
            }
        } else if (_This_ID > r) {
            if ((t(1, "", ""), i(), (_Interval_count = 0), n != 1)) {
                const r = setInterval(() => {
                    t(1, "", ""),
                        i(),
                        _Interval_count++,
                        console.log("int = " + _Interval_count),
                        console.log("mov = " + n),
                        _Interval_count == n - 1 && clearInterval(r);
                }, 600);
            }
        } else _This_ID == r && console.log("aynÄ± yerde");
    });
});
$("._Slide_Logos").slick({
    dots: !1,
    infinite: !0,
    arrows: !1,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: !0,
    autoplaySpeed: 0,
    speed: 4e3,
    cssEase: "linear",
    useTransform: !0,
    pauseOnHover: !1,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 4, slidesToScroll: 1, infinite: !0 },
        },
        { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
});
$("._Courses_Slider_Main").slick({
    dots: !1,
    infinite: !0,
    arrows: !1,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: !0,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                centerMode: !1,
            },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: !1 },
        },
        {
            breakpoint: 576,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
    ],
});
x = window.matchMedia("(max-width: 576px)");
myFunction(x);
x.addListener(myFunction);
VanillaTilt.init(document.querySelectorAll("._Category_Item"), {
    glare: !0,
    reverse: !0,
    "max-glare": 0.5,
});
$("._Testimonial_Cards_Main").slick({
    dots: !1,
    infinite: !0,
    arrows: !1,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                centerMode: !1,
            },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
        {
            breakpoint: 576,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
    ],
});
$("._This_Page_Name").text(document.title.split("-")[0]);
let _Skill_Item = $("._Skill_Item");
$(_Skill_Item).each((n, t) => {
    let u = $(t).find("._Skill_Item_Small_Circle"),
        i = String((120 * Number($(t).find("._BG_White_Main span").text())) / 1e3),
        r = i.split(".")[0],
        f = i.split(".")[1];
    f === undefined
        ? _Item_Actived(u, Math.round(i), -1, 0, r)
        : _Item_Actived(u, Math.round(i), -1, f, r);
    let e = $(t).find("div._BG_White_Main span"),
        o = $(t).find("div._BG_White_Main").attr("data-count");
    textAnimation(e, o, r);
});
$("._Populer_Courses_Items").slick({
    dots: !0,
    infinite: !0,
    arrows: !1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (n, t) {
        var i = $(n.$slides[t]).data();
        return '<a class="dot">' + t + "</a>";
    },
});
$("._Side_Page_Left_Menu_Ul_Category ._List_Item a").on("click", function () {
    $("._Side_Page_Left_Menu_Ul_Category ._Active_Div").removeClass("active");
    $("._Side_Page_Left_Menu_Ul_Category ._List_Item").removeClass("active");
    $(this).find("._Active_Div").addClass("active");
    $(this).closest("._List_Item").addClass("active");
});
$("._Side_Page_Left_Menu_Ul_Archive ._List_Item a").on("click", function () {
    $("._Side_Page_Left_Menu_Ul_Archive ._Active_Div").removeClass("active");
    $("._Side_Page_Left_Menu_Ul_Archive ._List_Item").removeClass("active");
    $(this).find("._Active_Div").addClass("active");
    $(this).closest("._List_Item").addClass("active");
});
let getTwoDateBetween = async () => {
    var t, i;
    let r = document.querySelectorAll("._Populer_Courses_Date span").length,
        u = new Date();
    for (let s = 0; s < r; s++) {
        var f = document
            .querySelectorAll("._Populer_Courses_Date span")
        [s].textContent.split("/")[0],
            e = document
                .querySelectorAll("._Populer_Courses_Date span")
            [s].textContent.split("/")[1],
            o = document
                .querySelectorAll("._Populer_Courses_Date span")
            [s].textContent.split("/")[2],
            n = new Date(`${String(e)}/${String(f)}/${String(o)}`);
        console.log(n);
        t = Math.abs(u.getTime() - n.getTime());
        i = (await Math.ceil(t / 864e5)) - 1;
        document.querySelectorAll("._Populer_Courses_Date span")[s].innerHTML =
            `<i class="fa-solid fa-clock _Blue_Clock"></i> ${i} Days Later`;
    }
};
getTwoDateBetween();
$("._Blog_Page_Left_Main ._Blog_Page_Left_Item").on("click", function () {
    $("._Blog_Page_Left_Item").removeClass("active");
    $(this).addClass("active");
    changeBlog(this);
});
changeBlog($("._Blog_Page_Left_Item.active"));
$("._Gallery_Slider_Top").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !1,
    fade: !0,
    asNavFor: "._Gallery_Slider_Bottom",
});
$("._Gallery_Slider_Bottom").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: "._Gallery_Slider_Top",
    dots: !1,
    centerMode: !0,
    focusOnSelect: !0,
    arrows: !0,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                centerMode: !1,
            },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
        {
            breakpoint: 580,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: !1,
                arrows: !1,
            },
        },
    ],
});
$("._Detail_Slider_Bottom").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: !1,
    centerMode: !0,
    focusOnSelect: !0,
    arrows: !0,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                centerMode: !1,
            },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
        {
            breakpoint: 580,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: !1,
                arrows: !1,
            },
        },
    ],
});
$("._Rules_Description").slick({
    dots: !1,
    infinite: !0,
    arrows: !1,
    fade: !0,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: !1,
});
$("._Rules_Items ._Rules_Item[data-slide]").click(function (n) {
    n.preventDefault();
    var t = $(this).data("slide");
    $("._Rules_Description").slick("slickGoTo", t);
});
$("._Rules_Item").on("click", function () {
    $("._Rules_Item").removeClass("active");
    $(this).addClass("active");
});
$(".Filter_Courses > div").click(function () {
    var n = $(this).attr("data-cat");
    if (n == "all") {
        $("._Courses_Item").show();
        return;
    }
    $("._Courses_Item").each(function () {
        $(this).attr("data-cat") == n ? $(this).show() : $(this).hide();
    });
});
$("._News_Filter > div").click(function () {
    var n = $(this).attr("data-cat");
    if (n == "all") {
        $("._Courses_Filt_Item").show();
        return;
    }
    $("._Courses_Filt_Item").each(function () {
        $(this).attr("data-cat") == n ? $(this).show() : $(this).hide();
    });
});
location.pathname == "/gallery.html" &&
    $("[data-fancybox]").fancybox({
        buttons: ["close"],
        wheel: !1,
        transitionEffect: "slide",
        loop: !0,
        toolbar: !1,
        clickContent: !1,
    });
$("._News_Activities_Cards_Main").slick({
    dots: !1,
    infinite: !0,
    arrows: !1,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: !1,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                centerMode: !1,
            },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
        {
            breakpoint: 576,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: !1 },
        },
    ],
});
let activeLink;
$("._Header_Navigation_Div ul li").each((n, t) => {
    document.title.split("-")[0] == $.trim($(t).text()) + " " &&
        $(t).addClass("_Enter_Page");
});
