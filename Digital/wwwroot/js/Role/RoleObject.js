"use strict";
function toggleModelStatus(id_role, id_object) {
    console.log(id_role, id_object);
    console.log($('#chk_model_' + id_role + '_' + id_object).val());
    if (!$('#chk_model_'+id_role+'_'+id_object).is(':checked')) {
        $('#chk_model_'+id_role+'_'+id_object).val(false);
    }
    else {
        $('#chk_model_'+id_role+'_'+id_object).val(true);
    }
    $.ajax(
        {
            type: "POST",
            url: "../RoleObject/UpdateRoleObject",
            data: {
                id_role: id_role,
                id_object: id_object,
                status: $('#chk_model_'+id_role+'_'+id_object).val(),
            },
            error: function (error) {
                // to see what the error is
                SweetAlert("error", "Bạn không có quyền");
            }
        }
    );
    console.log($('#chk_model_'+id_role+'_'+id_object).val());
}

var RoleObject = function () {
    var dt;

    var InitDataTable = function () {
        dt = $("#tbl_role_objects").DataTable({
            searchDelay: 500,
            processing: true,
            ajax: {
                url: "../RoleObject/GetRoleObjects",
                type: "POST",
                dataSrc: "",
                error: function (error) {
                    // to see what the error is
                    ToastrAlertTopRight("error", error);
                }
            },
            columns: [
                { data: "role_name" },
                { data: "object_name" },
                { data: { status: "status", id_role: "id_role", id_object:"id_object" } },
                { data: "create_at" },
                { data: "create_by" },
                { data: "last_modify_at" },
                { data: "description" }
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
                                    <input class="form-check-input h-20px w-30px" type="checkbox" id="chk_model_${data.id_role}_${data.id_object}" ${data.status ? "checked" : ""} onchange='toggleModelStatus("${data.id_role}","${data.id_object}");'/>
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

    //---------------

    var HandleAddButton = function () {
        var btnAddTemplate = document.querySelector('#btn_modal_add_role_object');
        console.log($("#role"))
        $.ajax(
            {
                type: "POST",
                url: "../Role/GetRoles",
                success: function (data) {
                    console.log(data)
                    data.forEach((item) => {
                        var option = $("<option>").text(item.role_name)
                        option[0].setAttribute('value', item.id);
                        $("#role").append(
                            option
                        )
                    });
                },
                error: function (error) {                        // to see what the error is
                    SweetAlert("error", "Bạn không có quyền");
                }
            });

        $.ajax(
            {
                type: "POST",
                url: "../RoleObject/GetObjects",
                success: function (data) {
                    console.log(data)
                    data.forEach((item) => {
                        var option = $("<option>").text(item.object_name)
                        option[0].setAttribute('value', item.id_object);
                        $("#object").append(
                            option
                        )
                    });
                },
                error: function (error) {                        // to see what the error is
                    SweetAlert("error", "Bạn không có quyền");
                }
            });
        btnAddTemplate.addEventListener('click', function () {
            $.ajax(
                {
                    type: "POST",
                    url: "../RoleObject/InsertRoleObject",
                    data: {
                        id_role: $("#role").val(),
                        id_object: $("#object").val(),
                        create_by: $("#create_by").val(),
                        description: $("#description").val(),
                    },
                    success: function (data) {
                        window.location.href = "../RoleObject/Index"
                    },
                    error: function (error) {
                        // to see what the error is
                        SweetAlert("error", "Bạn không có quyền");
                    }
                }
            );
        });
    };

    return {
        // Public functions  
        Init: function () {
            InitDataTable();
            HandleSearchDatatable();
           HandleAddButton();
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    RoleObject.Init();
}));