using Dapper;
using System.ComponentModel.DataAnnotations;
using TemplateStructure.Helper;
using System.Security.Cryptography;
using System.Text;

namespace Digital.Models
{
    public class UserViewModel
    {
        [Key]
        public int? id { get; set; }
        public string? id_user { get; set; }
        public int? id_role { get; set; }
        public string? full_name { get; set; }
        public bool? sex { get; set; }
        public DateTime? date_of_birth { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public bool? status { get; set; }
        public string? email { get; set; }
        public string? user_name { get; set; }
        public string? password { get; set; }
        public DateTime? create_at { get; set; }
        public string? create_by { get; set; }
        public DateTime? last_modify_at { get; set; }
        public string? description { get; set; }
        public string? role_name { get; set; }
        //hiển thị
        string hashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }
        public List<UserViewModel> Get(UserViewModel input)
        {
            var result = new List<UserViewModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@id_user", input.id_user);
            dParam.Add("@id_role", input.id_role);
            dParam.Add("@full_name", input.full_name);
            dParam.Add("@sex", input.sex);
            dParam.Add("@date_of_birth", input.date_of_birth);
            dParam.Add("@phone", input.phone);
            dParam.Add("@address", input.address);
            dParam.Add("@status", input.status);
            dParam.Add("@email", input.email);
            dParam.Add("@user_name", input.user_name);
            dParam.Add("@password", input.password);
            dParam.Add("@create_at", input.create_at);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@description", input.description);
            //result = new SQLHelper(DBConnection.TEST_DB).ExecQueryData<UserViewModel>("select * from account").ToList();
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<UserViewModel>("sp_get_user", dParam).ToList();
            return result;
        }


        ////view by id
        public List<UserViewModel> View(UserViewModel input)
        {
            var result = new List<UserViewModel>();

            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<UserViewModel>("UserViewByID", dParam).ToList();
            return result;
        }

        public List<UserViewModel> getRolee(UserViewModel input)
        {
            var result = new List<UserViewModel>();

            DynamicParameters dParam = new DynamicParameters();
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<UserViewModel>("sp_get_all_role").ToList();
            return result;
        }

        //Xóa
        public List<UserViewModel> Delete(UserViewModel input)
         {
             var result = new List<UserViewModel>();
             DynamicParameters dParam = new DynamicParameters();
             dParam.Add("@id", input.id);
             result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<UserViewModel>("sp_del_user", dParam).ToList();
             return result;
         }

        
        //Sửa
        public List<UserViewModel> Update(UserViewModel input)
        {
            var result = new List<UserViewModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@id_user", input.id_user);
            dParam.Add("@id_role", input.id_role);
            dParam.Add("@full_name", input.full_name);
            dParam.Add("@sex", input.sex);
            dParam.Add("@date_of_birth", input.date_of_birth);
            dParam.Add("@phone", input.phone);
            dParam.Add("@address", input.address);
            dParam.Add("@status", input.status);
            dParam.Add("@email", input.email);
            dParam.Add("@user_name", input.user_name);
            dParam.Add("@password", hashPassword(input.password));
            //dParam.Add("@create_at", input.create_at);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<UserViewModel>("sp_upd_user", dParam).ToList();

            return result;
        }


        //thêm
        public List<UserViewModel> Insert(UserViewModel input)
        {
            var result = new List<UserViewModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@id_user", input.id_user);
            dParam.Add("@id_role", input.id_role);
            dParam.Add("@full_name", input.full_name);
            dParam.Add("@sex", input.sex);
            dParam.Add("@date_of_birth", input.date_of_birth);
            dParam.Add("@phone", input.phone);
            dParam.Add("@address", input.address);
            dParam.Add("@status", input.status);
            dParam.Add("@email", input.email);
            dParam.Add("@user_name", input.user_name);
            dParam.Add("@password", input.password);
            dParam.Add("@create_at", input.create_at);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<UserViewModel>("sp_ins_user", dParam).ToList();
            return result;
        }
    }
}
