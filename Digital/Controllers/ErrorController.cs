using Microsoft.AspNetCore.Mvc;

namespace Digital.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult AccessDeny()
        {
            return View();
        }
        public IActionResult E404()
        {
            return View();
        }
    }
}
