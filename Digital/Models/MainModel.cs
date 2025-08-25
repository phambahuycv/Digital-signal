using Dapper;

namespace Digital.Models
{
    public class MainModel
    {
        public string? ip_address { get; set; }
        public string? url { get; set; }

        public string? type { get; set; }
        public int? id_url { get; set; }
        public int? id_type { get; set; }

        public int? id { get; set; }
        public List<MainModel> Get(MainModel input)
        {
            var result = new List<MainModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<MainModel>("sp_get_link_url", dParam).ToList();

            return result;
        }
    }
}
