using AutoMapper;
using Models.Model.Items;

namespace SalesTracker
{
    public class Automapper : Profile
    {
        public Automapper()
        {
            CreateMap<ItemDTO, Item>().ReverseMap();
        }
    }
}
