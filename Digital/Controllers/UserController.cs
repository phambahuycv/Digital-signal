using Microsoft.AspNetCore.Mvc;
using Digital.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Digital.Controllers
{
    [Authorize(Roles = "Quản lý người dùng")]
    public class UserController : Controller
    {
        
        public IActionResult Index()
        {
            //List<UserViewModel> templates = new UserViewModel().Get(new UserViewModel());
            return View();
        }

        [HttpPost]
        public IActionResult GetTemplates(UserViewModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }

        [Authorize(Roles ="Thêm người dùng")]
        [HttpPost]
        public IActionResult InsertUser(UserViewModel input)
        {
            var result = input.Insert(input); return Json(result);
        }
        [Authorize(Roles = "Xóa người dùng")]
        [HttpPost]
        
        public IActionResult DeleteUser(UserViewModel input)
        {
            var result = input.Delete(input); return Json(result);
        }
        [Authorize(Roles = "Sửa người dùng")]
        [HttpPost]
        public IActionResult UpdateUser(UserViewModel input)
        {
            var result = input.Update(input); return Json(result);
        }

        [HttpPost]
        public IActionResult GetUserById(UserViewModel input)
        {
            var result = input.View(input); return Json(result);
        }

        [HttpPost]
        public IActionResult GetRolee(UserViewModel input)
        {
            var result = input.getRolee(input); return Json(result);
        }
    }
}
