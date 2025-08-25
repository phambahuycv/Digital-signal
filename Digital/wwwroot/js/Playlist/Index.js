"use strict";
function HandleEdit(id, playlist_name, url, type, duration) {
    $("#playlist_name_1").val(playlist_name),
    $("#url_1").val(url),
    $("#type_1").val(type),
    $("#duration_1").val(duration);
    var btnEditPlaylist = document.querySelector('#btn_modal_edit_playlist');
    $.ajax({
        url: "../Playlist/GetPlaylist",
        type: "POST",
        success: function (data) {
            data.forEach((item) => {
                var option = $("<option>").text(item.content_name)
                option[0].setAttribute('value', item.id_cl);
                $("#id_cl_1").append(
                    option
                )
            });
        }
    })
    btnEditPlaylist.addEventListener('click', function () {
        $.ajax(
            {
                type: "POST",
                url: "../Playlist/UpdatePlaylist", data: {
                    id_pl: id,
                    id_cl: $("#id_cl_1").val(),
                    playlist_name: $("#playlist_name_1").val(),
                    url: $("#url_1").val(),
                    type: $("#type_1").val(),
                    status: $("#status_1").val(),
                    duration: $("#duration_1").val(),
                }, success: function () {
                    window.location.href = "../Playlist/Index";
                    alert('Sửa thành công')
                },
                error: function (error) {
                    SweetAlert("error", "Bạn không có quyền");
                }
            });
            
    })
}


function HandleDelete(input) {
    $.ajax(
        {
            type: "POST",
            url: "../Playlist/DeletePlaylist", data: {
                id_pl: input
            }, success: function () {
                window.location.href = "../Playlist/Index";
                alert('xóa thành công')
            },
            error: function (error) {
                SweetAlert("error", "Bạn không có quyền");
            }
        });
}
var Playlist = function () {
    var dt;

    var InitDataTable = function () {
        dt = $("#tbl_playlist").DataTable({
            searchDelay: 500,
            processing: true,
            ajax: {
                url: "../Playlist/GetPlaylist",
                type: "POST",
                dataSrc: "",
                error: function (error) {
                    ToastrAlertTopRight("error", error);
                }
            },
            columns: [
                { data: "id_pl" },
                { data: "content_name" },
                { data: "playlist_name" },
                { data: "url" },
                { data: "type" },
                { data: { status: "status", id: "id_pl" } },
                { data: "duration" },
                { data: { id: "id_pl", playlist_name: "playlist_name", url: "url", type: "type", duration: "duration" } }
            ],
            columnDefs: [
                {
                    targets: [5],
                    render: function (data) {
                        return `<div class="form-check form-switch form-check-custom form-check-solid me-10">
                                    <input disabled class="form-check-input h-20px w-30px" type="checkbox" id="chk_model_${data.id}" ${data.status ? "checked" : ""} onchange='toggleModelStatus("${data.id}");'/>
                                </div>`;
                    }
                },
                {
                    targets: [-1],
                    orderable: false,
                    render: function (data) {
                        return `<div class="d-flex justify-content-end flex-shrink-0">
								    <a onclick='HandleEdit("${data.id_pl}","${data.playlist_name}","${data.url}","${data.type}","${data.duration}")' data-bs-toggle="modal" data-bs-target="#kt_modal_2" href='javascript:;' class="btn btn-icon btn-light-primary btn-sm me-3">
								        <i class="bi bi-pencil" style="font-size:16px"></i>
								    </a>
								    <a onclick='HandleDelete("${data.id_pl}")' href="javascript:;" class="btn btn-icon btn-light-danger btn-sm me-3">
								        <i class="bi bi-trash" style="font-size:16px"></i>
								    </a>
								</div>`;
                    }
                },
            ],
            lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
            buttons: ["copy", "excel", "pdf"],
            initComplete: function () {
                dt.buttons().container().appendTo("#dt_tools");
            }
        });
    };



    var HandleSearchDatatable = function () {
        $('#input_search').keyup(function (e) {
            dt.search(e.target.value).draw();
        });
    };

    var HandleAddButton = function () {

        var btnAddPlaylist = document.querySelector('#btn_modal_add_playlist');

        $.ajax( {
            url: "../Playlist/GetPlaylist",
                type: "POST",
            success: function (data) {
                    data.forEach((item) => {
                        var option = $("<option>").text(item.content_name)
                        option[0].setAttribute('value', item.id_cl);
                        $("#id_cl").append(
                            option
                        )
                    });
            }
        })

        btnAddPlaylist.addEventListener('click', function () {
            $.ajax(
                {
                    type: "POST",
                    url: "../Playlist/InsertPlaylist", data: {
                        id_pl: $("#id_pl").val(),
                        id_cl: $("#id_cl").val(),
                        playlist_name: $("#playlist_name").val(),
                        url: $("#url").val().split(/(\\|\/)/g).pop(),
                        type: $("#type").val(),
                        status: $("#status").val(),
                        duration: $("#duration").val(),
                    }, success: function () {
                        window.location.href = "../Playlist/Index";
                    },
                    error: function (error) {
                        SweetAlert("error", "Bạn không có quyền");
                    }
                });
        });

    };



    return {
        Init: function () {
            InitDataTable();
            HandleSearchDatatable();
            HandleAddButton();
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    Playlist.Init();
}));
