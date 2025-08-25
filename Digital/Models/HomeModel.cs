using Dapper;

namespace Digital.Models
{
    public class HomeModel
    {
        public string? ip_address { get; set; }
        public string? url { get; set; }

        public string? type { get; set; }
        public int? id_url { get; set; }
        public int? id_type { get; set; }

        public int? id { get; set; }

        public int? id_pl { get; set; }

        public List<HomeModel> Get(HomeModel input)
        {
            var result = new List<HomeModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<HomeModel>("sp_get_link_url", dParam).ToList();

            return result;
        }

        public List<HomeModel> Update(HomeModel input)
        {
            var result = new List<HomeModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@id_url", input.id_url);
            dParam.Add("@id_type", input.id_type);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<HomeModel>("sp_upd_link_url", dParam).ToList();

            return result;
        }

        public List<HomeModel> Select(HomeModel input)
        {
            var result = new List<HomeModel>();
            DynamicParameters dParam = new DynamicParameters();
           
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<HomeModel>("sp_get_url_playlist", dParam).ToList();

            return result;
        }

        
    }
}
