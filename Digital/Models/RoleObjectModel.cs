using Dapper;

namespace Digital.Models
{
    public class RoleObjectModel
    {
        public int? id_role { get; set; }
        public string? role_name { get; set; }
        public int? id_object { get; set; }
        public string? object_name { get; set; }
        public bool? status { get; set; }
        public DateTime? create_at { get; set; }
        public string? create_by { get; set; }
        public DateTime? last_modify_at { get; set; }
        public string? description { get; set; }

        public List<RoleObjectModel> Get(RoleObjectModel input)
        {
            var result = new List<RoleObjectModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@role_name", input.role_name);
            dParam.Add("@object_name", input.object_name);
            dParam.Add("@status", input.status);
            dParam.Add("@create_at", input.create_at);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleObjectModel>("sp_get_role_object", dParam).ToList();

            return result;
        }

        public List<RoleObjectModel> Update(RoleObjectModel input)
        {
            var result = new List<RoleObjectModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_role", input.id_role);
            dParam.Add("@id_object", input.id_object);
            dParam.Add("@status", input.status);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleObjectModel>("sp_upd_role_object", dParam).ToList();

            return result;
        }

        public List<RoleObjectModel> Insert(RoleObjectModel input)
        {
            var result = new List<RoleObjectModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_role", input.id_role);
            dParam.Add("@id_object", input.id_object);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<RoleObjectModel>("sp_ins_role_object", dParam).ToList();

            return result;
        }
    }
}
