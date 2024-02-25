namespace MediInsigthHubAPI.Contracts.Requests.MedicalRecords
{
    public class MedicalRecordUpdateRequest
    {
        public int Id { get; set; }
        public int Gender { get; set; }
        public double LEWBC { get; set; }
        public double LimfPercentage { get; set; }
        public double MidPercentage { get; set; }
        public double GranPercentage { get; set; }
        public int HGB { get; set; }
        public double ERRBC { get; set; }
    }
}
