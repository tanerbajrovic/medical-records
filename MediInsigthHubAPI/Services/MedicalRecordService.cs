using MediInsigthHubAPI.Contracts.Requests.MedicalRecords;
using MediInsigthHubAPI.Data;
using MediInsigthHubAPI.Models;
using MediInsigthHubAPI.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MediInsigthHubAPI.Services
{
    public class MedicalRecordService : IMedicalRecordService
    {
        private readonly IConfiguration? _configuration;
        private readonly AppDbContext _context;

        public MedicalRecordService(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public MedicalRecord Create(MedicalRecordCreateRequest request)
        {
            var medicalRecord = new MedicalRecord
            {
                Gender = request.Gender,
                LEWBC = request.LEWBC,
                LimfPercentage = request.LimfPercentage,
                MidPercentage = request.MidPercentage,
                GranPercentage = request.GranPercentage,
                HGB = request.HGB,
                ERRBC = request.ERRBC,
                Category = request.Category
                
            };

            _context.MedicalRecords.Add(medicalRecord);
            _context.SaveChanges();

            var newRecord = _context.Entry(medicalRecord).Entity;

            return newRecord;
        }
        public MedicalRecord? Get(int id)
        {
            return _context.MedicalRecords.FirstOrDefault(m => m.Id == id);
        }
        public MedicalRecord Update(MedicalRecordUpdateRequest request)
        {
            var medicalRecord = _context.MedicalRecords.FirstOrDefault(m => m.Id == request.Id);

            medicalRecord.Gender = request.Gender;
            medicalRecord.LEWBC = request.LEWBC;
            medicalRecord.LimfPercentage = request.LimfPercentage;
            medicalRecord.MidPercentage = request.MidPercentage;
            medicalRecord.GranPercentage = request.GranPercentage;
            medicalRecord.HGB = request.HGB;
            medicalRecord.ERRBC = request.ERRBC;
            medicalRecord.Category = request.Category;

            _context.MedicalRecords.Update(medicalRecord);
            _context.SaveChanges();

            return medicalRecord;
        }
        public bool Delete(int id)
        {
            var medicalRecord = _context.MedicalRecords.FirstOrDefault(m => m.Id == id);

            if (medicalRecord != null) 
            {
                _context.MedicalRecords.Remove(medicalRecord);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        public List<MedicalRecord> GetAll()
        {
            return _context.MedicalRecords.ToList();
        }
    }
}
