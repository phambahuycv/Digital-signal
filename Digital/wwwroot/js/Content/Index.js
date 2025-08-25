"use strict";
function HandleEdit(id, content_name, modified_date_cl, file_size) {
    var today = new Date(); var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    $("#content_name_1").val(content_name),
    $("#modified_date_cl_1").val(modified_date_cl),
    $("#file_size_1").val(file_size)
    var btnEditContent = document.querySelector('#btn_modal_edit_content');
    btnEditContent.addEventListener('click', function () {
        $.ajax(
            {
                type: "POST",
                url: "../Content/UpdateContent", data: {
                    id_cl: id,
                    content_name: $("#content_name_1").val(),
                    modified_date_cl: dateTime,
                    file_size: $("#file_size_1").val(),
                }, success: function () {
                    window.location.href = "../Content/Index";
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
            url: "../Content/DeleteContent", data: {
                id_cl: input
            }, success: function () {
                window.location.href = "../Content/Index";
                alert('xóa thành công')
            },
            error: function (error) {
                SweetAlert("error", "Bạn không có quyền");
            }
        });
}
var Content = function () {
    var dt;

    var InitDataTable = function () {
        dt = $("#tbl_content").DataTable({
            searchDelay: 500,
            processing: true,
            ajax: {
                url: "../Content/GetContent",
                type: "POST",
                dataSrc: "",
                error: function (error) {
                    ToastrAlertTopRight("error", error);
                }
            },
            columns: [
                { data: "id_cl" },
                { data: "content_name" },
                { data: "modified_date_cl" },
                { data: "file_size" },
                { data: { id: "id_cl", content_name: "content_name", modified_date_cl: "modified_date_cl", file_size: "file_size" } }
            ],
            columnDefs: [
                {
                    targets: [2],
                    render: function (data) {
                        if (data == null)
                            return "";
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
                {
                    targets: [-1],
                    orderable: false,
                    render: function (data) {
                        return `<div class="d-flex justify-content-end flex-shrink-0">
								    <a onclick='HandleEdit("${data.id_cl}","${data.content_name}","${data.modified_date_cl}","${data.file_size}")' data-bs-toggle="modal" data-bs-target="#kt_modal_2" href='javascript:;' class="btn btn-icon btn-light-primary btn-sm me-3">
								        <i class="bi bi-pencil" style="font-size:16px"></i>
								    </a>
								    <a onclick='HandleDelete("${data.id_cl}")' href="javascript:;" class="btn btn-icon btn-light-danger btn-sm me-3">
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
        var today = new Date(); var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;


        var btnAddPlaylist = document.querySelector('#btn_modal_add_content');

        btnAddPlaylist.addEventListener('click', function () {
            $.ajax(
                {
                    type: "POST",
                    url: "../Content/InsertContent", data: {
                        id_cl: $("#id_cl").val(),
                        content_name: $("#content_name").val(),
                        modified_date_cl: dateTime,
                        file_size: $("#file_size").val(),
                    }, success: function () {
                        window.location.href = "../Content/Index";
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
    Content.Init();
}));
