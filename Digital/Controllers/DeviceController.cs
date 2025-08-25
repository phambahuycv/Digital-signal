using Microsoft.AspNetCore.Mvc;
using Digital.Models;
using Microsoft.AspNetCore.Authorization;

namespace Digital.Controllers
{
    [Authorize(Roles ="Quản lý thiết bị")]
    public class DeviceController : Controller
    {
        public IActionResult Index()
        {
            List<DeviceModel> templates = new DeviceModel().Get(new DeviceModel());
            return View();
        }
        [HttpPost]
        public IActionResult GetDevice(DeviceModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }
        [Authorize(Roles ="Thêm thiết bị")]
        

        [HttpPost]
        public IActionResult InsertDevice(DeviceModel input)
        {
            var result = input.Insert(input);
            return Json(result);
        }

        [Authorize(Roles = "Sửa thiết bị")]
        [HttpPost]
        public IActionResult UpdateDevice(DeviceModel input)
        {
            var result = input.Update(input);
            return Json(result);
        }
        [Authorize(Roles = "Xóa thiết bị")]
        [HttpPost]
        public IActionResult DeleteDevice(DeviceModel input)
        {
            var result = input.Delete(input);
            return Json(result);
        }
    }
}
