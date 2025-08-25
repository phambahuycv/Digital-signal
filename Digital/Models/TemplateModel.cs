using Dapper;
using TemplateStructure.Helper;

namespace TemplateStructure.Models
{
    public class TemplateModel
    {
        public int id { get; set; }

        public string? name { get; set; }

        public bool? status { get; set; }

        public DateTime? create_at { get; set; }

        public string? create_by { get; set; }

        public DateTime? last_modify_at { get; set; }

        public string? last_modify_by { get; set; }

        public string? description { get; set; }

        public List<TemplateModel> Get(TemplateModel input)
        {
            var result = new List<TemplateModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@name", input.name);
            dParam.Add("@status", input.status);
            dParam.Add("@create_at", input.create_at);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@last_modify_by", input.last_modify_by);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.TEST_DB).ExecProcedureData<TemplateModel>("sp_get_template", dParam).ToList();

            return result;
        }

        public List<TemplateModel> Delete(TemplateModel input)
        {
            var result = new List<TemplateModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@last_modify_by", input.last_modify_by);
            result = new SQLHelper(DBConnection.TEST_DB).ExecProcedureData<TemplateModel>("sp_del_template", dParam).ToList();

            return result;
        }

        public List<TemplateModel> Update(TemplateModel input)
        {
            var result = new List<TemplateModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id", input.id);
            dParam.Add("@name", input.name);
            dParam.Add("@last_modify_at", input.last_modify_at);
            dParam.Add("@last_modify_by", input.last_modify_by);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.TEST_DB).ExecProcedureData<TemplateModel>("sp_upd_template", dParam).ToList();

            return result;
        }

        public List<TemplateModel> Insert(TemplateModel input)
        {
            var result = new List<TemplateModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@name", input.name);
            dParam.Add("@status", input.status);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@description", input.description);
            result = new SQLHelper(DBConnection.TEST_DB).ExecProcedureData<TemplateModel>("sp_ins_template", dParam).ToList();

            return result;
        }
    }
}
