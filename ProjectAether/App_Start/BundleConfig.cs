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
                "~/libs/underscore.js",
                "~/libs/underscore-ko-1.1.0.js",
                "~/libs/hash/jshashset.js",
                "~/libs/hash/jshashtable.js",
                "~/app/helper.js")
                   .IncludeDirectory("~/app", "*.js", true);


            commonScriptsBundle.Transforms.Add(jsTransformer);
            commonScriptsBundle.Orderer = nullOrderer;

            bundles.Add(commonScriptsBundle);

            var testScriptsBundle = new Bundle("~/Bundles/Tests");
            testScriptsBundle.Include(//"~/ProjectAether/libs/knockout.debug.js",
                "~/libs/underscore.js",
                "~/libs/underscore-ko-1.1.0.js",
                "~/libs/hash/jshashset.js",
                "~/libs/hash/jshashtable.js",
                "~/app/helper.js")
                   .IncludeDirectory("~/tests/app", "*.js", true);


            testScriptsBundle.Transforms.Add(jsTransformer);
            testScriptsBundle.Orderer = nullOrderer;

            bundles.Add(testScriptsBundle);

        }
    }
}