using Digital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Digital.Controllers
{
    [Authorize(Roles = "Quản lý nội dung")]
    public class ContentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult GetContent(ContentModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }
        [Authorize(Roles = "Thêm nội dung")]

        [HttpPost]
        public IActionResult InsertContent(ContentModel input)
        {
            var result = input.Insert(input);
            return Json(result);
        }
        [Authorize(Roles = "Sửa nội dung")]

        [HttpPost]
        public IActionResult UpdateContent(ContentModel input)
        {
            var result = input.Update(input);
            return Json(result);
        }
        [Authorize(Roles = "Xóa nội dung")]

        [HttpPost]
        public IActionResult DeleteContent(ContentModel input)
        {
            var result = input.Delete(input);
            return Json(result);
        }
    }
}
