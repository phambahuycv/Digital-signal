using Dapper;
using System.ComponentModel.DataAnnotations;

namespace Digital.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage ="Tài khoản không được để trống")]
        public string? user_name { get; set; }
        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        public string? password { get; set; }
        public List<LoginModel> Get(LoginModel input)
        {
            var result = new List<LoginModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@user_name", input.user_name);
            dParam.Add("@password", input.password);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<LoginModel>("sp_login", dParam).ToList();

            return result;
        }
    }
}
