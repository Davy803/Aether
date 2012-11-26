using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ProjectAether
{
	public static class HtmlHelperExtensions
	{
		/// <summary>
		/// Automatically generates a script block, useful for non-typical script
		/// tags that have HTML content inside (like those in jquery templates for example)
		/// Always use this within using statement as Dispose must be called to properly close
		/// the script tag.
		/// </summary>
		/// <param name="helper">Html Helper object</param>
		/// <param name="id">The ID for the generated script tag.</param>
		/// <returns>TemplateBlock object which must be disposed to properly emit
		/// the necessary script tags.</returns>
		public static TemplateBlock Template(this HtmlHelper helper, string id)
		{
			return Template(helper, id, "");
		}

		/// <summary>
		/// Automatically generates a script block, useful for non-typical script
		/// tags that have HTML content inside (like those in jquery templates for example)
		/// Always use this within using statement as Dispose must be called to properly close
		/// the script tag.
		/// </summary>
		/// <param name="helper">Html Helper object</param>
		/// <param name="id">The ID for the generated script tag.</param>
		/// <param name="type">Defaults to text/html, but may be overriden by setting
		/// this parameter.</param>
		/// <returns>TemplateBlock object which must be disposed to properly emit
		/// the necessary script tags.</returns>
		public static TemplateBlock Template(this HtmlHelper helper, string id, string type)
		{
			return new TemplateBlock(helper.ViewContext, id, type);
		}

		public static IHtmlString JsonSerialize(this HtmlHelper helper, object value)
		{
			return helper.Raw(new JavaScriptSerializer { MaxJsonLength = int.MaxValue }.Serialize(value));
		}
	}


	/// <summary>
	/// Used as workaround to get syntax highlighting/intellisense in knockout named templates  http://www.wiredprairie.us/blog/index.php/archives/1204
	/// </summary>
	public class TemplateBlock : IDisposable
	{
		private bool _disposed = false;
		public ViewContext ViewContext { get; private set; }

		public TemplateBlock(ViewContext context, string id, string type)
		{
			this.ViewContext = context;
			type = string.IsNullOrWhiteSpace(type) ? "text/html" : type;
			context.Writer.Write("<script type='{0}' id='{1}'>\n", type, id);
		}

		private void Disposing(bool disposing)
		{
			if (!_disposed)
			{
				_disposed = true;
				ViewContext.Writer.Write("</script>\n");
			}
		}
		public void Dispose()
		{
			this.Disposing(true);
		}
	}
	
}