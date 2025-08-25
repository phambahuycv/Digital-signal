using Digital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Digital.Controllers
{
    [Authorize(Roles = "Quản lý vai trò")]
    public class RoleController : Controller
    {
        public IActionResult Index()
        {
            List<RoleModel> roles = new RoleModel().Get(new RoleModel());
            return View();
        }

        [HttpPost]
        public IActionResult GetRoles(RoleModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }
        [Authorize(Roles = "Thêm vai trò")]
        [HttpPost]
        public IActionResult InsertRole(RoleModel input)
        {
            var result = input.Insert(input);
            return Json(result);
        }
        [Authorize(Roles = "Xóa vai trò")]
        [HttpPost]
        public IActionResult DeleteRole(RoleModel input)
        {
            var result = input.Delete(input);
            return Json(result);
        }
        [Authorize(Roles = "Sửa vai trò")]
        [HttpPost]
        public IActionResult UpdateRole(RoleModel input)
        {
            var result = input.Update(input);
            return Json(result);
        }

    }
}
