;(function() {
  function renderArticle(title, type, row, meta) {
    // Substring the title and make it clickable
    var html = '<a target="_blank" href="' + row.url.substring(0) + '">';
    html += title;
    html += '</a>';
    return html;
  }

  function renderCommand(command, type, row, meta) {
    var url = "http://explainshell.com/explain?cmd=" +
      encodeURIComponent(command);
    var html = '<a target="blank" href="' + url + '">'
      html += command;
    return html;
  }

  function renderSite(domain, type, row, meta) {
    var html = '<a target="_blank" href="http://' + domain + '">';
    html += domain;
    html += '</a>';
    return html;
  }

  function renderTime(timestamp, type, row, meta) {
    return moment(timestamp).calendar();
  }

  function getRecents(e) {
    $.get("/api/clicks/", function populateRecents(data) {
      $('#recents-datatable').dataTable({
        destroy: true,      // Destroy and reinitialize if already initialized
        data: data,
        order: [3, 'desc'], // Sort by time, most recent first
        autoWidth: false,
        columns: [
          {
            title: 'Article',
            data: 'title',
            render: renderArticle,
            width: '30%'
          },
          {
            title: 'Command',
            data: 'command',
            render: renderCommand,
            width: '30%'
          },
          {
            title: 'Site',
            data: 'domain',
            render: renderSite,
            width: '15%'
          },
          {
            title: 'When',
            data: 'timestamp',
            render: renderTime,
            width: '15%'
          },
        ]
      });
    });
  }

  function getSites() {
    $.get("/api/top/domains/", function populateSites(data) {
      $('#top-sites-datatable').dataTable({
        destroy: true,      // Destroy and reinitialize if already initialized
        data: data,
        order: [1, 'desc'], // Sort by count, largest first
        autoWidth: false,
        columns: [
          {
            title: 'Site',
            data: 'domain',
            render: renderSite,
            width: '85%'
          },
          {
            title: 'Count',
            data: 'count',
            width: '15%'
          },
        ]
      });
    });
  }

  function getArticles() {
    $.get("/api/top/urls/", function populateArticles(data) {
      $('#top-articles-datatable').dataTable({
        destroy: true,      // Destroy and reinitialize if already initialized
        data: data,
        order: [1, 'desc'], // Sort by count, largest first
        autoWidth: false,
        columns: [
          {
            title: 'Article',
            data: 'url',
            render: renderArticle,
            width: '85%'
          },
          {
            title: 'Count',
            data: 'count',
            width: '15%'
          },
        ]
      });
    });
  }

  /**
   * main
   *
   * Sets 'show.bs.tab' handlers to fetch data from appropriate endpoints
   */
  $(document).ready(function main(e) {
    $('#recents-tab').on('show.bs.tab', getRecents);
    $('#top-sites-tab').on('show.bs.tab', getSites);
    $('#top-articles-tab').on('show.bs.tab', getArticles);

    // Display "recents" tab first
    getRecents();
  });
})();
