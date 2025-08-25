using Dapper;

namespace Digital.Models
{
    public class ObjectModel
    {
        public int? id_role { get; set; }
        public string? role_name { get; set; }
        public int? id_object { get; set; }
        public string? object_name { get; set; }
        public string? user_name { get; set; }
        public string? email { get; set; }
        public string? full_name { get; set; }

        //lấy quyền
        public List<ObjectModel> Get(ObjectModel input)
        {
            var result = new List<ObjectModel>();

            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@user_name", input.user_name);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<ObjectModel>("sp_get_object", dParam).ToList();
            return result;
        }
        public List<ObjectModel> GetObject(ObjectModel input)
        {
            var result = new List<ObjectModel>();
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<ObjectModel>("sp_get_permission").ToList();
            return result;
        }

    }

    
}
