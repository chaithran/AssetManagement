using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace dirico_assignment.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        //public async Task<FileStreamResult> GetFileAsync(System.Web.Mvc.ControllerBase controller, string mimeType,MemoryStream memory)
        //{
        //    return controller.File(memory.ToArray(), mimeType);
        //}
    }
}
