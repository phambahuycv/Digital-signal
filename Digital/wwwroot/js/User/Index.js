"use strict";

//regex
function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}


function HandleDelete(input,full_name) {
    if (confirm(`Bạn chắc chắn muốn xóa người dùng ${full_name}?`) == true) {
       
            $.ajax(
                {
                    type: "POST",
                    url: "../User/DeleteUser", data: {
                        id: input
                    }, success: function () {
                        ToastrAlertTopRight("info", 'Xóa thành công');
                        setTimeout(function () { window.location.href = "../User/Index" },3000);
                    },
                    error: function (error) {                        // to see what the error is
                        SweetAlert("error", "Bạn không có quyền");
                    }
                });
    } else {
        return
    }
    
}

function HandleEdit(id, id_user, id_role, full_name, sex, date_of_birth, phone, address, status, email, user_name, password, description) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    $(".test-name").innerText = 'ksks'
    $("#id_user2").val(id_user),
    $("#role-edit").val(id_role),
    $("#full_name2").val(full_name),
    $("#sex2").val(sex),
    $("#date_of_birth2").val(moment(date_of_birth).format('YYYY-MM-DD')),
    $("#phone2").val(phone),
    $("#address2").val(address),
    $("#status2").val(status),
    $("#email2").val(email),
    $("#user_name2").val(user_name),
    $("#password2").val(password),
    $("#description2").val(description)

    $.ajax(
        {
            type: "POST",
            url: "../User/GetRolee",
            success: function (data) {
                console.log(data)
                data.forEach((item) => {
                    var option = $("<option>").text(item.role_name)
                    option[0].setAttribute('value', item.id);
                    $("#role-edit").append(
                        option
                    )
                });
            },
            error: function (error) {                        // to see what the error is
                SweetAlert("error", "Bạn không có quyền");
            }
        });

    var btnEditUser = document.querySelector('#btn_modal_edit_user')
    btnEditUser.addEventListener('click', function () {
        $.ajax(
            {
                type: "POST",
                url: "../User/UpdateUser", data: {
                    id: id,
                    id_user: $("#id_user2").val(),
                    id_role: $("#role-edit").val(),
                    full_name: $("#full_name2").val(),
                    sex: $("#sex2").val(),
                    date_of_birth: $("#date_of_birth2").val(),
                    phone: $("#phone2").val(),
                    address: $("#address2").val(),
                    status: $("#status2").val(),
                    email: $("#email2").val(),
                    user_name: $("#user_name2").val(),
                    password: $("#password2").val(),
                    create_by: $("#create_by2").val(),
                    last_modify_at: dateTime,
                    description: $("#description2").val(),
                }, success: function () {
                    setTimeout(function () {
                    window.location.href = "../User/Index";
                    },3000)
                    ToastrAlertTopRight("success", 'Sửa thành công');
                },
                error: function (error) {                        // to see what the error is
                    SweetAlert("error", "Bạn không có quyền");
                }
            });
    });
}

var User = function () { 
    var dt;
    var getUserById = function () {
        var result = $.ajax(
            {
                type: "POST",
                url: "../User/GetUserById", data: {
                    id: 32,
                }, success: function (data) {
                    if ($('.full-name')[0]) {
                        $('.full-name')[0].innerText = data[0].full_name
                    }
                },
                error: function (error) {                        // to see what the error is
                    ToastrAlertTopRight("error", error);
                    alert('lấy dữ liệu thất bại')
                }
            });
    }
    var InitDataTable = function () {
        dt = $("#tbl_template").DataTable({
            searchDelay: 500,
            processing: true,
            ajax: {
                url: "../User/GetTemplates",
                type: "POST",
                dataSrc: "",
                error: function (error) {
                    // to see what the error is
                    ToastrAlertTopRight("error", error);
                }
            },
            columns: [
                { data: "id_user" },
                { data: "id_role" },
                { data: "full_name" },
                { data: "sex" },
                { data: "date_of_birth" },
                { data: "phone" },
                { data: "address" },
                { data: { status: "status", id: "id" } },
                { data: "email" },
                { data: "user_name" },
                { data: { id: "id", id_user: "id_user", id_role: "id_role", full_name: "full_name", sex: "sex", date_of_birth: "date_of_birth", phone: "phone", address: "address", status: "user_name", email: "user_name", user_name: "user_name", description: "description", password: "password" } },
            ],
            columnDefs: [
                {
                    targets: [3],
                    render: function (data) {
                        if (data) {
                            return "Nu"
                        }
                        else {
                            return"Nam"
                        }
                    }
                },
                {
                    targets: [4],
                    render: function (data) {
                        if (data == null)
                            return "";
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
                {
                    targets: [3,7],
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
								    <a onclick='HandleEdit("${data.id}","${data.id_user}","${data.id_role}","${data.full_name}","${data.sex}","${data.date_of_birth}","${data.phone}","${data.address}","${data.status}","${data.email}","${data.user_name}","${data.password}","${data.description}")' data-bs-toggle="modal" data-bs-target="#kt_modal_2" href='javascript:;' class="btn btn-icon btn-light-primary btn-sm me-3">
								        <i class="bi bi-pencil" style="font-size:16px"></i>
								    </a>
								    <a onclick='HandleDelete("${data.id}","${data.full_name}")' href="javascript:;" class="btn btn-icon btn-light-danger btn-sm me-3">
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
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'+today.getDate() ;
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var btnAddUser = document.querySelector('#btn_modal_add_user')
        $.ajax(
            {
                type: "POST",
                url: "../User/GetRolee",
                success: function (data) {
                    console.log(data)
                    data.forEach((item) => {
                        var option = $("<option>").text(item.role_name)
                        option[0].setAttribute('value', item.id);                       
                        $("#role-add").append(
                            option
                        )
                    });
                },
                error: function (error) {                        // to see what the error is
                    SweetAlert("error", "Bạn không có quyền");
                }
            });
        btnAddUser.addEventListener('click', function () {
            var emailValue = $("#email").val()
            var emailInput = document.querySelector('#email')
            var phoneValue = $("#phone").val()
            var phoneInput = document.querySelector('#phone')

            if (!validateEmail(emailValue)) {
                alert("Bạn nhập sai định dạng email");
                emailInput.focus()
            } else if (!isPhone(phoneValue)) {
                alert("Bạn nhập sai định dạng số điện thoại");
                phoneInput.focus()
            } else {
                $.ajax(
                    {
                        type: "POST",
                        url: "../User/InsertUser", data: {
                            id_user: $("#id_user").val(),
                            id_role: $("#role-add").val(),
                            full_name: $("#full_name").val(),
                            sex: $("#sex").val(),
                            date_of_birth: $("#date_of_birth").val(),
                            phone: $("#phone").val(),
                            address: $("#address").val(),
                            status: $("#status").val(),
                            email: $("#email").val(),
                            user_name: $("#user_name").val(),
                            password: $("#password").val(),
                            create_at: dateTime,
                            create_by: $("#create_by").val(),
                            last_modify_at: dateTime,
                            description: $("#description").val(),
                        }, success: function () {
                            ToastrAlertTopRight("success", "Thêm thành công");
                            setTimeout(function () { window.location.href = "../User/Index" },3000);
                        },
                        error: function (error) {                        // to see what the error is
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
            getUserById()
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    User.Init();
}));