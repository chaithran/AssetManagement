﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace dirico_assignment
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "*");
            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "*");
        }
        protected void Application_BeginRequest()
        {
            var origin = HttpContext.Current.Request.Headers["Origin"];           
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "*");
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "*");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");

                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }

        }
    }
}
