"use strict";
function del_role(input) {
    alert(input);
    $.ajax(
        {
            type: "POST",
            url: "../Role/DeleteRole",
            data: {
                id: input,
            },
            success: function () {
                window.location.href = "../Role/Index";
            },
            error: function (error) {
                // to see what the error is
                SweetAlert("error", "Bạn không có quyền");
            }
        }
    );

}
function upd_role_modal(id,role_name,status,description) {
    console.log(id, role_name,status, description);
    $("#role_id").val(id);

    $("#role_name_edit").val(role_name);
    if (status == "true") {
        $('#status_edit').prop('checked', true);
        $('#status_edit').val(true);
    }
    else {
        $('#status_edit').prop('checked', false);
        $('#status_edit').val(false);
    } 

    console.log($("#status_edit").val());
    if (description != "null") {
        $("#description_edit").val(description);
}
    
}
var Role = function () {
    var dt;

    var InitDataTable = function () {
        dt = $("#tbl_roles").DataTable({
            searchDelay: 500,
            processing: true,
            ajax: {
                url: "../Role/GetRoles",
                type: "POST",
                dataSrc: "",
                error: function (error) {
                    // to see what the error is
                    ToastrAlertTopRight("error", error);
                }
            },
            columns: [
                { data: "id" },
                { data: "role_name" },
                { data: { status: "status", id: "id" } },
                { data: "create_at" },
                { data: "create_by" },
                { data: "last_modify_at" },
                { data: "description" },
                { data: { id: "id", role_name: "role_name", status: "status", description:"description" } }
            ],
            columnDefs: [
                {
                    targets: [3, 5],
                    render: function (data) {
                        if (data == null)
                            return "";
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
                {
                    targets: [2],
                    render: function (data) {
                        return `<div class="form-check form-switch form-check-custom form-check-solid me-10">
                                    <input disabled class="form-check-input h-20px w-30px" type="checkbox" id="chk_model_${data.id}" ${data.status ? "checked" : ""} onchange='toggleModelStatus("${data.id}");'/>
                                </div>`;
                    }
                },
                {
                    targets: [-1],// Disable ordering on column 6 (actions)
                    orderable: false,
                    render: function (data) {
                        return `<div class="d-flex justify-content-end flex-shrink-0">
								    <a onclick='upd_role_modal("${data.id}","${data.role_name}","${data.status}","${data.description}")' data-bs-toggle="modal" data-bs-target="#kt_modal_2" href='javascript:;' class="btn btn-icon btn-light-primary btn-sm me-3">
								        <i class="bi bi-pencil" style="font-size:16px"></i>
								    </a>
								    <a onclick='del_role("${data.id}")' href="javascript:;" class="btn btn-icon btn-light-danger btn-sm me-3"> 
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
    var HandleStatusEditModal = function () {
        $('#status_edit').click(function () {
            if (!$(this).is(':checked')) {
                $('#status_edit').val(false);
            }
            else {
                $('#status_edit').val(true);
            }
            console.log($('#status_edit').val());
        });
    };
    var HandleAddButton = function () {
        var btnAddRole = document.querySelector('#btn_modal_add_role');
        btnAddRole.addEventListener('click', function () {
            $.ajax(
                {
                    type: "POST",
                    url: "../Role/InsertRole",
                    data: {
                        role_name: $("#role_name").val(),
                        create_by: $("#create_by").val(),
                        description: $("#description").val(),
                    },
                    success: function () {
                        $("kt_modal_1").modal('hide');
                        window.location.reload();
                    },
                    error: function (error) {
                        // to see what the error is
                        SweetAlert("error", "Bạn không có quyền");
                    }
                }
            );

        });
    };
    var HandleEditButton = function () {
        var btnEditRole = document.querySelector('#btn_edit_role');
        if (btnEditRole) {
            btnEditRole.addEventListener('click', function () {
                $.ajax(
                    {
                        type: "POST",
                        url: "../Role/UpdateRole",
                        data: {
                            id: $("#role_id").val(),
                            role_name: $("#role_name_edit").val(),
                            status: $("#status_edit").val(),
                            description: $("#description_edit").val(),
                        },
                        success: function () {
                            window.location.href = "../Role/Index";
                        },
                        error: function (error) {
                            // to see what the error is
                            SweetAlert("error", "Bạn không có quyền");
                        }
                    }
                );
            });

        }
    };

    return {
        // Public functions  
        Init: function () {
            InitDataTable();
            HandleSearchDatatable();
            HandleAddButton();
            HandleStatusEditModal();
            HandleEditButton();
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    Role.Init();
}));