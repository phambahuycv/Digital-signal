using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BaseProject.ViewComponents
{
    [ViewComponent(Name = "Account")]
    public class AccountViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            ClaimsPrincipal claimuser = HttpContext.User;

            ViewData["email"] = ((ClaimsIdentity)claimuser.Identity).FindFirst("Email")?.Value?? string.Empty;

            ViewData["full_name"] = ((ClaimsIdentity)claimuser.Identity).FindFirst("FullName")?.Value ?? string.Empty;

            return View("Index");
        }
    }
}
