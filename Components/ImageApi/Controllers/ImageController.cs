using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagesController : ControllerBase
    {
        private static readonly List<ImageModel> Images = new List<ImageModel>
        {
            new ImageModel { Id = 1, Url = "http://192.168.1.121:8081/assets/blakeneyDocs.png", Title = "Blakeney Surgery", Description = "An image of Blakeney Doctor's Surgery." },
            new ImageModel { Id = 2, Url = "http://192.168.1.121:8081/assets/blakeneyDocs2.jpeg", Title = "Side View of Blakeney Surgery", Description = "Another side image of Blakeney Doctor's Surgery." },
            new ImageModel { Id = 3, Url = "http://192.168.1.121:8081/assets/doctorsOffice.png", Title = "Doctors", Description = "An image representing a medical practice with various healthcare elements." },
            new ImageModel { Id = 4, Url = "http://192.168.1.121:8081/assets/doctors.png", Title = "Medical Practice", Description = "A photo of a group of doctors working together in a medical setting." }
        };

        [HttpGet]
        public IEnumerable<ImageModel> Get()
        {
            return Images;
        }
    }

    public class ImageModel
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
