using Dapper;

namespace Digital.Models
{
    public class ContentModel
    {
        public int? id_cl { get; set; }

        public string? content_name { get; set; }

        public DateTime? modified_date_cl { get; set; }

        public string? file_size { get; set; }
        public List<ContentModel> Get(ContentModel input)
        {
            var result = new List<ContentModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_cl", input.id_cl);
            dParam.Add("@content_name", input.content_name);
            dParam.Add("@modified_date_cl", input.modified_date_cl);
            dParam.Add("@file_size", input.file_size);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<ContentModel>("sp_get_content", dParam).ToList();

            return result;
        }

        public List<ContentModel> Insert(ContentModel input)
        {
            var result = new List<ContentModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_cl", input.id_cl);
            dParam.Add("@content_name", input.content_name);
            dParam.Add("@modified_date_cl", input.modified_date_cl);
            dParam.Add("@file_size", input.file_size);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<ContentModel>("sp_ins_content", dParam).ToList();

            return result;
        }


        public List<ContentModel> Update(ContentModel input)
        {
            var result = new List<ContentModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_cl", input.id_cl);
            dParam.Add("@content_name", input.content_name);
            dParam.Add("@modified_date_cl", input.modified_date_cl);
            dParam.Add("@file_size", input.file_size);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<ContentModel>("sp_upd_content", dParam).ToList();

            return result;
        }

        public List<ContentModel> Delete(ContentModel input)
        {
            var result = new List<ContentModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_cl", input.id_cl);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<ContentModel>("sp_del_content", dParam).ToList();

            return result;
        }
    }
}
