Chart.defaults.multicolorLine = Chart.defaults.line;
Chart.controllers.multicolorLine = Chart.controllers.line.extend({
  draw: function(ease, flag) {
    var
      startIndex = 0,
      meta = this.getMeta(),
      points = meta.data || [],
      colors = this.getDataset().colors,
      area = this.chart.chartArea,
      originalDatasets = meta.dataset._children
        .filter(function(data) {
          return !isNaN(data._view.y);
        });

    function _setColor(newColor, meta) {
      meta.dataset._view.borderColor = newColor;
    }

    if (!colors) {
      Chart.controllers.line.prototype.draw.call(this, ease);
      return;
    }

    for (var i = 2; i <= colors.length; i++) {
      if (colors[i-1] !== colors[i]) {
        _setColor(colors[i-1], meta);
        meta.dataset._children = originalDatasets.slice(startIndex, i);
        meta.dataset.draw();
        startIndex = i - 1;
      }
    }

    meta.dataset._children = originalDatasets.slice(startIndex);
    meta.dataset.draw();
    meta.dataset._children = originalDatasets;

    points.forEach(function(point) {
      point.draw(area);
    });
  }
});