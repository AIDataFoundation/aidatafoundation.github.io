defmodule AiDataFoundationWeb.Router do
  use AiDataFoundationWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {AiDataFoundationWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :xml do
    plug :accepts, ["xml"]
  end

  scope "/", AiDataFoundationWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/tools", PageController, :tools
    get "/models", PageController, :models
    get "/labs", PageController, :labs
    get "/labs/:id", PageController, :lab
    get "/blog", PageController, :blog
    get "/blog/:id", PageController, :post
    get "/roadmap", PageController, :roadmap
    get "/about", PageController, :about
    get "/security", PageController, :security
    get "/sitemap.xml", PageController, :sitemap
    get "/rss.xml", PageController, :feed
    get "/feed.xml", PageController, :feed
  end
end
