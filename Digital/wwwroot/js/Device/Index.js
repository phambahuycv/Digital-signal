"use strict";
function validateip(ip) {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}


function HandleEdit(id, name_device, name_brand) {
    $("#name_device_2").val(name_device),
    $("#name_brand_2").val(name_brand);
    var btnEditDevice = document.querySelector('#btn_modal_edit_device');
    btnEditDevice.addEventListener('click', function () {
        $.ajax(
            {
                type: "POST",
                url: "../Device/UpdateDevice", data: {
                    ip_address: id,
                    name_device: $("#name_device_2").val(),
                    name_brand: $("#name_brand_2").val(),
                    resolution: $("#resolution_2").val(),
                    type_method: $("#type_method_2").val(),
                }, success: function () {
                    window.location.href = "../Device/Index";
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
            url: "../Device/DeleteDevice", data: {
                ip_address: input
            }, success: function () {
                window.location.href = "../Device/Index";
                alert('xóa thành công')
            },
            error: function (error) {
                SweetAlert("error", "Bạn không có quyền");
            }
        });
}
var Device = function () {
    var dt;

    var InitDataTable = function () {
        dt = $("#tbl_template").DataTable({
            searchDelay: 500,
            processing: true,
            ajax: {
                url: "../Device/GetDevice",
                type: "POST",
                dataSrc: "",
                error: function (error) {
                    // to see what the error is
                    ToastrAlertTopRight("error", error);
                }
            },
            columns: [
                { data: "ip_address" },
                { data: "name_device" },
                { data: "name_brand" },
                { data: "resolution" },
                { data: "name_method" },
                { data: { id: "ip_address", name_device: "name_device", name_brand:"name_brand"} }
            ],
            columnDefs: [
                
                {
                    targets: [-1],// Disable ordering on column 6 (actions)
                    orderable: false,
                    render: function (data) {
                        return `<div class="d-flex justify-content-end flex-shrink-0">
								    <a onclick='HandleEdit("${data.ip_address}","${data.name_device}","${data.name_brand}")' data-bs-toggle="modal" data-bs-target="#kt_modal_2" href='javascript:;' class="btn btn-icon btn-light-primary btn-sm me-3">
								        <i class="bi bi-pencil" style="font-size:16px"></i>
								    </a>
								    <a onclick='HandleDelete("${data.ip_address}")' href="javascript:;" class="btn btn-icon btn-light-danger btn-sm me-3">
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
    
        var btnAddDevice = document.querySelector('#btn_modal_add_device');
 
        btnAddDevice.addEventListener('click', function () {
            var ipValue = $("#ip_address").val();
            if (!validateip(ipValue)) {
                alert("Bạn nhập sai định dạng, hãy nhập theo định dạng: xxx.xxx.xxx.xxx với xxx>0 và xxx<256");
            } else {
                $.ajax(
                    {
                        type: "POST",
                        url: "../Device/InsertDevice", data: {
                            ip_address: $("#ip_address").val(),
                            id_url: '10',
                            id_type:'10',
                            name_device: $("#name_device").val(),
                            name_brand: $("#name_brand").val(),
                            resolution: $("#resolution").val(),
                            type_method: $("#type_method").val(),
                        }, success: function () {
                            window.location.href = "../Device/Index";
                        },
                        error: function (error) {
                            SweetAlert("error", "Bạn không có quyền");
                        }
                    });
            }
            
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
    Device.Init();
}));
