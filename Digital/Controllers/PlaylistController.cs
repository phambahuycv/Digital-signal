using Digital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Digital.Controllers
{
    [Authorize(Roles ="Quản lý nội dung")]
    public class PlaylistController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public PlaylistController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Index(IFormFile file)
        {
            try
            {
                string filename = file.FileName;
                filename = Path.GetFileName(filename);
                string uploadfilepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\imgs", filename);
                var stream = new FileStream(uploadfilepath, FileMode.Create);
                file.CopyToAsync(stream);
                ViewBag.message = "Tải lên thành công";
                ViewBag.FileName = filename;
            }
            catch(Exception ex)
            {
                ViewBag.message = "Error: " + ex.Message.ToString();
            }
            
            return View();
        }
        [HttpPost]
        public IActionResult GetPlaylist(PlaylistModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }
        [Authorize(Roles = "Thêm nội dung")]

        [HttpPost]
        public IActionResult InsertPlaylist(PlaylistModel input)
        {
            
            var result = input.Insert(input);
            return Json(result);
        }
        [Authorize(Roles = "Sửa nội dung")]

        [HttpPost]
        public IActionResult UpdatePlaylist(PlaylistModel input)
        {
            var result = input.Update(input);
            return Json(result);
        }
        [Authorize(Roles = "Xóa nội dung")]

        [HttpPost]
        public IActionResult DeletePlaylist(PlaylistModel input)
        {
            var result = input.Delete(input);
            return Json(result);
        }
    }
}
