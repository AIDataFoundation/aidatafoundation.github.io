defmodule Mix.Tasks.Aidatafoundation.Export do
  @moduledoc """
  Renders the public AI Data Foundation routes into a static directory for GitHub Pages.
  Usage:
      mix aidatafoundation.export --output _site
  """
  use Mix.Task

  alias AiDataFoundation.PublicPages
  alias AiDataFoundationWeb.Endpoint

  @shortdoc "Exports AI Data Foundation as a static site for GitHub Pages"

  @impl Mix.Task
  def run(args) do
    {options, _, _} = OptionParser.parse(args, strict: [output: :string])
    output = options[:output] || "_site"

    Mix.Task.run("app.start")
    output = Path.expand(output)

    Mix.shell().info("==> Exporting AI Data Foundation to #{output}...")

    File.rm_rf!(output)
    File.mkdir_p!(output)

    # Copy static assets from priv/static
    priv_static = Application.app_dir(:ai_data_foundation, "priv/static")

    if File.dir?(priv_static) do
      File.cp_r!(priv_static, output)
    end

    # Touch .nojekyll for GitHub Pages
    File.touch!(Path.join(output, ".nojekyll"))

    # Write CNAME if present
    cname_path = Path.join(priv_static, "aidatafoundation/CNAME")

    if File.exists?(cname_path) do
      File.cp!(cname_path, Path.join(output, "CNAME"))
    else
      File.write!(Path.join(output, "CNAME"), "aidatafoundation.github.io\n")
    end

    # Render each public page
    Enum.each(PublicPages.paths(), &write_page(output, &1))

    # Render sitemap and RSS
    write_raw_file(output, "/sitemap.xml", "sitemap.xml")
    write_raw_file(output, "/rss.xml", "rss.xml")
    write_raw_file(output, "/feed.xml", "feed.xml")

    # Render 404.html
    write_404(output)

    Mix.shell().info(
      "==> Successfully exported #{length(PublicPages.paths())} pages to #{output}!"
    )
  end

  defp write_page(output, path) do
    response =
      :get
      |> Plug.Test.conn(path)
      |> Map.put(:host, "aidatafoundation.github.io")
      |> Map.put(:scheme, :https)
      |> Endpoint.call([])

    if response.status != 200 do
      Mix.raise("Could not export #{path}: received HTTP #{response.status}")
    end

    target_dir =
      if path == "/" do
        output
      else
        Path.join(output, String.trim_leading(path, "/"))
      end

    File.mkdir_p!(target_dir)
    target_file = Path.join(target_dir, "index.html")
    File.write!(target_file, response.resp_body)

    # Also write flat path for servers that don't auto-resolve directory index
    if path != "/" do
      flat_file = Path.join(output, String.trim_leading(path, "/") <> ".html")
      File.mkdir_p!(Path.dirname(flat_file))
      File.write!(flat_file, response.resp_body)
    end

    Mix.shell().info("  ✓ #{path} -> #{target_file}")
  end

  defp write_raw_file(output, route_path, filename) do
    response =
      :get
      |> Plug.Test.conn(route_path)
      |> Map.put(:host, "aidatafoundation.github.io")
      |> Map.put(:scheme, :https)
      |> Endpoint.call([])

    if response.status == 200 do
      target_file = Path.join(output, filename)
      File.write!(target_file, response.resp_body)
      Mix.shell().info("  ✓ #{route_path} -> #{target_file}")
    end
  end

  defp write_404(output) do
    target_file = Path.join(output, "404.html")

    html = """
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Page Not Found · AI Data Foundation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/assets/css/app.css">
      </head>
      <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-6 text-center">
        <div class="max-w-md space-y-4">
          <div class="text-6xl font-black text-indigo-500">404</div>
          <h1 class="text-2xl font-bold">Page Not Found</h1>
          <p class="text-slate-400 text-sm">The page you were looking for doesn't exist or has moved.</p>
          <div class="pt-4">
            <a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition">
              Back to Home &rarr;
            </a>
          </div>
        </div>
      </body>
    </html>
    """

    File.write!(target_file, html)
    Mix.shell().info("  ✓ /404 -> #{target_file}")
  end
end
