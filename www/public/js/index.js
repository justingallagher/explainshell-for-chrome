;(function() {
  $(document).ready(function main(e) {
    $.get("/api/clicks/", function populate(data) {
      $('#datatable').dataTable({
        data: data,
        order: [3, 'desc'],
        autoWidth: false,
        columns: [
            {
              title: 'Article',
              data: 'title',
              render: function renderArticle(title, type, row, meta) {
                // Substring the title and make it clickable
                var html = '<a target="_blank" href="' + row.url.substring(0) + '">';
                  html += title;
                html += '</a>';
                return html;
              },
              width: '30%'
            },
            {
              title: 'Command',
              data: 'command',
              render: function renderArticle(command, type, row, meta) {
                var url = "http://explainshell.com/explain?cmd=" +
                  encodeURIComponent(command);
                var html = '<a target="blank" href="' + url + '">'
                  html += command;
                return html;
              },
              width: '30%'
            },
            {
              title: 'Site',
              data: 'domain',
              render: function renderArticle(domain, type, row, meta) {
                var html = '<a target="_blank" href="http://' + domain + '">';
                  html += domain;
                html += '</a>';
                return html;
              },
              width: '15%'
            },
            {
              title: 'When',
              data: 'timestamp',
              render: function renderArticle(timestamp, type, row, meta) {
                return moment(timestamp).calendar();
              },
              width: '15%'
            },
        ]
      });
    });
  });
})();
