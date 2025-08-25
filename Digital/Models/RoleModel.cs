using Dapper;
using System.ComponentModel.DataAnnotations;
using TemplateStructure.Models;

namespace Digital.Models
{
    public class RoleModel
    {
        public int? id { get; set; }
        public string? role_name { get; set; }
        public bool? status { get; set; }
        public DateTime? create_at { get; set; }
        public string? create_by { get; set; }
        public DateTime? last_modify_at { get; set; }
        public string? description { get; set; }


        public List<RoleModel> Get(RoleModel input)
        {
            var result = new List<RoleModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@role_name", input.role_name);
            dParam.Add("@status", input.status);
            dParam.Add("@create_at", input.create_at);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleModel>("sp_get_role", dParam).ToList();

            return result;
        }

        public List<RoleModel> Delete(RoleModel input)
        {
            var result = new List<RoleModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleModel>("sp_del_role", dParam).ToList();

            return result;
        }

        public List<RoleModel> Update(RoleModel input)
        {
            var result = new List<RoleModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@role_name", input.role_name);
            dParam.Add("@status", input.status);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleModel>("sp_upd_role", dParam).ToList();

            return result;
        }

        public List<RoleModel> Insert(RoleModel input)
        {
            var result = new List<RoleModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@role_name", input.role_name);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleModel>("sp_ins_role", dParam).ToList();

            return result;
        }
    }
}
