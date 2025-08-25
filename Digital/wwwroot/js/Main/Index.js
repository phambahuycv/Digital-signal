"use strict";
var LinkB = function () {

    var InitDataTable = function () {

        $.ajax(
            {
                type: "POST",
                url: "../Main/GetLink", data: {
                    ip_address: $('#ip_link')[0].innerText
                }, success: function (data) {
                    //console.log(data)
                    var contain = $('#contain-link')[0]


                    if (data[0].type === 'img') {
                        var html = data.map((item) => {
                            return `
                                        <img id="image" src="../imgs/${item.url}" class="d-block" alt="..." style="
    margin: auto;width: 600px;
"/>
                                    `
                        })
                        var htmlTemp = data.map((item, index) => {
                            if (index >= 1) {

                                return `
                                        <div class="carousel-item">
                                             <img id="image" src="../imgs/${item.url}" class="d-block" alt="..." style="
    margin: auto;width: 600px;
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
    width: 600px; height: 600px;
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
                        contain.innerHTML = `<video id="video" muted controls loop preload="auto" style="width:100%; height:95vh">
                                                <source id="link" src="" type="video/mp4" autoplay="true"
    >
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
    LinkB.Init();
}));