using Dapper;

namespace Digital.Models
{
    public class PlaylistModel
    {
        public int? id_pl { get; set; }

        public int? id_cl { get; set; }

        public string? playlist_name { get; set; }

        public string? url { get; set; }

        public string? type { get; set; }

        public Boolean? status { get; set; }

        public int? duration { get; set; }

        public string? content_name { get; set; }
        public List<PlaylistModel> Get(PlaylistModel input)
        {
            var result = new List<PlaylistModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_pl", input.id_pl);
            dParam.Add("@id_cl", input.id_cl);
            dParam.Add("@content_name", input.content_name);
            dParam.Add("@playlist_name", input.playlist_name);
            dParam.Add("@url", input.url);
            dParam.Add("@type", input.type);
            dParam.Add("@status", input.status);
            dParam.Add("@duration", input.duration);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<PlaylistModel>("sp_get_playlist", dParam).ToList();

            return result;
        }

        public List<PlaylistModel> Insert(PlaylistModel input)
        {
            var result = new List<PlaylistModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_pl", input.id_pl);
            dParam.Add("@id_cl", input.id_cl);
            dParam.Add("@playlist_name", input.playlist_name);
            dParam.Add("@url", input.url);
            dParam.Add("@type", input.type);
            dParam.Add("@status", input.status);
            dParam.Add("@duration", input.duration);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<PlaylistModel>("sp_ins_playlist", dParam).ToList();

            return result;
        }


        public List<PlaylistModel> Update(PlaylistModel input)
        {
            var result = new List<PlaylistModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_pl", input.id_pl);
            dParam.Add("@id_cl", input.id_cl);
            dParam.Add("@playlist_name", input.playlist_name);
            dParam.Add("@url", input.url);
            dParam.Add("@type", input.type);
            dParam.Add("@status", input.status);
            dParam.Add("@duration", input.duration);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<PlaylistModel>("sp_upd_playlist", dParam).ToList();

            return result;
        }

        public List<PlaylistModel> Delete(PlaylistModel input)
        {
            var result = new List<PlaylistModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_pl", input.id_pl);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<PlaylistModel>("sp_del_playlist", dParam).ToList();

            return result;
        }
    }
}
