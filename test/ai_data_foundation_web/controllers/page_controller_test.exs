defmodule AiDataFoundationWeb.PageControllerTest do
  use AiDataFoundationWeb.ConnCase

  test "GET / renders home page", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~ "AI &amp; Open Data"
    assert html_response(conn, 200) =~ "Featured Hands-on Labs"
    assert html_response(conn, 200) =~ "Featured Model Benchmarks"
  end

  test "GET /tools renders tools catalog container", %{conn: conn} do
    conn = get(conn, ~p"/tools")
    assert html_response(conn, 200) =~ "modern AI systems"
    assert html_response(conn, 200) =~ "kube-tools"
  end

  test "GET /models renders open model leaderboard, VRAM calculator, and agents", %{conn: conn} do
    conn = get(conn, ~p"/models")
    assert html_response(conn, 200) =~ "VRAM Calculator"
    assert html_response(conn, 200) =~ "Qwen 32B"
    assert html_response(conn, 200) =~ "DeepSeek V3"
    assert html_response(conn, 200) =~ "OpenClaw"
    assert html_response(conn, 200) =~ "vram-params"
  end

  test "GET /labs and GET /labs/:id", %{conn: conn} do
    conn_list = get(conn, ~p"/labs")
    assert html_response(conn_list, 200) =~ "Interactive Practice"
    assert html_response(conn_list, 200) =~ "LangChain Practical Labs"

    conn_detail = get(conn, ~p"/labs/LangChain-Practical-Labs")
    assert html_response(conn_detail, 200) =~ "LangChain Practical Labs"
    assert html_response(conn_detail, 200) =~ "Interactive Runbook"
  end

  test "GET /blog and GET /blog/:id", %{conn: conn} do
    conn_list = get(conn, ~p"/blog")
    assert html_response(conn_list, 200) =~ "The ADF Journal"
    assert html_response(conn_list, 200) =~ "Qwen Coder Models"

    conn_detail = get(conn, ~p"/blog/Qwen-Coder-Models")
    assert html_response(conn_detail, 200) =~ "Qwen Coder Models"
    assert html_response(conn_detail, 200) =~ "Sangam Biradar"
  end

  test "GET /roadmap renders editorial tracks", %{conn: conn} do
    conn = get(conn, ~p"/roadmap")
    assert html_response(conn, 200) =~ "1,000 practical titles"
    assert html_response(conn, 200) =~ "LLM Architectures &amp; Foundations"
    assert html_response(conn, 200) =~ "Agentic Systems &amp; Model Context Protocol"
  end

  test "GET /about renders mission and pillars", %{conn: conn} do
    conn = get(conn, ~p"/about")
    assert html_response(conn, 200) =~ "Democratizing Artificial Intelligence"
    assert html_response(conn, 200) =~ "Open Protocols &amp; Tooling"
  end

  test "GET /sitemap.xml and GET /rss.xml", %{conn: conn} do
    conn_sitemap = get(conn, ~p"/sitemap.xml")
    assert response_content_type(conn_sitemap, :xml) =~ "xml"
    assert conn_sitemap.resp_body =~ "<urlset"

    conn_rss = get(conn, ~p"/rss.xml")
    assert response_content_type(conn_rss, :xml) =~ "xml"
    assert conn_rss.resp_body =~ "<rss version=\"2.0\""
  end

  test "returns 404 for unknown lab and post", %{conn: conn} do
    conn_lab = get(conn, ~p"/labs/non-existent-lab-id")
    assert html_response(conn_lab, 404) =~ "Not Found"

    conn_post = get(conn, ~p"/blog/non-existent-post-id")
    assert html_response(conn_post, 404) =~ "Not Found"
  end
end
