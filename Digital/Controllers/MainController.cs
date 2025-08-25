using Digital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Digital.Controllers
{

    public class MainController : Controller
    {
        public IActionResult Index()
        {

            ViewData["iptest"] = Dns.GetHostAddresses(Dns.GetHostName())[3].ToString();
            return View();
        }

        [HttpPost]
        public IActionResult GetLink(MainModel input)
        {
            var result = input.Get(input);
            return Json(result);
        }
    }
}
