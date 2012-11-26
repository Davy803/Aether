using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;

namespace ProjectAether
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            var cssTransformer = new CssTransformer();
            var jsTransformer = new JsTransformer();
            var nullOrderer = new NullOrderer();

            var commonStylesBundle = new Bundle("~/Bundles/Styles");
            commonStylesBundle.Include(
               "~/stylesheets/screen.css");
            commonStylesBundle.Transforms.Add(cssTransformer);
            commonStylesBundle.Orderer = nullOrderer;

            bundles.Add(commonStylesBundle);

            //var modernizrBundle = new Bundle("~/Bundles/Modernizr");
            //modernizrBundle.Include("~/Scripts/modernizr-2.*");
            //modernizrBundle.Transforms.Add(jsTransformer);
            //modernizrBundle.Orderer = nullOrderer;

            //bundles.Add(modernizrBundle);

            var commonScriptsBundle = new Bundle("~/Bundles/ProjectAether");
            commonScriptsBundle.Include(//"~/ProjectAether/libs/knockout.debug.js",
                "~/ProjectAether/libs/underscore.js",
                "~/ProjectAether/libs/underscore-ko-1.1.0.js",
                "~/ProjectAether/libs/hash/jshashset.js",
                "~/ProjectAether/libs/hash/jshashtable.js",
                "~/ProjectAether/app/helper.js")
                   .IncludeDirectory("~/ProjectAether/app", "*.js", true);
            //"~/ProjectAether/app/*/*.js")
            //"~/ProjectAether/app/Cards/*.js",
            //"~/ProjectAether/app/Decks/*.js")
            ;

            commonScriptsBundle.Transforms.Add(jsTransformer);
            commonScriptsBundle.Orderer = nullOrderer;

            bundles.Add(commonScriptsBundle);

        }
    }
}