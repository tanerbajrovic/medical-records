using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediInsigthHubAPI.Models
{
    public class MedicalRecord
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int Gender { get; set; }
        public double LEWBC { get; set; }
        public double LimfPercentage { get; set; }
        public double MidPercentage { get; set; }
        public double GranPercentage { get; set; }
        public int HGB { get; set; }
        public double ERRBC { get; set; }
        public string Category { get; set; }
    }
}
