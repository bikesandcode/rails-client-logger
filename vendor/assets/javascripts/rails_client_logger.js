// Compiled coffeescript code from rails_client_logger
window.jsLoggerBasePath || (window.jsLoggerBasePath = '');

window.jsLoggerUrl || (window.jsLoggerUrl = "/logger/rails_client_logger/log");

window.jsLogger = (function () {
  var prefix = '';
  return {
    configure: function (options) {
      if (options === null || options === void 0) {
        return;
      }

      if (typeof options.prefix === 'string') {
        prefix = options.prefix;
      }
    },
    invoke: function(level, message) {
      return jQuery.ajax({
        type: 'post',
        beforeSend: function(xhr) {
          return xhr.setRequestHeader('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'));
        },
        data: {
          level: level,
          message: prefix + message
        },
        complete: function(request) {},
        url: "" + window.jsLoggerBasePath + window.jsLoggerUrl
      });
    },
    debug: function(message) {
      return this.invoke('debug', message);
    },
    info: function(message) {
      return this.invoke('info', message);
    },
    warn: function(message) {
      return this.invoke('warn', message);
    },
    error: function(message) {
      return this.invoke('error', message);
    },
    fatal: function(message) {
      return this.invoke('fatal', message);
    }
  };
}());