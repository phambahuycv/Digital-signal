using Digital.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace Digital.Controllers
{
    public class AccessController : Controller
    {
        public IActionResult Login()
        {
            ClaimsPrincipal claimsPrincipal = HttpContext.User;
            if (claimsPrincipal.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");
            return View();
        }
        string hashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {
                loginModel.password = hashPassword(loginModel.password);
                List<LoginModel> models = loginModel.Get(loginModel);
                if (models != null && models.Count > 0)
                {
                    if (loginModel.user_name == models[0].user_name &&  loginModel.password == models[0].password)
                    { 
                        List<Claim> claims = new List<Claim>()
                        {
                            new Claim(ClaimTypes.Name,loginModel.user_name),
                        };
                        ObjectModel objectModel = new ObjectModel() { user_name = loginModel.user_name };
                        List<ObjectModel> roles = objectModel.Get(objectModel);
                        claims.Add(new Claim("Email", roles[0].email));
                        claims.Add(new Claim("FullName", roles[0].full_name));
                        foreach (ObjectModel role in roles)
                        {
                            if (role.object_name != null)
                                claims.Add(new Claim(ClaimTypes.Role, role.object_name));
                        }

                        // log the user in with the claims above
                        Console.WriteLine("Login successful");


                        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                        AuthenticationProperties properties = new AuthenticationProperties()
                        {
                            AllowRefresh = true
                        };

                        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                            new ClaimsPrincipal(claimsIdentity), properties);

                        return RedirectToAction("Index", "Home");
                    }
                }
                ViewData["VadilateMessage"] = "Tài khoản hoặc mật khẩu không đúng";
            }


            
            return View();
        }
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Main");
        }
    }
}
