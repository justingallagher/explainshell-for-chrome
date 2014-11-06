;(function() {
  $(document).ready(function main(e) {
    $.get("/api/clicks/", function populate(data) {
      var options = {
        valueNames: ['title', 'domain', 'timestamp']
      };

      data.forEach(function(elem, arr, idx) {
        var node = '<tr>';
        node += '<td name="title"><a target="_blank" href="' + elem['url'] + '">' + elem['title'] + '</a></td>';
        node += '<td name="domain"><a target="_blank" href="http://' + elem['domain'] + '">' + elem['domain'] + '</a></td>';
        node += '<td name="timestamp">' + elem['timestamp'] + '</td>';
        node += '</tr>'

        $('.data-list').append(node);
      });

      var dataList = new List('data-list', options);
    });
  });
})();
