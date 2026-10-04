defmodule AiDataFoundation.PublicPages do
  @moduledoc "Route inventory shared by the Pages exporter and sitemap generator."
  alias AiDataFoundation.Foundation

  def paths do
    [
      "/",
      "/tools",
      "/models",
      "/labs",
      "/blog",
      "/roadmap",
      "/about"
    ] ++
      Enum.map(Foundation.labs(), &"/labs/#{&1["id"]}") ++
      Enum.map(Foundation.posts(), &"/blog/#{&1["id"]}")
  end
end
