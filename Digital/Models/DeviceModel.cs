using Dapper;

namespace Digital.Models
{
    public class DeviceModel
    {
        public string? ip_address { get; set; }

        public string? name_device { get; set; }

        public string? name_brand { get; set; }

        public string? resolution { get; set; }

        public string? name_method { get; set; }

        public int? type_method { get; set; }

        public int? id_url { get; set; }

        public int? id_type { get; set; }

        public List<DeviceModel> Get(DeviceModel input)
        {
            var result = new List<DeviceModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@name_device", input.name_device);
            dParam.Add("@name_brand", input.name_brand);
            dParam.Add("@resolution", input.resolution);
            dParam.Add("@name_method", input.name_method);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<DeviceModel>("sp_get_device", dParam).ToList();

            return result;
        }

        public List<DeviceModel> Insert(DeviceModel input)
        {
            var result = new List<DeviceModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@id_url", input.id_url);
            dParam.Add("@id_type", input.id_type);
            dParam.Add("@name_device", input.name_device);
            dParam.Add("@name_brand", input.name_brand);
            dParam.Add("@resolution", input.resolution);
            dParam.Add("@type_method", input.type_method);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<DeviceModel>("sp_ins_link_url", dParam).ToList();

            return result;
        }


        public List<DeviceModel> Update(DeviceModel input)
        {
            var result = new List<DeviceModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@name_device", input.name_device);
            dParam.Add("@name_brand", input.name_brand);
            dParam.Add("@resolution", input.resolution);
            dParam.Add("@type_method", input.type_method);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<DeviceModel>("sp_upd_device", dParam).ToList();

            return result;
        }

        public List<DeviceModel> Delete(DeviceModel input)
        {
            var result = new List<DeviceModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            result = new SQLHelper(DBConnection.DBConn).ExecProcedureData<DeviceModel>("sp_del_device", dParam).ToList();

            return result;
        }
    }
}
