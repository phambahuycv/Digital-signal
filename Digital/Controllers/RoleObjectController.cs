using Digital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Digital.Controllers
{
    [Authorize(Roles ="Quản lý quyền hạn")]
    public class RoleObjectController : Controller
    {
        public IActionResult Index()
        {
            List<RoleObjectModel> roles = new RoleObjectModel().Get(new RoleObjectModel());
            return View();
        }

        [HttpPost]
        public IActionResult GetRoleObjects(RoleObjectModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }
        [HttpPost]
        public IActionResult GetObjects(ObjectModel input)
        {
            var result = input.GetObject(input);
            return Json(result);
        }

        [HttpPost]
        public IActionResult InsertRoleObject(RoleObjectModel input)
        {
            var result = input.Insert(input);
            return Json(result);
        }

        [HttpPost]
        public IActionResult UpdateRoleObject(RoleObjectModel input)
        {
            var result = input.Update(input);
            return Json(result);
        }
    }
}
