using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace dirico_assignment.Models.AssetManagementModel
{
    public class AssetModel
    {
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        public int? parent_id { get; set; }
        public bool isDirectory { get; set; }
        public int assetTypeId { get; set; }
        [Required]
        public string blobName { get; set; }
        [Required]
        public string title { get; set; }
        [Required]
        public string content { get; set; }
        public int size { get; set; }
    }

    public class AssetTypeModel
    {
        public int id { get; set; }
        public string value { get; set; }
    }

    public class FolderStructureModel
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        public Nullable<int> parentID { get; set; }
        public bool isDirectory { get; set; }
        public string blobName { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public long? size { get; set; }
        public List<FolderStructureModel> items { get; set; }
    }

    public class VariantModel
    {
        public int id { get; set; }
        public int? parent_id { get; set; }
        public Nullable<int> assetId { get; set; }
        [Required]
        public string name { get; set; }
        public string isDirectory { get; set; }
        public string properties { get; set; }

    }

}