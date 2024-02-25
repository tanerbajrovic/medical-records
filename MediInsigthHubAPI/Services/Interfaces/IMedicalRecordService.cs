using MediInsigthHubAPI.Contracts.Requests.MedicalRecords;
using MediInsigthHubAPI.Models;

namespace MediInsigthHubAPI.Services.Interfaces
{
    public interface IMedicalRecordService
    {
        MedicalRecord Create(MedicalRecordCreateRequest request);
        MedicalRecord? Get(int id);
        MedicalRecord Update(MedicalRecordUpdateRequest request);
        bool Delete(int id);
        List<MedicalRecord> GetAll();
    }
}
