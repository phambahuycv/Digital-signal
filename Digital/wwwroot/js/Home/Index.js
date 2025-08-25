"use strict";
var elements = Array.prototype.slice.call(document.querySelectorAll("[data-bs-stacked-modal]"));

if (elements && elements.length > 0) {
    elements.forEach((element) => {
        if (element.getAttribute("data-kt-initialized") === "1") {
            return;
        }

        element.setAttribute("data-kt-initialized", "1");

        element.addEventListener("click", function (e) {
            e.preventDefault();

            const modalEl = document.querySelector(this.getAttribute("data-bs-stacked-modal"));

            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            }
        });
    });
}
function HandleUpdate() {
    //alert('bạn cần nạp víp để mở tính năng này');
    var btnAddLink = document.querySelector('#btn_modal_edit_link_url');
    $.ajax({
        url: "../Device/GetDevice",
        type: "POST",
        success: function (data) {
            data.forEach((item) => {
                var option = $("<option>").text(item.name_device + '    (' + item.ip_address+')')
                option[0].setAttribute('value', item.ip_address);
                $("#ip_address").append(
                    option
                )
            });
        }
    })

    $.ajax({
        url: "../Home/SelectLink",
        type: "POST",
        success: function (data) {
            data.forEach((item) => {
                var option = $("<option>").text(item.url)
                option[0].setAttribute('value', item.id_pl);
                $("#id_url").append(
                    option
                )
            });
        }
    })
    $.ajax({
        url: "../Home/SelectLink",
        type: "POST",
        success: function (data) {
            data.forEach((item) => {
                var option = $("<option>").text(item.type)
                option[0].setAttribute('value', item.id_pl);
                $("#id_type").append(
                    option
                )
            });
        }
    })


    $("#id_url").change(function () {

        var ex = $('#id_url').find(":selected").text().split('.').pop(); 
        var contain = $('#contain-link-prev')[0];
        var url = $('#id_url').find(":selected").text();
        if (ex == 'mp4') {
            contain.innerHTML = `<video id="video-prev" controls loop preload="auto" style="width:100%" muted>
                            <source id="link-prev" src="../imgs/${url}" type="video/mp4">
                        </video>`
            var video = document.getElementById('video-prev');
            video.load();
            video.play();
        }
        else if (ex == 'png' || ex === 'jpg') {
            contain.innerHTML = `<img id="image" src="../imgs/${url}" class="d-block" alt="..." style="margin: 0 auto;"/>`

        } 
        else if (ex == 'pdf') {
            contain.innerHTML = `<embed src="../imgs/${url}" width="800px" height="400" />`
        }
        else if (ex == 'txt') {
            contain.innerHTML = ` < p > <iframe src="../imgs/${url}" frameborder="0" height="400"
                width="95%"></iframe></p > `
        } 
    })




    btnAddLink.addEventListener('click', function () {

        $.ajax(
            {
                type: "POST",
                url: "../Home/UpdateLink", data: {
                    ip_address: $('#ip_address').val(),
                    id_url: $("#id_url").val(),
                    id_type: $("#id_type").val(),
                }, success: function (data) {

                    window.location.href = "../Home/Index";
                    alert('thay đổi thành công')
                },
                error: function (error) {
                    alert('thay đổi thất bại')
                }
            });

    })
}
var Link = function () {

    var InitDataTable = function () {

        $.ajax(
            {
                type: "POST",
                url: "../Home/GetLink", data: {
                    ip_address: $('#ip_link')[0].innerText
                }, success: function (data) {
                    //console.log(data)
                    var contain = $('#contain-link')[0]


                    if (data[0].type === 'img') {
                        var html = data.map((item) => {
                            return `
                                        <img id="image" src="../imgs/${item.url}" class="d-block" alt="..." style="
    margin: 0 auto;
"/>
                                    `
                        })
                        var htmlTemp = data.map((item, index) => {
                            if (index >= 1) {

                                return `
                                        <div class="carousel-item">
                                             <img id="image" src="../imgs/${item.url}" class="d-block" alt="..." style="
    margin: 0 auto;
"/>
                                         </div>
                                    `
                            }
                        })

                        var buttonSlide = data.map((item, index) => {
                            if (index >= 1) {
                                return `
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" aria-label="Slide ${index}"></button>
                                    `
                            }
                        })


                        contain.innerHTML = `

                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="
    width: 600px;
">
                          <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                             ${buttonSlide}
                          </div>
                          <div class="carousel-inner">
                            <div class="carousel-item active ">
                              ${html[0]}
                            </div>
                            ${htmlTemp}
                          </div>
                          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                       `
                    }
                    else {
                        contain.innerHTML = `<video id="video" controls loop preload="auto" style="width:100%">
                                                <source id="link" src="" type="video/mp4">
                                            </video>`
                        var link = $('#link')[0]
                        link.setAttribute('src', `../imgs/${data[0].url}`)
                        var video = document.getElementById('video');
                        video.load();
                        video.play();
                    }
                },
                error: function (error) {
                    ToastrAlertTopRight("error", error);
                    alert(' thất bại')
                }
            });
        return true;

    };
    return {
        Init: function () {
            let result = InitDataTable();
            if (result) {
                setInterval(InitDataTable, 50000)
            }

        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    Link.Init();
}));