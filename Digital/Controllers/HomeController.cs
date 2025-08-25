using Digital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;

namespace Digital.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {

            ViewData["iptest"] = Dns.GetHostAddresses(Dns.GetHostName())[3].ToString();
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult GetLink(HomeModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }

        [HttpPost]
        public IActionResult UpdateLink(HomeModel input)
        {
            var result = input.Update(input);
            return Json(result);
        }

        [HttpPost]
        public IActionResult SelectLink(HomeModel input)
        {
            var result = input.Select(input);
            return Json(result);
        }

        
    }
}