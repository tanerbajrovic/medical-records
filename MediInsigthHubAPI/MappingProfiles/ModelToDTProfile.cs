using MediInsigthHubAPI.Contracts.Requests;
using MediInsigthHubAPI.Contracts.Responses;
using MediInsigthHubAPI.Models;
using AutoMapper;

namespace MediInsigthHubAPI.MappingProfiles
{
    public class ModelToDTProfile : Profile
    {
        public ModelToDTProfile()
        {
            CreateMap<AuthenticationResult, AuthSuccessResponse>();
            CreateMap<AuthenticationResult, AuthFailResponse>();
        }
    }
}
